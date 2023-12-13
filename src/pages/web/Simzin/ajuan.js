import React, { useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Select from "react-select";
import Garis from "../../../components/utilities/garis";

function Ajuan() {
  document.title = "Simzin";

  const [nopendataan, setNopendataan] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setLoading] = useState(false);

  const options = [
    { value: "develop", label: "develop" },
    { value: "develop1", label: "develop1" },
    { value: "develop2", label: "develop2" },
  ];

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-8 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto mt-3 mb-20 bg-gray-100 rounded-md shadow-md">
              <form>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Jenis Layanan
                  </label>
                  <select
                    type="text"
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // onChange={(e) => setNama(e.target.value)}
                    required
                  >
                    <option value="">-- PILIH JENIS PERMOHONAN --</option>
                    <option value="Baru">Baru</option>
                    <option value="Perpanjangan">Perpanjangan</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    No. Pendataan
                  </label>
                  <input
                    type="text"
                    value={nopendataan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setNopendataan(e.target.value)}
                    placeholder="No pendataan"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tanggal Pendataan
                  </label>
                  <input
                    type="date"
                    value={date}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    PEMOHON DOKUMEN
                  </label>
                  <Select options={options} />
                </div>
                <h1 className="text-center">INFORMASI PERIZINAN</h1>
                <b>
                  {" "}
                  <Garis />
                </b>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nama Toko Pemasangan
                  </label>
                  <input
                    type="text"
                    value={nopendataan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setNopendataan(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Judul Reklame
                  </label>
                  <input
                    type="text"
                    value={nopendataan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setNopendataan(e.target.value)}
                    required
                  />
                </div>
                <h1 className="text-center">Dokumen Perizinan</h1>
                <b>
                  {" "}
                  <Garis />
                </b>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Surat Permohonan Tertulis Bermaterai(*)
                  </label>
                  <input
                    type="file"
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Surat Foto Reklame(*)
                  </label>
                  <input
                    type="file"
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Gambar Situasi Rencana Bangunan
                  </label>
                  <input
                    type="file"
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Fotocopy Akta Pendirian Perusahaan
                  </label>
                  <input
                    type="file"
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Denah Lokasi/Rencana Letak Reklame
                  </label>
                  <input
                    type="file"
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    NPWP Pemohon
                  </label>
                  <input
                    type="file"
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                    type="submit"
                    className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                    disabled={isLoading}
                  >
                    {" "}
                    {isLoading ? "LOADING..." : "SUBMIT"}{" "}
                  </button>
              </form>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Ajuan;
