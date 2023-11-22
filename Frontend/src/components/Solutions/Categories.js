import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_ROOT } from '../../config';
import { ROOT } from '../../config';
import { t } from 'i18next';
import WOW from 'wowjs';

function Categories({ languageId }){
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const apiUrl = `${API_ROOT}/get_solutions.php?languageId=${languageId}&solutionsId=${id}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setSolutions(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching solutions:', error);
        setLoading(false);
      }
    };

    const fetchCategory = async () => {
      try {
        setLoading(true);
        const apiUrl = `${API_ROOT}/get_categories.php?languageId=${languageId}&solutionId=${id}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setCategories(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchSolutions();
    fetchCategory();
  }, [languageId, id]);

  useEffect(() => {
    if (!loading) {
      new WOW.WOW().init();
    }
  }, [loading]);

  return (
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
                  {solutions.map((solution) => (
                    <li key={solution.id}>
                      <Link reloadDocument to={`/solutions/${solution.id}`}>
                        {solution.name} <span className="icon-right-arrow1"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-7">
            {loading ? (
              <div>Loading...</div>
            ) : categories.length === 0 ? (
              <div>
                <h4 className="text-center">{t('no-categories')}</h4>
              </div>
            ) : (
              <div className="row">
                {categories.map((category) => (
                  <div key={category.id} className="col-xl-6 wow fadeInUp" data-wow-delay="200ms">
                    <div className="news-one__single">
                      <div className="news-one__img-box">
                        <div className="news-one__img">
                          <img src={`${ROOT}/${category.path}`} alt="" />
                        </div>
                      </div>
                      <div className="news-one__content">
                        <div className="news-one__content-top">
                          <h3 className="news-one__title">
                            <Link reloadDocument to={`/Categories/${category.id}`}>
                              {category.name}
                            </Link>
                          </h3>
                          <p className="news-one__text">{category.description.substring(0, 100)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;