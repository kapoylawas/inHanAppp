import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
// import Select from 'react-select'
import Api from "../../../api";


function PengaduanOpd() {

  const [ulpims, setUlpim] = useState([]);
  const dataUlpim = ulpims.sort();

  console.log(dataUlpim);

  const fetchData = async () => {

    await Api.get('/ulpim/get-opd', {})
      .then((response) => {
        // console.log(response);
        setUlpim(response.data.data);        
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

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

                    {/* <Select>
                     <option value="">-- Tipe Pengaduan --</option>
                      
                    </Select> */}

                    <select
                      className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                    >
                      <option value="">-- Pilih Opd --</option>
                      {dataUlpim.map((ulpims) => (
                        <option value={ulpims.nama_instansi} key={ulpims.id_instansi}>
                          {ulpims.nama_instansi}
                        </option>
                      ))}
                    </select>

                    
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
