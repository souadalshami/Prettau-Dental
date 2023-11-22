import { useState ,useEffect} from "react";
import { Link, Route, useParams } from 'react-router-dom';
import { API_ROOT } from '../../config';
import { t } from "i18next";
import { ROOT } from '../../config';
import he from 'he';

function Blogs({languageId}){

    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [solutions, setSolutions] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchSolutions = async () => {
        try {
          setLoading(true);
          const apiUrl = `${API_ROOT}/get_solutions.php?languageId=${languageId}&solutionsId=${id}`;
          const response = await fetch(apiUrl);
          const jsonData = await response.json();
          setSolutions(jsonData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      useEffect(() => {
            fetchSolutions();
        }, [languageId, id]);




    const fetchCategory = async () => {
      try {
        setLoading(true);
        const apiUrl = `${API_ROOT}/get_categories.php?languageId=${languageId}&solutionId=${id}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setCategories(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    useEffect(() => {
        fetchCategory();
      }, [languageId, id]);



      const fetchBlogs = async () => {
        try {
          setLoading(true);
          const apiUrl = `${API_ROOT}/get_blogs.php?languageId=${languageId}&categoryId=${id}`;
          const response = await fetch(apiUrl);
          const jsonData = await response.json();
          const decodedBlogs = jsonData.map((blog) => ({...blog,
            content: he.decode(blog.content),
          }));
          setBlogs(decodedBlogs);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      useEffect(() => {
            fetchBlogs();
        }, [languageId, id]);





      
    return(
        <section className="news-left">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-lg-5">
                        <div className="sidebar sidebar--two">
                            <div className="sidebar__single sidebar__category">
                                <div className="sidebar__title-box">
                                    <h3 className="sidebar__title">{t('solutions')}</h3>
                                </div>
                                <ul className="sidebar__category-list list-unstyled">
                                    {solutions.map((solutions) => {
                                        return (
                                            <li key={solutions.id}><Link reloadDocument to={`/solutions/${solutions.id}`}> {solutions.name} <span className="icon-right-arrow1"></span></Link></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        {/* <div className="sidebar sidebar--two">
                            <div className="sidebar__single sidebar__category">
                                <div className="sidebar__title-box">
                                    <h3 className="sidebar__title">{t('categories')}</h3>
                                </div>
                                <ul className="sidebar__category-list list-unstyled">
                                    {categories.map((categories) => {
                                        return (
                                            <li><Link reloadDocument to={`/blogs/${categories.id}`}> {categories.name} <span className="icon-right-arrow1"></span></Link></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div> */}
                    </div>

                    <div className="col-xl-8 col-lg-7">

                        <div className="row">
                            {blogs.map((blogs) => {
                                return(
                                    <div key={blogs.id} className="col-xl-6 wow fadeInLeft" data-wow-delay="100ms">
                                        <div className="news-one__single">
                                            <div className="news-one__img-box">
                                                <div className="news-one__img">
                                                    <img src={`${ROOT}${blogs.path}`} alt=""/>
                                                </div>
                                            </div>
                                            <div className="news-one__content">
                                                <div className="news-one__content-top">
                                                    <h3 className="news-one__title"><Link reloadDocument to={`/Blogs/${blogs.category_id}/${blogs.blog_id}`}>{blogs.title}</Link></h3>
                                                    <p className="news-one__text" dangerouslySetInnerHTML={{ __html: blogs.content.substring(0, 100) }}></p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default Blogs;