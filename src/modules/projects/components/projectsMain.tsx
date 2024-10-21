import { Outlet, NavLink } from 'react-router-dom';
import './projectsMain.css';

function ProjectMain(){
	return(
		<div className="projects">
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
			<Outlet/>
		</div>
	)
}
 
export default ProjectMain;
