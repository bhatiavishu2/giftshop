import React from "react";
import Header from 'components/Navbar'
import Footer from "components/Footer";
import {navConfig} from '../App'
import { Parallax, Background } from "react-parallax";

const CommonLayout = ({ children }) => {
  return (
    <div className="common-layout">
      <Header navConfig={navConfig}/>
     
      <main style={{minHeight:'75vh'}}> 
      <Parallax bgImage={'https://images.pexels.com/photos/4197491/pexels-photo-4197491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} strength={500}>
        {children}</Parallax></main>
      
      <Footer />
    </div>
  );
};

export default CommonLayout;
