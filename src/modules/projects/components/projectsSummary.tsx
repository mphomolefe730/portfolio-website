import projects from '../../../assets/jsons/personal_projects.json';
import '../../../styles/summaryPanel.css';

function ProjectsSummary(){
	return (
		<table className="summaryPanel summaryPanel-wide">
			<caption className="summaryPanel-title">Projects Summary</caption>
			<tbody>
				{projects.map((project: any, idx: number) => (
					<tr key={idx}>
						<th scope="row" className="summaryPanel-label">{project.title}</th>
						<td className="summaryPanel-data">
							{project.project_link && project.project_link !== '#' ? (
								<a href={`/projects/${project.title?.replace(' ', '-')}`}>{project.project_status}</a>
							) : (
								<span>{project.project_status}</span>
							)}
							<small>
								{project.category?.filter((c: string) => c !== 'all').join(', ')} • {project.last_update}
							</small>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ProjectsSummary;