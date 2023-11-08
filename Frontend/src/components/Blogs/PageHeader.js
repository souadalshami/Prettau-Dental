
import { Link, useParams } from 'react-router-dom'
import page_header_shape_1 from '../../assets/images/shapes/page-header-shape-1.png'
import page_header_shape_2 from '../../assets/images/shapes/page-header-shape-2.png'
import page_header_shape_3 from '../../assets/images/shapes/page-header-shape-3.png'
import page_header_shape_4 from '../../assets/images/shapes/page-header-shape-4.png'
import { useEffect, useState } from 'react'

function PageHeader(){
    const {id} = useParams();
    const [item,setItem]=useState([]);

    useEffect(()=>{
        fetch(`http://localhost/Prettau-Dental-lab/Backend/api_blog_category.php/?category_id=${id}`)
        .then(res=>res.json())
        .then(
            (result)=>{
            setItem(result)
            }
        )
    },[]);

    return(
        <section class="page-header">
            <div class="page-header__bg">
            </div>
            <div class="page-header__shape-1 float-bob-y">
                <img src={page_header_shape_1} alt=""/>
            </div>
            <div class="page-header__shape-2 float-bob-x">
                <img src={page_header_shape_2} alt=""/>
            </div>
            <div class="page-header__shape-3 float-bob-y">
                <img src={page_header_shape_3} alt=""/>
            </div>
            <div class="page-header__shape-4 float-bob-x">
                <img src={page_header_shape_4} alt=""/>
            </div>
            <div class="container">
                <div class="page-header__inner">
                    {item.slice(0,1).map((item) => {
                        return (
                            <h2>{item.title}</h2>
                        );
                    })}
                    <ul class="thm-breadcrumb list-unstyled">
                        <li><Link to="/">Home</Link></li>
                        <li><span class="icon-down-arrow"></span></li>
                       
                            {item.slice(0,1).map((item) => {
                            return (
                                <li><Link reloadDocument to={`/CategoriesBlog/${id}`}> {item.category_name}</Link> </li>
                            );
                        })}
                           
                        <li><span class="icon-down-arrow"></span></li>
                        {item.slice(0,1).map((item) => {
                        return (
                            <li>{item.title}</li>
                        );
                    })}
                    </ul>
                </div>
            </div>
        </section>
    )

}
export default PageHeader;