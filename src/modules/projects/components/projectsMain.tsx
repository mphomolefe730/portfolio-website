import { Outlet } from 'react-router-dom';
import './projectsMain.css';
import { useRef, useState } from 'react';
import ProjectsAll from './projectsAll.tsx';
import AnimatedFilterNav from '../../core/nav/animatedFilterNav.tsx';
import { env } from '../../../configs/environment.ts';

function ProjectMain(){
	const tabs = ['all','personal','commercial','data science','hackathon','collaborations'];
	let [tabIndex,setTabIndex] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);
	let filterContent = (index:number) => {
		setTabIndex(index);
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
	
	return(
		<div>
			<div className="projects" ref={scrollRef}>
				<AnimatedFilterNav
					tabs={tabs}
					activeIndex={tabIndex}
					onSelect={filterContent}
					scrollRef={scrollRef}
				/>
				<Outlet/>
				<ProjectsAll category={ tabs[tabIndex] }/>
			</div>
			<div className='contactButtonContainer' style={{gridTemplateColumns: "3fr 1fr"}}>
				<a onClick={() => handleProjectClick('Contact Via Projects', '/contact')} className='contactButton'>Contact</a>
				<a onClick={() => handleProjectClick('Download CV', env.CV)} className='contactButton'>CV</a>
			</div>
			<div className='alert1'>
				<span>IMPORTANT: scroll for more, click item for more details</span>
			</div>
		</div>
	)
}

export default ProjectMain;
