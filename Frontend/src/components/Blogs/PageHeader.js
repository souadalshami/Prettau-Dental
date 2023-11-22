
import { Link, useParams } from 'react-router-dom'
import page_header_shape_1 from '../../assets/images/shapes/page-header-shape-1.webp'
import page_header_shape_2 from '../../assets/images/shapes/page-header-shape-2.webp'
import page_header_shape_3 from '../../assets/images/shapes/page-header-shape-3.webp'
import page_header_shape_4 from '../../assets/images/shapes/page-header-shape-4.webp'
import { useEffect, useState } from 'react'
import { t } from "i18next";

function PageHeader(){
    // const {id} = useParams();
    // const [item,setItem]=useState([]);

    // useEffect(()=>{
    //     fetch(`http://localhost/Prettau-Dental/Backend/get_blogs.php/?category_id=${id}`)
    //     .then(res=>res.json())
    //     .then(
    //         (result)=>{
    //         setItem(result)
    //         }
    //     )
    // },[]);

    return(
        <section className="page-header">
            <div className="page-header__bg">
            </div>
            <div className="page-header__shape-1 float-bob-y">
                <img src={page_header_shape_1} alt=""/>
            </div>
            <div className="page-header__shape-2 float-bob-x">
                <img src={page_header_shape_2} alt={t('alt-shape-prettau')}/>
            </div>
            <div className="page-header__shape-3 float-bob-y">
                <img src={page_header_shape_3} alt={t('alt-shape-prettau')}/>
            </div>
            <div className="page-header__shape-4 float-bob-x">
                <img src={page_header_shape_4} alt={t('alt-shape-prettau')}/>
            </div>
            <div className="container">
                <div className="page-header__inner">
   
                            <h2>{t('blogs')}</h2>
                       
                    <ul className="thm-breadcrumb list-unstyled">
                        <li><Link to="/">{t('home')}</Link></li>
                        <li><span className="icon-down-arrow"></span></li>
                       
                            {/* {item.slice(0,1).map((item) => {
                            return (
                                <li>{t('Blogs')} </li>
                            );
                        })} */}
                           
                        {/* <li><span className="icon-down-arrow"></span></li> */}
                        {/* {item.slice(0,1).map((item) => {
                        return ( */}
                            <li>{t('blogs')}</li>
                        {/* );
                    })} */}
                    </ul>
                </div>
            </div>
        </section>
    )

}
export default PageHeader;