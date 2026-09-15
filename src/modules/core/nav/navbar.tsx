// import { Link } from 'react-router-dom'
import './navbar.css';
import ThemeToggle from '../theme/themeToggle.tsx';
import { useState } from 'react';
import About from '../../../assets/jsons/about_me.json';

function NavBar(){
	let [open, setOpen] = useState(false);
	const logout = () => {
		sessionStorage.removeItem('adminLoggedIn');
		window.location.href = '/admin/login';
	}
	const isUserLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
	
	// Check if current path includes '/admin'
    const isAdmin = window.location.pathname.includes('/admin');

	let qrcode: { alt:string, text: string, linkToPhoto: string } = {
		alt: 'QR code to view website on phone',
		text: 'scan/view on phone',
		linkToPhoto: 'src/assets/website_images/website_qr_code.png'
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

	let showApps = () => {
		let appSwitchSubMenu = document.querySelector('.appSwitchSubMenu') as HTMLElement;
		if (appSwitchSubMenu) {
			appSwitchSubMenu.style.display = appSwitchSubMenu.style.display === 'none' ? 'block' : 'none';
		}
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
						Logout
					</a>
				</div>
				<div className='appSwitchLogo' onClick={()=> showApps()}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
						<rect x="2" y="3" width="3.5" height="3.5" rx="0.8" />
						<rect x="7.5" y="3" width="3.5" height="3.5" rx="0.8" />
						<rect x="13" y="3" width="3.5" height="3.5" rx="0.8" />
						<rect x="18.5" y="3" width="3.5" height="3.5" rx="0.8" />
						<rect x="2" y="10.25" width="3.5" height="3.5" rx="0.8" />
						<rect x="7.5" y="10.25" width="3.5" height="3.5" rx="0.8" />
						<rect x="13" y="10.25" width="3.5" height="3.5" rx="0.8" />
						<rect x="18.5" y="10.25" width="3.5" height="3.5" rx="0.8" />
						<rect x="2" y="17.5" width="3.5" height="3.5" rx="0.8" />
						<rect x="7.5" y="17.5" width="3.5" height="3.5" rx="0.8" />
						<rect x="13" y="17.5" width="3.5" height="3.5" rx="0.8" />
						<rect x="18.5" y="17.5" width="3.5" height="3.5" rx="0.8" />
					</svg>
				</div>
				<div className='appSwitchSubMenu informationPill'>
					<p >APPS</p>
					<div className='appContainer'>
						<a className='navTitle' href='/'>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
								<defs>
									<linearGradient id="homeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
										<stop offset="0%" stop-color="#34d399" />
										<stop offset="100%" stop-color="#059669" />
									</linearGradient>
									<filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
									<feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.15" />
									</filter>
								</defs>
								<rect x="32" y="32" width="448" height="448" rx="100" fill="url(#homeGrad)" filter="url(#shadow)" />
								<path d="M256 120 L128 224 V376 C128 384.837 135.163 392 144 392 H208 V288 C208 279.163 215.163 272 224 272 H288 C296.837 272 304 279.163 304 288 V392 H368 C376.837 392 384 384.837 384 376 V224 Z" fill="#ffffff" />
							</svg>
							<p>Home</p>
						</a>
						<a className='navTitle' href='/admin'>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
								<defs>
									<linearGradient id="adminGrad" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stop-color="#3b82f6" />
									<stop offset="100%" stop-color="#1d4ed8" />
									</linearGradient>
									<filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
									<feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.15" />
									</filter>
								</defs>
								<rect x="32" y="32" width="448" height="448" rx="100" fill="url(#adminGrad)" filter="url(#shadow)" />
								<g fill="#ffffff">
									<path d="M256 120 C320 120 368 136 368 136 V248 C368 328 296 384 256 400 C216 384 144 328 144 248 V136 C144 136 192 120 256 120 Z" opacity="0.25" />
									<path d="M256 200 A56 56 0 1 0 256 312 A56 56 0 1 0 256 200 Z M256 168 C262.627 168 268 173.373 268 180 V188.7 C277.6 191.2 286.5 195.5 294.3 201.2 L301.7 195 C306.4 191.1 313.3 191.7 317.2 196.4 L327.6 208.9 C331.5 213.6 330.9 220.5 326.2 224.4 L320 229.7 C325.7 237.5 330 246.4 332.5 256 H341.2 C347.8 256 353.2 261.4 353.2 268 V284 C353.2 290.6 347.8 296 341.2 296 H332.5 C330 305.6 325.7 314.5 320 322.3 L326.2 327.6 C330.9 331.5 331.5 338.4 327.6 343.1 L317.2 355.6 C313.3 360.3 306.4 360.9 301.7 357 L294.3 350.8 C286.5 356.5 277.6 360.8 268 363.3 V372 C268 378.6 262.627 384 256 384 C249.373 384 244 378.6 244 372 V363.3 C234.4 360.8 225.5 356.5 217.7 350.8 L210.3 357 C205.6 360.9 198.7 360.3 194.8 355.6 L184.4 343.1 C180.5 338.4 181.1 331.5 185.8 327.6 L192 322.3 C186.3 314.5 182 305.6 179.5 296 H170.8 C164.2 296 158.8 290.6 158.8 284 V268 C158.8 261.4 164.2 256 170.8 256 H179.5 C182 246.4 186.3 237.5 192 229.7 L185.8 224.4 C181.1 220.5 180.5 213.6 184.4 208.9 L194.8 196.4 C198.7 191.7 205.6 191.1 210.3 195 L217.7 201.2 C225.5 195.5 234.4 191.2 244 188.7 V180 C244 173.373 249.373 168 256 168 Z" />
								</g>
							</svg>
							<p>ADMIN</p>
						</a>
					</div>
				</div>
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
					<img style={{ maxWidth: "50px", backgroundColor: "white", padding: "10px", borderRadius: "50%" }} src="src/assets/icons/menu-burger-horizontal-svgrepo-com.svg" onClick={()=> showNav()}/>
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
								<p>Logout</p>
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
