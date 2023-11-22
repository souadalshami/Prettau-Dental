
import background   from '../../assets/images/main-slide.webp'
import { Link } from 'react-router-dom';
import Fancybox from "../Fancybox.js"; 
import { t } from "i18next";
import { Trans } from 'react-i18next';

function MainSlider(){

    return(
        <section className="main-slider">
            <div className="image-container">
                <img src={background} alt="Prettau Dental Laboratory Building"/>
                <div className="overlay"></div>
                <div className="text-container">
                    <h2 className="main-title">{t('home-mainSlider-title-row-one')} <br/>{t('home-mainSlider-title-row-two')}</h2>
                    <p className="main-text">
                        <Trans i18nKey="home-mainSlider-description"></Trans>
                    </p>
                    <div className="main__btn-and-video-box">
                        <div className="main__btn-box">
                            <Link to="/contact" className="thm-btn main__btn">{t('home-mainSlider-button')}</Link>
                        </div>
                        <div className="main-slider__video-link">
                        <Fancybox>
                        <a data-fancybox href="https://www.youtube.com/watch?v=tiSiJ-8y6J8" className="video-popup">
                                <div className="main-slider__video-icon">
                                    <span className="fa fa-play"></span>
                                    <i className="ripple"></i>
                                </div>
                            </a>
                            <h4 className="main-slider__video-text">{t('home-mainSlider-video-button')}</h4>
                        </Fancybox>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default MainSlider;