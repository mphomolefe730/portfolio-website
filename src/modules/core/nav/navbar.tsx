// import { Link } from 'react-router-dom'
import './navbar.css';
import ThemeToggle from '../theme/themeToggle.tsx';
import { useState } from 'react';
import About from '../../../assets/jsons/about_me.json';
import AppSwitcher from './appSwitcher.tsx';

function NavBar(){
	let [open, setOpen] = useState(false);
	
	const logout = () => {
		sessionStorage.removeItem('adminLoggedIn');
		window.location.href = '/admin/login';
	}

	const isUserLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';	
	const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';	
    const isAdmin = window.location.pathname.includes('/admin');

	let qrcode: { alt:string, text: string, linkToPhoto: string } = {
		alt: 'QR code to view website on phone',
		text: 'scan/view on phone',
		linkToPhoto: 'https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/website_images/website_qr_code.png'
	};
	let socials: { name: string, link: string }[] = [
		{
			name: "LinkedIn",
			link: "http://linkedin.com/in/mpho-molefe-a67ab9284/"
		}, {
			name: "X",
			link: "https://x.com/mphomolefeww"
		}, {
			name: "GitHub",
			link: "https://github.com/mphomolefe730"
		}
	];

	let showNav = () => {
		setOpen(!open);
	};

	return(
        <nav>
			{!isAdmin ? <a className='mm desktopNav' href='/'> MM</a> : <a className='mm desktopNav' href='/admin'> MM</a>}			
			
			<div className='socialContainer desktopNav'>
				<p>Connect with me:</p>
				{
					socials.map((socialMedia,index) => {
						return(
							<a className='project' key={index} target="_blank" href={socialMedia.link}> {socialMedia.name} </a>
						)
					})
				}
				{/* <a className='project' href='/contact'> EMAIL</a> */}
			</div>
			
			<div className='adminControls desktopNav'>
				<div>
					<a className='navTitle logout' style={{display: isUserLoggedIn ? "block" : "none"}} onClick={logout}>
						Logout <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
					</a>
				</div>
				<AppSwitcher isUserLoggedIn={isUserLoggedIn} isAuthenticated={isAuthenticated} />
			</div>

			<div className='qrcodeContainer desktopNav'>
				<img src={qrcode.linkToPhoto} alt={qrcode.alt} />
				<h6> {qrcode.text.toUpperCase()} </h6>
				<ThemeToggle />
			</div>

			<div className="desktopNav">
				<p className="stat-ticker"><small ><span>Current Status: </span> { About.currentStatus }</small></p>
				{!isAdmin ? (
                    <div className='navContainer'>
                        <a className='navTitle' href='/about'>About</a>
                        <a className='navTitle' href='/blogs'>Blogs</a>
                        <a className='navTitle' href='/projects'>Projects</a>
                        <a className='navTitle' href='/services'>Services</a>
                    </div>
                ) : (
					<div className='navContainer' style={{ display: (isUserLoggedIn) ? "inline-flex" : "none" }}>
						<a className='navTitle' href='/admin'><p>Home</p></a>
						<a className='navTitle' href='/admin/files'><p>Files</p></a>
						<a className='navTitle' href='/admin/billing'><p>Billing</p></a>
					</div>
				)}
			</div>

			<div className="mobileNav">
				{/* display: (open) ? "none": "flex"*/}
				<p className="stat-ticker"><small ><span>Current Status: </span> { About.currentStatus }</small></p>
				<div style={{ display:  "flex", width:"100%", justifyContent: "space-between", padding: "0 10px"}}>
					{!isAdmin ? <a style={{ maxWidth: "50px", backgroundColor: "white", padding: "10px", borderRadius: "50%" }} href="/">MM</a> : <a style={{ maxWidth: "50px", backgroundColor: "white", padding: "10px", borderRadius: "50%" }} href="/admin">MM</a>}
					<img style={{ maxWidth: "50px", backgroundColor: "white", padding: "10px", borderRadius: "50%" }} src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/icons/menu-burger-horizontal-svgrepo-com.svg" onClick={()=> showNav()}/>
				</div>
				<div style={{ display: (open) ? "grid": "none", height: "98svh", width: "100%", zIndex: 99, position: "absolute", gridTemplateColumns: "2fr 4fr"}}>
					<div style={{ backgroundColor: "rgba(0,0,0,1)" }} onClick={()=> showNav()}>
						{/* <div className='socialContainer '>
							{
								socials.map((socialMedia,index) => {
									return(
										<a className='informationPill' key={index} target="_blank" href={socialMedia.link}> {socialMedia.name} </a>
									)
								})
							}
						</div> */}
					</div>
					{!isAdmin ? (
						<div style={{ backgroundColor: "rgba(255,255,255,1)", padding: "10px"}}>
							<a className='navTitle' href='/about'><p>About</p></a>
							<a className='navTitle' href='/blogs'><p>Blogs</p></a>
							<a className='navTitle' href='/projects'><p>Projects</p></a>
							<a className='navTitle' href='/services'><p>Services</p></a>
							<a className='navTitle contactButton' href='/contact'> GET IN TOUCH</a>
							<a className='navTitle' href='/share'><p>SHARE</p></a>
							<ThemeToggle/>
						</div>
					) : (
						<div style={{ backgroundColor: "rgba(255,255,255,1)", padding: "10px"}}>
							<a className='navTitle' href='/admin'><p>Home</p></a>
						<a className='navTitle' href='/admin/files'><p>Files</p></a>
							<a className='navTitle' href='/admin/billing'><p>Billing</p></a>
							<a className='navTitle logout' onClick={logout} style={{display: isUserLoggedIn ? "block" : "none"}}>
								<p>Logout <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
								</p>
							</a>
							<a className='navTitle contactButton' href='/contact'> GET IN TOUCH</a>
							<a className='navTitle' href='/share'><p>SHARE</p></a>
						</div>
					)}
				</div>
			</div>
        </nav>
    );
}

export default NavBar;
