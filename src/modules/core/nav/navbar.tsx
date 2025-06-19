// import { Link } from 'react-router-dom'
import './navbar.css';
import { useState } from 'react';

function NavBar(){
	let [open, setOpen] = useState(false);
	let qrcode: { alt:string, text: string, linkToPhoto: string } = {
		alt: 'QR code to view webiste on phone',
		text: 'scan/view on phone',
		linkToPhoto: 'https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/website_images/website_qr_code.png'
	};
	let socials: { name: string, link: string }[] = [
		{
			name: "LinkedIn",
			link: "http://linkedin.com/in/mpho-molefe-a67ab9284/"
		}, {
			name: "github",
			link: "https://github.com/mphomolefe730"
		}, {
			name: "email",
			link: "mailto:mphomolefe730@gmail.com"
		}
	];
	let showNav = () => {
		setOpen(!open);
	};
	
	return(
        <nav>
			<a className='mm desktopNav' href='/'> 
				MM
			</a>
			<div className='socialContainer desktopNav'>
				{
					socials.map((socialMedia,index) => {
						return(
							<a className='informationPill' key={index} target="_blank" href={socialMedia.link}> {socialMedia.name} </a>
						)
					})
				}
			</div>

			<div className='qrcodeContainer desktopNav'>
				<img className='informationPill' src={qrcode.linkToPhoto} alt={qrcode.alt} />
				<h6> {qrcode.text.toUpperCase()} </h6>
			</div>

			<div className="desktopNav">
				<div className='navContainer'>
					<a className='navTitle' href='/about'>About</a>
					<a className='navTitle' href='/projects'>Projects</a>
					<a className='navTitle' href='/blogs'>Blogs</a>
					<a className='navTitle' href='/games'>Games</a>
					<a className='navTitle' href='/videos'>Videos</a>
				</div>
			</div>
			<div className="mobileNav">
				{/* display: (open) ? "none": "flex"*/}
				<div style={{ display:  "flex", width:"100%", justifyContent: "space-between", padding: "0 10px"}}>
					<a style={{ maxWidth: "50px", backgroundColor: "white", padding: "10px", borderRadius: "50%" }} href="/">MM</a>
					<img style={{ maxWidth: "50px", backgroundColor: "white", padding: "10px", borderRadius: "50%" }} src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/icons/menu-burger-horizontal-svgrepo-com.svg" onClick={()=> showNav()}/>
				</div>
				<div style={{ display: (open) ? "grid": "none", height: "98svh", width: "100%", zIndex: 99, position: "absolute", gridTemplateColumns: "2fr 4fr"}}>
					<div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={()=> showNav()}>
						<div className='socialContainer '>
							{
								socials.map((socialMedia,index) => {
									return(
										<a className='informationPill' key={index} target="_blank" href={socialMedia.link}> {socialMedia.name} </a>
									)
								})
							}
						</div>
					</div>
					<div style={{ backgroundColor: "rgba(255,255,255,1)", padding: "10px"}}>
						<a className='navTitle' href='/about'><p>About</p></a>
						<a className='navTitle' href='/projects'><p>Projects</p></a>
						<a className='navTitle' href='/blogs'><p>Blogs</p></a>
						<a className='navTitle' href='/games'><p>Games</p></a>
						<a className='navTitle' href='/videos'><p>Videos</p></a>
						{ /* <a className='navTitle contactButton' href='/contact'> GET IN TOUCH</a> */ }
					</div>
				</div>
			</div>
        </nav>
    );
}

export default NavBar;
