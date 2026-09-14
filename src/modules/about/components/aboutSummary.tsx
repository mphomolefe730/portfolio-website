import about from '../../../assets/jsons/about_me.json';
import '../../../styles/summaryPanel.css';

function AboutSummary(){
	return (
		<table className="summaryPanel">
			<caption className="summaryPanel-title">{about.name}</caption>
			<tbody>
				{about.profile && (
					<tr>
						<td colSpan={2} className="summaryPanel-image">
							<img src={about.images[0]} alt={about.name} className="summaryPanel-profileImg" />
							<div className="summaryPanel-caption">
								{about.experience[0]?.job_title} at {about.experience[0]?.company_name}
							</div>
						</td>
					</tr>
				)}

				<tr>
					<th scope="row" className="summaryPanel-label">Status</th>
					<td className="summaryPanel-data">
						<span className="summaryPanel-badge">🟢 Open to Work</span>
						{about.currentStatus && (
							<div className="summaryPanel-subtext">{about.currentStatus}</div>
						)}
					</td>
				</tr>

				<tr>
					<th scope="row" className="summaryPanel-label">Role</th>
					<td className="summaryPanel-data">Full-Stack Developer &amp; IT Technician</td>
				</tr>

				<tr>
					<th scope="row" className="summaryPanel-label">Location</th>
					<td className="summaryPanel-data">Gauteng &amp; KwaZulu-Natal, South Africa</td>
				</tr>

				<tr>
					<th scope="row" className="summaryPanel-label">Experience</th>
					<td className="summaryPanel-data">
						<ul className="summaryPanel-list">
							{about.experience.map((job, idx) => (
								<li key={idx}>
									<strong>{job.company_name}</strong>
									<br />
									<small>{job.job_title} ({job.from} – {job.to})</small>
								</li>
							))}
						</ul>
					</td>
				</tr>

				<tr>
					<th scope="row" className="summaryPanel-label">Education</th>
					<td className="summaryPanel-data">
						{about.education[0]?.course_name}
						<br />
						<small>{about.education[0]?.company_name}</small>
					</td>
				</tr>

				<tr>
					<th scope="row" className="summaryPanel-label">Certifications</th>
					<td className="summaryPanel-data">
						<ul className="summaryPanel-list">
							{about.certificates.slice(0, 3).map((cert, idx) => (
								<li key={idx}>
									{cert.link !== '#' ? (
										<a href={cert.link} target="_blank" rel="noreferrer">
											{cert.certificate_name}
										</a>
									) : (
										<span>{cert.certificate_name}</span>
									)}
								</li>
							))}
						</ul>
					</td>
				</tr>

				<tr>
					<th scope="row" className="summaryPanel-label">Tech Stack</th>
					<td className="summaryPanel-data">
						Angular, React, Node.js, C#, AWS, Docker, Linux, PostgreSQL
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default AboutSummary;