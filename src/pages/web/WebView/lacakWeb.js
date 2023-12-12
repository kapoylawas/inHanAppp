import React, { useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";

function LacakWeb() {
  document.title = "Sipak - Lacak Permohonan";

  const status = localStorage.getItem("status");
  const token = Cookies.get("token");
  const [isLoading, setLoading] = useState(false);

  const [pemohon, setPemohon] = useState("");
  const [success, setSuccess] = useState(false);
  const [dataAll, setDataAll] = useState([]);
  const [catatans, setCatatan] = useState([]);
  //   console.log(dataLapor);

  const handleCheckPemohon = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nopermohonan", pemohon);
    await Api.post("/sipak/lacak-permohonan", formData, {
      headers: {
        //header Bearer + Token
        // Authorization: `Bearer ${token}`,
        objects: "/sipak/lacak-permohonan",
        statusUsers: status,
      },
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);
        //show toast
        // const status = response.data.success
        if (response.status) {
          // Lakukan sesuatu dengan data yang diterima
          toast.success("Berhasil Menyimpan Data.", {
            duration: 9000,
            position: "top-center",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
          setSuccess(response.data);
          setDataAll(response.data.data.alldata);
          setCatatan(response.data.data.catatan);
        } else {
          // Tampilkan pesan toast jika status bukan 'success'
          toast.error("Data salah. Coba lagi.");
        }
      })
      .catch((error) => {
        //set state isLoading to "false"
        setLoading(false);
        console.error("Gagal mengambil data:", error);
        toast.error("Terjadi kesalahan. Coba lagi.");
      });
  };

  return (
    <React.Fragment>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
              <div className="mb-4 text-center">LACAK PERMOHONAN</div>
              <div className="flex mb-4 space-x-2.5">
                <input
                  type="text"
                  className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                  onChange={(e) => setPemohon(e.target.value)}
                  value={pemohon}
                  placeholder="Input Nomor Permohonan"
                />
                <button
                  onClick={handleCheckPemohon}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                  Tampilkan
                </button>
              </div>
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : success ? (
              <div className="container p-5 mx-auto mt-3 bg-gray-100 rounded-md shadow-md">
                <div className="mb-4 text-center">DATA PERMOHONAN</div>
                <div className="relative mt-3 overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          NO PERMOHONAN
                        </th>
                        <th scope="col" className="px-6 py-3">
                          NAMA PEMOHON
                        </th>
                        <th scope="col" className="px-6 py-3">
                          JENIS PERMOHONAN
                        </th>
                        <th scope="col" className="px-6 py-3">
                          PERMOHONAN DOKUMEN
                        </th>
                        <th scope="col" className="px-6 py-3">
                          TGL PENGAJUAN
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataAll.map((alldata, index) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {alldata.no_permohonan}
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {alldata.nama}
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {alldata.jenis_permohonan}
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {alldata.permohonan_dokumen}
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {alldata.tgl_pengajuan}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              ""
            )}

            {success ? (
              <div className="container p-5 mx-auto mt-3 bg-gray-100 rounded-md shadow-md">
                <div className="mb-4 text-center">STATUS PERMOHONAN</div>
                <div className="relative mt-3 overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          NO PEMOHON
                        </th>
                        <th scope="col" className="px-6 py-3">
                          TGL PENGAJUAN
                        </th>
                        <th scope="col" className="px-6 py-3">
                          STATUS
                        </th>
                        <th scope="col" className="px-6 py-3">
                          CATATAN
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {catatans.map((catatan, index) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {catatan.no_permohonan}
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {catatan.tanggal}
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {catatan.detail_status}
                          </th>
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {catatan.catatan}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
    </React.Fragment>
  );
}

export default LacakWeb;
