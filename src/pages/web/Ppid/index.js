/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import PaginationComponent from "../../../components/utilities/Pagination";
import LayoutWeb from "../../../layouts/web";

function Ppid() {
  document.title = "In Hand App - PPID";

  const [ppids, setPpid] = useState([]);

  const sort = ppids.sort();

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  //state perPage
  const [perPage, setPerPage] = useState(0);

  //state total
  const [total, setTotal] = useState(0);

  //state search
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [setErrorMessage] = useState("");

  const fetchData = async (pageNumber, searchData) => {
    const page = pageNumber ? pageNumber : currentPage;

    //define variable "searchQuery"
    const searchQuery = searchData ? searchData : search;

    await Api.get(
      `/ppid/daftar-informasi-publik?search=${searchQuery}&page=${page}`,
      {
        headers: {
          //header Bearer + Token
          objects: "/ppid/daftar-informasi-publik",
          statusUsers: 1,
        },
      }
    )
      .then((response) => {
        setIsLoading(false);

        console.log(response);
        setPpid(response.data.data.data);

        setCurrentPage(response.data.data.page);

        //set perPage
        setPerPage(response.data.data.per_page);

        //total
        setTotal(response.data.data.total);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //function "searchHandler"
  const searchHandlder = (e) => {
    e.preventDefault();

    //call function "fetchDataPost"
    fetchData(1, search);
  };

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4">
                  <div className="p-2 rounded-md shadow-md bg-red-50">
                    <div className="object-center">
                      <section className="container max-w-screen-lg pb-10 mx-auto hero">
                        <img
                          className="mx-auto"
                          width="100"
                          height="90"
                          src={require("../../../assets/blitarcirclecop.png")}
                        />
                      </section>
                      <p class="text-center ...">
                        Sekretariat PPID Kota Blitar 
                        <br />
                        Jl. Moh. Hatta No. 05 KotaBlitar , 66113
                      </p>
                      <p class="text-center ...">
                        Phone: 0342-807-805
                        <br />
                        Email: ppid@blitarkota.go.id
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="p-2 rounded-md shadow-md bg-red-50">
                    <div className="text-center underline decoration-1">
                      PPID
                    </div>
                    <div className="mt-3 mb-2 border-2 border-stone-400"></div>

                    <form onSubmit={searchHandlder}>
                      <label
                        for="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                      >
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                          </svg>
                        </div>
                        <input
                          onChange={(e) => setSearch(e.target.value)}
                          type="search"
                          id="default-search"
                          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                          placeholder="Search "
                        />
                        <button
                          type="submit"
                          className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Search
                        </button>
                      </div>
                    </form>

                    <div className="mt-4 overflow-x-auto sm:w-full">
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          {" "}
                          {sort.map((ppid, index) => (
                            <div
                              key={index}
                              className="w-full p-4 mb-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                            >
                              {++index + (currentPage - 1) * perPage}
                              <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                                  <tbody>
                                    <tr className="bg-gray-400 border-b border-gray-500 hover:bg-gray-600">
                                      <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-emerald-50 whitespace-nowrap dark:text-emerald-100"
                                      >
                                        Creatad
                                      </th>
                                      <td className="px-6 py-4">
                                        {ppid.waktu}
                                      </td>
                                    </tr>
                                    <tr className="bg-gray-400 border-b border-gray-500 hover:bg-gray-600">
                                      <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-emerald-50 whitespace-nowrap dark:text-emerald-100"
                                      >
                                        Judul
                                      </th>
                                      <td className="px-6 py-4">
                                        {ppid.judul}
                                      </td>
                                    </tr>
                                    <tr className="bg-gray-400 border-b border-gray-500 hover:bg-gray-600">
                                      <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-emerald-50 whitespace-nowrap dark:text-emerald-100"
                                      >
                                        Jenis Informasi
                                      </th>
                                      <td className="px-6 py-4">
                                        {ppid.jenis_info}
                                      </td>
                                    </tr>
                                    <tr className="bg-gray-400 border-b border-gray-500 hover:bg-gray-600">
                                      <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-emerald-50 whitespace-nowrap dark:text-emerald-100"
                                      >
                                        Penanggung Jawab
                                      </th>
                                      <td className="px-6 py-4">
                                        {ppid.penanggung_jawab}
                                      </td>
                                    </tr>
                                    <tr className="bg-gray-400 border-b border-gray-500 hover:bg-gray-600">
                                      <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-emerald-50 whitespace-nowrap dark:text-emerald-100"
                                      >
                                        Download
                                      </th>
                                      <td className="px-6 py-4">
                                        <Link
                                          to={`/web/formPermohonan/${ppid.id}`}
                                        >
                                          <img
                                            className="mx-auto"
                                            width="30"
                                            height="30"
                                            src={require("../../../assets/images/direct-download.png")}
                                          />
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}{" "}
                        </>
                      )}
                    </div>
                    <PaginationComponent
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
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Ppid;
