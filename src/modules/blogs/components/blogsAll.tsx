import blogs from '../../../assets/jsons/blogs.json';
// import ProjectModel from '../../../models/projectModel.ts';
import { Link } from 'react-router-dom';
import '../../projects/components/projectsAll.css';

function BlogsAll( prop : { tag?: string } ){
    let blogsObject:any[] = blogs;
    if (prop.tag == undefined){
        prop.tag == 'all';
    }
    if (prop.tag != 'all'){
        blogsObject = blogsObject.filter((object)=> object.tags?.includes(String(prop.tag)));
    }

    return (
        blogsObject.map((blog, index) => {
            return (
                <Link to={`${blog?.title?.replace(' ','-')}`} key={index}>
                    <div className='projectContainer'>
                        <div> 
                            <img className='projectImage informationPill' src={ (blog.image) ? blog.image : '' }/>
                        </div>
                        <div>
                            <div style={{ margin: '0px 5px' }}>
                                <h2 style={{ margin: '2.5px 0', textTransform: 'uppercase'}}>{ (blog.title) ? blog.title : '' } </h2>
                                <small style={{ color: 'gray', alignItems: "center",display: "flex" }}> { blog?.last_update  } <span style={{padding:"2.5px", backgroundColor: "green", color: "white", marginLeft: "5px", borderRadius: "5px", display: (blog?.project_status == "Maintenance")?"block":"none"}}>Live</span></small>
                            </div>
                            <small>
                                <p className='sdescription'> { (blog.description) ? blog.description : '' } </p>
                            </small>
                        </div>
                    </div>
                </Link>
            )
        })
    )
}

export default BlogsAll;