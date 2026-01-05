import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import NavBar from './modules/core/nav/navbar.tsx';
import HomePage from './modules/homepage/components/homepage.tsx';
import ProjectMain from './modules/projects/components/projectsMain.tsx';
import ProjectAll from './modules/projects/components/projectsAll.tsx';
import ProjectView from './modules/projects/components/projectView.tsx';
import BlogsMain from './modules/blogs/components/blogsMain.tsx';
import BlogsAll from './modules/blogs/components/blogsAll.tsx';
import BlogsView from './modules/blogs/components/blogsView.tsx';
import AboutMain from './modules/about/components/aboutMain.tsx';
import UnderConstruction from './modules/error/components/underConstruction.tsx';
import Contact from './modules/contact/components/contact.tsx';
import ProjectLoader from './modules/projects/components/projectLoader.tsx';

let isScrolling = false;
let scrollTimeout: NodeJS.Timeout;

window.addEventListener('wheel', () => {
  isScrolling = true;
  document.body.classList.add('is-scrolling');

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.body.classList.remove('is-scrolling');
  }, 150);
});

window.addEventListener('mousemove', () => {
  if (!isScrolling) {
    document.body.classList.remove('is-scrolling');
  }
});


const router = createBrowserRouter([
  { 
    path: '/', 
    element: <HomePage/>,
    errorElement: <div><p>404 NOT FOUND</p></div>
  },
  {
    path:'/about',
    element: <AboutMain />
  },
  {
    path:'/contact',
    element: <Contact />
  },
  {
    path:'/projects',
    element: <ProjectMain />,
    children:[
      {
        path: '/projects',
        element: < ProjectAll/>
      },
      {
        path:'/projects/:projectName',
        element: <ProjectView />
      }
    ]
  },{
    path:'/blogs',
    element: <BlogsMain />,
    children:[
      {
        path: '/blogs',
        element: < BlogsAll/>
      },
      {
        path:'/blogs/:blogName',
        element: <BlogsView />
      }
    ]
  },{
    path: '/load/:projectName',
    element: <ProjectLoader />
  },{
    path:'/games',
    element: <UnderConstruction />
  },
  {
    path:'/videos',
    element: <UnderConstruction />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavBar />
    
    {/*<BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/games" element={<HomePage/>}/>
        <Route path="/about" element={<HomePage/>}/>
        <Route path="/projects" element={<HomePage/>}/>
        <Route path="/videos" element={<HomePage/>}/>
        <Route path="/blogs" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>*/}
    <RouterProvider router={router}/>
  </StrictMode>,
)
