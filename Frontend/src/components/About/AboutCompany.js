
import about_two_shape_2 from '../../assets/images/shapes/about-two-shape-2.webp'
import about_two_shape_3 from '../../assets/images/shapes/about-two-shape-3.webp'
import about_two_img_1 from '../../assets/images/resources/about-two-img-1.webp'
import about_two_img_2 from '../../assets/images/resources/about-two-img-2.webp'
import about_two_img_3 from '../../assets/images/resources/about-two-img-3.webp'
import CountUp from "react-countup";
import Fancybox from "../Fancybox"; 
import WOW from 'wowjs';
import { useEffect } from 'react'
import { t } from "i18next";
import { Trans } from 'react-i18next';
import i18n from 'i18next';

function AboutCompany(){
    useEffect(() => { 
        new WOW.WOW({ live: false
        }).init(); }, [])

    return(
        <section className="about-two">
            <div className="about-two__shape-2 zoominout">
                <img src={about_two_shape_2} alt={t('alt-shape-prettau')}/>
            </div>
            <div className="about-two__shape-3 float-bob-y">
                <img src={about_two_shape_3} alt={t('alt-shape-prettau')}/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="about-two__left">
                            <h3 className="about-two__title">{t('about-solution-one-title')}</h3>
                            <p className="about-two__text">{t('about-solution-one-description')}</p>
                            <ul className="about-two__points list-unstyled">
                                <li>
                                    <div className="about-two__count count-box">
                                        <h3 className="count-text" data-stop="10" data-speed="1500">
                                            <CountUp
                                                end={23}
                                                duration={23}
                                                enableScrollSpy
                                                scrollSpyOnce
                                            /></h3>
                                    </div>
                                    <p><Trans i18nKey="about-solution-experience"></Trans></p>
                                </li>
                                <li>
                                    <div className="about-two__count count-box">
                                        <h3 className="count-text" data-stop="800" data-speed="3000">
                                            <CountUp
                                                end={80}
                                                duration={32}
                                                suffix="0"
                                                enableScrollSpy
                                                scrollSpyOnce
                                            />
                                        </h3>
                                        <span>+</span>
                                    </div>
                                    <p> <Trans i18nKey="about-counter-Successful"></Trans> </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="about-two__right">
                            <div className={`about-two__img  ${i18n.language == "1" ? "wow slideInRight" : "wow slideInLeft"}`} data-wow-delay="100ms"
                                data-wow-duration="2500ms">
                                <div className="about-two__shape-1 img-bounce">
                                    <img src={about_two_shape_2}  alt={t('alt-shape-prettau')}/>
                                </div>
                                <img src={about_two_img_1} alt={t('alt-prettau-building')}/>
                                <div className="about-two__video-link">
                                <Fancybox>
                                    <a data-fancybox href="https://www.youtube.com/watch?v=tiSiJ-8y6J8" className="video-popup">
                                        <div className="services-details__video-icon">
                                            <span className="fa fa-play"></span>
                                            <i className="ripple"></i>
                                        </div>
                                    </a>
                                    </Fancybox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <h3 className="services-details__title-1">{t('about-solution-two-title')}</h3>
                        <p className="services-details__text-1">
                            {t('about-solution-two-description')}
                        </p>
                        <div className="services-details__img-and-feature">
                            <div className="services-details__feature-img">
                                <img src={about_two_img_2} alt={t('alt-prettau-event')}/>
                                <div className="services-details__video-link">
                                    
                                
                                </div>
                            </div>
                            <div className="services-details__feature">
                                <h3 className="services-details__feature-title">{t('about-solution-three-title')}</h3>
                                <p className="services-details__feature-text">
                                    <Trans i18nKey="about-solution-three-description"></Trans>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-lg-12">
                        <p className="services-details__text-1">
                            <Trans i18nKey="about-solution-four-description"></Trans>
                        </p>
                        <div className="services-details__img-and-feature">
                            <div className="services-details__feature_two">
                                <h3 className="services-details__feature-title">{t('about-solution-five-title')}</h3>
                                <p className="services-details__feature-text">
                                    <Trans i18nKey="about-solution-five-description"></Trans>
                                </p>
                            </div>
                            <div className="services-details__feature-img">
                                <img src={about_two_img_3} alt={t('alt-prettau-laboratory')} />
                                <div className="services-details__video-link">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutCompany;