/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";

function ConfirmWeb() {
  document.title = "In Hand App - Tanda Trima";

  // const dataPribadi = JSON.parse(localStorage.getItem("data"));
  const fmkode = JSON.parse(localStorage.getItem("kode"));
  const isi_tb = JSON.stringify(localStorage.getItem("testingDatas"));

  const kodes = JSON.stringify(fmkode.map((kd) => kd.kode));
  const tbs = JSON.stringify(fmkode.map((kd) => kd.tb));
  const title = JSON.stringify(fmkode.map((kd) => kd.title));

  //state loading
  const [isLoading, setLoading] = useState(false);

  //history
  const history = useHistory();

  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [nomorhp, setNomorhp] = useState("");
  // console.log(nomorhp);

  const dataNip = localStorage.getItem("data");

  const [dataUser, setdataUser] = useState({});
  console.log("datauserss", dataUser);

  const [loading, setIsLoading] = useState(false);

  const [validation, setValidation] = useState({});

  const fetchData = async () => {
    await Api.get(
      `/profile2?nip_nik=${dataNip.replaceAll('"', "")}&status=${2}`,
      {
        headers: {
          //header Bearer + Token
          // Authorization: `Bearer ${token}`,
          objects: "/profile",
          statusUsers: 2,
        },
      }
    )
      .then((response) => {
        setIsLoading(false);
        //set data response to state "categories"
        // console.log(response);
        setdataUser(response.data.success);
        setNik(response.data.data.data_user.nik);
        setNama(response.data.data.data_user.nama);
        setAlamat(response.data.data.data_user.alamat);
        setRt(response.data.data.data_user.rt);
        setRw(response.data.data.data_user.rw);
        setKelurahan(response.data.data.data_user.kelurahan);
        setKecamatan(response.data.data.data_user.kecamatan);
        setNomorhp(response.data.data.data_user.nomor_hp);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
        setValidation(error.response.data);
      });
  };

  //hook
  useEffect(() => {
    //call function "fetchDataUser"
    fetchData();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storePermohonan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("field_nik", nik);
    formData.append("field_nama", nama);
    formData.append("field_alamat", alamat);
    formData.append("field_rt", rt);
    formData.append("field_rw", rw);
    formData.append("field_kelurahan", kelurahan);
    formData.append("field_kecamatan", kecamatan);
    formData.append("field_no_whatsapp_penduduk", nomorhp);
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
          position: "top-center",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        history.push("/web/sipulWeb");
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };
  return (
    <React.Fragment>
      <div className="pt-20 pb-20">
        <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
          <nav arial-aria-label="Black">
            <Link to={"/web/listFormWeb"}>
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
          <div className="object-center"></div>
          <div className="card-body">
            <div className="col-span-4">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {validation.msg && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.msg}
                    </div>
                  )}
                  {dataUser === true ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <form onSubmit={storePermohonan}>
                        <div className="p-4 overflow-visible bg-gray-50">
                          <div className="flow-root ...">
                            <div className="text-center underline decoration-1">
                              Anda Sudah Telah pengisan Form Silahkan Submit
                              untuk Konfirmasi
                            </div>
                          </div>

                          <br />
                          <div className="p-3 mb-3 bg-gray-200 rounded shadow-md">
                            <div className="mb-5 text-base font-bold">
                              Atas Nama : {nama}
                            </div>
                            <div className="mb-5 text-base font-bold">
                              No Whatsapp : {nomorhp}
                            </div>
                            <div className="mb-5 text-base font-bold">
                              Jenis Surat :{" "}
                              {title
                                .replace("[", "")
                                .replace("]", "")
                                .replace('"', "")
                                .replace('"', "")}
                            </div>

                            <div className="text-sm italic text-right text-gray-500"></div>
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
                  ) : (
                    <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
                      <div className="text-center underline decoration-1">
                        <img
                          src={require("../../../assets/images/Group 89.png")}
                          width="50"
                          className="inline-block mb-2"
                        />
                        <br></br>
                        <strong>Opps...!</strong> Anda Belum Bisa .
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ConfirmWeb;
