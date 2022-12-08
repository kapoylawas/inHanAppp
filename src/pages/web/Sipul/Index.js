/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutWeb from "../../../layouts/web";

function Sipul() {
  document.title = "InHandApp - Sipulsitron";

  const [nik, setNik] = useState([]);
  const [nama, setNama] = useState([]);
  const [alamat, setAlamat] = useState([]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify({ nik, nama, alamat }));
  }, [nik, nama, alamat]);
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="card-body">
              <div className="p-5 bg-gray-100 rounded-md shadow-md">
                <img
                  className="mx-auto"
                  width="100"
                  height="100"
                  src={require("../../../assets/blitarcirclecop.png")}
                />
                <form>
                  <div className="mb-5">
                    <label className="mt-2">NIK</label>
                    <input
                      type="number"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="No Induk Kependudukan"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">NAMA</label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="Nama"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">ALAMAT</label>
                    <input
                      type="text"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="Nama"
                    />
                  </div>
                  <div>
                    <Link to="/web/listForm">
                      <button
                        type="submit"
                        className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                      >
                        Next Pilih Form
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Sipul;
