import './projectView.css';
import { Link } from 'react-router-dom';

function ProjectView(){
	return(
		<div className='projectInformationContainer'>
			<Link to="/projects">
				<span style={{ position: 'absolute', right: 2, top: 2, margin: '10px', borderRadius: '10px', padding: '10px', backgroundColor: 'rgba(240, 244, 249, 1)' }}>x</span>
			</Link>

			<div style={{ margin: 'auto', height: '75svh', width: '100%', maxWidth: '900px', backgroundColor: 'white' }}>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default ProjectView;
