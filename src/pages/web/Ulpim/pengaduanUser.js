/* eslint-disable jsx-a11y/alt-text */
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import PaginationDetailOpd from "../../../components/utilities/PaginationDetailOpd";
import LayoutWeb from "../../../layouts/web";

function PengaduanUser() {
  document.title = "InHandApp - Berita";

  const [user, setUser] = useState([]);
  const sort = user.sort();

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  //state perPage
  const [perPage, setPerPage] = useState(0);

  //state search
  // const [search, setSearch] = useState("");

  //state total
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const dataNip = localStorage.getItem("nip");

  //token
  const token = Cookies.get("token");

  const status = localStorage.getItem("status");

  const fetchData = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`/ulpim/pengaduan-nik?page=${page}&nik=${dataNip}`, {
      headers: {
        //header Bearer + Token
        objects: "/ulpim/pengaduan-nik",
        Authorization: `Bearer ${token}`,
        statusUsers: status,
      },
    })
      .then((response) => {
        setIsLoading(false);
        console.log("data", response);
        setUser(response.data);
        setCurrentPage(response.data.data.page);

        //set perPage
        setPerPage(response.data.data.page);

        //total
        setTotal(response.data.data.page);
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
            <div>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="p-2 rounded-md shadow-md bg-gray-50">
                    <div className="text-center underline decoration-1">
                      Pengaduan User
                    </div>
                    <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        {user.length > 0 ? (
                          sort.map((ulpim, index) => (
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
                              <strong>Opps...!</strong> Anda Belum Melakukan
                              Pengaduan!.
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <PaginationDetailOpd
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
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default PengaduanUser;
