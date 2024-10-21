// import { Link } from 'react-router-dom'
import './navbar.css';

function NavBar(){
	
	return(
        <nav>
		<div className='mm'> <a href='/'>MM </a></div>
		<div className='navContainer'>
			{ /*navPaths.map((object, index) => (
				<Link key={index} to={`${object.path}`}>{object.title}</Link>
			)) */}
			<a className='navTitle' href='/about'>About</a>
			<a className='navTitle' href='/projects/personal'>Projects</a>
			<a className='navTitle' href='/blogs'>Blogs</a>
			<a className='navTitle' href='games'>Games</a>
			<a className='navTitle' href='videos'>Videos</a>
		</div>
        </nav>
    );
}

export default NavBar;
