import './projectView.css';
// import ProjectModel from '../../../models/projectModel.ts';
import Alert from 'react-bootstrap/Alert';
import projects from '../../../assets/jsons/personal_projects.json';
import { Link, useParams } from 'react-router-dom';

function ProjectView(){
	let { projectName } = useParams();
	let projectInfo:any = projects.filter((individualProject:any)=> individualProject.title.replace(' ','-').includes(projectName));
	projectInfo = projectInfo[0];
	let warning = `This website is hosted on a free platform. To ensure optimal performance, please note the following: *
	1) Inactivity: The website may go offline after period of inactivity. * 2) Startup Time: Upon loading, the website may take up to 60 seconds to fully initialize. *3) Page Refresh: To access the latest content, please refresh the page after initializing.`;
	
	warning = warning.split('*').map((line, index) => {
         return (<span key={index}> {line} <br /> </span>)
	}).toString();

	let hideLoader = () => {
		const loader = document.getElementById('loader');
		const iframe = document.querySelector('iframe');

		loader.style.display = 'none';
		iframe.style.display = 'block';
		
	}

	return(
		<div className='projectInformationContainer'>
			<div className="navcenter">
				<div>
					<Link to="/projects">
						<span className="x"> CLOSE </span>
					</Link>
				</div>
				<div>
					<span className="x">
						SHARE
					</span>
					<span className="x" style={{ display: (projectInfo.project_link == '#') ? "none": "" }}>
						<a style={{ display: (projectInfo.type == 'website') ? "": "none" }} href={ `/load/${projectInfo?.title}` } target="_blank" rel="noopener noreferrer">VIEW WEBSITE </a>
						<a style={{ display: (projectInfo.type == 'game') ? "": "none" }} href={ projectInfo?.project_link} target="_blank" rel="noopener noreferrer">VIEW GITHUB </a>
						<a style={{ display: (projectInfo.type == 'analysis') ? "": "none" }}href={ projectInfo?.project_link} target="_blank" rel="noopener noreferrer">VIEW ARTICLE </a>
					</span>
				</div>
			</div>

			<div className="projectVideoContainer childGrown .element-to-remove">
				<div className="iframe-container" style={{ display: (projectInfo.video_link == '#') ? "none" : "block" }}>
					<div id='loader'></div>
					<iframe height="240" onLoad={ () => hideLoader() } style={{ width:"100%", borderRadius: '10px'}} src={projectInfo?.video_link} allow="autoplay"></iframe>
				</div>
				<div style={{ display:'grid', gridTemplateColumns: '2fr 1fr', margin: " 10px 5px" }}>
					<div>
						<h5 className="card-text m-0"> { projectInfo?.title?.toUpperCase() }</h5>
						<small className="text-muted">
							<div> created: { projectInfo?.last_update } </div>
							<div> status: { projectInfo?.project_status } </div>
						</small>
					</div>

				</div>

				<div style={{ display: projectInfo?.warning ? 'block' : 'none' }}> 
					<Alert variant="warning">
						{ warning }
					</Alert>
				</div>
				<div style={{ position: 'relative', margin: '0 5px' }}>	
					{ projectInfo?.description.map((sentence,index)=>{
							return (<p key={index} className="text-muted p-2"> { sentence } </p>)
						}) 
					}
					
					{ projectInfo?.timeline.map((object,index)=>{
							return (
							<div key={index}>
								<h5 className="dateContainer"> {object?.date}</h5>
								<div style={{display: "grid", gridTemplateColumns: "0.5fr 10fr"}}>
									<div className="timelineBody"> </div>
									<p key={index} className="p-2"> { object?.description } </p>
								</div>
							</div>
							)
						}) 
					}
					
					<h5 className="dateContainer">Tools Involved</h5>
					{ projectInfo?.resource_images?.map((lang:{title:string,image_link:string},index:number)=>{
						return(
							<span key={index} > { lang.title }, </span>
						)
						})
					}	
				</div>
			</div>
		</div>
	)
}

export default ProjectView;
