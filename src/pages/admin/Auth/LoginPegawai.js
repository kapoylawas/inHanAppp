/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";
import ReCAPTCHA from "react-google-recaptcha";

function LoginPegawai() {
  document.title = "Login Pegawai";

  // STATE LOGIN
  const [nip, setNip] = useState([]);
  const [finger_id, setFingerid] = useState("");

  useEffect(() => {
    localStorage.setItem("nip", JSON.stringify(nip));
  }, [nip]);

  //state loading
  const [isLoading, setLoading] = useState(false);

  //state validation
  const [validation, setValidation] = useState({});

  //history
  const history = useHistory();


  const [verifed, setVerifed] = useState(false)
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifed(true);
  }
  
  const loginHandler = async (e) => {
    
    e.preventDefault();
    //set state isLoading to "true"
    setLoading(true);

    await Api.post("/login/pegawai", {
      nip: nip,
      finger_id: finger_id,
      platform: 1,
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);
       
        //show toast
        toast.success("Verif Nip Successfully.", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        //redirect dashboard page
        history.push("/admin/login/verifikasi");
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
              <div className="p-5 bg-gray-100 rounded-md shadow-md">
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
                    <label className="mt-2">NIP</label>
                    <input
                      type="number"
                      value={nip}
                      onChange={(e) => setNip(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="No Induk Pegawai"
                    />
                  </div>
                  {validation.nip && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.nip[0]}
                    </div>
                  )}
                  <div className="mb-5">
                    <label className="mt-2">Finger ID</label>
                    <input
                      type="number"
                      value={finger_id}
                      onChange={(e) => setFingerid(e.target.value)}
                      className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                      placeholder="Finger ID"
                    />
                  </div>
                  {validation.finger_id && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.finger_id[0]}
                    </div>
                  )}
                  <ReCAPTCHA
                    sitekey="6LeVKlsjAAAAACoRKUkt3c4iHIECsphFx6kMV6qU"
                    // sitekey="6Le10GMjAAAAAAt4jp3xLa-KkS3oMnwVlwd2KDeT"
                    onChange={onChange}
                  />
                  <div>
                    <button
                      type="submit"
                      className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                      disabled={!verifed}
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

export default LoginPegawai;
