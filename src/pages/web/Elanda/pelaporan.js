import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";

function Pelaporan() {
  document.title = "E-landa - Rekomendasi Iji Penelitian";
  const [dataUser, setDataUser] = useState("");
  const namaData = dataUser.nama;
  const alamatData = dataUser.alamat;
  const kelurahanData = dataUser.kelurahan;
  const kecamatanData = dataUser.kecamatan;

  const [nik, setNik] = useState("");
  const [tipe, setTipe] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [noHP, setNoHP] = useState("");
  const [email, setEmail] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [jenisLaporan, setJenisLaporan] = useState("");

  const handleJenisChange = (event) => {
    setJenisLaporan(event.target.value);
  };

  const handlePilihanChange = (event) => {
    setTipe(event.target.value);
    setNama("");
    setAlamat("");
    setKecamatan("");
    setKelurahan("");

    if (event.target.value === "awal") {
      window.location.reload();
    }
  };

  const handleCheckNik = async (e) => {
    e.preventDefault();
    setLoading(true);
    await Api.post("/elanda/cek-nik", {
      id: nik,
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);
        //show toast
        // const status = response.data.success
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
          setDataUser(response.data.data);
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

  const [imagekitas, setImagekitas] = useState("");

  const handleFileChange = (e) => {
    const imageData = e.target.files[0];

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

  const [doc, setDoc] = useState("");

  const handleFileDoc = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("pdf.*")) {
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
    setDoc(imageData);
  };

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          z
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
              <div className="mb-3 text-center">
                Pelaporan Situasi dan Kondusifitas Wilayah
              </div>
              <form>
                <div className="mb-4 ">
                  <select
                    value={jenisLaporan}
                    className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                    onChange={handleJenisChange}
                  >
                    <option value="">-- Jenis Laporan --</option>
                    <option value="Politik">Politik</option>
                    <option value="Sosial">Sosial Budaya</option>
                    <option value="Ekonomi">Ekonomi</option>
                    <option value="Sara">Sara</option>
                    <option value="Lainya">Lainya</option>
                  </select>
                  {jenisLaporan === "Politik" && (
                    <p style={{ color: 'red' }}></p>
                  )}
                  {jenisLaporan === "Sosial" && (
                    <p style={{ color: 'red' }}>Terkait dengan kegiatan sosial budaya, tempat hiburan/karaoke</p>
                  )}
                  {jenisLaporan === "Ekonomi" && (
                    <p style={{ color: 'red' }}>Terkait dengan permasalahan ekonomi, perdagangan, persoalan PKL</p>
                  )}
                  {jenisLaporan === "Sara" && (
                    <p style={{ color: 'red' }}>Terkait dengan pendirian tempat ibadah, konflik antar kelompok masyarakat, golongan, suku</p>
                  )}
                  {jenisLaporan === "Lainya" && (
                    <p style={{ color: 'red' }}>Terkait dengan pencurian, perampokan, pembunuhan, mabuk, dan lainnya</p>
                  )}
                </div>
                <div className="mb-4 ">
                  <select
                    value={tipe}
                    className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                    onChange={handlePilihanChange}
                  >
                    <option value="awal">-- Asal Pemohon --</option>
                    <option value="Luar">Luar Kota Blitar</option>
                    <option value="Blitar">Kota Blitar</option>
                  </select>
                </div>
                <div className="flex mb-4 space-x-2.5">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setNik(e.target.value)}
                    value={nik}
                    placeholder="NIK"
                  />
                  <button
                    onClick={handleCheckNik}
                    className={
                      tipe === "Luar"
                        ? "hidden"
                        : "px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    }
                  >
                    Cek NIK
                  </button>
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={namaData || nama}
                    placeholder="Nama Anda"
                    onChange={(e) => setNama(e.target.value)}
                    disabled={tipe == "Blitar"}
                  />
                </div>

                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={alamatData || alamat}
                    placeholder="Alamat"
                    disabled={tipe == "Blitar"}
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={kelurahanData || kelurahan}
                    disabled={tipe == "Blitar"}
                    placeholder="Kelurahan"
                    onChange={(e) => setKelurahan(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={kecamatanData || kecamatan}
                    placeholder="Kecamatan"
                    disabled={tipe == "Blitar"}
                    onChange={(e) => setKecamatan(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={noHP}
                    placeholder="Nomor HP/WA"
                    onChange={(e) => setNoHP(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={deskripsi}
                    placeholder="Deskripsi Singkat Penelitian"
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                </div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                  for="file_input"
                >
                  Upload KTP/Identitas Lainnya JPG|PNG
                </label>
                <div className="flex mb-4">
                  <input
                    className="block w-full text-sm text-gray-900 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                  for="file_input"
                >
                  Upload Bukti Pendukung
                </label>
                <div className="flex mb-4">
                  <input
                    className="block w-full text-sm text-gray-900 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    onChange={handleFileDoc}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Pelaporan;