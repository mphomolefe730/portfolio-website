import projects from '../../../assets/jsons/personal_projects.json';
import ProjectModel from '../../../models/projectModel.ts';
import { Link } from 'react-router-dom';
import './projectsAll.css';

function ProjectsAll( prop : { category:string } ){
	let projectsObject : ProjectModel[] = projects;
	if (prop.category != 'all'){
		projectsObject = projectsObject.filter((object)=> object.category?.includes(prop.category));
	}

	return (
		projectsObject.map((project, index) => {
			return (
				<Link to={`${project?.title?.replace(' ','-').toLowerCase()}`} key={index}>
					<div className='projectContainer'>
						<div> <img className='projectImage' src={ (project.image) ? project.image : '' }/></div>
						<div>
							<h2 style={{ margin: '5px' }}>{ (project.title) ? project.title : '' } ({ project?.last_update  })</h2>
							<p style={{ margin: '5px' }}> { (project.description) ? project.description : '' } </p>
							<div>
								{ project.resource_images?.map((image,number)=>{
									return (
										<img className='logoImages' key={number} src={image.image_link} alt={image.title} />
									)
								}) }
							</div>
						</div>
					</div>
				</Link>
			)
		})
	)
}

export default ProjectsAll;
