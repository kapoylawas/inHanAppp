/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";
import Cookies from "js-cookie";

function KirimPengaduan() {
  document.title = "In Hand App - Pengaduan";

  // const [pengirim, setPengirim] = useState("");
  // const [no_telp, setNotelp] = useState("");
  // const [nik, setNik] = useState("");
  // const [email, setEmail] = useState("");
  // const [alamat, setAlamat] = useState("");
  // const [tgl_lapor, setTgllapor] = useState("");
  const [isi_pesan, setIsipesan] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //state loading
  const [isLoading, setLoading] = useState(false);

  //history
  const history = useHistory();

  const token = Cookies.get("token");

  const status = localStorage.getItem("status");

  const storePermohonan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("pengirim", namaUser);
    formData.append("no_telp", notlpn);
    formData.append("email", email);
    formData.append("alamat", alamat);
    formData.append("isi_pesan", isi_pesan);
    formData.append("nik", nik);
    // formData.append("tgl_lapor", tgl_lapor);

    await Api.post("/ulpim/insert-pengaduan", formData, {
      // header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/ulpim/insert-pengaduan",
        statusUsers: status,
      },
    })
      .then((response) => {
        setLoading(false);
        // console.log(response);
        //show toast
        toast.success("Data Anda Success Disimpan Tunggu Respon Selanjutnya", {
          duration: 10000,
          position: "top-center",
          style: {
            borderRadius: "20px",
            background: "#333",
            color: "#fff",
          },
        });

        history.push("/web/ulpim");
      })
      .catch((error) => {
        setLoading(false);
        setValidation(error.response.data);
      });
  };

  const dataNip = localStorage.getItem("nip");
  const [namaUser, setNamaUser] = useState("");
  const [notlpn, setNotlpn] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [nik, setNik] = useState("");
  console.log(nik);

  const fetchData = async () => {
    await Api.get(
      `/profile2?nip_nik=${dataNip.replaceAll('"', "")}&status=${status}`,
      {
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
          objects: "/profile",
          statusUsers: status,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        //set data response to state "categories"
        console.log(response);
        setNik(response.data.data.data_user.nik);
        setNamaUser(response.data.data.data_user.nama);
        setAlamat(response.data.data.data_user.alamat);
        setEmail(response.data.data.data_user.email);
        setNotlpn(response.data.data.data_user.nomor_hp);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  //hook
  useEffect(() => {
    //call function "fetchDataUser"

    fetchData();
    setLoading(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <LayoutWeb>
        <>
          <div className="pt-20 pb-20">
            <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
              <div>
                <section className="container max-w-screen-lg pb-10 mx-auto hero">
                  <div className="p-5 rounded-md shadow-md bg-gray-50">
                    <img
                      className="mx-auto"
                      width="100"
                      height="100"
                      src={require("../../../assets/blitarcirclecop.png")}
                    />
                    <br></br>
                    <form onSubmit={storePermohonan}>
                      {validation.msg && (
                        <div
                          className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                          role="alert"
                        >
                          {validation.msg}
                        </div>
                      )}
                      {/* <div className="mb-5">
                        <label className="mt-2">Pengirim</label>
                        <input
                          value={pengirim}
                          onChange={(e) => setPengirim(e.target.value)}
                          type="text"
                          className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                          placeholder="Nama Sesuai Identitas Asli"
                          required
                        />
                      </div> */}
                      {/* <div className="mb-5">
                        <label className="mt-2">No tpln</label>
                        <input
                          value={no_telp}
                          onChange={(e) => setNotelp(e.target.value)}
                          type="number"
                          className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                          placeholder="No Handphone"
                          required
                        />
                      </div> */}
                      {/* <div className="mb-5">
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
                      </div> */}
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
                      {/* <div className="mb-5">
                        <label className="mt-2">Tanggal Laporan</label>
                        <input
                          value={tgl_lapor}
                          onChange={(e) => setTgllapor(e.target.value)}
                          type="date"
                          className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                          required
                        ></input>
                      </div> */}
                      {/* <div className="mb-5">
                        <label className="mt-2">NIK</label>
                        <input
                          value={nik}
                          onChange={(e) => setNik(e.target.value)}
                          type="number"
                          className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                          required
                        ></input>
                      </div> */}
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
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default KirimPengaduan;
