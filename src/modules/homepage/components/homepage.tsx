import './homepage.css';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function HomePage(){
	let [ welcomeMessage, setWelcomeMessage ] = useState('WELCOME');
	const [visible, setVisible] = useState(1);
	useEffect(() => {
		const timer = setTimeout(() => {
			switch(visible){
				case 1:
					setWelcomeMessage('UYAKWAMUKELA');
					break;
				case 2:
					setWelcomeMessage('WELKOM');
					break;
				case 3:
					setWelcomeMessage('AMOHELANG');
					break;
				default:
					setWelcomeMessage('WELCOME');
					break;
			}
			if(visible < 5){
				setVisible(visible+1);
			}
		}, 500);
		return () => clearTimeout(timer);
	},[visible]);

	return(
		<div style={{ height: '89svh', display:'grid' , gridTemplateRows: '2fr 4fr'}}>
			<h1 style={{ display: (visible < 5)? 'flex' : 'none'}} className='welcomeText' >{ welcomeMessage }</h1>
			<Carousel fade className='carouselHolder' style={{ display: (visible == 5) ? 'block' : 'none', animation: 'fadeAnimation 2s' }}>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/53232095831_d69beeb347_k.jpg" alt="First slide"/>
					<Carousel.Caption>
						<p>Geekulture Unisa Hackathon 2023</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/WhatsApp Image 2023-10-01 at 08.53.24.jpeg" alt="Second slide"/>
					<Carousel.Caption>
						<p>Geekulture Unisa Hackathon 2023</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/WhatsApp Image 2024-08-29 at 9.23.45 PM.jpeg" alt="Third slide"/>
					<Carousel.Caption>
						<p>AWS Summit Johannesburg 2024</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>

			<div className='mainContainer'>
				<div className='elements informationPill'>
					<h1 style={{margin:'0'}}>MPHO MOLEFE</h1>
					{/*<p style={{margin:'0'}}><small>Innovating Tomorrow's Technology Today</small></p>*/}
					<div><span>Latest Project(s): </span> <a href="projects/Reverse-2048" className='project'>Reverse 2048</a></div>
					<div><a href="/projects/Ecommerce-Connect" className='project'>Ecommerce Connect</a></div>
				</div>
				<div className='elements informationPill' style={{textAlign:'center'}}>
					<p>Latest Video:</p>
					<a href='https://www.linkedin.com/posts/mpho-molefe-a67ab9284_screenscraping-softwareabrengineering-python-activity-7232479002160988160-D_jw?utm_source=share&utm_medium=member_desktop'>
						<img className='latest_video' alt='Latest Tech Video' src='https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/latest_video.png'/>
					</a>
				</div>
			</div>
		</div>
	)
};

export default HomePage;
