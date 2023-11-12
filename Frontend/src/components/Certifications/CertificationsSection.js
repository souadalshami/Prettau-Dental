import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css"
import Fancybox from "../Fancybox"; 
import { useEffect, useState } from "react";
import { API_ROOT } from '../../config';
import { API_IMAGE_ROOT } from '../../config';
import { Trans } from 'react-i18next';
import { t } from "i18next";

const options = {
    // "loop": true,
    // "autoplay": true,
    "margin": 30,
    "nav": true,
    "dots": false,
    "smartSpeed": 500,
    "autoplayTimeout": 10000,
    "navText": ["<span class=\"icon-right-arrow\"></span>","<span class=\"icon-right-arrow1\"></span>"],
    "responsive": {
        "0": {
            "items": 1
        },
        "768": {
            "items": 2
        },
        "992": {
            "items": 3
        },
        "1200": {
            "items": 3
        }
    }
}

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
                           
                                <OwlCarousel className="team-two__carousel owl-carousel owl-theme thm-owl__carousel" {...options}>
                                    {certifications.map((certifications) => {
                                     return (
                                        <div className="item">
                                            <div className="team-two__single">                  
                                                <Fancybox>
                                                    <a  key={certifications.name} data-fancybox href={`${API_IMAGE_ROOT}/${certifications.path}`} className="img-popup" >
                                                        <div className="team-two__img-box">
                                                            <div className="team-two__img">
                                                                <img src={`${API_IMAGE_ROOT}${certifications.path}`}alt=""/>
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
                                    );      
                                    })}
                                </OwlCarousel>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default CertificationsSection