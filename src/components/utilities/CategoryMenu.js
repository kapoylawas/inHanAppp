/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Ppid } from "../../assets/image/ic_ppid_by_design.svg";
import { ReactComponent as Ulpim } from "../../assets/image/ic_ulpim_by_design.svg";
import { ReactComponent as Phone } from "../../assets/image/phone-svgrepo-com.svg";

function CategoryMenu() {
  return (
    <React.Fragment>
      <div>
        <div>
          <div className="grid items-center grid-cols-4 gap-5 mt-5 text-center md:gap-5">
            <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
              <Link to="/web/ppid">
                <div>
                  <Ppid width="30" className="inline-block mb-2" />
                </div>
                Informasi Publik
              </Link>
            </div>
            <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
              <a href="tel:112">
                <div>
                  <Phone width="35" className="inline-block mb-2" />
                </div>
                Darurat 112
              </a>
            </div>
            <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
              <Link to="/web/ulpim">
                <div>
                  <Ulpim width="30" className="inline-block mb-2" />
                </div>
                Pengaduan
              </Link>
            </div>
            <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
              <Link to="/web/lainya">
                <div>
                  <img
                    src={require("../../assets/images/menu.png")}
                    width="30"
                    className="inline-block mb-2"
                  />
                </div>
                Lainnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CategoryMenu;
