/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";

function LoginUmum() {
  document.title = "Login Pegawai";

  // STATE LOGIN
  const [nik, setNik] = useState([]);
  const [no_kk, setNokk] = useState("");

  useEffect(() => {
    localStorage.setItem("nip", JSON.stringify(nik));
  }, [nik]);

  //state loading
  const [isLoading, setLoading] = useState(false);

  //state validation
  const [validation, setValidation] = useState({});

  //history
  const history = useHistory();

  const loginHandler = async (e) => {
    e.preventDefault();

    //set state isLoading to "true"
    setLoading(true);

    await Api.post("/login/umum", {
      nik: nik,
      no_kk: no_kk,
      platform: 1,
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);

        //show toast
        toast.success("Verif Nik Successfully.", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        console.log(response);
        //redirect dashboard page
        history.push("/admin/login/verifikasiUmum");
      })
      .catch((error) => {
        //set state isLoading to "false"
        setLoading(false);

        //set error response validasi to state "validation"
        setValidation(error.response.data);
      });
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
                <div className="text-center underline decoration-1">
                  MASUK AKUN
                </div>
                <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                <form onSubmit={loginHandler}>
                  {validation.msg && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.msg}
                    </div>
                  )}
                  <div className="mb-5">
                    <label className="mt-2">NIK</label>
                    <input
                      type="number"
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="No Identitas Kependudukan"
                    />
                  </div>
                  {validation.nik && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.nik[0]}
                    </div>
                  )}
                  <div className="mb-5">
                    <label className="mt-2">No KK</label>
                    <input
                      type="number"
                      value={no_kk}
                      onChange={(e) => setNokk(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="No Kartu Keluarga"
                    />
                  </div>
                  {validation.no_kk && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.no_kk[0]}
                    </div>
                  )}
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
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default LoginUmum;
