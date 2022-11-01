/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import PaginationUlpimComponent from "../../../components/utilities/PaginationUlpim";
import Select from 'react-select'


function Ulpim(params) {
  document.title = "UlPIM - Pengaduan";

  const [ulpims, setUlpim] = useState([]);

  const dataUlpim = ulpims.sort();

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  //state perPage
  const [perPage, setPerPage] = useState(0);

  //state total
  const [total, setTotal] = useState(0);

  const fetchData = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`/ulpim/all-pengaduan?page=${page}`, {})
      .then((response) => {
        console.log(response);
        setUlpim(response.data.data.data);

        //set perPage
        setCurrentPage(response.data.data.current_page);

        //set perPage
        setPerPage(response.data.data.current_page);

        //total
        setTotal(response.data.data.current_page);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();
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

                    <Select options={options} />
                    <br />
                    {dataUlpim.map((ulpim, index) => (
                    <div key={index} class="p-3 mb-3 bg-gray-200 rounded shadow-md">
                      <div class="grid grid-cols-10 gap-4">
                       
                        <div class="col-span-9 mt-1">
                          <div class="text-base font-bold">
                            {ulpim.perihal}
                          </div>
                          <div class="mt-2 text-sm text-gray-500">
                             {ulpim.pengirim}
                             <br />
                             <span class="font-bold"> {ulpim.no_telp}</span>
                          </div>
                        </div>
                      </div>
                      <div class="grid grid-cols-1 gap-4 mt-3">
                        <div class="text-sm text-gray-600">{ulpim.isi_pesan}</div>
                        <div class="text-sm italic text-right text-gray-500">{ulpim.tgl_lapor}</div>
                      </div>
                    </div>
                    ))}
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
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Ulpim;
