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
	
	warning = warning.split('*').map((line, index) => (
        <span key={index}> {line} <br /> </span>
    ));

	return(
		<div className='projectInformationContainer'>
			<Link to="/projects">
				<div className="x">x</div>
			</Link>

			<div className="projectVideoContainer">
				<div style={{ display:'grid', gridTemplateColumns: '2fr 1fr', marginBottom: "10px" }}>
					<div>
						<h5 className="card-text m-0"> { projectInfo?.title?.toUpperCase() }</h5>
						<small>
							<div> created: { projectInfo?.last_update } </div>
							<div> status: { projectInfo?.project_status } </div>
						</small>
					</div>
					<button className="btn btn-primary m-1">
						<a href={ projectInfo?.project_link}>VIEW WEBSITE </a>
					</button>
				</div>
				<div style={{backgroundColor: "black"}}>
					<iframe height="240" style={{ width:"100%"}} src={projectInfo?.video_link} allow="autoplay"></iframe>
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
									<p key={index} className="text-muted p-2"> { object?.description } </p>
								</div>
							</div>
							)
						}) 
					}
					
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
