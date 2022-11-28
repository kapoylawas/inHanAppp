/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";
import { FormatRupiah } from "@arismun/format-rupiah";
import PaginationUlpimComponent from "../../../components/utilities/PaginationUlpim";

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
        setBliko(response.data.data.data);

        setCurrentPage(response.data.data.page);

        //set perPage
        setPerPage(response.data.data.page);

        //total
        setTotal(response.data.data.page);
        console.log("data", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();

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
                    {sort.map((bliko, index) => (
                      <>
                        <div key={index} className="col-span-4">
                          <div className="p-1 bg-gray-200 rounded-md shadow-md">
                            <div className="object-center">
                              <section className="container max-w-screen-lg pb-10 mx-auto hero">
                                <a href="#">
                                  <img
                                    className="rounded-t-lg"
                                    src={bliko.images}
                                  />
                                </a>
                              </section>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                  <FormatRupiah value={bliko.harga} />
                                </span>
                                <a
                                  href={bliko.link}
                                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  Add to cart
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                      </>
                    ))}
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
        </LayoutWeb>
      </>
    </React.Fragment>
  );
}

export default Blikosda;
