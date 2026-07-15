import { Outlet } from 'react-router-dom';
import '../../projects/components/projectsMain.css';
import { useRef, useState } from 'react';
import BlogAll from './blogsAll.tsx';
import '../../homepage/components/homepage.css';
import AnimatedFilterNav from '../../core/nav/animatedFilterNav.tsx';

function BlogsMain(){
    const tabs = ['all', 'career','summit'];
    let [tabIndex,setTabIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    let filterContent = (index:number) => {
        setTabIndex(index);
    }
    
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
                <BlogAll tag={ tabs[tabIndex] }/>
            </div>
			<div className='contactButtonContainer'>
				<a className='contactButton' href='/contact'> Contact </a>
				<a className='contactButton' href='https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/Mpho%20Molefe%20CV%20-%2001-07-2026.pdf' target='_blank' rel='noopener noreferrer'> CV </a>
			</div>
            <div className='alert1'>
                <span>IMPORTANT: scroll for more, click item for more details</span>
            </div>
        </div>
    )
}

export default BlogsMain;
