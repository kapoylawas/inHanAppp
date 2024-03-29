/* eslint-disable jsx-a11y/alt-text */
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Redirect, useHistory } from "react-router-dom";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";
import OTPInput from "otp-input-react";

function Verifikasi() {
  document.title = "Verifikasi OTP";

  const [setNip] = useState("");
  const [otp, setOtp] = useState("");

  const [isResendActive, setResendActive] = useState(false);
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setResendActive(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  const dataNip = localStorage.getItem("nip");

  //state loading
  const [isLoading, setLoading] = useState(false);

  //state validation
  const [validation, setValidation] = useState({});

  //history
  const history = useHistory();

  const handleResend = async () => {
    //set state isLoading to "true"
    setResendActive(false);
    setCountdown(120);

    await Api.post("/login/re-generate-otp", {
      nip: dataNip.replaceAll('"', ""),
      status: 1,
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);

        //show toast
        toast.success("Resend Successfully.", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        //set state isLoading to "false"
        //set error response validasi to state "validation"
        setValidation(error.response.data);
      });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    //set state isLoading to "true"
    setLoading(true);

    await Api.post("/login/validation-otp", {
      nip: dataNip.replaceAll('"', ""),
      otp: otp,
      status: 1,
      platform: 1,
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);

        //show toast
        toast.success("Login Successfully.", {
          duration: 4000,
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        Cookies.set("token", response.data.token.token);
        localStorage.setItem("status", JSON.stringify(1));

        //redirect dashboard page
        history.push("/admin/login");
      })
      .catch((error) => {
        //set state isLoading to "false"
        setLoading(false);

        //set error response validasi to state "validation"
        setValidation(error.response.data);
      });
  };

  if (Cookies.get("token")) {
    //redirect dashboard page
    return <Redirect to="/admin/dashboard"></Redirect>;
  }
  return (
    <React.Fragment>
      <LayoutWeb>
        <>
          <div className="pt-10 pb-20">
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
                {validation.msg && (
                  <div
                    className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                    role="alert"
                  >
                    {validation.msg}
                  </div>
                )}
                <div className="text-center underline decoration-1">
                  MASUKKAN KODE OTP DARI WHATSAPP
                </div>
                <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                <div className="text-center underline decoration-1">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    autoFocus
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                    secure
                    style={{ position: "relative", left: "30%" }}
                  />
                </div>
                <form onSubmit={loginHandler}>
                  <div className="mb-5">
                    <input
                      value={dataNip.replaceAll('"', "")}
                      onChange={(e) => setNip(e.target.value)}
                      type="hidden"
                      className="form-control"
                      placeholder={dataNip.replaceAll('"', "")}
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
                <hr></hr>
                <div>
                  {isResendActive ? (
                    <button
                      className="px-4 py-2 mt-3 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
                      style={{ position: "relative" }}
                      onClick={handleResend}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <p>
                      Waktu Untuk Kirim Ulang Resend OTP{" "}
                      {Math.floor(countdown / 60)}:{countdown % 60} minutes
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Verifikasi;
