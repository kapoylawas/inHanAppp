import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import LayoutWeb from "../../../layouts/web";
import Cookies from "js-cookie";


function DetailPengaduan() {
  document.title = "UlPIM - Detail Pengaduan";

  const [ulpim, setUlpim] = useState([]);
  // console.log('data', );

  const data = ulpim.sort();

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("token");

  const status = localStorage.getItem("status");

  const fetchData = async () => {
    await Api.get(`/ulpim/detail-pengaduan?id_pesan=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        objects: '/ulpim/detail-pengaduan',
        statusUsers: status
      },
    })
      .then((response) => {
        setIsLoading(false);
        setUlpim(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("err", error);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="p-2 rounded-md shadow-md bg-red-50">
                    <div className="text-center underline decoration-1">
                      ULPIM
                    </div>
                    <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                    INFORMASI MASYARAKAT
                    <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                      {/* {ulpim.isi_pesan} */}
                      {/* {ulpim.isi_pesan} */}
                        {data.map((ulpim, index) => (
                          <>
                            <div
                              key={index}
                              className="p-3 mb-3 bg-gray-200 rounded shadow-md"
                            >
                              <div className="mb-5 text-base font-bold">
                                {ulpim.perihal}
                              </div>
                              {ulpim.isi_pesan}
                              <div className="text-sm italic text-right text-gray-500">
                                {ulpim.tgl_lapor}
                              </div>
                            </div>

                            <div className="p-3 mb-3 bg-gray-200 rounded shadow-md">
                              Nama: {ulpim.pengirim} <br /> No tlpn:{" "}
                              {ulpim.no_telp}
                            </div>

                            <div className="p-3 mb-3 bg-red-200 rounded shadow-md">
                              Jawaban: <br /> {ulpim.jawaban}
                            </div>
                            <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                          </>
                        ))}
                      </>
                    )}
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

export default DetailPengaduan;
