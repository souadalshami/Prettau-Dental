import Fancybox from "../Fancybox.js"; 
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { API_ROOT } from '../../config';
import { ROOT } from '../../config';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { t } from "i18next";



function VideosSection({ languageId }) { 

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
    
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const apiUrl = `${API_ROOT}/get_videos.php?languageId=${languageId}`;
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setVideos(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, [languageId]);


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
  return ( 
    <section className="team-carousel-page">
      <div className="container">
        {videos.length === 0 ? (
          <div> <h2 className="text-center">{t('no-video')} </h2></div>
        ) : (
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} {...options}>
          {videos.map((videos) => {
            return (
              <SwiperSlide>
                <div className="item">
                  <div className="team-one__single">
                    <Fancybox>
                      <a key={videos.title} data-fancybox href={videos.video_path} >
                        <div className="team-one__img">
                          <img  className="card-img-top img-fluid" src={`${ROOT}${videos.path}`} alt={videos.title}/>
                        </div>
                      </a>                            
                    </Fancybox>
                    <div className="team-one__content">
                      <h6 className="team-one__name">
                        <a href={videos.video_path} target="_blank">{videos.title}</a>
                      </h6>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        )}
      </div>
    </section>
  ); 
}
export default VideosSection;