/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import LayoutWeb from "../../../layouts/web";
import Api from "../../../api";
import Cookies from "js-cookie";

function FormPermohonan() {
  document.title = "In Hand App - Permohonan";

  const data = [
    {
      id: 1,
      name: "perorangan",
    },
    {
      id: 2,
      name: "lembaga",
    },
  ];

  const [permohonan, setPermohonan] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [imagekitas, setImagekitas] = useState("");
  // console.log(imagekitas);
  const [akta, setAkta] = useState("");
  // console.log(akta);
  const [work, setWork] = useState("");

  //state categories
  const [categories] = useState(data);

  //state validation
  const [validation] = useState({});

  //state loading
  const [isLoading, setLoading] = useState(false);

  //history
  const history = useHistory();

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

  const handleFileAkta = (e) => {
    const file = e.target.files[0];

    if (!file.type.match("zip.*|pdf.*")) {
      setAkta("");

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
    setAkta(file);
  };

  const handleshowhide = (event) => {
    const getType = event.target.value;
    setPermohonan(getType);
  };

  const { id } = useParams();

  //token
  const token = Cookies.get("token");

  const status = localStorage.getItem("status");

  const dataNip = localStorage.getItem("nip");

  const [namaUser, setNamaUser] = useState({});
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [notlpn, setNotlpn] = useState("");

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
    if (token) {
      fetchData();
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storePermohonan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("kategori", permohonan);
    formData.append("nik", dataNip);
    formData.append("tujuan", tujuan);
    formData.append("nama", namaUser);
    formData.append("email", email);
    formData.append("kitas", imagekitas);
    formData.append("akta", akta);
    formData.append("notlpn", notlpn);
    formData.append("work", work);
    formData.append("alamat", alamat);
    formData.append("id_informasi", id);

    await Api.post("/ppid/permohonan-informasi-publik", formData, {
      // header

      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        objects: "/ppid/permohonan-informasi-publik",
        statusUsers: status,
        lat: 1,
        lng: 2,
      },
    })
      .then((response) => {
        setLoading(false);
        // console.log(response);
        //show toast
        toast.success("Data Saved Successfully!", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        localStorage.setItem("data", JSON.stringify(response.data.data));
        history.push("/web/tandaTrima");
      })
      .catch((error) => {
        setLoading(false);
        console.log("err", error);
        // setValidation(error.response.data);
      });
  };
  return (
    <React.Fragment>
      <LayoutWeb>
        <>
          <div className="pt-20 pb-20">
            <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
              <section className="container max-w-screen-lg pb-10 mx-auto hero">
                <div className="p-5 rounded-md shadow-md bg-red-50">
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
                    <div className="mb-5">
                      <label className="mt-5">Kategori Permohonan</label>
                      <select
                        value={permohonan}
                        className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                        onChange={(e) => handleshowhide(e)}
                      >
                        <option value="">-- Tipe Pengaduan --</option>
                        {categories.map((category) => (
                          <option value={category.name} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  
                    <div className="mb-5">
                      <label className="mt-2">
                        Tujuan Penggunaan Informasi
                      </label>
                      <textarea
                        type="text"
                        value={tujuan}
                        onChange={(e) => setTujuan(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="No Identitas Kependudukan"
                        rows="5"
                      />
                    </div>
                    
                    <div className="mb-5">
                      <label
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-900"
                        for="file_input"
                      >
                        Unggah KTP/KITAS Pimpinan
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <p className="mt-1 text-sm text-gray-500 dark:text-red-600">
                        (diupload jpg, jpeg, png dan maksimal 2MB. *Pemberian
                        Watermark pada file lebih dianjurkan).
                      </p>
                    </div>
                    {validation.kitas && (
                      <div
                        className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                        role="alert"
                      >
                        {validation.kitas[0]}
                      </div>
                    )}

                    {/* file 2 */}
                    {permohonan === "lembaga" && (
                      <div className="mb-5">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                          for="file_input"
                        >
                          Upload Akta Notaris Lembaga / Organisasi
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          type="file"
                          onChange={handleFileAkta}
                        />
                        <p className="mt-1 text-sm text-gray-500 dark:text-red-600">
                          diupload pdf, zip, rar dan maksimal 5MB.
                        </p>
                      </div>
                    )}

                    {/* <div className="mb-5">
                      <label className="mt-2">Alamat</label>
                      <textarea
                        type="text"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Alamat Lengkap"
                        rows="5"
                      />
                    </div> */}

                    {/* <div className="mb-5">
                      <label className="mt-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="Alamat Email"
                      />
                    </div> */}
                    {/* <div className="mb-5">
                      <label className="mt-2">No Telepon</label>
                      <input
                        type="number"
                        value={notlpn}
                        onChange={(e) => setNotlpn(e.target.value)}
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="No Telepon"
                      />
                    </div> */}
                    <div className="mb-5">
                      <label className="mt-2">Pekerjaan</label>
                      <input
                        type="text"
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                        className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                        placeholder="Pekerjaan"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                      >
                        {" "}
                        {isLoading ? "LOADING..." : "SUBMIT"}{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default FormPermohonan;
