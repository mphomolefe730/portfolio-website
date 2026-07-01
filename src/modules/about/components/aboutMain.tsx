import about from '../../../assets/jsons/about_me.json';
import './aboutMain.css'
import { useState } from 'react';

function AboutMain(){
	const tabs = ['About','Experience','Education', 'Certificates'];
	let [activeIndex, setActiveIndex] = useState(0);
	const dateV = new Date();
	const [loading, setLoading] = useState(true);
	
	let showTab = (index:number) => {
		setActiveIndex(index);
		console.log(index)
	}

	return (
		<div>
			<div className="projects" style={{ maxWidth: "650px"}}>
				<nav>
					{ tabs.map((t,index)=>{ return <span key={index} onClick={ ()=> showTab(index) } className={ (index == activeIndex) ? "active1" : "navElement"}> {t} </span> }) }
				</nav>

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
				<a className='contactButton' href='/contact'> Contact </a>
				<a className='contactButton' href='https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/Mpho Molefe CV - 01-07-2026.pdf' target='_blank' rel='noopener noreferrer'> CV </a>
			</div>
			<div className='alert1'>
				<span>IMPORTANT: scroll for more, click filters for more</span>
			</div>
		</div>
	);
}

export default AboutMain;
