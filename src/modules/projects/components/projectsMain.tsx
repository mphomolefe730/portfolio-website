import { Outlet, NavLink } from 'react-router-dom';
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
		<div className="projects">
			<nav style={{margin: '12px 0'}}>
			{	
				tabs.map((tab,index)=>{
					return (
						<span key={index} onClick={ ()=> filterContent( Number(index)) } className={(tabIndex == index) ? 'active' : 'navElement'}> { tab } </span>
					)
				})
			}
			</nav>
			<Outlet/>
			<ProjectsAll category={ tabs[tabIndex] }/>
		</div>
	)
}
{/* 
	<nav style={{ margin: '12px 0' }}>
		<NavLink to='personal' className={ ({isActive}) =>{
			return isActive ? 'active' : 'navElement';
		}}> personal </NavLink>
		<NavLink to='commercial' className={ ({isActive}) =>{
			return isActive ? 'active' : 'navElement';
		}}> commercial</NavLink>
		<NavLink to='hackathons' className={ ({isActive}) =>{
			return isActive ? 'active' : 'navElement';
		}}> hackathon</NavLink>
		<NavLink to='collaborative' className={ ({isActive}) =>{
			return isActive ? 'active' : 'navElement';
		}}> collaborative</NavLink>
	</nav>
*/}
export default ProjectMain;
