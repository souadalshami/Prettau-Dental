import news_one_shape_1 from '../../assets/images/shapes/news-one-shape-1.png'
import news_one_shape_2 from '../../assets/images/shapes/news-one-shape-2.png'
import news_one_shape_3 from '../../assets/images/shapes/news-one-shape-3.png'
import news_1_1 from '../../assets/images/blog/news-1-1.jpg';
import { Link ,useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { t } from "i18next";
import { Trans } from 'react-i18next';
import { API_ROOT } from '../../config';
import { API_IMAGE_ROOT } from '../../config';

function Blogs({ languageId }){
    

      const { id } = useParams();
      const [blog, setBlog] = useState([]);
      const [loading, setLoading] = useState(false);
      
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const apiUrl = `${API_ROOT}/get_latest_blogs.php?languageId=${languageId}`;
          const response = await fetch(apiUrl);
          const jsonData = await response.json();
          setBlog(jsonData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      useEffect(() => {
            fetchBlog();
        }, [languageId, id]);







    return(
        <section className="news-one">
            <div className="news-one__shape-1 img-bounce">
                <img src={news_one_shape_1} alt=""/>
            </div>
            <div className="news-one__shape-2 float-bob-y">
                <img src={news_one_shape_2} alt=""/>
            </div>
            <div className="news-one__shape-3 rotate-me">
                <img src={news_one_shape_3} alt=""/>
            </div>
            <div className="container">
                <div className="section-title text-center">
                    <div className="section-title__tagline-box">
                        <p className="section-title__tagline">{t('home-blogs-section-name')}</p>
                    </div>
                    <h2 className="section-title__title"><Trans i18nKey="home-blogs-title"></Trans></h2>
                </div>
                <div className="row">

                    {blog.slice(0,3).map((blog) => {
                     return (
                        <div key={blog.id} className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="100ms">
                            <div className="news-one__single">
                                <div className="news-one__img-box">
                                    <div className="news-one__img">
                                        <img src={`${API_IMAGE_ROOT}${blog.path}`} alt=""/>
                                    </div>
                                </div>
                                <div className="news-one__content">
                                    <div className="news-one__content-top">
                                        <p className="news-one__sub-title">{blog.name}</p>
                                        <h3 className="news-one__title"><Link reloadDocument to={`/Blogs/${blog.category_id}`}>{blog.title}</Link></h3>
                                        <p className="news-one__text">{blog.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                     
                })}
                </div>
            </div>
        </section>
    )

}

export default Blogs;