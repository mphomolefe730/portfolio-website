import projects from '../../../assets/jsons/personal_projects.json';
import ProjectModel from '../../../models/projectModel.ts';
import './projectsPersonal.css';

function Personal(){
	let personalProjects : ProjectModel[] = projects;

	return (
		personalProjects.map((project) => {
			return (
				<div className='projectContainer'>
					<div> <img className='projectImage' src={ (project.image) ? project.image : '' }/></div>
					<div>
						<h2 style={{ margin: '5px' }}>{ (project.title) ? project.title : '' } ({ project?.last_update  })</h2>
						<p style={{ margin: '5px' }}> { (project.description) ? project.description : '' } </p>
						<div>
							{ project.resource_images?.map(image=>{
								return (
									<img className='logoImages' src={image.image_link} alt={image.title} />
								)
							}) }
						</div>
					</div>
				</div>
			)
		})
	)
}

export default Personal;
