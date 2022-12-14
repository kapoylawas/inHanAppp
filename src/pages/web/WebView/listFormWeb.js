/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";

function ListFrormWeb() {
  document.title = "InHandApp - Sipulsitron List Form";

  const [listForms, setListform] = useState([""]);
  const dataForm = listForms.sort();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    await Api.get("/silpusitron/list-form", {
      headers: {
        //header Bearer + Token
        objects: "/silpusitron/list-form",
        statusUsers: 1,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setListform(response.data.data);
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
      <div className="pt-20 pb-20">
        <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
          <div>
            <nav arial-aria-label="Black">
              <Link to={"/web/sipulWeb"}>
                <a
                  class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                  href="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Kembali
                </a>
              </Link>
            </nav>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-5">
            <div className="col-span-4">
              <div>
                <div className="text-center">Pilih Salah Satu List Form</div>
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
                              className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                            >
                              Nama Form Surat
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 bg-gray-100 dark:bg-gray-800"
                            >
                              Pilih Form
                            </th>
                          </tr>
                        </thead>
                        <tbody className="p-2 bg-gray-100 rounded-md shadow-md">
                          {dataForm.map((form, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-200 dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 bg-gray-100 whitespace-nowrap dark:text-white dark:bg-gray-800"
                              >
                                {form.name}
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 bg-gray-100 whitespace-nowrap dark:text-white dark:bg-gray-800"
                              >
                                <Link to={`/web/isiFormWeb/${form.tid}`}>
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
    </React.Fragment>
  );
}

export default ListFrormWeb;
