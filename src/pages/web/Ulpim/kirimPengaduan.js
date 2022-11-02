/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";

function KirimPengaduan() {
  document.title = "In Hand App - Pengaduan";

  const [pengirim, setPengirim] = useState("");
  const [no_telp, setNotelp] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [isi_pesan, setIsipesan] = useState("");
  const [tgl_lapor, setTgllapor] = useState("");
  const [nik, setNik] = useState("");

  //state validation
  const [setValidation] = useState({});

  //state loading
  const [isLoading, setLoading] = useState(false);

  //history
  const history = useHistory();

  const storePermohonan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("pengirim", pengirim);
    formData.append("no_telp", no_telp);
    formData.append("email", email);
    formData.append("alamat", alamat);
    formData.append("isi_pesan", isi_pesan);
    formData.append("tgl_lapor", tgl_lapor);
    formData.append("nik", nik);

    await Api.post("ulpim/insert-pengaduan", formData, {
      // header
    })
      .then((response) => {
        setLoading(false);
        //show toast
        toast.success("Data Anda Success Disimpan Tunggu Respon Selanjutnya Akan ada Notif WA!", {
          duration: 10000,
          position: "top-center",
          style: {
            borderRadius: "20px",
            background: "#333",
            color: "#fff",
          },
        });

        // localStorage.setItem("data", JSON.stringify(response.data.data));
        history.push("/web/ulpim");
      })
      .catch((error) => {
        setLoading(false);
        setValidation(error.response.data);
      });
  };
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div>
              <section className="container max-w-screen-lg pb-10 mx-auto hero">
                <div class="p-5 bg-red-50 rounded-md shadow-md">
                  <img
                    className="mx-auto"
                    width="100"
                    height="100"
                    src={require("../../../assets/blitarcirclecop.png")}
                  />
                  <br></br>
                  <form onSubmit={storePermohonan}>
                    <div className="mb-5">
                      <label className="mt-2">Pengirim</label>
                      <input
                        value={pengirim}
                        onChange={(e) => setPengirim(e.target.value)}
                        type="text"
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="Nama Sesuai Identitas Asli"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="mt-2">No tpln</label>
                      <input
                        value={no_telp}
                        onChange={(e) => setNotelp(e.target.value)}
                        type="number"
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="No Handphone"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="mt-2">Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="Alamat Email Aktif"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="mt-2">Alamat</label>
                      <textarea
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        type="text"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Alamat Domisili"
                        rows="5"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="mt-2">Laporan</label>
                      <textarea
                        value={isi_pesan}
                        onChange={(e) => setIsipesan(e.target.value)}
                        type="text"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Laporan"
                        rows="5"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="mt-2">Tanggal Laporan</label>
                      <input
                        value={tgl_lapor}
                        onChange={(e) => setTgllapor(e.target.value)}
                        type="date"
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        required
                      ></input>
                    </div>
                    <div className="mb-5">
                      <label className="mt-2">NIK</label>
                      <input
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        type="number"
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        required
                      ></input>
                    </div>
                    <button
                      type="submit"
                      className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                    >
                      {" "}
                      {isLoading ? "LOADING..." : "SUBMIT"}{" "}
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default KirimPengaduan;
