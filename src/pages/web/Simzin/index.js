import React from "react";
import LayoutWeb from "../../../layouts/web";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Simzin() {
  document.title = "Simzin";

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-10 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="relative mt-3 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-500">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      NAMA PERIJINAN
                    </th>
                    <th scope="col" className="px-6 py-3">
                      PENGAJUAN
                    </th>
                    <th scope="col" className="px-6 py-3">
                      PERMOHONAN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      IZIN REKLAME
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <Link to="/web/ajuan">
                        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                          Ajukan Permohonan
                        </button>
                      </Link>
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                        Permohonan Saya
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Simzin;
