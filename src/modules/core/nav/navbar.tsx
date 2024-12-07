// import { Link } from 'react-router-dom'
import './navbar.css';
import { useState } from 'react';

function NavBar(){
	let [open, setOpen] = useState(false);
	let showNav = () => {
		setOpen(!open);
	}
	
	return(
        <nav>
		<div className="desktopNav">
			<div className='mm'> 
				<a href='/'>MM </a>
			</div>
			<div className='navContainer'>
				<a className='navTitle' href='/about'>About</a>
				<a className='navTitle' href='/projects'>Projects</a>
				<a className='navTitle' href='/blogs'>Blogs</a>
				<a className='navTitle' href='games'>Games</a>
				<a className='navTitle' href='videos'>Videos</a>
			</div>
		</div>
		<div className="mobileNav">
			<div style={{ display: (open) ? "none": "flex", width:"100%", justifyContent: "space-between", padding: "0 10px"}}>
				<a style={{ maxWidth: "50px", backgroundColor: "white", padding: "10px", borderRadius: "50%" }} href="/">MM</a>
				<img style={{ maxWidth: "50px", backgroundColor: "white", padding: "10px", borderRadius: "50%" }} src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/icons/menu-burger-horizontal-svgrepo-com.svg" onClick={()=> showNav()}/>
			</div>
			<div style={{ display: (open) ? "grid": "none", height: "98svh", width: "100%", zIndex: 99, position: "absolute", gridTemplateColumns: "2fr 4fr"}}>
				<div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={()=> showNav()}></div>
				<div style={{ backgroundColor: "rgba(255,255,255,1)", padding: "10px"}}>
					<a className='navTitle' href='/about'><p>About</p></a>
					<a className='navTitle' href='/projects'><p>Projects</p></a>
					<a className='navTitle' href='/blogs'><p>Blogs</p></a>
					<a className='navTitle' href='games'><p>Games</p></a>
					<a className='navTitle' href='videos'><p>Videos</p></a>
				</div>
			</div>
		</div>
        </nav>
    );
}

export default NavBar;
