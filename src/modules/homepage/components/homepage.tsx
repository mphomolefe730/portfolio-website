import './homepage.css';
import Carousel from 'react-bootstrap/Carousel';

function HomePage(){

	return(
		<div style={{ height: '89svh', display:'grid' , gridTemplateRows: '2fr 4fr'}}>
			<Carousel fade className='carouselHolder'>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/53232095831_d69beeb347_k.jpg" alt="First slide"/>
					<Carousel.Caption style={{backgroundColor: "rgba(0,0,0,0.25)"}}>
						<p>Geekulture Unisa Hackathon 2023</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/WhatsApp Image 2023-10-01 at 08.53.24.jpeg" alt="Second slide"/>
					<Carousel.Caption style={{backgroundColor: "rgba(0,0,0,0.25)"}}>
						<p>Geekulture Unisa Hackathon 2023</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="carouselImage" src="https://raw.githubusercontent.com/mphomolefe730/portfolio-website/refs/heads/main/src/assets/background_images/WhatsApp Image 2024-08-29 at 9.23.45 PM.jpeg" alt="Third slide"/>
					<Carousel.Caption style={{backgroundColor: "rgba(0,0,0,0.25)"}}>
						<p>AWS Summit Johannesburg 2024</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			{/*
			<div style={{ backgroundImage: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)", padding: "5px", borderRadius: "12px"}}>
				<p><a style={ {color: "white" }} href="https://za.linkedin.com/in/mpho-molefe-a67ab9284">LinkedIn</a></p>
				<p><a style={{ color: "white" }} href="https://x.com/mphomolefeww">Twitter</a></p>
			</div>
			*/}
			<div className='mainContainer'>
				<div className='elements'>
					<h1 style={{margin:'0'}}>MPHO MOLEFE</h1>
					{/*<p style={{margin:'0'}}><small>Innovating Tomorrow's Technology Today</small></p>*/}
					<div><span>Latest Project(s): </span> <a href="projects/Social-Media" className='project'>Social Media</a></div>
					<div><a href="/projects/Ecommerce-Connect" className='project'>Ecommerce Connect</a></div>
				</div>
				<div className='elements' style={{textAlign:'center'}}>
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
