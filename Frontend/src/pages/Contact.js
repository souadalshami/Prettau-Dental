


import { useDocumentTitle } from '../setDocumentTitle';
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import gold_logo from '../assets/images/logo/gold.webp';
import { useState ,useEffect} from 'react';
import PageFooter from '../components/layout/PageFooter';
import { API_ROOT } from '../config';
import PageHeader from '../components/Contact/PageHeader';
import Information from '../components/Contact/Information'
import ContactForm from '../components/Contact/ContactForm'


function Contact( ){    
    const phoneNumber = "+964 770 037 2464";
    const [toggle, setToggle] = useState(false)
    const [togglelanguage, setToggleLanguage] = useState(false)
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [color,setColor] = useState(false);
    const { t, i18n } = useTranslation();
    const [solutions, setSolutions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [languageId, setLanguageId] = useState('1');
    const [selectedId, setSelectedId] = useState();
    const handleLanguageChange = (event) => {

      const selectedLanguageId = event.target.value;
      const languageLink = document.getElementById('language-link');

      i18n.changeLanguage(selectedLanguageId);
      document.documentElement.setAttribute('dir', selectedLanguageId === '2' ? 'rtl' : 'ltr');
      const headerElement = document.getElementById('root');
      headerElement.setAttribute('class', selectedLanguageId === '2' ? 'ar' : '');
      // Store the selected language in localStorage
      localStorage.setItem('selectedLanguageId', selectedLanguageId);
      setLanguageId(selectedLanguageId);
      languageLink.innerHTML = selectedLanguageId === '1' ? 'EN' : 'AR';

    };
        useEffect(() => {
        // Retrieve the selected language from localStorage on page load
        const storedLanguageId = localStorage.getItem('selectedLanguageId');
        const initialLanguageId = storedLanguageId || '1'; // Default to '1' if no language is stored
        const languageLink = document.getElementById('language-link');
    
        // Set the initial language
        i18n.changeLanguage(initialLanguageId);
        document.documentElement.setAttribute('dir', initialLanguageId === '2' ? 'rtl' : 'ltr');
        const headerElement = document.getElementById('root');
        headerElement.setAttribute('class', initialLanguageId === '2' ? 'ar' : '');
    
        // Set the initial language in the state
        setLanguageId(initialLanguageId);
        languageLink.innerHTML = initialLanguageId === '1' ? 'EN' : 'AR';

      }, []);
  
        const handleIdChange = (event) => {
        const selectedId = event.target.value;
        setSelectedId(selectedId);
        };
    
        const changeColor = ()=>{
            if(window.scrollY >= 1){
                setColor(true)
    
            }else{
                setColor(false)
            }
        }
    
  
    useEffect(() => {
        if (languageId) {
          fetchData();
        }
      }, [languageId]);
  
  
      const fetchData = async () => {
        try {
          setLoading(true);
          const apiUrl = `${API_ROOT}/get_solutions.php?languageId=${languageId}`;
          const response = await fetch(apiUrl);
          const jsonData = await response.json();
          setSolutions(jsonData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };  
      useEffect(() => {
        document.title = `${t('contact')} || Prettau Dental Lab`;
      }, [t]);
    return(
        <div>
            <header className="main-header">
                <div className="main-header__top">
                    <div className="container">
                        <div className="main-header__top-inner">
                            <div className="main-header__top-left">
                                <ul className="list-unstyled main-header__contact-list">
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <div className="text">
                                            <p>{t('open_time')}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="text">
                                            <p><a href="mailto:help@company.com">Prettau.ptrettau@gmail.com</a>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fas fa-map-marker"></i>
                                        </div>
                                        <div className="text">
                                            <p>{t('location')} </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="main-header__top-right">
                                <div className="main-header__social">
                                    <a href="https://www.youtube.com/channel/UCfTmPFfWHlAIOwnlLMa7igw" target="_blank"><i className="fab fa-youtube"></i></a>
                                    <a href="https://www.facebook.com/Prettau-Lumineer-127597173974796/" target="_blank"><i className="fab fa-facebook"></i></a>
                                    <a href="https://www.instagram.com/prettau_premium?igshid=MzMyNGUyNmU2YQ==" target="_blank"><i className="fab fa-instagram"></i></a>
                                    <a href="https://t.me/rrettau2011" target="_blank"><i className="fab fa-telegram"></i></a>
                                    <a href="https://www.tiktok.com/@prettnoujes?_t=8hDjhK201XZ&_r=1" target="_blank"><i className="fab fa-tiktok"></i></a>
                                    <a href="https://invite.viber.com/?g2=AQAulJ%2F1N9jkKk1HcFF7rtsLE6gIMc8MTfwBW7brjwzM3YMx9UvGXWZTDVqWmkxh" target="_blank"><i className="fab fa-viber"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className={color ? "header-bg main-menu": "header main-menu" }>
                    <div className="main-menu__wrapper">
                        <div className="container">
                            <div className="main-menu__wrapper-inner">
                                <div className="main-menu__logo">
                                    <Link to="/"><img src={gold_logo} alt={t('alt-logo')} /></Link>
                                </div>
                                <div className="main-menu__main-menu-box">
                                    <a href="#" className="mobile-nav__toggler"  onClick={() => setNavbarOpen((prev) => !prev)} ><i className="fa fa-bars"></i></a>
                                    <ul className="main-menu__list" >
                                        <li> 
                                            <NavLink exact="true" to="/"> {t('home')} </NavLink>    
                                        </li> 
                                        <li>
                                            <NavLink  exact="true" to="/about"> {t('about')}</NavLink>
                                        </li>
                                        <li className="dropdown">
                                            <a href="#">{t('solutions')}</a>
                                            <ul className="sub-menu">
                                                {solutions.map((solution) => { 
                                                    return (
                                                        <li key={solution.id}><Link reloadDocument to={`/solutions/${solution.id}`}> {solution.name}</Link></li>
                                                    );
                                                })}
                                            </ul>
                                        </li>

                                        <li>
                                            <NavLink exact="true" to="/Events">{t('events')} </NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact="true" to="/certifications"> {t('certifications')} </NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact="true" to="/videos"> {t('videos')} </NavLink>
                                        </li>
                                        <li>
                                            <NavLink reloadDocument exact="true" to="/contact">{t('contact')}</NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div className="main-menu__right">
                                    <div className="language">
                                        <ul className="main-menu__list">
                                            <li>
                                                <a href="#" id="language-link">EN</a>
                                                <ul className="sub-menu">
                                                    <li>
                                                        <button onClick={handleLanguageChange} value='1'>English</button>
                                                        <button onClick={handleLanguageChange} value='2'>Arabic</button>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="main-menu__call">
                                        <div className="main-menu__call-icon">
                                            <span className="icon-phone"></span>
                                        </div>
                                        <div className="main-menu__call-content">
                                            <p className="main-menu__call-sub-title"> {t('need_help')} </p>
                                            <h5 className="main-menu__call-number">
                                                <a href="tel:+9647700372464"> <bdi>{phoneNumber}</bdi> </a>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="stricky-header stricked-menu main-menu">
                <div className="sticky-header__content"></div>
            </div>

            <div className={`mobile-nav__wrapper${navbarOpen ? ' expanded' : ''}`}>
                <div className="mobile-nav__overlay mobile-nav__toggler"></div>
                <div className="mobile-nav__content">
                    <span className="mobile-nav__close mobile-nav__toggler"  onClick={() => setNavbarOpen(false)}><i className="fa fa-times"></i></span>
                    <div className="logo-box">
                        <a href="index.html" aria-label="logo image"><img src={gold_logo} alt={t('alt-logo')} /></a>
                    </div>
                    <div className="mobile-nav__container">
                        <ul className="main-menu__list">
                            <li className="dropdown current megamenu">
                                <Link to="/"> {t('home')}  </Link>
                            </li>
                            <li className="dropdown current megamenu">
                                <Link to="/about">{t('about')} </Link>
                            </li>
                            <li className="dropdown current megamenu" >
                                <a href="#">{t('solutions')}
                                    <button aria-label="dropdown toggler" className={`${toggle ? 'expanded' : ''}`}  onClick={() => setToggle(!toggle)}><i className="fa fa-angle-down"></i></button>
                                </a>
                                {toggle && (
                                    <ul className={`sub-menu${navbarOpen ? ' d-block' : 'd-none'}`} >
                                        {solutions.map((solution) => { 
                                            return (
                                                <li key={solution.id}><Link reloadDocument to={`/solutions/${solution.id}`}> {solution.name}</Link></li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li> 
                            <li className="dropdown current megamenu">
                                <Link to="/events"> {t('events')} </Link>
                            </li>
                            <li className="dropdown current megamenu">
                                <Link to="/certifications"> {t('certifications')} </Link>
                            </li>    
                            <li className="dropdown current megamenu">
                                <Link to="/videos"> {t('videos')} </Link>
                            </li>    
                            <li className="dropdown current megamenu">
                                <Link to="/contact">{t('contact')}  </Link>
                            </li> 
                              <div className="language">
                    <ul className="main-menu__list">
                        <li className="dropdown current megamenu" >
                            <a href="#" id="language-link"> EN
                                <button aria-label="dropdown toggler" className={`${togglelanguage ? 'expanded' : ''}`}  onClick={() => setToggleLanguage(!togglelanguage)}><i className="fa fa-angle-down"></i></button>
                            </a>
                            {togglelanguage && (
                                <ul className={`sub-menu${navbarOpen ? ' d-block' : 'd-none'}`} >
                                    <li>
                                        <button className="mobile-language-btn" onClick={handleLanguageChange} value='1'>English</button>
                                    </li>
                                    
                                    <li>
                                        <button className="mobile-language-btn"  onClick={handleLanguageChange} value='2'>Arabic</button>
                                    </li>
                                </ul>
                            )}
                        </li> 
                    </ul>
                             </div>    
                        </ul>
                    </div>

                    <ul className="mobile-nav__contact list-unstyled">
                        <li>
                            <i className="fa fa-envelope"></i>
                            <a href="mailto:help@company.com">Prettau.ptrettau@gmail.com</a>
                        </li>
                        <li>
                            <i className="fa fa-phone-alt"></i>
                            <a href="tel:+9647700372464"><bdi>{phoneNumber}</bdi></a>
                        </li>
                    </ul>
                    <div className="mobile-nav__top">
                        <div className="mobile-nav__social">
                            <a href="https://www.youtube.com/channel/UCfTmPFfWHlAIOwnlLMa7igw" target="_blank"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.facebook.com/Prettau-Lumineer-127597173974796/" target="_blank"><i className="fab fa-facebook"></i></a>
                            <a href="https://www.instagram.com/prettau_premium?igshid=MzMyNGUyNmU2YQ==" target="_blank"><i className="fab fa-instagram"></i></a>
                            <a href="https://t.me/rrettau2011" target="_blank"><i className="fab fa-telegram"></i></a>
                            <a href="https://www.tiktok.com/@prettnoujes?_t=8hDjhK201XZ&_r=1" target="_blank"><i className="fab fa-tiktok"></i></a>
                            <a href="https://invite.viber.com/?g2=AQAulJ%2F1N9jkKk1HcFF7rtsLE6gIMc8MTfwBW7brjwzM3YMx9UvGXWZTDVqWmkxh" target="_blank"><i className="fab fa-viber"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <PageHeader/>
            <Information/>
            <ContactForm/>
            <PageFooter languageId={languageId} id={selectedId}/>
        </div>

    )

}
export default Contact;