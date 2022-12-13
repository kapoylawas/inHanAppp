/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import LayoutWeb from "../../../layouts/web";

function IsiForm() {
  const { id } = useParams();



  const [silpusitrons, setSilpusitron] = useState([]);
  const data = silpusitrons.sort();


  // const kodes = Object.fromEntries(data.map(kode => [kode.kode])) 

  // console.log(kodes);
  // const [kode, setKode] = useState("");
 

  localStorage.setItem("kode", JSON.stringify(data));

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    await Api.get(`/silpusitron/get-form?tid=${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     objects: "/ulpim/pengaduan-opd",
      //     statusUsers: status,
      //   },
    })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setSilpusitron(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("err", error);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [val, setVal] = React.useState({});

  useEffect(() => {
    localStorage.setItem("testingDatas", JSON.stringify(val));
  }, [val]);

  const onHandleChange = (e) => {
    setVal({
      ...val,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="card-body">
              <div className="col-span-4">
                <div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <form
                          className="form-outer-wrapper"
                          onSubmit={submitForm}
                          error
                        >
                          {data.map((formData) => {
                            return (
                              <div>
                                <div className="text-center underline decoration-1">
                                  {formData.title}
                                </div>
                                
                                <div className="mt-3 mb-2 border-2 border-stone-500"></div>
                                <br></br>
                                
                                {formData.properties.map((inputData, index) => {
                                  return (
                                    <>
                                      <div className="mb-5" key={index}>
                                        <label className="mt-2">
                                          {inputData.title}
                                        </label>
                                        <input
                                          type="text"
                                          className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                                          name={inputData.key}
                                          datatype={inputData.type}
                                          onChange={onHandleChange}
                                        />
                                      </div>
                                      
                                    </>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </form>
                        <Link to="/web/confirm">
                          <button
                            type="submit"
                            className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                          >
                            CONFIRM DATA
                          </button>
                        </Link>
                      </>
                    )}

                    <Link to="/web/listForm">
                      <button className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900">
                        KEMBALI
                      </button>
                    </Link>
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

export default IsiForm;
