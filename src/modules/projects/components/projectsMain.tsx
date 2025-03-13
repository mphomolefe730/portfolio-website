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
			<div style={{textAlign: 'center', backgroundColor: 'red', color: 'white', padding: '5px', margin: '5px auto', borderRadius: '10px', maxWidth: '900px'}}>
				<span>IMPORTANT: scroll for more, click item for more details</span>
			</div>
		</div>
	)
}

export default ProjectMain;
