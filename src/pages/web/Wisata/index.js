/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import PaginationUlpimComponent from "../../../components/utilities/PaginationUlpim";
import LayoutWeb from "../../../layouts/web";

function Wisata() {
  document.title = "InHandApp - Wisata";

  const [wisata, setWisata] = useState([]);
  const sort = wisata.sort();

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  //state perPage
  const [perPage, setPerPage] = useState(0);

  //state total
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`/wisata/all-wisata?page=${page}`, {})
      .then((response) => {
        setIsLoading(false);
        setWisata(response.data.data.data);
        setCurrentPage(response.data.data.current_page);

        //set perPage
        setPerPage(response.data.data.current_page);

        //total
        setTotal(response.data.data.current_page);
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

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="grid grid-cols-4 gap-4 mt-5">
              <div className="col-span-4">
                <div className="text-center underline decoration-1">Wisata</div>
                <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                <br />

                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {sort.map((wisata, index) => (
                      <>
                        <div
                          key={index}
                          className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-8/12"
                        >
                          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                              <img
                                className="rounded-t-lg"
                                src={wisata.img}
                                alt=""
                              />
                            </a>
                            <div className="p-5">
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  {wisata.title}
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                
                              </p>
                              <Link to={`/web/detail/${wisata.id}`}>
                                <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                  Read more
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
                      </>
                    ))}
                  </>
                )}
                <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-8/12">
                  <PaginationUlpimComponent
                    currentPage={currentPage}
                    perPage={perPage}
                    total={total}
                    onChange={(pageNumber) => fetchData(pageNumber)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Wisata;
