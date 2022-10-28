import React from "react";
import Header from 'components/Navbar'
import Footer from "components/Footer";
import {navConfig} from '../App'

const CommonLayout = ({ children }) => {
  return (
    <div className="common-layout">
      <Header navConfig={navConfig}/>
      <main style={{minHeight:'75vh'}}>{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
