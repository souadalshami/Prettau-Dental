
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_ROOT } from '../../config';
import { t } from 'i18next';


function BlogDetails({languageId}){
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);


    const fetchBlogs = async () => {
        try {
          setLoading(true);
          const apiUrl = `${API_ROOT}/get_blogs.php?languageId=${languageId}&categoryId=${id}`;
          const response = await fetch(apiUrl);
          const jsonData = await response.json();
          setBlogs(jsonData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      useEffect(() => {
            fetchBlogs();
        }, [languageId, id]);

    return(
        <section className="services-details">
        <div className="container">
            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <div className="services-details__left">
                        <div className="services-details__contact">
                            <h3 className="services-details__contact-title">{t('contact')}</h3>
                            <ul className="services-details__contact-list list-unstyled">
                                <li>
                                    <div className="icon">
                                        <span className="icon-location-1"></span>
                                    </div>
                                    <p>{t('location')}</p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-phone"></span>
                                    </div>
                                    <p><a href="tel:+9647700372464">+964 (770) 037-2464</a></p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-envelope"></span>
                                    </div>
                                    <p><a href="mailto:Prettau.ptrettau@gmail.com">Prettau.ptrettau@gmail.com</a></p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-time"></span>
                                    </div>
                                    <p>{t('open_time')}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-8">
                    <div className="services-details__right">
                    {blogs.map((blogs) => {
                        return (
                            <>
                                <div className="services-details__img">
                                    <div  style={ {width:"100%" }}>
                                        <ReactCompareSlider
                                            itemOne={<ReactCompareSliderImage src={`http://localhost/Prettau-Dental/Backend/${blogs.path}`} srcSet={`http://localhost/Prettau-Dental/Backend/${blogs.path}`} leftlaba alt="Image one" />} 
                                            itemTwo={<ReactCompareSliderImage src={`http://localhost/Prettau-Dental/Backend/${blogs.path2}`} srcSet={`http://localhost/Prettau-Dental/Backend/${blogs.path2}`} alt="Image two" />}
                                        />
                                    </div> 
                                </div>
                                <div>
                                    <h3 className="services-details__title-1">
                                        {blogs.title}
                                    </h3>
                                    <p className="services-details__text-1">{blogs.content}
                                    </p>
                                </div>
                            </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section> 
    )

}
export default BlogDetails;