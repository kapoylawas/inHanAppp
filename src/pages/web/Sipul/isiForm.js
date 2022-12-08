import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import LayoutWeb from "../../../layouts/web";

function IsiForm() {
  const { id } = useParams();

  const [silpusitrons, setSilpusitron] = useState([]);
  const data = silpusitrons.sort();

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
        setIsLoading(false);

        console.log("form", response);
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

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="grid grid-cols-4 gap-4 mt-5">
              <div className="col-span-4">
                <div className="text-center underline decoration-1">
                  PILIH MASUK AKUN
                </div>
                <div className="mt-3 mb-2 border-2 border-stone-500"></div>
                <br></br>
                <div>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <form>
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          {data.map((formData) => {
                            console.log("form", formData);
                            return (
                              <div>
                                <h1>{formData.title}</h1>
                                {formData.properties.map((inputData) => {
                                  console.log("input", inputData);
                                  return (
                                    <>
                                      <div>
                                        <label>{inputData.title}</label>
                                        <input
                                          type="text"
                                          className="w-full p-5 mt-2 placeholder-gray-600 bg-gray-200 border border-gray-200 rounded shadow-sm appearance-none h-7 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600"
                                          placeholder="text"
                                        />
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </>
                      )}
                    </form>
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
