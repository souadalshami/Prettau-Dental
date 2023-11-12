
import  site_footer_two_shape_1  from '../../assets/images/shapes/site-footer-two-shape-1.webp'
import site_footer_two_shape_2 from '../../assets/images/shapes/site-footer-two-shape-2.webp'
import logo from '../../assets/images/logo/white.webp'
import { Link ,useParams} from 'react-router-dom';
import WOW from 'wowjs';
import { useEffect, useState } from 'react';
import { t } from "i18next";
import { Trans } from 'react-i18next';
import { API_ROOT } from '../../config';


function PageFooter({ languageId }){
    const phoneNumber = "+964 770 037 2464";
    const { id } = useParams();
    const [solution, setSolution] = useState([]);
    const [loading, setLoading] = useState(false);
    const [blog,setBlog]=useState([])
    
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



      const fetchBlog = async () => {
        try {
          setLoading(true);
          const apiUrl = `${API_ROOT}/get_latest_blogs.php?languageId=${languageId}`;
          const response = await fetch(apiUrl);
          const jsonData = await response.json();
          setBlog(jsonData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      useEffect(() => {
            fetchBlog();
        }, [languageId, id]);

      useEffect(() => {
        new WOW.WOW({
          live: false
        }).init();
      }, [])
  
    
    return(
        <footer className="site-footer-two site-footer-four">
            <div className="site-footer-two__shape-1 img-bounce">
                <img src={site_footer_two_shape_1} alt=""/>
            </div>
            <div className="site-footer-two__shape-2 zoominout">
                <img src={site_footer_two_shape_2} alt=""/>
            </div>
            <div className="container">
                <div className="site-footer-two__top">
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                            <div className="footer-widget-two__column footer-widget-two__about">
                                <div className="footer-widget-two__logo">
                                    <Link to="/"><img src={logo} alt=""   /></Link>
                                </div>
                                <p className="footer-widget-two__about-text"><Trans i18nKey="footer-description"></Trans></p>
                                <div className="site-footer-two__social">
                                    <a href="https://www.youtube.com/channel/UCfTmPFfWHlAIOwnlLMa7igw" target="_blank"><i className="fab fa-youtube"></i></a>
                                    <a href="https://www.facebook.com/Prettau-Lumineer-127597173974796/" target="_blank"><i className="fab fa-facebook"></i></a>
                                    <a href="https://www.instagram.com/prettau_premium?igshid=MzMyNGUyNmU2YQ==" target="_blank"><i className="fab fa-instagram"></i></a>
                                    <a href="https://t.me/rrettau2011" target="_blank"><i className="fab fa-telegram"></i></a>
                                    <a href="https://www.tiktok.com/@prettnoujes?_t=8hDjhK201XZ&_r=1" target="_blank"><i className="fab fa-tiktok"></i></a>
                                    <a href="https://invite.viber.com/?g2=AQAulJ%2F1N9jkKk1HcFF7rtsLE6gIMc8MTfwBW7brjwzM3YMx9UvGXWZTDVqWmkxh" target="_blank"><i className="fab fa-viber"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                            <div className="footer-widget-two__column footer-widget-two__company">
                                <div className="footer-widget-two__title-box">
                                    <h3 className="footer-widget-two__title">{t('solutions')}</h3>
                                </div>
                                <ul className="footer-widget-two__company-list list-unstyled">
                                    {solution.map((solution) => { 
                                        return (
                                            <li><Link reloadDocument to={`/solutions/${solution.id}`}> {solution.name}</Link></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                            <div className="footer-widget-two__column footer-widget-two__company">
                                <div className="footer-widget-two__title-box">
                                    <h3 className="footer-widget-two__title">{t('footer-latest-blog')}</h3>
                                </div>
                                <ul className="footer-widget-two__company-list list-unstyled">
                                    {blog.slice(0,6).map((blog) => { 
                                        return (
                                            <li key={blog.id}><Link reloadDocument to={`/Blogs/${blog.category_id}`}> {blog.title}</Link></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                            <div className="footer-widget-two__column footer-widget-two__contact">
                                <div className="footer-widget-two__title-box">
                                    <h3 className="footer-widget-two__title">{t('footer-contact-info')}</h3>
                                </div>
                                <ul className="footer-widget-two__contact-list list-unstyled">
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
                                        <p><a href="tel:+9647700372464"><bdi>{phoneNumber}</bdi></a></p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-envelope"></span>
                                        </div>
                                        <p><a href="mailto:Prettau.ptrettau@gmail.com">Prettau.ptrettau@gmail.com</a></p>
                                    </li>
                                </ul>
                                <div className="footer-widget-two__work-time">
                                    <div className="footer-widget-two__title-box">
                                        <h3 className="footer-widget-two__title">{t('footer-working-time')}</h3>
                                    </div>
                                    <p className="footer-widget-two__work-time-text">{t('open_time')} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer-two__bottom">
                <div className="container">
                    <div className="site-footer-two__bottom-inner">
                        <p className="site-footer__bottom-text">{t('footer-Copyright')}</p>
                    </div>
                </div>
            </div>
        </footer>
    )
     
}

export default PageFooter;