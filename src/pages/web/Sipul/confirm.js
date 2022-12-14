/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";

function Confirm() {
  document.title = "In Hand App - Tanda Trima";

  const dataPribadi = JSON.parse(localStorage.getItem("data"));
  const fmkode = JSON.parse(localStorage.getItem("kode"));
  const isi_tb = JSON.stringify(localStorage.getItem("testingDatas"));

  const kodes = JSON.stringify(fmkode.map((kd) => kd.kode));
  const tbs = JSON.stringify(fmkode.map((kd) => kd.tb));
  const title = JSON.stringify(fmkode.map((kd) => kd.title));

  const nik = dataPribadi.nik;
  const nama = dataPribadi.nama;
  const alamat = dataPribadi.alamat;
  const field_rt = dataPribadi.rt;
  const field_rw = dataPribadi.rw;
  const field_kelurahan = dataPribadi.kelurahan;
  const kecamatan = dataPribadi.kecamatan;
  const field_no_whatsapp_penduduk = dataPribadi.nowa;

  //   console.log("nik", nik);
  //   console.log("nama", nama);
  //   console.log("alamat", alamat);
  //   console.log("field_rt", field_rt);
  //   console.log("field_rw", field_rw);
  //   console.log("field_kelurahan", field_kelurahan);
  //   console.log("field_kecamatan", kecamatan);
  //   console.log("field_no_whatsapp_penduduk", field_no_whatsapp_penduduk);

  //   console.log(
  //     "tb",
  //     tbs.replace("[", "").replace("]", "").replace('"', "").replace('"', "")
  //   );
  //   console.log("isi_tb", isi_tb);
  //   console.log(
  //     "idtb",
  //     kodes.replace("[", "").replace("]", "").replace('"', "").replace('"', "")
  //   );

  //state loading
  const [isLoading, setLoading] = useState(false);

  //history
  const history = useHistory();

  const storePermohonan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("field_nik", nik);
    formData.append("field_nama", nama);
    formData.append("field_alamat", alamat);
    formData.append("field_rt", field_rt);
    formData.append("field_rw", field_rw);
    formData.append("field_kelurahan", field_kelurahan);
    formData.append("field_kecamatan", kecamatan);
    formData.append("field_no_whatsapp_penduduk", field_no_whatsapp_penduduk);
    formData.append(
      "tb",
      tbs.replace("[", "").replace("]", "").replace('"', "").replace('"', "")
    );
    formData.append("isi_tb", isi_tb);
    formData.append(
      "id_tb",
      kodes.replace("[", "").replace("]", "").replace('"', "").replace('"', "")
    );

    await Api.post("/silpusitron/insert", formData, {
      // header
        headers: {
          //header Bearer + Token
          objects: "/silpusitron/insert",
        },
    })
      .then((response) => {
        console.log(response);
        setLoading(false);
        //show toast
        toast.success("Data Sipul Anda Sudah Terkirim", {
          duration: 9000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        history.push("/web/lainya");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data);
      });
  };
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
          <div>
              <nav arial-aria-label="Black">
                <Link to={"/web/listForm"}>
                  <a
                    class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                    href="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Kembali
                  </a>
                </Link>
              </nav>
            </div>
            <div className="object-center">
              <section className="container max-w-screen-lg pb-10 mx-auto hero">
                <img
                  className="mx-auto"
                  width="100"
                  height="100"
                  src={require("../../../assets/blitarcirclecop.png")}
                />
              </section>
            </div>
            <div className="card-body">
              <div className="col-span-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <form onSubmit={storePermohonan}>
                    <div className="p-4 overflow-visible bg-gray-50">
                      <div className="flow-root ...">
                        <div className="text-center underline decoration-1">
                            Anda Sudah Telah pengisan Form Silahkan Submit untuk Konfirmasi
                        </div>
                      </div>
                      <br />
                      <div className="p-3 mb-3 bg-gray-200 rounded shadow-md">
                        <div className="mb-5 text-base font-bold">
                          Atas Nama : {dataPribadi.nama}
                        </div>
                        <div className="mb-5 text-base font-bold">
                          No Whatsapp : {dataPribadi.nowa}
                        </div>
                        <div className="mb-5 text-base font-bold">
                          Jenis Surat : {title.replace("[", "").replace("]", "").replace('"', "").replace('"', "")}
                        </div>

                        <div className="text-sm italic text-right text-gray-500">
                          
                        </div>
                      </div>
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
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Confirm;
