
import Fancybox from "../Fancybox"; 
import { useEffect, useState } from "react";
import { API_ROOT } from '../../config';
import { ROOT } from '../../config';
import { Trans } from 'react-i18next';
import { t } from "i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Scrollbar, A11y,Autoplay } from 'swiper/modules';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';


function CertificationsSection({ languageId }){
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const apiUrl = `${API_ROOT}/get_certifications.php?languageId=${languageId}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setCertifications(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    useEffect(() => {
        fetchEvent();
      }, [languageId]);

      const options = {
        slidesPerView: 3,
        spaceBetween: 30,
        grabCursor: true,
        speed: 700,
        loop: true,
        autoplay: {
          delay: 10000,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
        },
    };
    return(
        <section className="team-two">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="team-two__left">
                            <h3 className="section__title-two">{t('certifications')}</h3>
                            <p className="team-two__text">
                                <Trans i18nKey="certificates-description"></Trans>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="team-two__right">
                        {
                            certifications.length === 0 ? (
                            <div> <h2 className="text-center">{t('no-certifications')} </h2> </div>
                            ) : (
                            <Swiper modules={[Scrollbar, A11y, Autoplay]} {...options} dir="ltr">
                                {certifications.map((certifications) => {
                                    return (
                                        <SwiperSlide key={certifications.id}>
                                            <div className="item">
                                                <div className="team-two__single">                  
                                                    <Fancybox>
                                                        <a  key={certifications.name} data-fancybox href={`${ROOT}/${certifications.path}`} className="img-popup" >
                                                            <div className="team-two__img-box">
                                                                <div className="team-two__img">
                                                                    <img src={`${ROOT}${certifications.path}`}alt=""/>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </Fancybox>
                                                    <div className="team-two__content">
                                                        <div className="team-two__name-box">
                                                            <h3 className="team-two__name">{certifications.title}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );      
                                })}
                            </Swiper>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default CertificationsSection