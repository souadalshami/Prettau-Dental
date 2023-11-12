import Fancybox from "../Fancybox.js"; 
 import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Dubai from '../../assets/images/team/Dubai.jpg';
import { useEffect, useState } from "react";
import { API_ROOT } from '../../config';

const options = {
    // "loop": false,
    "autoplay": true,
    "margin": 30,
    "nav": true,
    "dots": true,
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
            "items": 3
        }
    }
}


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

      useEffect(() => {
        fetchVideos();
      }, []);


return ( 
    <section className="team-carousel-page">
        <div className="container">
        {(
            <OwlCarousel className="team-carousel thm-owl__carousel owl-theme owl-carousel carousel-dot-style" {...options}>
                 {videos.map((videos) => {
                    return (
                        <div className="item">
                            <div className="team-one__single">
                                <Fancybox>
                                    <a key={videos.title} data-fancybox href={videos.path} >
                                        <img  className="card-img-top img-fluid" src={`http://localhost/Prettau-Dental/Backend/${videos.path}`}alt=""/>
                                    </a>                            
                                </Fancybox>
                                <div className="team-one__content">
                                    <h6 className="team-one__name">
                                        <a href={videos.video_path} target="_blank">{videos.title}</a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </OwlCarousel>
        )}
        </div>
    </section>

); 
}
export default VideosSection;