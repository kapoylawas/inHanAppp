/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import LayoutWeb from "../../../layouts/web";
import { ReactComponent as Ppid } from "../../../assets/image/ic_ppid_by_design.svg";
import { ReactComponent as Bliko } from "../../../assets/image/ic_blikosda_by_design.svg";
import { ReactComponent as Ulpim } from "../../../assets/image/ic_ulpim_by_design.svg";
import { ReactComponent as Silpu } from "../../../assets/image/ic_silpusitron_by_design.svg";
import { ReactComponent as Wisata } from "../../../assets/image/ic_new_wisata_by_design (1).svg";
import { ReactComponent as Berita } from "../../../assets/image/ic_news_by_design.svg";
import { ReactComponent as Phone } from "../../../assets/image/phone-svgrepo-com.svg";

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
                    <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                      <Link to="/web/ppid">
                        <div>
                        <Ppid width="30" className="inline-block mb-2" />
                        </div>
                        Informasi Publik
                      </Link>
                    </div>
                    <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                      <Link to="/web/blikosda">
                        <div>
                        <Bliko width="30" className="inline-block mb-2" />
                        </div>
                        Produk Unggulan
                      </Link>
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
                      <Link to="/web/listForm">
                        <div>
                        <Silpu width="30" className="inline-block mb-2" />
                        </div>
                        Pelayanan
                      </Link>
                    </div>
                    <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                    <a href="tel:112">
                        <div>
                        <Phone width="30" className="inline-block mb-2" />
                        </div>
                        Darurat 112 
                      </a>
                    </div>
                    <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                      <Link to="/web/webview">
                        <div>
                          <img
                            src={require("../../../assets/img/browser.png")}
                            width="30"
                            className="inline-block mb-2"
                          />
                        </div>
                        Web View
                      </Link>
                    </div>
                    <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                      <Link to="/web/callCenter">
                        <div>
                          <img
                            src={require("../../../assets/img/call-center.png")}
                            width="30"
                            className="inline-block mb-2"
                          />
                        </div>
                        Call Center
                      </Link>
                    </div>
                    <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                      <Link to="/web/wisata">
                        <div>
                        <Wisata width="30" className="inline-block mb-2" />
                        </div>
                        Wisata
                      </Link>
                    </div>
                    <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-1 lg:col-span-1">
                      <Link to="/web/berita">
                        <div>
                        <Berita className="inline-block mb-2" />
                        </div>
                        Berita
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
