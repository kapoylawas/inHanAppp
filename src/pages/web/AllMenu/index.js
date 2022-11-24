/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import LayoutWeb from "../../../layouts/web";

function AllMenu() {
  return (
    <React.Fragment>
      <LayoutWeb>
        <>
          <div className="pt-20 pb-20">
            <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
              <div>
                <div>
                  <div className="grid items-center grid-cols-4 gap-5 mt-5 text-center md:gap-5">
                    <div className="col-span-2 p-4 text-xs text-center bg-red-200 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                      <Link to="/web/ppid">
                        <div>
                          <img
                            src={require("../../../assets/img/ic_ppid.png")}
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
                            src={require("../../../assets/img/ic_blikosda – 1.png")}
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
                            src={require("../../../assets/img/ic_ulpim.png")}
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
                            src={require("../../../assets/img/ic_silpulstron.png")}
                            width="30"
                            className="inline-block mb-2"
                          />
                        </div>
                        Silpulsitron
                      </Link>
                    </div>
                    <div className="col-span-2 p-4 text-xs text-center bg-red-200 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                      <Link to="/web/radio">
                        <div>
                          <img
                            src={require("../../../assets/images/radio.png")}
                            width="30"
                            className="inline-block mb-2"
                          />
                        </div>
                        Radio
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default AllMenu;
