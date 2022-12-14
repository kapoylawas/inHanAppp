/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import PaginationUlpimComponent from "../../../components/utilities/PaginationUlpim";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";

function DataUlpim() {
  document.title = "UlPIM - Pengaduan";

  const [ulpims, setUlpim] = useState([]);

  const dataUlpim = ulpims.sort();

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  //state perPage
  const [perPage, setPerPage] = useState(0);

  //state total
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // console.log(latitude);
  // console.log(longitude);  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const fetchData = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`/ulpim/all-pengaduan?page=${page}`, {
      headers: {
        //header Bearer + Token
        objects: "/ulpim/all-pengaduan",
        statusUsers: 1,
        lng: latitude,
        lat: longitude,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setUlpim(response.data.data.data);

        // console.log(response);
        //set perPage
        setCurrentPage(response.data.data.current_page);

        //set perPage
        setPerPage(response.data.data.current_page);

        //total
        setTotal(response.data.data.current_page);
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
        <>
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

                      {/* <Select options={options} /> */}
                      <br />
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          {" "}
                          {dataUlpim.map((ulpim, index) => (
                            <div
                              key={index}
                              className="p-3 mb-3 bg-gray-200 rounded shadow-md"
                            >
                              <div className="grid grid-cols-10 gap-4">
                                <div className="col-span-9 mt-1">
                                  <div className="text-base font-bold">
                                    {ulpim.perihal}
                                  </div>
                                  <div className="mt-2 text-sm text-gray-500">
                                    {ulpim.pengirim}
                                    <br />
                                    <span className="font-bold">
                                      {" "}
                                      {ulpim.no_telp}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 gap-4 mt-3">
                                <div className="text-sm text-gray-600">
                                  {ulpim.isi_pesan}
                                </div>
                                <div className="text-sm italic text-left text-gray-500">
                                  <Link to={`/web/dataUlpim/${ulpim.id_pesan}`}>
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                      <span className="relative px-1 py-1 transition-all duration-75 ease-in bg-white rounded-md dark:bg-gray-900 group-hover:bg-opacity-0">
                                        Lihat Selengkapnya
                                      </span>
                                    </button>
                                  </Link>
                                </div>
                                <div className="text-sm italic text-right text-gray-500">
                                  {ulpim.tgl_lapor}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}

                      <br />
                      <PaginationUlpimComponent
                        currentPage={currentPage}
                        perPage={perPage}
                        total={total}
                        onChange={(pageNumber) => fetchData(pageNumber)}
                        position="end"
                      />
                    </div>

                    <br></br>
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

export default DataUlpim;
