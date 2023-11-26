
import services_one_shape_3 from '../../assets/images/shapes/services-one-shape-3.webp'
import services_one_shape_4 from '../../assets/images/shapes/services-one-shape-4.webp'
import background from '../../assets/images/services/services-one-hover-img-black.webp'

import WOW from 'wowjs';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { t } from "i18next";
import { Trans } from 'react-i18next';
import i18n from 'i18next';

import { API_ROOT } from '../../config';

function Solutions({ languageId }){

    const { id } = useParams();
    const [solution, setSolution] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiUrl = `${API_ROOT}/get_solutions.php?languageId=${languageId}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setSolution(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    useEffect(() => {
        fetchData();
      }, [languageId, id]);

    useEffect(() => { 
        new WOW.WOW({ live: false
        }).init(); }, [])


    return(
        <section className="services-one">
            <div className="services-one__shape-3 zoominout">
                <img src={services_one_shape_3} alt=""/>
            </div>
            <div className="services-one__shape-4 shape-mover">
                <img src={services_one_shape_4} alt=""/>
            </div>
            <div className="container">
                <div className="section-title text-center">
                    <div className="section-title__tagline-box">
                        <p className="section-title__tagline"> {t('home-Products-section-name')} </p>
                    </div>
                    <h2 className="section-title__title">
                        <Trans i18nKey="home-Products-title"></Trans>

                    </h2>
                </div>
                <div className="row">
                {solution.slice(0,6).map((solution) => {
                     return (
                        <div key={solution.id} className={`col-xl-4 col-lg-6 col-md-6 ${i18n.language == "1" ? "wow fadeInLeft" : "wow fadeInRight"} `} data-wow-delay="100ms">
                            <div className="services-one__single">
                                <div className="services-one__single-hover-bg" style={{ backgroundImage: `url(${background})` }}></div>
                                <div className="services-one__content">
                                    <h3 className="services-one__title"><Link reloadDocument to={`/solutions/${solution.id}`}>{solution.name}</Link></h3>
                                    <p className="services-one__text"> {solution.description}</p>
                                    <div className="services-one__read-more">
                                        <Link reloadDocument to={`/solutions/${solution.id}`} >  {t('learn-more')}  <span className="icon-right-arrow1"></span> </Link>
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

export default Solutions;