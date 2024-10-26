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
		<div style={{ maxWidth: "900px", margin: "auto" }}>
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
							<div key={index} style={{ margin: "5px 0", backgroundColor: "rgba(240, 244, 249, 1)", padding: "10px", borderRadius: "12px" }}>
								<div className="splitTwo"> 
									<div>{ job.job_title } </div>
									<div>{ job.from} - { job.to} </div>
								</div>
								<div className="splitTwo">
									<div>{ job.company_name } </div>
									<div>{ job.location } </div>
								</div>
							</div>
						)
					}) } 
				</div>
				
				<div style={{ display: (activeIndex == 2) ? "block" : "none"}}> 
					{ about.education.map((job)=>{
						return(
							<div style={{ margin: "5px 0", backgroundColor: "rgba(240, 244, 249, 1)", padding: "10px", borderRadius: "12px"                                  }}>
								<div className="splitTwo">
									<div>{ job.company_name } </div>
									<div>{ job.location } </div>
								</div>
								<div className="splitTwo"> 
									<div>{ job.course_name } </div>
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
