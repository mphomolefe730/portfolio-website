import { Outlet, useLocation } from 'react-router-dom';

export default function AdminMain() {  
  const location = useLocation();

  if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
    if (location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }
  return (
    <div className="projects">
      <Outlet/>
    </div>
  );
}