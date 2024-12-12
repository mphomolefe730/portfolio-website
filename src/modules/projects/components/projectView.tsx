import './projectView.css';
// import ProjectModel from '../../../models/projectModel.ts';
import Alert from 'react-bootstrap/Alert';
import projects from '../../../assets/jsons/personal_projects.json';
import { Link, useParams } from 'react-router-dom';

function ProjectView(){
	let { projectName } = useParams();
	let projectInfo:any = projects.filter((individualProject:any)=> individualProject.title.replace(' ','-').includes(projectName));
	projectInfo = projectInfo[0];
	let warning = `This website is hosted on a free platform. To ensure optimal performance, please note the following: \n
	1) Inactivity: The website may go offline after period of inactivity. \n 2) Startup Time: Upon loading, the website may take up to 60 seconds to fully initialize. \n3) Page Refresh: To access the latest content, please refresh the page after initializing.`;
	
	warning = warning.split('\n').map((line, index) => (
        <span key={index}> {line} <br /> </span>
    )).toString();

	return(
		<div className='projectInformationContainer'>
			<Link to="/projects">
				<span className="x">x</span>
			</Link>

			<div className="projectVideoContainer">
				<div>
					<iframe height="240" style={{ width:"100%"}} src={projectInfo?.video_link} allow="autoplay"></iframe>
					<div style={{ display: projectInfo?.warning ? 'block' : 'none' }}> 
						<Alert variant="warning">
							{ warning }
						</Alert>
					</div>
				</div>
				<div style={{ position: 'relative', margin: '0 5px' }}>
					<div style={{ display:'grid', gridTemplateColumns: '2fr 1fr' }}>
						<h5 className="card-text p-2"> { projectInfo?.title?.toUpperCase() }
							<small>
								<div> created: { projectInfo?.last_update } </div>
							</small>
						</h5>
						<button>
							<a href={ projectInfo?.project_link}>VIEW WEBSITE </a>
						</button>
					</div>
					
					<p  className="text-muted p-2"> { projectInfo?.description } </p>
					{ projectInfo?.resource_images?.map((lang:{title:string,image_link:string},index:number)=>{
						return(
							<span key={index} className="btn btn-primary m-1"> { lang.title } </span>
						)
						})
					}	
				</div>
			</div>
		</div>
	)
}

export default ProjectView;
