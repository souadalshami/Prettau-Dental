

import Fancybox from "../Fancybox.js"; 
 import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import portfolio_1_1 from '../../assets/images/project/portfolio-1-1.jpg'
import shapeone from "../../assets/images/shapes/portfolio-one-shape-1.png"
import shapetwo from "../../assets/images/shapes/portfolio-one-shape-2.png"
import { useEffect, useState } from "react";
import { API_ROOT } from '../../config';

    
const options = {
    // "loop": true,
    "autoplay": true,
    "margin": 30,
    "nav": true,
    "dots": false,
    "smartSpeed": 500,
    "autoplayTimeout": 10000,
    "navText": ["<span className=\"icon-right-arrow\"></span>","<span className=\"icon-right-arrow1\"></span>"],
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
            "items": 4
        }
    }
}


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

    return(
        <section className="portfolio-one" >
            <div className="portfolio-one__shape-1 float-bob-x">
                <img src={shapeone} alt="" />
            </div>
            <div className="portfolio-one__shape-2 rotate-me">
                <img src={shapetwo } alt="" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="" data-wow-delay="100ms">
                        {(
                            <OwlCarousel className="team-carousel thm-owl__carousel owl-theme owl-carousel carousel-dot-style" {...options}>
                                {events.map((events) => {
                                    return(

                                        <div className="portfolio-one__single">
                                            <div className="portfolio-one__img-box">
                                                <div className="portfolio-one__img">
                                                    <img  src={`http://localhost/Prettau-Dental/Backend/${events.path}`} alt="" />
                                                </div>
                                                <div className="portfolio-one__content">
                                                    <p className="portfolio-one__sub-title">{events.title}</p>
                                                </div>
                                                <div className="portfolio-one__arrow">
                                                    <Fancybox>
                                                        <a key={events.name}  data-fancybox="gallery" href={`http://localhost/Prettau-Dental/Backend/${events.path}`} className="img-popup" ><span className="icon-top-right-1"></span></a>
                                                    </Fancybox>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                 })}
                            </OwlCarousel>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )



}
export default EventsSection;
