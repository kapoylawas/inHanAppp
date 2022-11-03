/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";

function PengaduanOpd() {
  const [ulpims, setUlpim] = useState([]);
  const dataUlpim = ulpims.sort();

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    await Api.get("/ulpim/get-opd", {
      headers: {
        //header Bearer + Token
        objects: "/ulpim/get-opd",
        statusUsers: 1,
      },
    })
      .then((response) => {
        setIsLoading(false);

        setUlpim(response.data.data);
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
                    <br></br>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        {isLoading ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                                >
                                  Nama OPD
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                                >
                                  Lihat Data
                                </th>
                              </tr>
                            </thead>
                            <tbody className="p-2 rounded-md shadow-md bg-red-50">
                              {dataUlpim.map((opd, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-gray-200 dark:border-gray-700"
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                                  >
                                    {opd.nama_instansi}
                                  </th>
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                                  >
                                    <Link
                                      to={`/web/lihatPengaduanOpd/${opd.id_instansi}`}
                                    >
                                      <img
                                        className="mx-auto"
                                        width="30"
                                        height="30"
                                        src={require("../../../assets/images/search.png")}
                                      />
                                    </Link>
                                  </th>
                                </tr>
                              ))}
                            </tbody>
                          </>
                        )}
                      </table>
                    </div>
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

export default PengaduanOpd;
