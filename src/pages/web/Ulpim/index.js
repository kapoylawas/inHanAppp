/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import LayoutWeb from "../../../layouts/web";
import { Link } from "react-router-dom";

function Ulpim() {
  document.title = "UlPIM - Pengaduan";

  // const status = localStorage.getItem("status");
  // const status = 1;
  // console.log(status);

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                    <Link to="/web/dataUlpim">
                      <div>
                        <img
                          src={require("../../../assets/images/all.png")}
                          width="30"
                          className="inline-block mb-2"
                        />
                      </div>
                      Lihat Semua Pengaduan
                    </Link>
                    <br></br>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-2 lg:col-span-2">
                    <Link to="/web/kirimPengaduan">
                      <div>
                        <img
                          src={require("../../../assets/images/message.png")}
                          width="30"
                          className="inline-block mb-2"
                        />
                      </div>
                      KIRIM PENGADUAN
                    </Link>
                  </div>
                </div>
                {/* {status === 1 && */}
                    <>
                    <div className="col-span-4">
                      <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-2 lg:col-span-2">
                        <Link to="/web/pengaduanOpd">
                          <div>
                            <img
                              src={require("../../../assets/images/product.png")}
                              width="30"
                              className="inline-block mb-2"
                            />
                          </div>
                          LIHAT PENGADUAN BY OPD
                        </Link>
                      </div>
                    </div>
                    </>
                {/* }  */}
                

                <div className="col-span-4">
                  <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                    <Link to="/web/pengaduanUser">
                      <div>
                        <img
                          src={require("../../../assets/images/contact-data.png")}
                          width="30"
                          className="inline-block mb-2"
                        />
                      </div>
                      Lihat Pengaduan Saya
                    </Link>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Ulpim;
