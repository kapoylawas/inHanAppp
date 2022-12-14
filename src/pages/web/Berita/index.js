/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import PaginationUlpimComponent from "../../../components/utilities/PaginationUlpim";
import LayoutWeb from "../../../layouts/web";

function Berita() {
  document.title = "InHandApp - Berita";

  const [berita, setBerita] = useState([]);
  const sort = berita.sort();

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  //state perPage
  const [perPage, setPerPage] = useState(0);

  //state search
  const [search, setSearch] = useState("");

  //state total
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (pageNumber, searchData) => {
    const page = pageNumber ? pageNumber : currentPage;

    //define variable "searchQuery"
    const searchQuery = searchData ? searchData : search;

    await Api.get(`/berita/all-berita?page=${page}&search=${searchQuery}`, {})
      .then((response) => {
        setIsLoading(false);
        setBerita(response.data.data.data);
        setCurrentPage(response.data.data.page);

        //set perPage
        setPerPage(response.data.data.page);

        //total
        setTotal(response.data.data.page);
        console.log(response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
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
            <div className="col-span-4">
              <div className="text-center underline decoration-1">Berita</div>
              <div className="mt-3 mb-2 border-2 border-stone-400"></div>
              <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-8/12">
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
              </div>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {sort.map((berita, index) => (
                    <div
                      key={index}
                      className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-8/12"
                    >
                      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <a>
                          {/* <img
                            className="rounded-t-lg"
                            src={berita.image}
                            alt=""
                          /> */}
                        </a>
                        <div className="p-5">
                          <a>
                            <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                              {berita.title}
                            </p>
                          </a>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
                          <Link to={`/web/detailBerita/${berita.id}`}>
                            <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                              Baca Lebih Lengkap
                              <svg
                                aria-hidden="true"
                                className="w-4 h-4 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-8/12">
                    <PaginationUlpimComponent
                      currentPage={currentPage}
                      perPage={perPage}
                      total={total}
                      onChange={(pageNumber) => fetchData(pageNumber)}
                      position="end"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Berita;
