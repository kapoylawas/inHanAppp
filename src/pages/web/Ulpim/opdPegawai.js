/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import LayoutWeb from "../../../layouts/web";
import { Link } from "react-router-dom";

function OpdPegawai() {
  const dataopd = JSON.parse(localStorage.getItem("data-opd"));
  
  // console.log("id isntansi",id_instansi.replace("[", "").replace("]", "").replace('"', "").replace('"', ""));  

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            {dataopd.length > 0 ? (
              dataopd.map((sortir) => (
                <>
                  <div className="p-3 mb-3 bg-gray-200 rounded shadow-md">
                    <div className="mb-5 text-base font-bold">
                      {sortir.perihal}
                    </div>
                    {sortir.isi_pesan}
                    <div className="text-sm italic text-right text-gray-500">
                      {sortir.tgl_lapor}
                    </div>
                  </div>

                  <div className="p-3 mb-3 bg-gray-200 rounded shadow-md">
                    Nama: {sortir.pengirim} <br /> No tlpn: {sortir.no_telp}
                  </div>
                  <div className="p-3 mb-3 bg-red-200 rounded shadow-md">
                    Jawaban: <br /> {sortir.jawaban}
                  </div>
                  <div className="mt-3 mb-2 border-2 border-stone-400"></div>

                  {/* nantik kondisi if jika data jawaban null akan tampil */}
                  
                    <Link to={`/web/jawaban/${sortir.id_pesan}/${sortir.id_instansi}`}>
                    <div>
                      <button
                        type="submit"
                        className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                      >
                        isi jawaban
                      </button>
                    </div>
                    </Link>
                    <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                  {/* </form> */}
                </>
              ))
            ) : (
              <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
                <div className="text-center underline decoration-1">
                  <img
                    src={require("../../../assets/images/Group 89.png")}
                    width="50"
                    className="inline-block mb-2"
                  />
                  <br></br>
                  <strong>Opps...!</strong> Anda Belum ada Pengaduan!.
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}
export default OpdPegawai;
