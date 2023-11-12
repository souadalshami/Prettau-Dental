
import { useState } from "react";
import axios from "axios"
import { t } from "i18next";


function ContactForm(){

    const[name,setname] =useState('');
    const[email,setEmail] =useState('');
    const handleSubmit = () =>{
        if(name.length === 0 ){
            alert("Name has left blank !")
        }
        else if (email.length===0){
            alert ("email has left blank ")
        }
        else {
            const url="http://localhost/dashboard/backend/enquire.php";
            let fData = new FormData;
            fData.append('name' , name);
            fData.append('email' , email);

            axios.post(url,fData)
            .then(response => alert(response.data))
            .catch(error=>alert(error));
        }
    }

    return(
        <section className="contact-page">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="contact-page__left">
                            <h3 className="contact-page__title">{t('contact-form-get-in-touch')}</h3>
                            <p className="contact-page__sub-title">{t('contact-form-get-in-touch-description')}</p>
                            <div className="contact-page__form-box">
                                <div 
                                    className="contact-page__form contact-form-validated" novalidate="novalidate">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="contact-page__input-box">
                                                <h3 className="contact-page__input-title">{t('contact-form-full-name')} *</h3>
                                                <input type="text" placeholder={t('person-name')} name="name"  value={name}  onChange={ (e)=> setname(e.target.value)  } required/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="contact-page__input-box">
                                                <h3 className="contact-page__input-title">{t('contact-form-email')} *</h3>
                                                <input type="email" placeholder={t('contact-form-email-example')}  name="email"  value={email}  onChange={ (e)=> setEmail(e.target.value)  }  />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="contact-page__input-box">
                                                <h3 className="contact-page__input-title">{t('contact-form-number')} *</h3>
                                                <input type="text" placeholder="+1 (00)" name="Phone" required/>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="contact-page__input-box text-message-box">
                                                <h3 className="contact-page__input-title">{t('contact-form-message')}
                                                    <span>{t('contact-form-oprional')}</span></h3>
                                                <textarea name="message" placeholder="Type here..."></textarea>
                                            </div>
                                            <div className="contact-page__btn-box">
                                                <button type="submit"className="thm-btn contact-page__btn position-relative" onClick={handleSubmit} > <span className="fas fa-paper-plane contact-arrow"></span>{t('send-message')} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="result"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="contact-page__right">
                            <iframe  className="google-map__one" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3244.9431744484964!2d45.45351447578311!3d35.57979437262031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDM0JzQ3LjMiTiA0NcKwMjcnMjEuOSJF!5e0!3m2!1sen!2snl!4v1699554384738!5m2!1sen!2snl" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}


export default ContactForm;