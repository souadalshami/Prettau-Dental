import { useEffect, useState } from "react";
import { API_ROOT } from '../../config';
import { API_IMAGE_ROOT } from '../../config';
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

function Brand({ languageId }){

  const { id } = useParams();
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const apiUrl = `${API_ROOT}/get_brands.php?languageId=${languageId}`;
      const response = await fetch(apiUrl);
      const jsonData = await response.json();
      setBrand(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchData();
    }, []);
    

  const options = {
    slidesPerView: 4,
    spaceBetween: 30,
    grabCursor: true,
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
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  };

  return(
    <section className="brand-one">
      <div className="container">
        <div className="brand-one__inner">
          <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} {...options}>
            {brand.map((brand) => {
              return (
                <SwiperSlide>
                  <div key={brand.id} className="brand-one__single">
                    <div  key={brand.path} className="brand-one__img">
                      <a href={brand.brand_path} target="_blank">
                        <img src={`${API_IMAGE_ROOT}${brand.path}`}alt=""/>
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )

}

export default Brand;