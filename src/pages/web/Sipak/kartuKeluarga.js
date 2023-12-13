import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import Select from "react-select";

function KartuKeluarga() {
  document.title = "Kartu Keluarga - Perubahan Data";

  const status = localStorage.getItem("status");
  const token = Cookies.get("token");
  const [isLoading, setLoading] = useState(false);

  const [dataForm, setDataForm] = useState("");
  const [nikpemohondokumen, setNikpemohondokumen] = useState([]);

  const nikpmhn = localStorage.getItem("nip");
  const stringNik = nikpmhn.replace(/"/g, "");
  const kkpmhn = localStorage.getItem("kk");
  const stringKk = kkpmhn.replace(/"/g, "");
  const nikpemohon = nikpemohondokumen;
  // console.log(nikpemohon);

  const formattedNikpmhnOptions = nikpemohon.map((item) => ({
    value: item.nik,
    label: item.nik, // Gantilah "nama" dengan properti yang sesuai dari data Anda
  }));

  const [selectedOption, setSelectedOption] = useState([null]);
  // console.log("dipilih",selectedOption);

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  const [persyaratanRaw, setPersyaratanRaw] = useState([]);

  const fetchData = async () => {
    await Api.get(
      `/sipak/get-form?id_produk_dokumen=4&id_jenis_permohonan=13&nik=${stringNik}&no_kk=${stringKk}`,
      {
        headers: {
          //header Bearer + Token
          // Authorization: `Bearer ${token}`,
          objects: "/isarpras/get-kategori",
          statusUsers: status,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        setDataForm(response.data.data);
        setNikpemohondokumen(response.data.data.nik_pemohon_dokumen);
        setPersyaratanRaw(response.data.data.persyaratan_raw);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

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

  const [kkasli, setKkasli] = useState("");

  const handleFileKkAsli = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setKkasli(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setKkasli("");

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
    setKkasli(imageData);
  };

  const [ijazah, setIjazah] = useState("");

  const handleFileIjazah = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setIjazah(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setIjazah("");

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
    setIjazah(imageData);
  };

  const [noakta, setNoakta] = useState("");

  const handleFilenoakta = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setNoakta(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setNoakta("");

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
    setNoakta(imageData);
  };

  const [lanjutan, setLanjutan] = useState("");

  const handleFilelanjutan = (e) => {
    const imageData = e.target.files[0];

    if (imageData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Lakukan sesuatu dengan base64String, misalnya simpan di state
        setLanjutan(base64String);
      };
      reader.readAsDataURL(imageData);
    }

    if (!imageData.type.match("image.*")) {
      setLanjutan("");

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
    setLanjutan(imageData);
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showInput, setShowInput] = useState(false);
  const handlePlusClick = () => {
    setShowInput(!showInput);
  };

  const [tipe, setTipe] = useState("");

  const handleshowhide = (event) => {
    const getType = event.target.value;
    setTipe(getType);
  };

  const syaratjml = dataForm.syarat_jml;
  const tmptkn = dataForm.temp_tkn;
  const idprodukdokumen = dataForm.id_produk_dokumen;
  const jenislayanan = dataForm.jenis_layanan;
  const jenispermohonan = dataForm.jenis_permohonan;
  const permohonandokumen = dataForm.permohonan_dokumen;

  console.log(jenislayanan);

  const history = useHistory();
  const storeSipak = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nik", stringNik);
    formData.append("email", "testing@gmail.com");
    formData.append("telepon", "085733517044");
    formData.append("syarat_jml", syaratjml);
    formData.append("temp_tkn", tmptkn);
    formData.append("id_produk_dokumen", idprodukdokumen);
    formData.append("jenis_layanan", jenislayanan);
    formData.append("jenis_permohonan", jenispermohonan);
    formData.append("jenis_pengambilan", tipe);
    formData.append("permohonan_dokumen", permohonandokumen);
    formData.append("nik_pemohon_dokumen", selectedOption);
    formData.append("ext_fileinput_1_1", imagekitas);
    formData.append("ext_fileinput_2_1", kkasli);
    formData.append("ext_fileinput_3_1", ijazah);
    formData.append("ext_fileinput_4_1", noakta);
    formData.append("ext_fileinput_5_1", lanjutan);
    formData.append("persyaratan_raw", persyaratanRaw);
    formData.append("no_kk", stringKk);

    await Api.post("/sipak/store-permohonan", formData, {
      headers: {
        //header Bearer + Token
        // Authorization: `Bearer ${token}`,
        objects: "/sipak/store-permohonan",
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
              <form onSubmit={storeSipak}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Jenis Layanan
                  </label>
                  <input
                    type="text"
                    value={jenislayanan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jenis Layanan"
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    JENIS PERMOHONAN
                  </label>
                  <input
                    type="text"
                    value={jenispermohonan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jenis Layanan"
                    required
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    PERMOHONAN DOKUMEN
                  </label>
                  <input
                    type="text"
                    value={jenispermohonan}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jenis Layanan"
                    required
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    NOMOR KK YANG BERSANGKUTAN
                  </label>
                  <input
                    type="text"
                    value={stringKk}
                    className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    PEMOHON DOKUMEN
                  </label>
                  <Select
                    isMulti
                    options={formattedNikpmhnOptions}
                    onChange={handleChange}
                  />
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
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Form F-1.06 FORMAT (PNG,JPG,JPEG)
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
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900">
                      KK ASLI (PNG,JPG,JPEG)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileKkAsli}
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
                          onChange={handleFileKkAsli}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Bukti Data yang dirubah (ijazah / akta lahir / buku nikah
                      / SK dari instansi) (PNG,JPG,JPEG)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFileIjazah}
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
                          onChange={handleFileIjazah}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Form F-1.05 (jika tidak mempunyai akta nikah)
                      (PNG,JPG,JPEG)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFilenoakta}
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
                          onChange={handleFilenoakta}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                      for="file_input"
                    >
                      Bukti Data yang dirubah - LANJUTAN (ijazah / akta lahir /
                      buku nikah / SK dari instansi)(PNG,JPG,JPEG)
                    </label>
                    <div className="flex mb-4 space-x-2.5">
                      <input
                        className="bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="multiple_files"
                        type="file"
                        multiple
                        onChange={handleFilelanjutan}
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
                          onChange={handleFilelanjutan}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-5">
                    <select
                      value={tipe}
                      className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                      onChange={(e) => handleshowhide(e)}
                    >
                      <option value="">-- PILIH JENIS PENGAMBILAN --</option>
                      <option value="Cetak Mandiri">Cetak Mandiri</option>
                      <option value="Diambil Sendiri">Diambil Sendiri</option>
                    </select>
                  </div>
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

export default KartuKeluarga;
