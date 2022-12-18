/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Api from "../../../api";
import LayoutWeb from "../../../layouts/web";

function Register() {
  document.title = "Register Akun InHandApp";

  //state categories
  // const [categories] = useState(data);

  const [nik, setNik] = useState("");
  const [no_kk, setNokk] = useState("");
  // const [nama_ibu, setNamaibu] = useState("");
  const [email, setEmail] = useState("");
  const [nomor_hp, setNohp] = useState("");

  //state loading
  const [isLoading, setLoading] = useState(false);

  //state validation
  const [validation, setValidation] = useState({});

  //history
  const history = useHistory();

  const [tipe, setTipe] = useState("");
  // console.log(tipe);

  const handleshowhide = (event) => {
    const getType = event.target.value;
    setTipe(getType);
  };

  const num = 16;
  const handleNik = (event) => {
    setNik(event.target.value.slice(0, num));
  };

  const handleKk = (event) => {
    setNokk(event.target.value.slice(0, num));
  };

  const storeRegister = async (e) => {
    e.preventDefault();

    //set state isLoading to "true"
    setLoading(true);

    await Api.post("/register/umum", {
      nik: nik,
      no_kk: no_kk,
      // nama_ibu: nama_ibu,
      email: email,
      nomor_hp: nomor_hp,
      jalur: tipe,
    })
      .then((response) => {
        //set state isLoading to "false"
        setLoading(false);

        //show toast
        toast.success("Register Data Anda Successfully.", {
          duration: 9000,
          position: "top-center",
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });

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

  const [verifed, setVerifed] = useState(false);
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifed(true);
  }

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
                {validation.msg && (
                  <div
                    className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                    role="alert"
                  >
                    {validation.msg}
                  </div>
                )}
                <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                <form onSubmit={storeRegister}>
                  <div className="relative z-0 w-full mt-4 mb-6 group">
                    <input
                      value={nik}
                      onChange={handleNik}
                      type="number"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      NIK
                    </label>
                  </div>
                  {validation.nik && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.nik[0]}
                    </div>
                  )}
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      value={no_kk}
                      onChange={handleKk}
                      type="number"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      No Kartu Keluarga
                    </label>
                  </div>
                  {validation.no_kk && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.no_kk[0]}
                    </div>
                  )}
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Alamat Email
                    </label>
                  </div>
                  {validation.email && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.email[0]}
                    </div>
                  )}
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      value={nomor_hp}
                      onChange={(e) => setNohp(e.target.value)}
                      type="number"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      No Handphone
                    </label>
                  </div>
                  {validation.nomor_hp && (
                    <div
                      className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                      role="alert"
                    >
                      {validation.nomor_hp[0]}
                    </div>
                  )}
                  <div className="mt-3 mb-2 border-2 border-stone-400"></div>
              
                  <div className="mb-5">
                      <label className="mt-5">Tipe Verifikasi</label>
                      <select
                        value={tipe}
                        className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                        onChange={(e) => handleshowhide(e)}
                      >
                        <option value="">-- Tipe Verifikasi --</option>
                        <option value="1">Whatsapp</option>
                        <option value="2">Email</option>
                      </select>
                    </div>

                  <div class="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={onChange}
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Data Yang Saya Kirim Adalah Benar dan Dapat di Pertanggung Jawabkan
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                    disabled={!verifed}
                  >
                    {" "}
                    {isLoading ? "LOADING..." : "Register new account"}{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Register;
