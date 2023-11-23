import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";

function Laporan() {
  document.title = "i-Sarpras - Cek Laporan Pengaduan";

  const [nomor, setNomor] = useState("");
  const [dataUser, setDataUser] = useState("");
  console.log("data response =>", dataUser);
  const [isLoading, setLoading] = useState(false);

  const status = localStorage.getItem("status");
  const token = Cookies.get("token");

  const handleCheckNik = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nomor_laporan", nomor);
    await Api.post("/isarpras/cek-laporan", formData, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/isarpras/cek-laporan",
        statusUsers: status,
      },
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);
        if (response.status) {
          // Lakukan sesuatu dengan data yang diterima
          toast.success("Berhasil Mengambil Data.", {
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
          setDataUser(response.data.data.data);
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
    // // Implement logic to check the NIK
    // console.log(`Checking NIK: ${nik}`);
  };

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
              <div className="flex mb-4 space-x-2.5">
                <input
                  type="text"
                  id="nip"
                  className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                  onChange={(e) => setNomor(e.target.value)}
                  value={nomor}
                  placeholder="Nomor Pelaporan"
                />

                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                  onClick={handleCheckNik}
                >
                  Cek Pelaporan
                </button>
              </div>

              {isLoading && <LoadingSpinner />}

              {dataUser ? (
                <div>
                  <div
                    class="bg-teal-100 border-t-4 mb-3 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                    role="alert"
                  >
                    <div class="flex">
                      <div>
                        <p class="font-bold"></p>
                        <p class="font-bold">LAPORAN SELESAI</p>
                      </div>
                    </div>
                  </div>
                  <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div class="flex flex-col pb-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        ID Sarpras
                      </dt>
                      <dd class="text-lg font-semibold">
                        {dataUser.id_sarpras}
                      </dd>
                    </div>
                    <div class="flex flex-col py-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Nama Sarpras
                      </dt>
                      <dd class="text-lg font-semibold">
                        {dataUser.nama_sarpras}
                      </dd>
                    </div>
                    <div class="flex flex-col pt-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Kategori
                      </dt>
                      <dd class="text-lg font-semibold">
                        {dataUser.nama_kategori}
                      </dd>
                    </div>
                    <div class="flex flex-col pt-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Keterangan
                      </dt>
                      <dd class="text-lg font-semibold">
                        {dataUser.keterangan}
                      </dd>
                    </div>
                    <div class="flex flex-col pt-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Keterangan Lokasi
                      </dt>
                      <dd class="text-lg font-semibold">
                        {dataUser.keterangan_lokasi}
                      </dd>
                    </div>
                    <div class="flex flex-col pt-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        NIK Pelapor
                      </dt>
                      <dd class="text-lg font-semibold">
                        {dataUser.nik_pelapor}
                      </dd>
                    </div>
                    <div class="flex flex-col pt-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        Nama Pelapor
                      </dt>
                      <dd class="text-lg font-semibold">
                        {dataUser.nama_pelapor}
                      </dd>
                    </div>
                    <div class="flex flex-col pt-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        NIK pelapor
                      </dt>
                      <dd class="text-lg font-semibold">
                        {dataUser.nik_pelapor}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <p>
                  {!isLoading && (
                    <div
                      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <strong class="font-bold">Data </strong>
                      <span class="block sm:inline">
                        Belum ada!
                      </span>
                      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg
                          class="fill-current h-6 w-6 text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Laporan;
