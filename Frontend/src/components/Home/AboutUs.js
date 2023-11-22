import { Link } from 'react-router-dom'
import { t } from "i18next";
import i18n from 'i18next';
import WOW from 'wowjs';
import { useEffect } from 'react'

import about_shape1 from '../../assets/images/shapes/about-one-shape-1.webp'
import about_shape2 from '../../assets/images/shapes/about-one-shape-2.webp'
import about_shape3 from '../../assets/images/shapes/about-one-shape-3.webp'
import about_shape4 from '../../assets/images/shapes/about-one-shape-4.webp'
import about_one from '../../assets/images/resources/about-one-img-1.webp'
import about_two from '../../assets/images/resources/about-one-img-2.webp'




function AboutUs(){
    useEffect(() => { 
        new WOW.WOW({ live: false
        }).init(); }, [])
        
    return(
        <section className="about-one">
            <div className="about-one__shape-3 float-bob-y">
                <img src={about_shape3} alt={t('alt-shape-prettau')}/>
            </div>
            <div className="about-one__shape-4 img-bounce">
                <img src={about_shape4} alt={t('alt-shape-prettau')}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-one__left">
                            <div className={`about-one__img-box  ${i18n.language == "1" ? "wow slideInLeft" : "wow slideInRight"}`} data-wow-delay="100ms"
                                data-wow-duration="2500ms">
                                <div className="about-one__img">
                                    <img src={about_one} alt={t('alt-shape-prettau')}/>
                                </div>
                                <div className="about-one__img-2">
                                    <img src={about_two} alt="Prettau Dental Building"/>
                                </div>
                                <div className="about-one__shape-1 float-bob-x">
                                    <img src={about_shape1} alt={t('alt-shape-prettau')}/>
                                </div>
                                <div className="about-one__shape-2 float-bob-y">
                                    <img src={about_shape2} alt={t('alt-shape-prettau')}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-one__right">
                            <div className="section-title text-left">
                                <div className="section-title__tagline-box">
                                    <p className="section-title__tagline">{t('about')}</p>
                                </div>
                                <h2 className="section-title__title">{t('home-about-title')}</h2>
                            </div>
                            <p className="about-one__text">{t('home-about-description')}
                            </p>
                            <ul className="about-one__points list-unstyled">
                                <li>
                                    <div className="icon">
                                        <span className="icon-check"></span>
                                    </div>
                                    <div className="text">
                                        <p>{t('home-about-first-check')}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-check"></span>
                                    </div>
                                    <div className="text">
                                        <p>{t('home-about-second-check')}</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="about-one__btn-box">
                                <Link to="/about" className="about-one__btn thm-btn">{t('home-about-button')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default AboutUs;