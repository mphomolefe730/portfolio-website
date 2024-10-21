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
			<a href='/about'>About</a>
			<a href='/projects/personal'>Projects</a>
			<a href='/blogs'>Blogs</a>
			<a href='games'>Games</a>
			<a href='videos'>Videos</a>
		</div>
        </nav>
    );
}

export default NavBar;
