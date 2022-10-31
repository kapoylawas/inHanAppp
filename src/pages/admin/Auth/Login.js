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
      `/profile?nip_nik=${dataNip.replaceAll('"', "")}&status=${status}`,
      {
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      setLoading(false);
      // console.log(response);
      //set data response to state "categories"
      setUser(response.data.data);
    }).catch((error) => {
      setLoading(false);
      // setValidation(error.response.data);
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
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="p-5 rounded-md shadow-md bg-red-50">
              <div className="object-center">
                <section className="container max-w-screen-lg pb-10 mx-auto hero">
                  <img
                    class="mx-auto"
                    width="100"
                    height="100"
                    src={require("../../../assets/blitarcirclecop.png")}
                  />
                </section>
              </div>

              {token ? (
                <div
                  class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                  role="alert"
                >
                  <div class="flex">
                    <div class="py-1">
                      <svg
                        class="fill-current h-6 w-6 text-teal-500 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-bold">Selamat Datang</p>
                      <p class="text-sm">
                      {isLoading ? "LOADING..." : "SUBMIT"}{" "}
                      {user.nama}
                      </p>
                    </div>
                  </div>
                </div>
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
          <div onClick={logoutHandler} class="mt-5 text-center">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
            Logout
            </button>
          </div>
          ) : (
          <div class="mt-5 text-center">
            Belum punya akun ?{" "}
            <Link to="/admin/register" class="text-blue-600 underline">Daftar Sekarang !</Link>
          </div>
          )}
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Login;
