/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import LayoutWeb from "../../../layouts/web";

function TandaTrima() {
  document.title = "In Hand App - Tanda Trima";

  const tandaBukti = JSON.parse(localStorage.getItem("data"));
  const kode = JSON.parse(localStorage.getItem("kode"));

  console.log("kode", kode);

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
                  <div className="text-center underline decoration-1">
                    <b>Tanda Bukti</b>
                  </div>
                  <div className="flex flex-col mt-8">
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full">
                          <tbody className="bg-white">
                            <tr>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                IDPermohonan
                              </td>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div
                                  className="flex items-center px-4 py-3 text-sm font-bold text-white bg-blue-500"
                                  role="alert"
                                >
                                  <b>
                                    {tandaBukti.id_permohonan} -{" "}
                                    <b>(Harap untuk menyimpan ID ini.)</b>
                                  </b>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                Kategori
                              </td>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                {tandaBukti.kategori_pengajuan}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                Tujuan
                              </td>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                {tandaBukti.tujuan}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                Dibuat Pada
                              </td>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                {tandaBukti.dibuat_pada}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                Format Salinan
                              </td>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                {tandaBukti.format}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                Status Permohonan
                              </td>
                              <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div
                                  className="px-4 py-3 text-teal-900 bg-teal-100 border-t-4 border-teal-500 rounded-b shadow-md"
                                  role="alert"
                                >
                                  <b>{tandaBukti.status_permohonan}</b>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div>
                          <a
                            target="_blank"
                            href={tandaBukti.link_download}
                            rel="noreferrer"
                          >
                            <button className="inline-block w-full px-3 py-1 text-xl text-black bg-gray-300 rounded-md shadow-md focus:outline-none focus:bg-stone-400">
                              <img
                                src={require("../../../assets/images/direct-download.png")}
                                width="30"
                                className="inline-block mb-2 mr-1"
                              />{" "}
                              Download
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default TandaTrima;
