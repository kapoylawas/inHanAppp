import React, { useEffect, useState } from "react"
import LayoutWeb from "../../../layouts/web"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../../api";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

function Jawaban() {

    const { id_pesan } = useParams();
    const { id_istansi } = useParams();
    const token = Cookies.get("token")
    const status = localStorage.getItem("status");
    const history = useHistory();
    const dataNip = localStorage.getItem("nip");
    const [nip, setNip] = useState("");
    const [jawaban, setJawaban] = useState("");
    //state loading
    const [isLoading, setLoading] = useState(false);

    const fetchData = async () => {
        await Api.get(
          `/profile2?nip_nik=${dataNip.replaceAll('"', "")}&status=${status}`,
          {
            headers: {
              objects: "/profile",
            },
          }
        )
          .then((response) => {
            //set data response to state "categories"
            setNip(response.data.data.data_user.nip);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      useEffect(() => {
        //call function "fetchDataUser"
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const storeJawaban = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
    
        formData.append("id_pesan", id_pesan);
        formData.append("id_instansi", id_istansi);
        formData.append("nip", nip);
        formData.append("jawaban", jawaban);
    
        await Api.post("/ulpim/jawab-pengaduan", formData, {
          // header
          headers: {
            objects: "/ulpim/jawab-pengaduan",
            Authorization: `Bearer ${token}`,
            statusUsers: status,
          },
        })
          .then((response) => {
            //show toast
            setLoading(false);
            console.log("data :", response);
            toast.success("Berhasil Menyimpan Data Jawaban", {
              duration: 10000,
              position: "top-center",
              style: {
                borderRadius: "20px",
                background: "#333",
                color: "#fff",
              },
            });
    
            history.push("/web/ulpim");
          })
          .catch((error) => {
            setLoading(false);
            console.log("err :", error);
          });
      };
    
    return(
        <React.Fragment>
            <LayoutWeb>
            <div className="pt-20 pb-20">
            <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
                <form onSubmit={storeJawaban}>  
                    <div className="mb-5">
                      <textarea
                        type="text"
                        value={jawaban}
                        onChange={(e) => setJawaban(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        placeholder="Isi Jawaban"
                        rows="5"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="inline-block w-full px-3 py-1 mt-2 text-xl text-white bg-gray-700 rounded-md shadow-md focus:outline-none focus:bg-gray-900"
                      >
                        {isLoading ? "LOADING..." : "Submit Jawaban"}{" "}
                      </button>
                    </div>
                    <div className="mt-3 mb-2 border-2 border-stone-400"></div>
                </form>
            </div>
            </div>
            </LayoutWeb>
        </React.Fragment>
    )
}

export default Jawaban