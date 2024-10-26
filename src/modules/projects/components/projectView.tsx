import './projectView.css';
// import ProjectModel from '../../../models/projectModel.ts';
import projects from '../../../assets/jsons/personal_projects.json';
import { Link, useParams } from 'react-router-dom';

function ProjectView(){
	let { projectName } = useParams();
	let projectInfo:any = projects.filter((individualProject:any)=> individualProject.title.replace(' ','-').includes(projectName));
	projectInfo = projectInfo[0];

	return(
		<div className='projectInformationContainer'>
			<Link to="/projects">
				<span className="x">x</span>
			</Link>

			<div className="projectVideoContainer">
				<div>
					 <video style={{ width: '100%' }} height="240" controls autoPlay>
						<source src="movie.mp4" type="video/mp4"/>
						<source src="movie.ogg" type="video/ogg"/>
						Your browser does not support the video tag.
					</video> 
				</div>
				<div style={{ position: 'relative', margin: '0 5px' }}>
					<div style={{ display:'grid', gridTemplateColumns: '2fr 1fr' }}>
						<h5 className="card-text p-2"> { projectInfo?.title?.toUpperCase() }
							<small>
								<div> created: { projectInfo?.last_update } </div>
							</small>
						</h5>
						<button type="button" className="btn btn-outline-success">
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
