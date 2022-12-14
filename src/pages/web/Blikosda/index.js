/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";
import { FormatRupiah } from "@arismun/format-rupiah";
import PaginationUlpimComponent from "../../../components/utilities/PaginationUlpim";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";

function Blikosda() {
  document.title = "In Hand App - Blikosda";

  const [blikosda, setBliko] = useState([]);
  const sort = blikosda.sort();

  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  //state perPage
  const [perPage, setPerPage] = useState(0);

  //state total
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const fetchData = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`blikosda/all-product?page=${page}`, {
      headers: {
        //header Bearer + Token
        objects: "/blikosda/all-product",
        statusUsers: 1,
        lng: latitude,
        lat: longitude,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setBliko(response.data.data.data);

        setCurrentPage(response.data.data.page);

        //set perPage
        setPerPage(response.data.data.page);

        //total
        setTotal(response.data.data.page);
        // console.log("data", response);
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
      <>
        <LayoutWeb>
          <div className="pt-20 pb-20">
            <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="text-center underline decoration-1">
                    Produk Unggulan
                  </div>
                  <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                  <br />
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      {sort.map((bliko, index) => (
                        <>
                          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-8/12">
                            <div key={index} className="col-span-4">
                              <div className="p-1 bg-gray-200 rounded-md shadow-md">
                                <div className="object-center">
                                  <div className="flex flex-col items-center pb-10">
                                    <img
                                      className="w-24 h-24 mt-5 mb-3 rounded-full shadow-lg"
                                      src={bliko.images}
                                      alt="Bonnie image"
                                    />
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                      {bliko.nama}
                                    </h5>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      {/* {bliko.deskripsi} */}
                                      <FormatRupiah value={bliko.harga} />
                                    </span>
                                    <div className="flex mt-4 space-x-3 md:mt-6">
                                      <a
                                        href={bliko.link}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                      >
                                        Add to cart
                                      </a>
                                      <a
                                        href="#"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                      >
                                        Detail
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
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
      </>
    </React.Fragment>
  );
}

export default Blikosda;
