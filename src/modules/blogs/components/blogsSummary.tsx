import blogs from '../../../assets/jsons/blogs.json';
import '../../../styles/summaryPanel.css';

function BlogsSummary(){
	return (
		<table className="summaryPanel summaryPanel-wide">
			<caption className="summaryPanel-title">Blogs Summary</caption>
			<tbody>
				{blogs.map((blog: any, idx: number) => (
					<tr key={idx}>
						<th scope="row" className="summaryPanel-label">{blog.title}</th>
						<td className="summaryPanel-data">
							<a href={`/blogs/${blog.title?.replace(' ', '-')}`}>Read entry</a>
							<small>
								{blog.tags?.filter((t: string) => t !== 'all').join(', ')} • {blog.last_update}
							</small>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default BlogsSummary;