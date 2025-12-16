import projects from '../../../assets/jsons/personal_projects.json';
import ProjectModel from '../../../models/projectModel.ts';
import { Link } from 'react-router-dom';
import './projectsAll.css';

function ProjectsAll( prop : { category?: string } ){
	let projectsObject : ProjectModel[] = projects;
	if (prop.category == undefined){
		prop.category == 'all';
	}
	if (prop.category != 'all'){
		projectsObject = projectsObject.filter((object)=> object.category?.includes(String(prop.category)));
	}

	return (
		projectsObject.map((project, index) => {
			return (
				<Link to={`${project?.title?.replace(' ','-')}`} key={index}>
					<div className='projectContainer'>
						<div> 
							<img className='projectImage informationPill' src={ (project.image) ? project.image : '' }/>
						</div>
						<div>
							<div style={{ margin: '0px 5px' }}>
								<h2 style={{ margin: '2.5px 0', textTransform: 'uppercase'}}>{ (project.title) ? project.title : '' } </h2>
							</div>
							<small>
								<p className='sdescription'> { (project.description) ? project.description : '' } </p>
							</small>
							<div>
								{ project.resource_images?.map((image,number)=>{
									return (
										<img className='logoImages informationPill' key={number} src={image.image_link} alt={image.title} />
									)
								}) }
							</div>
							<small style={{ margin: '0.50rem',color: 'gray', alignItems: "center",display: "flex" }}> { project?.last_update  } <span style={{padding:"2.5px", backgroundColor: "green", color: "white", marginLeft: "5px", borderRadius: "5px", display: (project?.project_status == "Maintenance")?"block":"none"}}>Live</span></small>
						</div>
					</div>
				</Link>
			)
		})
	)
}

export default ProjectsAll;
