import './onboardingChat.css';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, RefObject } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { env } from '../../../configs/environment';
import script from '../../../assets/jsons/onboarding_questions.json';

/* ---------- Types ---------- */

interface Question {
	id: string;
	type: 'text' | 'email' | 'textarea' | 'select' | 'multiselect';
	botMessage: string;
	placeholder?: string;
	options?: string[];
	required?: boolean;
}

interface Section {
	id: string;
	title: string;
	questions: Question[];
}

interface ChatMessage {
	id: string;
	sender: 'bot' | 'user';
	text: string;
}

/* ---------- Helpers ---------- */

// Flatten every question across every section into one ordered list,
// so the chat doesn't need to know about sections while it's running.
// const allQuestions: Question[] = script.sections.flatMap((section: Section) => section.questions);

// // The exact column order of the "Client_Onboarding" tab in the admin
// // spreadsheet. Keeping this in one place means the emailed row always
// // lines up with a straight paste into that sheet.
// const SPREADSHEET_COLUMNS = [
// 	'submissionId', 'submissionDate', 'fullName', 'businessName', 'roleTitle',
// 	'email', 'phone', 'preferredContactMethod', 'industry', 'referralSource',
// 	'servicesInterested', 'existingSiteLink', 'problemToSolve', 'targetAudience',
// 	'mustHaveFeatures', 'primaryGoal', 'growthStage', 'brandPersonality',
// 	'competitorsAdmired', 'budgetRange', 'timeline', 'decisionProcess',
// 	'additionalNotes', 'clientUserId', 'status'
const sections = script.sections as unknown as Section[];

const allQuestions: Question[] = sections.flatMap((section) => section.questions);

// const SPREADSHEET_COLUMNS = [
//     'submissionId', 'submissionDate', 'fullName', 'businessName', 'roleTitle',
//     'email', 'phone', 'preferredContactMethod', 'industry', 'referralSource',
//     'servicesInterested', 'existingSiteLink', 'problemToSolve', 'targetAudience',
//     'mustHaveFeatures', 'primaryGoal', 'growthStage', 'brandPersonality',
//     'competitorsAdmired', 'budgetRange', 'timeline', 'decisionProcess',
//     'additionalNotes', 'clientUserId', 'status'
// ];

function interpolate(template: string, answers: Record<string, string>) {
	return template.replace(/\{(\w+)\}/g, (_match, key) => answers[key] || '');
}

function formatAnswerForDisplay(question: Question , rawAnswer: string | string[]) {
	if (Array.isArray(rawAnswer)) return rawAnswer.join(', ');
	console.log(question);
	return rawAnswer;
}

/* ---------- Component ---------- */

