
import background   from '../../assets/images/backgrounds/cta-four-bg.webp'
import { Link } from 'react-router-dom'
import { t } from "i18next";
import { Trans } from 'react-i18next';

function Contact(){

    return(
        <section className="cta-four">
            <div className="container">
                <div className="cta-four__inner">
                    <div className="cta-four__bg float-bob-x"  style={{ backgroundImage: `url(${background})` }}>
                    </div>
                    <h3 className="cta-four__title">
                        <Trans i18nKey="certificates-contact-title"></Trans>
                    </h3>
                    <div className="cta-four__btn-box">
                        <Link to="/contact" className="cta-four__btn thm-btn">{t('certificates-contact-button')}</Link>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default Contact