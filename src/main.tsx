import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import NavBar from './modules/core/nav/navbar.tsx';
import HomePage from './modules/homepage/components/homepage.tsx';
import ProjectMain from './modules/projects/components/projectsMain.tsx';
import ProjectAll from './modules/projects/components/projectsAll.tsx';
import ProjectView from './modules/projects/components/projectView.tsx';
import AboutMain from './modules/about/components/aboutMain.tsx'

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
  },
  {
    path:'/blogs',
    element: <HomePage />
  },
  {
    path:'/games',
    element: <HomePage />
  },
  {
    path:'/videos',
    element: <HomePage />
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
