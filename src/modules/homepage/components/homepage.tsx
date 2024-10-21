import './homepage.css';

function HomePage(){
	return(
		<div className='mainContainer'>
			<div className='elements'>
				<h1 style={{margin:'5px 0'}}>MPHO MOLEFE</h1>
				<h3 style={{margin:'5px 0'}}>Innovating Tomorrow's Technology Today</h3>
				<span>Explore </span> <a href="/projects/personal/ecommerce-connect" className='project'>Ecommerce Connect</a> <a href="/projects/personal/code-pilot" className='project'>Code Pilot </a>
			</div>
			<div className='elements' style={{textAlign:'center'}}>
				<a href='https://www.linkedin.com/posts/mpho-molefe-a67ab9284_screenscraping-softwareabrengineering-python-activity-7232479002160988160-D_jw?utm_source=share&utm_medium=member_desktop'>
					<img className='latest_video' alt='Latest Tech Video' src='/src/assets/latest_video.png'/>
				</a>
			</div>
		</div>
	)
};

export default HomePage;
