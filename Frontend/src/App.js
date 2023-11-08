
import React ,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import "./assets/css/style.css";
import './assets/vendors/animate/animate.min.css'
import './assets/vendors/animate/custom-animate.css'
import 'bootstrap-select/dist/css/bootstrap-select.css';
import './assets/vendors/fontawesome/css/all.min.css'
import './assets/css/bixola.css';
import './assets/css/bixola-responsive.css'
import './assets/vendors/bixola-icons/style.css'

import Home from './pages/Home'
import About from  './pages/About';
import Solutions from './pages/Solutions';
import Categories from './pages/Categories';
import Videos from './pages/Videos';
import Certifications from './pages/Certifications';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';


import GoToTop from './components/GoToTop';
import ScrollToTop from "./components/ScrollToTop";
import Cursor from "./components/Cursor";
import Preloader from './components/Preloader';
import { API_ROOT } from './config';

function App() {

  const [isloading, setloading] = useState(true);
  setTimeout(() => setloading(false), 3000);
  let element = isloading ? (
    <Preloader />
  ) : (
    <>
      <div className="page-wrapper">
        <Router basename='/Prettau-Dental'>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/solutions/:id" element={<Solutions />} /> 
            <Route path="/events" element={<Events />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categories/:id" element={<Categories />} />
            <Route path="/blogs/:id" element={<Blogs />} /> 
            {/*  />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} /> */}
            {/* <Route path="/blogs:id" element={<Blogs />} />  */}
          </Routes>
          <GoToTop/>
        </Router>
      </div>
    </>
  );

  return (
    <>
      <Cursor />
      <div>{element} </div>
    </>
   
  );
}

export default App;
