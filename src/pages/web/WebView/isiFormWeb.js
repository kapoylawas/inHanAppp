/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";

function IsiFormWeb() {
  const { id } = useParams();

  const [silpusitrons, setSilpusitron] = useState([]);
  const data = silpusitrons.sort();

  localStorage.setItem("kode", JSON.stringify(data));

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    await Api.get(`/silpusitron/get-form?tid=${id}`, {
      headers: {
        objects: "/silpusitron/get-form",
      },
    })
      .then((response) => {
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
      <div className="pt-20 pb-20">
        <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
          <div>
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
          </div>
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
                      <Link to="/web/confirmWeb">
                        <button
                          type="submit"
                          className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                        >
                          CONFIRM DATA
                        </button>
                      </Link>
                    </>
                  )}

                  <Link to="/web/listFormWeb">
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
    </React.Fragment>
  );
}

export default IsiFormWeb;
