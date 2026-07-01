import { Outlet } from 'react-router-dom';
import './projectsMain.css';
import { useState } from 'react';
import ProjectsAll from './projectsAll.tsx';

function ProjectMain(){
	const tabs = ['all','personal','commercial','data science','hackathon','collaborative'];
	let [tabIndex,setTabIndex] = useState(0);
	let filterContent = (index:number) => {
		setTabIndex(index);
	}
	
	return(
		<div>
			<div className="projects">
				<nav className="projectMainNav" style={{margin: '12px 0'}}>
				{	
					tabs.map((tab,index)=>{
						return (
							<span key={index} onClick={ ()=> filterContent( Number(index)) } className={(tabIndex == index) ? 'active1' : 'navElement'}> { tab } </span>
						)
					})
				}
				</nav>
				<Outlet/>
				<ProjectsAll category={ tabs[tabIndex] }/>
			</div>
			<div className='contactButtonContainer'>
				<a className='contactButton' href='/contact'> Contact </a>
				<a className='contactButton' href='https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/Mpho Molefe CV - 01-07-2026.pdf' target='_blank' rel='noopener noreferrer'> CV </a>
			</div>
			<div className='alert1'>
				<span>IMPORTANT: scroll for more, click item for more details</span>
			</div>
		</div>
	)
}

export default ProjectMain;
