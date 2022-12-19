/* eslint-disable jsx-a11y/alt-text */
//import react
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Ppid } from "../../assets/image/ic_ppid_by_design.svg";
import { ReactComponent as Bliko } from "../../assets/image/ic_blikosda_by_design.svg";
import { ReactComponent as Ulpim } from "../../assets/image/ic_ulpim_by_design.svg";
import { ReactComponent as Home } from "../../assets/image/ic_home_by_design.svg";
import { ReactComponent as Akun } from "../../assets/image/ic_person_by_design.svg";

function WebFooter() {
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
    console.log("page to reload");
  }

  return (
    <React.Fragment>
      <>
        <div className="fixed inset-x-0 bottom-0 z-10 text-center bg-gray-50">
          <div className="container grid grid-cols-5 gap-5 p-2 mx-auto sm:w-full md:w-6/12">
            <div>
              <Link
                to="/"
                onClick={refreshPage}
                className="justify-center inline-block w-full text-center focus:text-gray-500 hover:text-gray-500"
              >
                <Home width="30" className="inline-block" />
                <span className="block text-xs">Beranda</span>
              </Link>
            </div>
            <div>
              <Link
                to="/web/ppid"
                className="justify-center inline-block w-full text-center focus:text-gray-500 hover:text-gray-500"
              >
                <Ppid width="30" className="inline-block" />
                <span className="block text-xs">Informasi Publik</span>
              </Link>
            </div>
            <div>
              <Link to="/web/blikosda" className="justify-center inline-block w-full text-center focus:text-gray-500 hover:text-gray-500">
              <Bliko width="30" className="inline-block" />
                <span className="block text-xs">Produk Unggulan</span>
              </Link>
            </div>
            <div>
              <Link
                to="/web/ulpim"
                className="justify-center inline-block w-full text-center focus:text-gray-500 hover:text-gray-500"
              >
                 <Ulpim width="30" className="inline-block" />
                <span className="block text-xs">Pengaduan</span>
              </Link>
            </div>
            <div>
              <Link
                to="/admin/login"
                className="justify-center inline-block w-full text-center focus:text-gray-500 hover:text-gray-500"
              >
               <Akun width="30" className="inline-block" />
                <span className="block text-xs">Akun</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    </React.Fragment>
  );
}

export default WebFooter;
