import '../../projects/components/projectView.css';
import blogs from '../../../assets/jsons/blogs.json';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function BlogsView() {
    const { blogName } = useParams();
    const [loading, setLoading] = useState(true);

    const blogInfo = blogs.find((blog: any) =>
        blog.title.replace(' ', '-').includes(blogName || '')
    );

    useEffect(() => {
        console.log(blogName);
        console.log(blogInfo);
    }, [blogName, blogInfo]);

    if (!blogInfo) {
        return <p>Blog not found.</p>;
    }

    // const warning = (
    //     <>
    //         <span>This website is hosted on a free platform.</span><br />
    //         <span>1) Inactivity: The website may go offline after inactivity.</span><br />
    //         <span>2) Startup Time: May take up to 60 seconds.</span><br />
    //         <span>3) Page Refresh: Refresh to see latest content.</span>
    //     </>
    // );

    return (
        <div className='projectInformationContainer'>
            <div className="navcenter">
                <Link to="/blogs">
                    <span className="x">CLOSE</span>
                </Link>
            </div>

            <div className="projectVideoContainer childGrown">
                {blogInfo.image !== '#' && (
                    <div>
                        {loading && <div id="loader" />}

                        <div style={{ display: 'flex', scrollbarWidth: 'none', overflow: 'scroll', width: "100%", borderRadius: '10px', marginBottom: '10px' }}>
                            {blogInfo.display_images?.map((image: string, index: number) => (
                                <img
                                    key={index}
                                    onLoad={() => setLoading(false)}
                                    style={{
                                        maxWidth: '350px',
                                        maxHeight: '350px',
                                        width: "100%",
                                        borderRadius: '10px',
                                        margin: '10px',
                                        display: loading ? 'none' : 'block'
                                    }}
                                    src={image}
                                    alt={`blog-${index}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', margin: "10px 5px" }}>
                    <div>
                        <h5 className="card-text m-0">
                            {blogInfo.title.toUpperCase()}
                        </h5>
                        <small className="text-muted">
                            last updated: {blogInfo.last_update}
                        </small>
                    </div>
                </div>

                <div style={{ margin: '0 5px' }}>
                    {blogInfo.description?.map((sentence: string, index: number) => (
                        <p key={index} className="text-muted p-2">
                            {sentence}
                        </p>
                    ))}

                    {blogInfo.timeline?.map((item: any, index: number) => (
                        <div key={index}>
                            <h5 className="dateContainer">{item.title}</h5>
                            <div style={{ display: "grid", gridTemplateColumns: "0.5fr 10fr" }}>
                                <div className="timelineBody" />
                                <p className="p-2">{item.description}</p>
                            </div>
                        </div>
                    ))}

                    {
                        blogInfo.people_mentioned?.length > 0 && (
                            <div>
                                <h4 className="dateContainer">People Mentioned</h4>
                                <div style={{ display: 'flex', overflowX: 'scroll', scrollbarWidth: 'none' }}>
                                    {
                                        blogInfo.people_mentioned.map((person: any, index: number) => (
                                            <div key={index} style={{ margin: '0.25rem', padding: '0.25rem', minWidth: '150px', textAlign: 'center' }}>
                                                <a href={person.socials[0].link} target="_blank" rel="noopener noreferrer">
                                                    <span className="personName">{person.name}</span>
                                                </a>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default BlogsView;