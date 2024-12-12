import about from '../../../assets/jsons/about_me.json';
import './aboutMain.css'
import { useState } from 'react';

function AboutMain(){
	const tabs = ['About','Experience','Education'];
	let [activeIndex, setActiveIndex] = useState(0);
	
	let showTab = (index:number) => {
		setActiveIndex(index);
		console.log(index)
	}

	return (
		<div style={{ maxWidth: "600px", margin: "auto" }}>
			<div className="aboutContainer">
				<nav style={{ marginBottom: "10px" }}>
					{ tabs.map((t,index)=>{ return <span key={index} onClick={ ()=> showTab(index) } className={ (index == activeIndex) ? "active1" : "navElement"}> {t} </span> }) }
				</nav>

				<div style={{ display: (activeIndex == 0) ? "block" : "none" }}> 
					{
						about.about_me.map((ele,index)=>{
							return <p key={index}> { ele } </p>;
						}) 
					}
					<div className='aboutHeroContainer'>
						<div className='aboutHero'><h1>full stack</h1>developer</div>
						<div className='aboutHero'><h1>2+</h1>years</div>
						<div className='aboutHero'><h1>Open</h1>to work</div>
					</div>
				</div>
				
				<div style={{ display: (activeIndex == 1) ? "block" : "none" }}> 
					{ about.experience.map((job,index)=>{
						return(
							<div key={index} className="informationPill">
								<div>
									<h3>{ job.company_name.toUpperCase() } </h3>
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
									<h3>{ job.company_name.toUpperCase() } </h3>
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
			</div>
		</div>
	);
}

export default AboutMain;
