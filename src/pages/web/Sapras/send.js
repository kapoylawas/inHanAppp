import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";

function Send() {
  document.title = "i-Sarpras - Pengaduan Prasana";

  const [nik, setNik] = useState("");
  const [nameSarpras, setNameSarpras] = useState("");
  const [kategoris, setKategori] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [phone, setPhone] = useState("");
  const [keteranganRusak, setKeteranganRusak] = useState("");
  const [keteranganLokasi, setKeteranganLokasi] = useState("");
  const [isLoading, setLoading] = useState(false);

  const status = localStorage.getItem("status");
  const token = Cookies.get("token");
  const history = useHistory();
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

  const storeSarpras = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nik", nik);
    formData.append("nama_sarpras", nameSarpras);
    formData.append("kategori_sarpras", selectedCategory);
    formData.append("phone", phone);
    formData.append("keterangan_kerusakan", keteranganRusak);
    formData.append("keterangan_lokasi", keteranganLokasi);
    formData.append("foto_laporan", imagekitas);
    await Api.post("/isarpras/store-laporan", formData, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/isarpras/store-laporan",
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

  const handleCategoryChange = (event) => {
    // Memperbarui state ketika kategori dipilih
    setSelectedCategory(event.target.value);
  };

  const fetchDataKategori = async () => {
    await Api.get(`/isarpras/get-kategori`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/isarpras/get-kategori",
        statusUsers: status,
      },
    })
      .then((response) => {
        setLoading(false);
        setKategori(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchDataKategori();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
              <form onSubmit={storeSarpras}>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setNik(e.target.value)}
                    value={nik}
                    placeholder="NIK"
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setNameSarpras(e.target.value)}
                    value={nameSarpras}
                    placeholder="Nama Sarpras"
                  />
                </div>
                <div className="mb-5">
                  <select
                    value={selectedCategory}
                    className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                    onChange={handleCategoryChange}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {kategoris.map((kategori) => (
                      <option value={kategori.id_kategori} key={kategori.id}>
                        {kategori.nama_kategori}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    placeholder="No Hp/Whatsapp"
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setKeteranganRusak(e.target.value)}
                    value={keteranganRusak}
                    placeholder="Keterangan Kerusakan"
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setKeteranganLokasi(e.target.value)}
                    value={keteranganLokasi}
                    placeholder="Keterangan Lokasi"
                  />
                </div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                  for="file_input"
                >
                  Upload Screenshot JPG|PNG
                </label>
                <div className="flex mb-4">
                  <input
                    className="block w-full text-sm text-gray-900 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    onChange={handleFileChange}
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

export default Send;
