import './homepage.css';
import Carousel from 'react-bootstrap/Carousel';

function HomePage(){

	return(
		<div style={{ height: '89svh', display:'grid' , gridTemplateRows: '2fr 4fr'}}>
			<Carousel fade className='carouselHolder'>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/53232095831_d69beeb347_k.jpg" alt="First slide"/>
				</Carousel.Item>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/WhatsApp Image 2023-10-01 at 08.53.24.jpeg" alt="Second slide"/>
				</Carousel.Item>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/WhatsApp Image 2024-08-29 at 9.23.45 PM.jpeg" alt="Third slide"/>
				</Carousel.Item>
			</Carousel>
			<div className='mainContainer'>
				<div className='elements'>
					<h1 style={{margin:'0'}}>MPHO MOLEFE</h1>
					<p style={{margin:'0'}}><small>Innovating Tomorrow's Technology Today</small></p>
					<div><span>Explore </span> <a href="/projects/Ecommerce-Connect" className='project'>Ecommerce Connect</a></div>
				</div>
				<div className='elements' style={{textAlign:'center'}}>
					<a href='https://www.linkedin.com/posts/mpho-molefe-a67ab9284_screenscraping-softwareabrengineering-python-activity-7232479002160988160-D_jw?utm_source=share&utm_medium=member_desktop'>
						<img className='latest_video' alt='Latest Tech Video' src='https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/latest_video.png'/>
					</a>
				</div>
			</div>
		</div>
	)
};

export default HomePage;
