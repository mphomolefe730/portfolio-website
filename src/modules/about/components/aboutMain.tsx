import about from '../../../assets/jsons/about_me.json';
import './aboutMain.css'
import { useRef, useState } from 'react';
import AnimatedFilterNav from '../../core/nav/animatedFilterNav.tsx';

function AboutMain(){
	const tabs = ['About','Experience','Education', 'Certificates'];
	let [activeIndex, setActiveIndex] = useState(0);
	const dateV = new Date();
	const [loading, setLoading] = useState(true);
	const scrollRef = useRef<HTMLDivElement>(null);
	
	let showTab = (index:number) => {
		setActiveIndex(index);
		console.log(index)
	}

	const handleProjectClick = (actionName, targetUrl) => {
		if (typeof window !== 'undefined' && typeof (window as any).cf !== 'undefined') {
			(window as any).cf('event', { 'button_clicked': actionName });
		}

		if (targetUrl.startsWith('http')) {
			window.open(targetUrl, '_blank', 'noopener,noreferrer');
		} else {
			window.location.href = targetUrl; // Fallback vanilla method
		}
	};

	return (
		<div>
			<div className="projects" style={{ maxWidth: "650px"}} ref={scrollRef}>
				<AnimatedFilterNav
					tabs={tabs}
					activeIndex={activeIndex}
					onSelect={showTab}
					scrollRef={scrollRef}
				/>

				<div style={{ display: (activeIndex == 0) ? "block" : "none" }}> 
					<div>
						{loading && <div id="loader" />}
						<div style={{ display: 'flex', scrollbarWidth: 'none', overflow: 'scroll', width: "100%", borderRadius: '10px', marginBottom: '10px' }}>
							{about.images.map((image: string, index: number) => (
								<img
									key={index}
									onLoad={() => setLoading(false)}
									style={{
										display: loading ? 'none' : 'block'
									}}
									className="aboutImage"
									src={image}
									alt={`about-me-image-${index}`}
								/>
							))}
						</div>
					</div>
					{
						about.about_me.map((ele,index)=>{
							return <p key={index}> { ele } </p>;
						}) 
					}
					<div className='aboutHeroContainer'>
						<div className='aboutHero informationPill'><h1>full</h1>stack developer</div>
						<div className='aboutHero informationPill'><h1>{dateV.getFullYear() - (dateV.getFullYear()-3)}+</h1>years experience</div>
						<div className='aboutHero informationPill'><h1>Open</h1>to work</div>
					</div>
				</div>
				
				<div style={{ display: (activeIndex == 1) ? "block" : "none" }}> 
					{ about.experience.map((job,index)=>{
						return(
							<div key={index} className="informationPill">
								<div>
									<h3 className="company_name">{ job.company_name.toUpperCase() } </h3>
								</div>
								<div className="splitTwo">
									<div> Title: </div>
									<div>{ job.job_title } </div>
								</div>
								<div className="splitTwo">
									<div> Location: </div>
									<div>{ job.location } </div>
								</div>
								<div className="splitTwo">
									<div> Date: </div>
									<div>{ job.from} - { job.to} </div>
								</div>
							</div>
						)
					}) } 
				</div>
				
				<div style={{ display: (activeIndex == 2) ? "block" : "none"}}> 
					{ about.education.map((job, index)=>{
						return(
							<div key={index} className="informationPill">
								<div>
									<h3 className="company_name">{ job.company_name.toUpperCase() } </h3>
								</div>
								<div className="splitTwo"> 
									<div> Title: </div>
									<div>{ job.course_name } </div>
								</div>
								<div className="splitTwo">
									<div> Location: </div>
									<div>{ job.location } </div>
								</div>
								<div className="splitTwo"> 
									<div> Date: </div>
									<div>{ job.from} - { job.to} </div>
								</div>
							</div>
						)
					}) } 
				</div>
				<div style={{ display: (activeIndex == 3) ? "block" : "none" }}> 
					{ about.certificates.map((certificate,index)=>{
						return(
							<div key={index} className="informationPill">
								<div style={{backgroundImage: "{certificate.image}"}}>
									<h3 className="company_name">{ certificate.company_name.toUpperCase() } </h3>
								</div>
								<div className="splitTwo"> 
									<div> Course: </div>
									<div>{ certificate.certificate_name } </div>
								</div>
								<div className="splitTwo"> 
									<div> Date: </div>
									<div>{ certificate.date } </div>
								</div>
								<div className="splitTwo" style={{"display": (certificate.link != "#") ? "grid" : "none"}}>
									<div> Credly: </div>
									<div> <a href={certificate.link} target="_blank" rel="noopener noreferrer"> {certificate.link} </a> </div>
								</div>
							</div>
						)
					}) }
				</div>
			</div>
			<div className='contactButtonContainer'>
				<a onClick={() => handleProjectClick('Contact Via About', '/contact')} className='contactButton'>Contact</a>
				<a onClick={() => handleProjectClick('Download CV', 'https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/Mpho%20Molefe%20CV%20-%2001-07-2026.pdf')} className='contactButton'>CV</a>
			</div>
			<div className='alert1'>
				<span>IMPORTANT: scroll for more, click filters for more</span>
			</div>
		</div>
	);
}

export default AboutMain;
