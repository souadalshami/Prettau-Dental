import { Link } from 'react-router-dom'
import cta_one_shape_1 from '../../assets/images/shapes/cta-one-shape-1.png'
import cta_one_shape_2 from '../../assets/images/shapes/cta-one-shape-2.png'
import cta_one_shape_3 from '../../assets/images/shapes/cta-one-shape-3.png'
import cta_one_shape_4 from '../../assets/images/shapes/cta-one-shape-4.png'
import { t } from "i18next";
import { Trans } from 'react-i18next';


function Contact(){

    return(
        <section className="cta-one">
            <div className="cta-one__shape-1 float-bob-x">
                <img src={cta_one_shape_1} alt=""/>
            </div>
            <div className="cta-one__shape-2 float-bob-y">
                <img src={cta_one_shape_2} alt=""/>
            </div>
            <div className="cta-one__shape-3 shape-mover">
                <img src={cta_one_shape_3} alt=""/>
            </div>
            <div className="cta-one__shape-4 img-bounce">
                <img src={cta_one_shape_4} alt=""/>
            </div>
            <div className="container">
                <div className="cta-one__inner">
                    <div className="cta-one__title-box">
                        <h3 className="cta-one__title"><Trans i18nKey="home-contact-title"></Trans></h3>
                        <p className="cta-one__text"><Trans i18nKey="home-contact-description"></Trans></p>
                    </div>
                    <div className="cta-one__btn-box">
                        <Link to="/contact" className="cta-one__btn thm-btn">{t('contact-us')}</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contact;