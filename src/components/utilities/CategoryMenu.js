/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";

function CategoryMenu(params) {
  return (
    <React.Fragment>
      <div>
        <div>
          <div className="grid items-center grid-cols-4 gap-5 mt-5 text-center md:gap-5">
            <div className="col-span-2 p-4 text-xs text-center bg-red-200 rounded-md shadow-md md:col-span-1 lg:col-span-1">
              <Link to="/web/ppid">
                <div>
                  <img
                    src={require("../../assets/img/ic_ppid.png")}
                    width="30"
                    className="inline-block mb-2"
                  />
                </div>
                PPID
              </Link>
            </div>
            <div className="col-span-2 p-4 text-xs text-center bg-red-200 rounded-md shadow-md md:col-span-1 lg:col-span-1">
              <Link to="/web/blikosda">
                <div>
                  <img
                    src={require("../../assets/img/ic_blikosda – 1.png")}
                    width="30"
                    className="inline-block mb-2"
                  />
                </div>
                Blikosda
              </Link>
            </div>
            <div className="col-span-2 p-4 text-xs text-center bg-red-200 rounded-md shadow-md md:col-span-1 lg:col-span-1">
              <Link to="/web/ulpim">
                <div>
                  <img
                    src={require("../../assets/img/ic_ulpim.png")}
                    width="30"
                    className="inline-block mb-2"
                  />
                </div>
                Ulpim
              </Link>
            </div>
            <div className="col-span-2 p-4 text-xs text-center bg-red-200 rounded-md shadow-md md:col-span-1 lg:col-span-1">
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
