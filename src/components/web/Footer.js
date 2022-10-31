/* eslint-disable jsx-a11y/alt-text */
//import react
import React from "react";
import { Link } from "react-router-dom";

function WebFooter() {
 
  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 500);
    console.log('page to reload')
}

  return (
    <React.Fragment>
      <div className="fixed inset-x-0 bottom-0 z-10 text-center bg-red-400">
        <div className="container grid grid-cols-5 gap-5 p-2 mx-auto sm:w-full md:w-6/12">
          <div>
            <Link              
              to="/"
              onClick={refreshPage}
              className="justify-center inline-block w-full text-center focus:text-red-100 hover:text-red-100"
              >
              <img
                className="inline-block mb-1"
                width="25"
                height="25"
                src={require("../../assets/images/home.png")}
                />
              <span className="block text-xs">Beranda</span>
            </Link>
          </div>
          <div>
            <Link to="/web/ppid" className="justify-center inline-block w-full text-center focus:text-red-100 hover:text-red-100">
              <img
                className="inline-block mb-1"
                width="25"
                height="25"
                src={require("../../assets/images/folder.png")}
              />
              <span className="block text-xs">PPID</span>
            </Link>
          </div>
          <div>
            <Link className="justify-center inline-block w-full text-center focus:text-red-100 hover:text-red-100">
              <img
                className="inline-block mb-1"
                width="25"
                height="25"
                src={require("../../assets/images/fruit-shop.png")}
              />
              <span className="block text-xs">Blikosda</span>
            </Link>
          </div>
          <div>
            <Link className="justify-center inline-block w-full text-center focus:text-red-100 hover:text-red-100">
              <img
                className="inline-block mb-1"
                width="25"
                height="25"
                src={require("../../assets/images/review.png")}
              />
              <span className="block text-xs">Ulpim</span>
            </Link>
          </div>
          <div>
            <Link
              to="/admin/login"
              className="justify-center inline-block w-full text-center focus:text-red-100 hover:text-red-100"
            >
              <img
                className="inline-block mb-1"
                width="25"
                height="25"
                src={require("../../assets/images/login.png")}
              />
              <span className="block text-xs">Akun</span>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WebFooter;
