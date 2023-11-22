import { useState } from "react";
import { t } from "i18next";
import { ROOT } from "../../config";
import ReCAPTCHA from "react-google-recaptcha";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    recaptchaValue:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  
  const [recaptchaValue, setRecaptchaValue] = useState(""); // Add this state variable
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear the error message when the field value changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the form fields are empty
    if (formData.name === '') {
      setErrors({ ...errors, name: 'Name is required' });
      return;
    }
    if (formData.email === '') {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }
    if (formData.message === '') {
      setErrors({ ...errors, message: 'Message is required' });
      return;
    }
    if (!recaptchaValue) {
        setErrors({ ...errors, message: 'Recaptcha is required' });
      return;
    }
    setIsLoading(true);

    // Send form data to the PHP backend
    fetch(`${ROOT}/send_email.php`, {
      method: 'POST',
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Optional: handle the response from the server
        // Reset the form after successful submission
        setFormData({ name: '', email: '', message: '' ,recaptchaValue:''});
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

    return(
      <section className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="contact-page__left">
                <h3 className="contact-page__title">{t('contact-form-get-in-touch')}</h3>
                <p className="contact-page__sub-title">{t('contact-form-get-in-touch-description')}</p>
                <div className="contact-page__form-box">
                  <div className="contact-page__form contact-form-validated" noValidate="novalidate">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="contact-page__input-box">
                            <h3 className="contact-page__input-title">{t('contact-form-full-name')} *</h3>
                            <input type="text" placeholder={t('person-name')} name="name" id="name" value={formData.name} onChange={handleChange} />
                            {errors.name && <h6 className="error-message">{errors.name}</h6>}
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="contact-page__input-box">
                            <h3 className="contact-page__input-title">{t('contact-form-email')} *</h3>
                            <input type="email" id="email" placeholder={t('contact-form-email-example')} name="email" value={formData.email} onChange={handleChange} />
                              {errors.email && <h6 className="error-message">{errors.email}</h6>}
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="contact-page__input-box">
                            <h3 className="contact-page__input-title">{t('contact-form-number')} </h3>
                            <input type="number" placeholder="+1 (00)" name="Phone" />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="contact-page__input-box text-message-box">
                            <h3 className="contact-page__input-title">{t('contact-form-message')}
                              <span>{t('contact-form-oprional')}</span></h3>
                            <textarea onChange={handleChange} placeholder="Type here..." id="message" name="message" value={formData.message}></textarea>
                            {errors.message && <h6 className="error-message">{errors.message}</h6>}
                          </div>
                        </div>
                        <div className="col-xl-12 mt-4">
                            <ReCAPTCHA
                              sitekey="6LdDvBQpAAAAADBqzOxkCRL07WP4OnB8Gsf_VyiP"
                              onChange={handleRecaptchaChange}
                            />
                        </div>
                        <div className="contact-page__btn-box">
                          <button type="submit" className="thm-btn contact-page__btn position-relative" disabled={isLoading}>
                            {isLoading ? <span className="loader"></span> : <span className="fas fa-paper-plane contact-arrow"></span>}
                            {t('send-message')}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="result"></div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="contact-page__right">
                <iframe  className="google-map__one" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3244.9431744484964!2d45.45351447578311!3d35.57979437262031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDM0JzQ3LjMiTiA0NcKwMjcnMjEuOSJF!5e0!3m2!1sen!2snl!4v1699554384738!5m2!1sen!2snl" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    )

}


export default ContactForm;