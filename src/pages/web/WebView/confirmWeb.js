/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../../api";

function ConfirmWeb() {
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
          // Authorization: `Bearer ${token}`,
          objects: "/silpusitron/insert",
        },
    })
      .then((response) => {
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
        history.push("/web/sipulWeb");
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <React.Fragment>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="object-center">
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
    </React.Fragment>
  );
}

export default ConfirmWeb;
