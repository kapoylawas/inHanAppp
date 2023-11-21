import React, { useState } from "react";
import LayoutWeb from "../../../layouts/web";
import { toast } from "react-hot-toast";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function AduanWeb() {
  const [nip, setNip] = useState("");
  const [noHp, setNoHp] = useState("");
  const [namaAplikasi, setNamaAplikasi] = useState("");
  const [alasan, setAlasan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [dataUser, setDataUser] = useState("");
  console.log("data orang =>", dataUser);
  //state loading
  const [isLoading, setLoading] = useState(false);
  const [imagekitas, setImagekitas] = useState("");

  const handleCheckNik = async (e) => {
    e.preventDefault();
    setLoading(true);
    await Api.post("/eaptika/get-pemohon", {
      nip: nip,
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);
        console.log("data => ", response.data.data.success);
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

  const status = localStorage.getItem("status");
  const token = Cookies.get("token");
  const history = useHistory();

  const storePengaduan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nip", nip);
    formData.append("no_hp", noHp);
    formData.append("nm_apl", namaAplikasi);
    formData.append("alasan", alasan);
    formData.append("alamat", dataUser.alamat);
    formData.append("gambar", imagekitas);
    formData.append("keterangan", keterangan);
    await Api.post("/eaptika/store-aduan", formData, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/eaptika/store-aduan",
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
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="container p-5 mx-auto bg-gray-100 rounded-md shadow-md">
              <form onSubmit={storePengaduan}>
                <div className="flex mb-4 space-x-2.5">
                  <input
                    type="text"
                    id="nip"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setNip(e.target.value)}
                    value={nip}
                    placeholder="NIK (Kontak Person)"
                  />

                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    onClick={handleCheckNik}
                  >
                    Cek NIK
                  </button>
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setNoHp(e.target.value)}
                    value={dataUser.nama}
                    placeholder="Nama (kontak person)"
                    disabled
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setNoHp(e.target.value)}
                    value={noHp}
                    placeholder="No Hanphone"
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setNamaAplikasi(e.target.value)}
                    value={namaAplikasi}
                    placeholder="Nama Aplikasi"
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setAlasan(e.target.value)}
                    value={alasan}
                    placeholder="Alasan"
                  />
                </div>
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setAlamat(e.target.value)}
                    value={dataUser.alamat}
                    placeholder="Alamat"
                    disabled
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
                <div className="flex mb-4">
                  <input
                    type="text"
                    className="flex-1 p-2 mt-1 border border-gray-300 rounded-md"
                    onChange={(e) => setKeterangan(e.target.value)}
                    value={keterangan}
                    placeholder="Keterangan/Penjelasan"
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

export default AduanWeb;
