import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect, useState } from "react";
import { API_ROOT } from '../../config';
import { useParams } from 'react-router-dom'

const options = {
    "items": 3,
    "margin": 30,
    "smartSpeed": 700,
    "loop":true,
    "autoplay": 6000,
    "nav":false,
    "dots":false,
    "navText": ["<span class=\"fa fa-angle-left\"></span>","<span class=\"fa fa-angle-right\"></span>"],
    "responsive":{
        "0":{
            "items":1
        },
        "768":{
            "items":3
        },
        "992":{
            "items": 4
        },
        "1200":{
            "items": 5
        }
    }
}

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
      }, [languageId, id]);

    return(
        <section className="brand-one brand-three">
            <div className="container">
                <div className="brand-one__inner">
                    <OwlCarousel className="brand-one__carousel thm-owl__carousel owl-theme owl-carousel" {...options}>
                        {brand.map((brand) => {
                            return (
                                <div className="brand-one__single">
                                    <div  key={brand.path} className="brand-one__img">
                                        <a href={brand.path} target="_blank">
                                            <img src={`http://localhost/Prettau-Dental/Backend/${brand.path}`}alt=""/>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </OwlCarousel>
                </div>
            </div>
        </section>
    )
}
export default Brand;