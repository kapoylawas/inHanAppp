import React, { useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import Select from "react-select";

function KiaWeb() {
  document.title = "Kartu Keluarga - Perubahan Data";

  const [jnslayanan, setJnslayanan] = useState("");

  const status = localStorage.getItem("status");
  const token = Cookies.get("token");
  const [isLoading, setLoading] = useState(false);

  const [dataForm, setDataForm] = useState([]);
  console.log(dataForm);

  const options = [
    { value: "3505032212860004", label: "3505032212860004" },
    { value: "3505032212860005", label: "3505032212860005" },
    { value: "3505032212860006", label: "3505032212860004" },
  ];

  const [imagekitas, setImagekitas] = useState("");

  const handleFileChange = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setImagekitas(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setImagekitas("");

      toast.error("Format File Tidak Cocok", {
        duration: 4000,
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setImagekitas(imageData);
  };

  const [showInput, setShowInput] = useState(false);
  const handlePlusClick = () => {
    setShowInput(!showInput);
  };

  return (
    <React.Fragment>
        <div className="pt-10 pb-10">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
              <div className="mb-3 text-center">
                <div
                  className="p-4 text-orange-700 bg-orange-100 border-l-4 border-orange-600"
                  role="alert"
                >
                  <p>
                    Mohon diperhatikan sebelum mengajukan permohonan, jika
                    pengajuan permohonan diwakilkan, permohonan dibatasi hanya
                    boleh diajukan oleh pemohon (sesuai data user login SIPAK)
                    yang tercatat dalam satu KK yang sama.
                  </p>
                </div>
              </div>
            </div>
            <div className="container p-5 mx-auto mt-3 mb-20 bg-gray-100 rounded-md shadow-md">
              <form>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Jenis Layanan
                  </label>
                  <input
                    type="text"
                    value={jnslayanan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jenis Layanan"
                    onChange={(e) => setJnslayanan(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    JENIS PERMOHONAN
                  </label>
                  <input
                    type="text"
                    value={jnslayanan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jenis Layanan"
                    onChange={(e) => setJnslayanan(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    PERMOHONAN DOKUMEN
                  </label>
                  <input
                    type="text"
                    value={jnslayanan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jenis Layanan"
                    onChange={(e) => setJnslayanan(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NOMOR KK YANG BERSANGKUTAN
                  </label>
                  <input
                    type="text"
                    value={jnslayanan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jenis Layanan"
                    onChange={(e) => setJnslayanan(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    PEMOHON DOKUMEN
                  </label>
                  <Select isMulti options={options} />
                </div>
                <div
                  class="flex p-4 mb-4 text-sm text-black-900 rounded-lg bg-blue-300 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  <svg
                    class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">
                      CATATAN : Bayi belum punya NIK / Masuk KK dan status KTP
                      Orang Tua sudah kawin, Pelapor adalah Orang Tua kandung
                      Silahkan download dan isi form dibawah dengan benar
                      (sesuai dengan data yang dibutuhkan), kemudian upload foto
                      form yang telah di isi sesuai dengan bagian persyaratan
                      yang dimaksud.
                    </span>
                    <ul class="mt-1.5 list-disc list-inside">
                      <li>
                        {" "}
                        <a href="https://www.w3schools.com" target="_blank">
                          Form F-1.01
                        </a>{" "}
                      </li>
                      <li> Form F-2.01 Kelahiran</li>
                      <li>Form F-2.04 SPJTM Kebenaran Suami Istri</li>
                      <li>Form F-2.03 SPJTM Kebenaran Kelahiran</li>
                    </ul>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      KK ASLI (PNG,JPG,JPEG)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusClick}
                      >
                        {showInput ? "-" : "+"}
                      </div>
                    </div>
                    {showInput && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Akta Lahir ASLI (PNG,JPG,JPEG)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusClick}
                      >
                        {showInput ? "-" : "+"}
                      </div>
                    </div>
                    {showInput && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Foto berwarna (jika anak usia di atas 5 tahun)
                      (PNG,JPG,JPEG)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />

                      <div
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={handlePlusClick}
                      >
                        {showInput ? "-" : "+"}
                      </div>
                    </div>
                    {showInput && (
                      <div className="flex mb-4 space-x-2.5">
                        <input
                          className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="multiple_files"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 text-white bg-green-500 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
}

export default KiaWeb;
