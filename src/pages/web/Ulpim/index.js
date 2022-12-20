/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/web";
import { Link, useHistory } from "react-router-dom";
import Api from "../../../api";
import { toast } from "react-hot-toast";

function Ulpim() {
  document.title = "UlPIM - Pengaduan";

  const status = localStorage.getItem("status");
  // const cek = status;
  // const status = 2
  // console.log(status);

  const dataNip = localStorage.getItem("nip");
  const [opd, setOpd] = useState("");
  // console.log("opd pegawai :", opd);

  //history
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);

  const storeOpd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("opd", opd);

    await Api.post("/ulpim/pengaduan-belum-terjawab", formData, {
      // header
      headers: {
        objects: "/ulpim/pengadua-belum-terjawab",
      },
    })
      .then((response) => {
        //show toast
        setLoading(false);
        console.log("data :", response);
        toast.success("Berhasil Menampilkan Data Opd Anda", {
          duration: 10000,
          position: "top-center",
          style: {
            borderRadius: "20px",
            background: "#333",
            color: "#fff",
          },
        });

        localStorage.setItem("data-opd", JSON.stringify(response.data));
        history.push("/web/opdPegawai");
      })
      .catch((error) => {
        setLoading(false);
        console.log("err :", error);
      });
  };

  const [emailgov, setEmailgov] = useState("");
  // console.log(emailgov);

  const fetchData = async () => {
    await Api.get(
      `/profile2?nip_nik=${dataNip.replaceAll('"', "")}&status=${status}`,
      {
        headers: {
          objects: "/profile",
        },
      }
    )
      .then((response) => {
        //set data response to state "categories"
        // console.log(response);
        setOpd(response.data.data.data_user.opd);
        setEmailgov(response.data.data.data_user.email_gov);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //call function "fetchDataUser"
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                    <Link to="/web/dataUlpim">
                      <div>
                        <img
                          src={require("../../../assets/images/all.png")}
                          width="30"
                          className="inline-block mb-2"
                        />
                      </div>
                      Lihat Semua Pengaduan
                    </Link>
                    <br></br>
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-2 lg:col-span-2">
                    <Link to="/web/kirimPengaduan">
                      <div>
                        <img
                          src={require("../../../assets/images/message.png")}
                          width="30"
                          className="inline-block mb-2"
                        />
                      </div>
                      KIRIM PENGADUAN
                    </Link>
                  </div>
                </div>

                {emailgov ? (
                  <>
                    <div className="col-span-4">
                      <form onSubmit={storeOpd}>
                        <div className="col-span-4">
                          <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-2 lg:col-span-2">
                            <div>
                              <img
                                src={require("../../../assets/images/product.png")}
                                width="30"
                                className="inline-block mb-2"
                              />
                            </div>
                            <button type="submit">
                              {" "}
                              {isLoading
                                ? "LOADING..."
                                : "LIHAT PENGADUAN BY OPD"}{" "}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                ) : null}

                <div className="col-span-4">
                  <div className="col-span-2 p-4 text-xs text-center bg-gray-100 rounded-md shadow-md md:col-span-2 lg:col-span-2">
                    <Link to="/web/pengaduanOpd">
                      <div>
                        <img
                          src={require("../../../assets/images/product.png")}
                          width="30"
                          className="inline-block mb-2"
                        />
                      </div>
                      LIHAT PENGADUAN All OPD
                    </Link>
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                    <Link to="/web/pengaduanUser">
                      <div>
                        <img
                          src={require("../../../assets/images/contact-data.png")}
                          width="30"
                          className="inline-block mb-2"
                        />
                      </div>
                      Lihat Pengaduan Saya
                    </Link>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Ulpim;
