/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SipulWeb() {
  document.title = "InHandApp - Sipulsitron";

  const [nik, setNik] = useState([]);
  // const [nama, setNama] = useState([]);
  // const [alamat, setAlamat] = useState([]);
  // const [rt, setRt] = useState([]);
  // const [rw, setRw] = useState([]);
  // const [kelurahan, setKelurahan] = useState([]);
  // const [kecamatan, setKecamatan] = useState([]);
  // const [nowa, setNowa] = useState([]);
  
  useEffect(() => {
    localStorage.setItem(
      "data",
      JSON.stringify(nik)
    );
  }, [nik]);

  return (
    <React.Fragment>
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="card-body">
              <div className="p-5 bg-gray-100 rounded-md shadow-md">
                <form>
                  <div className="mb-5">
                    <label className="mt-2">NIK</label>
                    <input
                      type="number"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      required
                      placeholder="Masukkan NIK Dengan Benar"
                    />
                  </div>

                  {/* <div className="mb-5">
                    <label className="mt-2">NAMA</label>
                    <input
                      required
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">ALAMAT</label>
                    <input
                      type="text"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">RT</label>
                    <input
                      type="text"
                      value={rt}
                      onChange={(e) => setRt(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">RW</label>
                    <input
                      type="text"
                      value={rw}
                      onChange={(e) => setRw(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">KELURAHAN</label>
                    <input
                      type="text"
                      value={kelurahan}
                      onChange={(e) => setKelurahan(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">KECAMATAN</label>
                    <input
                      type="text"
                      value={kecamatan}
                      onChange={(e) => setKecamatan(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="mt-2">NO WHATSAPP</label>
                    <input
                      type="text"
                      value={nowa}
                      onChange={(e) => setNowa(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                    />
                  </div> */}
                 
                  <div>
                    <Link to="/web/listFormWeb">
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
    </React.Fragment>
  );
}

export default SipulWeb;
