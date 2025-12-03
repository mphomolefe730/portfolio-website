import './homepage.css';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function HomePage(){
	const key = 'alertPortfolioWebsite';
	const expiryDays = 7;

	const [welcomeMessage, setWelcomeMessage] = useState('WELCOME');
	const [visible, setVisible] = useState(1);
	const [count, setCount] = useState(0);
	const [close, setClose] = useState(false);

	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === "undefined") return false;
		try {
			const item = localStorage.getItem(key);
			if (!item) {
				const now = new Date();
				const item_1 = {
					value: false,
					expiry: now.getTime() + expiryDays * 24 * 60 * 60 * 1000,
				};
				localStorage.setItem(key, JSON.stringify(item_1));
				return false;
			} else {
				const parsedItem = JSON.parse(item);
				const now = new Date();
				if (now.getTime() > parsedItem.expiry) {
					localStorage.removeItem(key);
					return false;
				}
				return parsedItem.value;
			}
		} catch {
			return false;
		}
	});

	useEffect(() => {
		setClose(storedValue); 
	}, [storedValue]);

	useEffect(() => {
		if (close) return;
		const timer = setTimeout(() => {
			switch (visible) {
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
			if (visible < 4 && count < 9999) {
				setVisible(prev => prev + 1);
				setCount(prev => prev + 1);
			} else {
				setVisible(0);
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [visible, count, close]);

	function closeWelcomeMessage() {
		setCount(9999);
		setVisible(0);
		setClose(true);

		const now = new Date();
		const item = {
			value: true,
			expiry: now.getTime() + expiryDays * 24 * 60 * 60 * 1000,
		};
		localStorage.setItem(key, JSON.stringify(item));
		setStoredValue(true);
	}


	return(
		<div style={{ height: '89svh', display:'grid' , gridTemplateRows: '2fr 4fr'}}>
			<div style={{ display: (close) ? 'none' : 'flex'}} className='welcomeText'>
				<h1>{ welcomeMessage }</h1>
				<p>Welcome to my portfolio website, your gateway to exploring my professional skills, creative projects, 
					and accomplishments. Here, you'll find a curated selection of my work that demonstrates my expertise 
					and passion in my field. Whether you're a potential client, employer, or collaborator, this portfolio
					offers a clear and concise showcase of what I can bring to the table. Take your time to browse through 
					the various sections and discover how my experience and creativity align with your needs.
				</p>
				<button type="button" onClick={ closeWelcomeMessage }>CONTINUE</button>
			</div>
			<Carousel fade className='carouselHolder childGrown' style={{ display: (close) ? 'block' : 'none' }}>
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
					<div><span>Starred Project(s): </span> <a href="projects/Reverse-2048" className='project'>Reverse 2048</a></div>
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
