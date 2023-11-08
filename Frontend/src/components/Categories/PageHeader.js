
import { Link, useParams } from 'react-router-dom'
import background   from '../../assets/images/backgrounds/page-header-bg.jpg'
import page_header_shape_1   from '../../assets/images/shapes/page-header-shape-1.png'
import page_header_shape_2   from '../../assets/images/shapes/page-header-shape-2.png'
import page_header_shape_3   from '../../assets/images/shapes/page-header-shape-3.png'
import page_header_shape_4   from '../../assets/images/shapes/page-header-shape-4.png'
import { useEffect, useState } from 'react'
import { API_ROOT } from '../../config';
import { t } from "i18next";

function PageHeader({languageId}){
    const {id} = useParams();
    const [categories,setCategories]=useState([]);
    const [loading, setLoading] = useState(false);


  
  
      const fetchCategories = async () => {
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
        if (languageId) {
            fetchCategories();
        }
      }, [languageId]);
    return(
        <section className="page-header">
            <div className="page-header__bg" style={{ backgroundImage: `url(${background})` }}>
            </div>
            <div className="page-header__shape-1 float-bob-y">
                <img src={page_header_shape_1} alt=""/>
            </div>
            <div className="page-header__shape-2 float-bob-x">
                <img src={page_header_shape_2} alt=""/>
            </div>
            <div className="page-header__shape-3 float-bob-y">
                <img src={page_header_shape_3} alt=""/>
            </div>
            <div className="page-header__shape-4 float-bob-x">
                <img src={page_header_shape_4} alt=""/>
            </div>
            <div className="container">
                <div className="page-header__inner">
                {categories.slice(0,1).map((categories) => {
                      return (
                        <h2>{categories.name}</h2>
                    );
                })}
                    <ul className="thm-breadcrumb list-unstyled">
                        <li><Link to="/">{t('home')}</Link></li>
                        <li><span className="icon-down-arrow"></span></li>
                        {categories.slice(0,1).map((categories) => {
                            return (
                                <li>{categories.name}</li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}


export default PageHeader;