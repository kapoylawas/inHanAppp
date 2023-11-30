import React, { useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";
import Modal from "react-modal";

function Pendaftaran() {
  document.title = "Sipak - Pendaftaran";

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [telpon, setTelpon] = useState("");

  const history = useHistory();
  const status = localStorage.getItem("status");
  const token = Cookies.get("token");
  const [isLoading, setLoading] = useState(false);

  const storePendaftaran = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nik", nik);
    formData.append("email", email);
    formData.append("telepon", telpon);
    await Api.post("/sipak/pendaftaran", formData, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/sipak/pendaftaran",
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
          history.push("/web/lainya");
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
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="Overlay"
          >
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-xl font-semibold">Pemberitahuan</h2>
            </div>
            <div
              className="px-4 py-3 text-teal-900 bg-teal-100 border-t-4 border-teal-500 rounded-b shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="w-6 h-6 mr-4 text-teal-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">CATATAN PENDAFTARAN</p>
                  <p className="text-sm">
                    Masukan informasi yang diminta dan pastikan data yang Anda
                    input benar. Gunakan email aktif Anda untuk proses
                    pendaftaran.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3" role="alert">
              <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">
                INFORMASI PENTING
              </div>
              <div className="px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
                <p>
                  Barang siapa dengan sengaja melakukan pemalsuan identitas diri
                  atau dokumen terhadap instansi pelaksana, maka dapat terancam
                  hukuman pidana 6 tahun dan atau denda sebesar 50 Juta Rupiah"
                  - Undang-Undang No.23 Tahun 2006 Bab 12.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </Modal>
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
              <div className="mb-3 text-center">FORM PENDAFTARAN PEMOHON</div>
              <form onSubmit={storePendaftaran}>
                <div className="flex mb-4 space-x-2.5">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setNik(e.target.value)}
                    value={nik}
                    placeholder="Input NIK Anda"
                  />
                </div>
                <div className="flex mb-4 space-x-2.5">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Input Email Anda"
                  />
                </div>
                <div className="flex mb-4 space-x-2.5">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setTelpon(e.target.value)}
                    value={telpon}
                    placeholder="Input NOMOR WHATSAPP Anda"
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

export default Pendaftaran;
