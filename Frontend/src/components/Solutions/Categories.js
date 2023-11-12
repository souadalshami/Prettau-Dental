
import { useEffect, useState } from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import { API_ROOT } from '../../config';
import { API_IMAGE_ROOT } from '../../config';
import { t } from "i18next";



function Categories({ languageId }){
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [solutions, setSolutions] = useState([]);
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
                                            <li><Link reloadDocument to={`/solutions/${solutions.id}`}> {solutions.name} <span className="icon-right-arrow1"></span></Link></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-8 col-lg-7">

                        <div className="row">
                            {categories.map((categories) => {
                                return(
                                    <div className="col-xl-6 wow fadeInLeft" data-wow-delay="100ms">
                                        <div className="news-one__single">
                                            <div className="news-one__img-box">
                                                <div className="news-one__img">
                                                    <img src={`${API_IMAGE_ROOT}/${categories.path}`} alt=""/>
                                                </div>
                                            </div>
                                            <div className="news-one__content">
                                                <div className="news-one__content-top">
                                                    <h3 className="news-one__title"><Link reloadDocument to={`/Categories/${categories.id}`}>{categories.name}</Link></h3>
                                                    <p className="news-one__text">{categories.description}</p>
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
export default Categories;