import { Outlet } from 'react-router-dom';

export default function AdminMain() {  
  return (
    <div className="projects">
      <Outlet/>
    </div>
  );
}