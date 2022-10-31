import React from "react";

//import component Header

//import component Footer
import Footer from "../components/web/Footer";
import WebHeader from "../components/web/Header";

const LayoutWeb = ({ children }) => {
  return (
    <React.Fragment>
      <WebHeader />

        {children}

      <Footer />
    </React.Fragment>
  );
};

export default LayoutWeb;