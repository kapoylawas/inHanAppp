/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";

function Rekom() {
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
  const [organisasi, setOrganisasi] = useState("");
  const [progamStudi, setProgamStudi] = useState("");
  const [jenis, setJenis] = useState("");
  const [nim, setNim] = useState("");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [dateAwal, setDateAwal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [instansis, setInstansis] = useState([]);
  const [selectedInstansis, setSelectedInstansis] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [isLoading, setLoading] = useState(false);

  console.log(dataUser);

  const handleshowhide = (event) => {
    const getType = event.target.value;
    setTipe(getType);
  };

  const handleshowhideJenis = (event) => {
    const getType = event.target.value;
    setJenis(getType);
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

  const status = localStorage.getItem("status");
  const token = Cookies.get("token");

  const handleCategoryChange = (event) => {
    // Memperbarui state ketika kategori dipilih
    setSelectedInstansis(event.target.value);
  };

  const fetchDataOpd = async () => {
    await Api.get(`/elanda/get-instansi`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/isarpras/get-kategori",
        statusUsers: status,
      },
    })
      .then((response) => {
        setLoading(false);
        setInstansis(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchDataOpd();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const [ktm, setKtm] = useState("");

  const handleFileKTM = (e) => {
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
    setKtm(imageData);
  };

  const history = useHistory();

  const storeElanda = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("warga", tipe);
    formData.append("email", email);
    formData.append("nama", namaData || nama);
    formData.append("alamat", alamatData || alamat);
    formData.append("kelurahan", kelurahanData || kelurahan);
    formData.append("kecamatan", kecamatanData || kecamatan);
    formData.append("organisasi", organisasi);
    formData.append("prodi", progamStudi);
    formData.append("nik", nik);
    formData.append("nim", nim);
    formData.append("nomor", noHP);
    formData.append("jenis", jenis);
    formData.append("keterangan", deskripsi);
    formData.append("judul", judul);
    formData.append("start", dateAwal);
    formData.append("end", endDate);
    formData.append("instansi", selectedInstansis);
    formData.append("tujuan", tujuan);
    formData.append("file1", imagekitas);
    formData.append("file2", doc);
    formData.append("file3", ktm);
    await Api.post("/elanda/store-ijin-penelitian", formData, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/elanda/store-ijin-penelitian",
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

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
              <div className="mb-3 text-center">
                Rekomendasi Ijin Penelitian
              </div>
              <form onSubmit={storeElanda}>
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
                    onChange={handleNamaChange}
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
                    value={organisasi}
                    placeholder="Asal Organisasi / Institusi / Perguruan Tinggi"
                    onChange={(e) => setOrganisasi(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={progamStudi}
                    placeholder="Program Studi"
                    onChange={(e) => setProgamStudi(e.target.value)}
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={nim}
                    placeholder="Nomer Identitas (NIM, NIK, Lainnya)"
                    onChange={(e) => setNim(e.target.value)}
                  />
                </div>
                <div className="mb-4 ">
                  <select
                    value={jenis}
                    className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                    onChange={(e) => handleshowhideJenis(e)}
                  >
                    <option value="">-- Jenis Penelitian --</option>
                    <option value="Survey">Survey</option>
                    <option value="KKN">KKN</option>
                    <option value="Magang">Magang</option>
                    <option value="TA">Tugas Akhir</option>
                  </select>
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={judul}
                    placeholder="Judul Penelitian"
                    onChange={(e) => setJudul(e.target.value)}
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
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Tanggal Awal Penelitian
                </label>
                <div className="flex mb-4">
                  <input
                    type="date"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={dateAwal}
                    onChange={(e) => setDateAwal(e.target.value)}
                  />
                </div>
                <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Tanggal Akhir Penelitian
                </label>
                <div className="flex mb-4">
                  <input
                    type="date"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <select
                    value={selectedInstansis}
                    className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                    onChange={handleCategoryChange}
                  >
                    <option value="">-- Pilih Instansi Penelitian--</option>
                    {instansis.map((instansi) => (
                      <option
                        value={instansi.id_instansi}
                        key={instansi.id_instansi}
                      >
                        {instansi.nama_instansi}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    value={tujuan}
                    onChange={(e) => setTujuan(e.target.value)}
                    placeholder="Lokasi / Sasaran yang dituju"
                  />
                </div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                  for="file_input"
                >
                  Upload Foto Pemohon (3x4) JPG|PNG
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
                  Upload Surat Pengantar Penelitian PDF
                </label>
                <div className="flex mb-4">
                  <input
                    className="block w-full text-sm text-gray-900 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    onChange={handleFileDoc}
                  />
                </div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                  for="file_input"
                >
                  Upload Kartu Mahasiswa/Identitas Lainnya JPG|PNG
                </label>
                <div className="flex mb-4">
                  <input
                    className="block w-full text-sm text-gray-900 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    onChange={handleFileKTM}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                    disabled={isLoading}
                  >
                    {" "}
                    {isLoading ? "LOADING..." : "SUBMIT"}{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Rekom;