function OnboardingChat() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [started, setStarted] = useState(false);
	const [finished, setFinished] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [questionIndex, setQuestionIndex] = useState(-1);
	const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
	const [textValue, setTextValue] = useState('');
	const [multiSelected, setMultiSelected] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(false);

	const scrollAnchorRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	const currentQuestion = questionIndex >= 0 ? allQuestions[questionIndex] : null;
	const totalQuestions = allQuestions.length;
	const answeredCount = Math.min(questionIndex, totalQuestions);

	useEffect(() => {
		scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}, [messages, isTyping]);

	useEffect(() => {
		if (currentQuestion && (currentQuestion.type === 'text' || currentQuestion.type === 'email' || currentQuestion.type === 'textarea')) {
			inputRef.current?.focus();
		}
	}, [currentQuestion]);

	function pushBotMessage(text: string, delay = 550) {
		return new Promise<void>((resolve) => {
			setIsTyping(true);
			setTimeout(() => {
				setIsTyping(false);
				setMessages((prev) => [...prev, { id: `bot-${Date.now()}-${Math.random()}`, sender: 'bot', text }]);
				resolve();
			}, delay);
		});
	}

	function pushUserMessage(text: string) {
		setMessages((prev) => [...prev, { id: `user-${Date.now()}-${Math.random()}`, sender: 'user', text }]);
	}

	async function beginConversation() {
		setStarted(true);
		for (const line of script.intro.greetingLines) {
			// eslint-disable-next-line no-await-in-loop
			await pushBotMessage(line, 500);
		}
		askQuestion(0, {});
	}

	async function askQuestion(index: number, currentAnswers: Record<string, string | string[]>) {
		if (index >= allQuestions.length) {
			await finishConversation(currentAnswers);
			return;
		}
		setQuestionIndex(index);
		setTextValue('');
		setMultiSelected([]);
		const question = allQuestions[index];
		const flatAnswers = Object.fromEntries(
			Object.entries(currentAnswers).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v])
		);
		await pushBotMessage(interpolate(question.botMessage, flatAnswers));
	}

	function handleAnswer(rawAnswer: string | string[]) {
		if (!currentQuestion) return;
		const displayText = formatAnswerForDisplay(currentQuestion, rawAnswer);
		if (currentQuestion.required && (!displayText || displayText.trim() === '')) return;

		pushUserMessage(displayText || '(skipped)');
		const nextAnswers = { ...answers, [currentQuestion.id]: rawAnswer };
		setAnswers(nextAnswers);
		askQuestion(questionIndex + 1, nextAnswers);
	}

	async function finishConversation(finalAnswers: Record<string, string | string[]>) {
		setQuestionIndex(allQuestions.length);
		for (const line of script.outro.lines) {
			// eslint-disable-next-line no-await-in-loop
			await pushBotMessage(line, 500);
		}
		setFinished(true);
		await sendOnboardingEmail(finalAnswers);
	}

	async function sendOnboardingEmail(finalAnswers: Record<string, string | string[]>) {
		setIsSubmitting(true);
		setSubmitError(false);

		const templateKeys = [
			'fullName', 'businessName', 'roleTitle', 'email', 'phone', 
			'preferredContactMethod', 'industry', 'referralSource', 'existingSiteLink', 
			'servicesInterested', 'problemToSolve', 'targetAudience', 'mustHaveFeatures', 
			'primaryGoal', 'growthStage', 'brandPersonality', 'competitorsAdmired', 
			'budgetRange', 'timeline', 'decisionProcess', 'additionalNotes', 'consentUpdates'
		];

		const formattedPayload: Record<string, string> = {};

		templateKeys.forEach((key) => {
			const rawValue = finalAnswers[key];
			if (Array.isArray(rawValue)) {
				formattedPayload[key] = rawValue.join(', ');
			} else {
				formattedPayload[key] = rawValue ? String(rawValue).trim() : 'N/A';
			}
		});

		try {
			await emailjs.send(
				env.VITE_EMAILJS_SERVICE_ID,
				env.VITE_EMAILJS_ONBOARDING_TEMPLATE_ID,
				formattedPayload,
				env.VITE_EMAILJS_PUBLIC_KEY
			);
			console.log('Email sent successfully with payload:', formattedPayload);
		} catch (error) {
			console.error('Onboarding email failed:', error);
			setSubmitError(true);
		} finally {
			setTimeout(() => {
				setIsSubmitting(false);
			}, 1000);
		}
	}

	function handleTextSubmit(e?: FormEvent) {
		e?.preventDefault();
		handleAnswer(textValue.trim());
	}

	function toggleMultiSelect(option: string) {
		setMultiSelected((prev) =>
			prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
		);
	}

	return (
		<div className="onboardingContainer childGrown">
			<div className="onboardingHeader">
				<span className="onboardingAvatar">{script.intro.botName}</span>
				<div>
					<h5 className="company_name" style={{ margin: 0 }}>Client Onboarding</h5>
					<small className="text-muted">
						{finished ? 'All done' : `Question ${Math.max(answeredCount, 0)} of ${totalQuestions}`}
					</small>
				</div>
			</div>

			<div className="onboardingProgressTrack">
				<div
					className="onboardingProgressFill"
					style={{ width: `${finished ? 100 : (Math.max(answeredCount, 0) / totalQuestions) * 100}%` }}
				/>
			</div>

			<div className="onboardingWindow">
				{!started && (
					<div className="onboardingStartCard informationPill">
						<span className="onboardingAvatar onboardingAvatarLarge">{script.intro.botName}</span>
						<p className="text-muted" style={{ margin: '10px 0 16px' }}>
							Ready when you are.
						</p>
						<button className="contactButton onboardingStartButton" onClick={beginConversation}>
							{script.intro.startButtonLabel}
						</button>
					</div>
				)}

				{messages.map((message) => (
					<div key={message.id} className={`onboardingBubbleRow onboardingBubbleRow-${message.sender}`}>
						{message.sender === 'bot' && <span className="onboardingAvatar onboardingAvatarSmall">{script.intro.botName}</span>}
						<div className={`onboardingBubble onboardingBubble-${message.sender}`}>{message.text}</div>
					</div>
				))}

				{isTyping && (
					<div className="onboardingBubbleRow onboardingBubbleRow-bot">
						<span className="onboardingAvatar onboardingAvatarSmall">{script.intro.botName}</span>
						<div className="onboardingBubble onboardingBubble-bot onboardingTypingBubble">
							<span className="onboardingTypingDot" />
							<span className="onboardingTypingDot" />
							<span className="onboardingTypingDot" />
						</div>
					</div>
				)}

				{finished && (
					<div className="onboardingFinishedCard">
						<div className="onboardingCheckmark">
							<svg viewBox="0 0 52 52">
								<circle className="onboardingCheckmarkCircle" cx="26" cy="26" r="24" fill="none" />
								<path className="onboardingCheckmarkTick" fill="none" d="M14 27l7 7 16-16" />
							</svg>
						</div>
						{isSubmitting && <small className="text-muted">Sending your answers to Mpho...</small>}
						{!isSubmitting && !submitError && <small className="text-muted">Sent! Mpho has your answers.</small>}
						{!isSubmitting && submitError && (
							<small className="text-muted">
								Hmm, that didn't send. Please email mpho using <a href="/contact">link</a> directly so nothing gets lost.
							</small>
						)}
						<Link to={script.outro.ctaLink} className="contactButton onboardingStartButton" style={{ display:'block', marginTop: '14px' }}>
							{script.outro.ctaLabel}
						</Link>
					</div>
				)}

				<div ref={scrollAnchorRef} />
			</div>

			{started && !finished && currentQuestion && !isTyping && (
				<div className="onboardingInputArea">
					{(currentQuestion.type === 'text' || currentQuestion.type === 'email') && (
						<form className="onboardingTextForm" onSubmit={handleTextSubmit}>
							<input
								ref={inputRef as RefObject<HTMLInputElement>}
								className="onboardingTextInput"
								type={currentQuestion.type === 'email' ? 'email' : 'text'}
								placeholder={currentQuestion.placeholder}
								value={textValue}
								onChange={(e) => setTextValue(e.target.value)}
							/>
							<button type="submit" className="onboardingSendButton" aria-label="Send">➜</button>
						</form>
					)}

					{currentQuestion.type === 'textarea' && (
						<form className="onboardingTextForm" onSubmit={handleTextSubmit}>
							<textarea
								ref={inputRef as RefObject<HTMLTextAreaElement>}
								className="onboardingTextInput onboardingTextarea"
								placeholder={currentQuestion.placeholder}
								value={textValue}
								rows={2}
								onChange={(e) => setTextValue(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault();
										handleTextSubmit();
									}
								}}
							/>
							<button type="submit" className="onboardingSendButton" aria-label="Send">➜</button>
						</form>
					)}

					{currentQuestion.type === 'select' && (
						<div className="onboardingOptionGrid">
							{currentQuestion.options?.map((option) => (
								<button
									key={option}
									className="onboardingOptionPill"
									onClick={() => handleAnswer(option)}
								>
									{option}
								</button>
							))}
						</div>
					)}

					{currentQuestion.type === 'multiselect' && (
						<div className="onboardingMultiWrapper">
							<div className="onboardingOptionGrid">
								{currentQuestion.options?.map((option) => (
									<button
										key={option}
										className={`onboardingOptionPill${multiSelected.includes(option) ? ' onboardingOptionPill-selected' : ''}`}
										onClick={() => toggleMultiSelect(option)}
									>
										{option}
									</button>
								))}
							</div>
							<button
								className="contactButton onboardingStartButton"
								style={{ marginTop: '10px' }}
								disabled={currentQuestion.required && multiSelected.length === 0}
								onClick={() => handleAnswer(multiSelected)}
							>
								Continue
							</button>
						</div>
					)}

					{!currentQuestion.required && currentQuestion.type !== 'select' && currentQuestion.type !== 'multiselect' && (
						<button className="onboardingSkipLink" onClick={() => handleAnswer('')}>
							Skip this one
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default OnboardingChat;