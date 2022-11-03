/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";

function Login() {
  document.title = "In Hand App - Login";

  //token
  const token = Cookies.get("token");

  //history
  const history = useHistory();

  const dataNip = localStorage.getItem("nip");

  //state user logged in
  const [user, setUser] = useState({});

  const status = localStorage.getItem("status");

  const [isLoading, setLoading] = useState(false);

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
        // console.log("data", response);
        //set data response to state "categories"
        setUser(response.data.data.data_user);
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

  const logoutHandler = async (e) => {
    //remove token and localstorage
    Cookies.remove("token");
    localStorage.clear();

    //show toast
    toast.success("Logout Successfully.", {
      duration: 4000,
      position: "top-right",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    //redirect login page
    history.push("/");
  };

  return (
    <React.Fragment>
      <LayoutWeb>
        <>
          <div className="pt-20 pb-20">
            <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
              <div className="p-5 rounded-md shadow-md bg-red-50">
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

                {token ? (
                  <>
                    <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-300 rounded-md shadow-sm">
                      <div class="col-span-5">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>{" "}
                        <img
                          src={require("../../../assets/images/programmer.png")}
                          width="30"
                          className="inline-block mb-2 mr-1"
                        />{" "}
                        {isLoading ? "LOADING..." : ""} {user.nama}{" "}
                      </div>
                    </div>
                    <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-300 rounded-md shadow-sm">
                      <div class="col-span-5">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>{" "}
                        <img
                          src={require("../../../assets/images/id-card.png")}
                          width="30"
                          className="inline-block mb-2 mr-1"
                        />{" "}
                        {isLoading ? "LOADING..." : ""} {user.nik}{" "}
                      </div>
                    </div>
                    <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-300 rounded-md shadow-sm">
                      <div class="col-span-5">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>{" "}
                        <img
                          src={require("../../../assets/images/gmail.png")}
                          width="30"
                          className="inline-block mb-2 mr-1"
                        />{" "}
                        {user.email_gov}
                      </div>
                      
                    </div>
                    <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-300 rounded-md shadow-sm">
                      <div class="col-span-5">
                        <i class="fa fa-user-circle" aria-hidden="true"></i>{" "}
                        <img
                          src={require("../../../assets/images/phone.png")}
                          width="30"
                          className="inline-block mb-2 mr-1"
                        />{" "}
                        {isLoading ? "LOADING..." : ""} {user.nomor_hp}{" "}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center underline decoration-1">
                      PILIH MASUK AKUN
                    </div>
                    <div className="mt-3 mb-2 border-2 border-stone-500"></div>
                    <Link to="/admin/login/pegawai">
                      <div>
                        <button className="inline-block w-full px-3 py-1 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-stone-900">
                          <img
                            src={require("../../../assets/images/business.png")}
                            width="30"
                            className="inline-block mb-2 mr-1"
                          />{" "}
                          Masuk Sebagai Pegawai
                        </button>
                      </div>
                    </Link>
                    <div className="mt-3 mb-2 border-2 border-stone-500"></div>
                    <Link to="/admin/login/umum">
                      <div>
                        <button className="inline-block w-full px-3 py-1 text-xl text-white rounded-md shadow-md bg-slate-500 focus:outline-none focus:bg-stone-400">
                          <img
                            src={require("../../../assets/images/team.png")}
                            width="30"
                            className="inline-block mb-2 mr-2"
                          />{" "}
                          Masuk Sebagai Warga
                        </button>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
            {token ? (
              <div onClick={logoutHandler} className="mt-5 text-center">
                <button className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700">
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-5 text-center">
                Belum punya akun ?{" "}
                <Link to="/admin/register" className="text-blue-600 underline">
                  Daftar Sekarang !
                </Link>
              </div>
            )}
          </div>
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Login;
