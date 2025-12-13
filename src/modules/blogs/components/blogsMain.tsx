import { Outlet } from 'react-router-dom';
import '../../projects/components/projectsMain.css';
import { useEffect, useState } from 'react';
import BlogAll from './blogsAll.tsx';
import '../../homepage/components/homepage.css';

function BlogsMain(){
    const tabs = ['all','summit'];
    let [tabIndex,setTabIndex] = useState(0);
    let filterContent = (index:number) => {
        setTabIndex(index);
    }

    useEffect(() => {;
    }, []);
    
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
                <BlogAll tag={ tabs[tabIndex] }/>
            </div>
            <div className='alert1'>
                <span>IMPORTANT: scroll for more, click item for more details</span>
            </div>
        </div>
    )
}

export default BlogsMain;
