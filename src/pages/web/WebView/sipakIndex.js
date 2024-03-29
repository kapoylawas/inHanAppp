/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function SipakIndex() {
  document.title = "Sipak";

  return (
    <React.Fragment>
      <div className="pt-20 pb-20">
        <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
          <div>
            <div className="grid grid-cols-4 gap-4 mt-5">
              <div className="col-span-4">
                <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                  <Link
                    to={{
                      pathname: "/web/pelayananWeb",
                    }}
                  >
                    <div>
                      <img
                        src={require("../../../assets/images/product.png")}
                        width="30"
                        className="inline-block mb-2"
                      />
                    </div>
                    Pelayanan 3 in 1 - Pencatatan Bayi Baru Lahir
                  </Link>
                  <br></br>
                </div>
              </div>
              <div className="col-span-4">
                <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                  <Link to="/web/KkWeb">
                    <div>
                      <img
                        src={require("../../../assets/images/product.png")}
                        width="30"
                        className="inline-block mb-2"
                      />
                    </div>
                    Kartu Keluarga - Perubahan Data
                  </Link>
                  <br></br>
                </div>
              </div>
              <div className="col-span-4">
                <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                  <Link to="/web/KiaWeb">
                    <div>
                      <img
                        src={require("../../../assets/images/product.png")}
                        width="30"
                        className="inline-block mb-2"
                      />
                    </div>
                    KIA - KIA Baru
                  </Link>
                  <br></br>
                </div>
              </div>
              <div className="col-span-4">
                <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                  <Link to="/web/KtaWeb">
                    <div>
                      <img
                        src={require("../../../assets/images/product.png")}
                        width="30"
                        className="inline-block mb-2"
                      />
                    </div>
                    KTA Kematian - Pecatatan Kematian
                  </Link>
                  <br></br>
                </div>
              </div>
              <div className="col-span-4">
                <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                  <Link to="/web/LacakWeb">
                    <div>
                      <img
                        src={require("../../../assets/images/product.png")}
                        width="30"
                        className="inline-block mb-2"
                      />
                    </div>
                    Lacak Permohonan
                  </Link>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SipakIndex;
