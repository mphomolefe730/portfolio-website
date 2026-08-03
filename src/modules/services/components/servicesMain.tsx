import './servicesMain.css';
import '../../about/components/aboutMain.css';
import servicesData from '../../../assets/jsons/services.json';
import projects from '../../../assets/jsons/personal_projects.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface ServiceItem {
	id: string;
	title: string;
	tagline: string;
	description: string;
	deliverables: string[];
	evidenceProjectTitle: string | null;
}

function ServicesMain() {
	const [activeService, setActiveService] = useState<string | null>(null);

	const caseStudies = projects.filter((project: any) => project.project_status === 'Maintenance');

	const toggleService = (id: string) => {
		setActiveService(activeService === id ? null : id);
	};

	return (
		<div>
			<div className="projects servicesContainer" style={{ maxWidth: '900px' }}>

				{/* Hero */}
				<div className="servicesHero">
					<small className="servicesEyebrow">{servicesData.positioning.eyebrow}</small>
					<h1 className="company_name" style={{ margin: '4px 0' }}>
						{servicesData.positioning.heading}
					</h1>
					<p className="text-muted">{servicesData.positioning.subheading}</p>
					{/* <div className="contactButtonContainer" style={{ maxWidth: '400px', margin: '10px 0 0' }}>
						<a className="contactButton" href="/contact">Get a Fixed Quote</a>
					</div> */}
				</div>

				{/* Why work with me */}
				<h3 style={{ marginTop: '30px' }} className="company_name">Why work with me</h3>
				<div className="aboutHeroContainer servicesWhyGrid">
					{servicesData.whyMe.map((item, index) => (
						<div key={index} className="aboutHero servicesWhyCard">
							<h5 className="company_name">{item.title}</h5>
							<p style={{ fontSize: '0.85rem' }}>{item.description}</p>
						</div>
					))}
				</div>

				{/* Transparency note */}
				<div className="servicesTransparency ">
					<strong>Pricing, upfront:</strong> {servicesData.transparencyNote}
				</div>

				{/* Services */}
				<h3 style={{ marginTop: '30px' }} className="company_name">What I Do</h3>
				<div className="servicesGrid">
					{servicesData.services.map((service: ServiceItem) => {
						const evidence = service.evidenceProjectTitle
							? projects.find((p: any) => p.title === service.evidenceProjectTitle)
							: null;
						const isOpen = activeService === service.id;

						return (
							<div
								key={service.id}
								className={`serviceCard informationPill${isOpen ? ' serviceCardOpen' : ''}`}
								onClick={() => toggleService(service.id)}
							>
								<div className="serviceCardHeader">
									<h5 className="company_name" style={{ margin: 0 }}>{service.title}</h5>
									<span className="serviceToggle">{isOpen ? '−' : '+'}</span>
								</div>
								<p className="serviceTagline">{service.tagline}</p>

								<div className="serviceCardBody" style={{ display: isOpen ? 'block' : 'none' }}>
									<p style={{ fontSize: '0.9rem' }}>{service.description}</p>
									<ul className="serviceDeliverables">
										{service.deliverables.map((d, i) => (
											<li key={i}>{d}</li>
										))}
									</ul>
									{evidence && (
										<Link
											to={`/projects/${evidence.title?.replace(' ', '-')}`}
											// className="serviceEvidenceLink"
											onClick={(e) => e.stopPropagation()}
										>
											See it in action: {evidence.title} →
										</Link>
									)}
								</div>
							</div>
						);
					})}
				</div>

				{/* Process */}
				<h3 style={{ marginTop: '30px' }} className="company_name">How I Work</h3>
				<div className="processGrid">
					{servicesData.process.map((step, index) => (
						<div key={index} className="aboutHero servicesWhyCard">
							<span className="processNumber">{String(index + 1).padStart(2, '0')}</span>
							<h5 className="company_name">{step.title}</h5>
							<p style={{ fontSize: '0.85rem' }}>{step.description}</p>
						</div>
					))}
				</div>

				{/* Case studies / proof */}
				<h3 style={{ marginTop: '30px' }} className="company_name">Proof, Not Promises</h3>
				<p className="text-muted" style={{ marginTop: '-8px' }}>
					Every service above shows up in a real, working project below — click through to see it live.
				</p>
				<div className="servicesCaseGrid">
					{caseStudies.map((project: any, index: number) => (
						<Link to={`/projects/${project.title?.replace(' ', '-')}`} key={index} className="serviceCaseLink">
							<div className="serviceCaseCard informationPill">
								<img className="serviceCaseImage" src={project.image} alt={project.title} />
								<div>
									<h5 style={{ margin: '4px 0', textTransform: 'uppercase' }}>{project.title}</h5>
									<p className="sdescription" style={{ fontSize: '0.85rem' }}>
										{project.description?.[0]}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>

				{/* CTA banner */}
				<div className="servicesCta">
					<h3 className="company_name" style={{ margin: 0 }}>Ready to build something that works as hard as you do?</h3>
					<p>Tell me about your project. You'll have a scoped, fixed-price quote back, in plain English.</p>
					{/* <div className="contactButtonContainer" style={{ maxWidth: '400px', margin: '10px auto 0' }}>
						<a className="contactButton" href="/contact">Start a Project</a>
					</div> */}
				</div>
			</div>

			<div className="contactButtonContainer">
				<a className="contactButton" href="/contact"> Contact </a>
				<a className="contactButton" href="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/Mpho%20Molefe%20CV%20-%2001-07-2026.pdf" target="_blank" rel="noopener noreferrer"> CV </a>
			</div>
			<div className="alert1">
				<span>IMPORTANT: click a service to expand it, click any project to see the full case study</span>
			</div>
		</div>
	);
}

export default ServicesMain;