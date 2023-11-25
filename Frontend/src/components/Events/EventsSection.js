

import Fancybox from "../Fancybox.js"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import shapeone from "../../assets/images/shapes/portfolio-one-shape-1.webp"
import shapetwo from "../../assets/images/shapes/portfolio-one-shape-2.webp"
import { useEffect, useState } from "react";
import { API_ROOT } from '../../config';
import { ROOT } from '../../config';

import WOW from 'wowjs';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { t } from "i18next";

    


function EventsSection({ languageId }){
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const apiUrl = `${API_ROOT}/get_events.php?languageId=${languageId}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setEvents(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    useEffect(() => {
        fetchEvent();
      }, [languageId]);

      useEffect(() => { 
        new WOW.WOW({ live: false
        }).init(); }, 
    [])

    const options = {
        slidesPerView: 3,
        spaceBetween: 30,
        grabCursor: true,
        pagination:{ clickable: true },
        Navigation:true,
        speed: 700,
        loop: true,
        autoplay: {
          delay: 6000,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
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
        <section className="portfolio-one" >
            <div className="portfolio-one__shape-1 float-bob-x">
                <img src={shapeone} alt="" />
            </div>
            <div className="portfolio-one__shape-2 rotate-me">
                <img src={shapetwo } alt="" />
            </div>
            <div className="container">
                <div className="wow fadeInUp" data-wow-delay="100ms">
                  {
                    events.length === 0 ? (
                      <div> <h2 className="text-center"> {t('no-events')} </h2> </div>
                    ) : (
                    <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} {...options}>
                      {events.map((events) => {
                        return(
                          <SwiperSlide key={events.id}>
                            <div className="portfolio-one__single">
                              <div className="portfolio-one__img-box">
                                <div className="portfolio-one__img">
                                  <img  src={`${ROOT}${events.path}`} alt={events.name} />
                                </div>
                                <div className="portfolio-one__content">
                                  <p className="portfolio-one__sub-title">{events.title}</p>
                                </div>
                                <div className="portfolio-one__arrow">
                                  <Fancybox>
                                    <a key={events.name}  data-fancybox="gallery" href={`${ROOT}${events.path}`} className="img-popup" ><span className="icon-top-right-1"></span></a>
                                  </Fancybox>
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
        </section>
    )



}
export default EventsSection;
