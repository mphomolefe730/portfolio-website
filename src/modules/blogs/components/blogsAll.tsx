import blogs from '../../../assets/jsons/blogs.json';
import { Link } from 'react-router-dom';
import '../../../styles/musicCard.css';

function BlogsAll( prop : { tag?: string } ){
    let blogsObject:any[] = blogs;
    if (prop.tag == undefined){
        prop.tag == 'all';
    }
    if (prop.tag != 'all'){
        blogsObject = blogsObject.filter((object)=> object.tags?.includes(String(prop.tag)));
    }

    return (
        <div className='cardGrid'>
            {blogsObject.map((blog, index) => {
                const badgeCategory = blog.tags?.find((t: string) => t !== 'all') ?? 'blog';
                const hasImage = blog.image && blog.image !== '#';

                return (
                    <Link
                        to={`${blog?.title?.replace(' ', '-')}`}
                        key={index}
                        className={`musicCard${hasImage ? '' : ' noImage'}`}
                    >
                        {hasImage && (
                            <img className='musicCardImage' src={blog.image} alt={blog.title} />
                        )}
                        <div className='musicCardScrim' />
                        <div className='musicCardBadge'>MM</div>
                        <div className='musicCardText'>
                            <p className='musicCardCategory'>{badgeCategory}</p>
                            <h3 className='musicCardTitle'>{blog.title}</h3>
                            <p className='musicCardDescription'>{blog.description?.[0]}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    )
}

export default BlogsAll;