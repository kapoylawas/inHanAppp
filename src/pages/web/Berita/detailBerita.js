import { Interweave } from "interweave";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../../api";
import LoadingSpinner from "../../../components/utilities/LoadingSpinner";
import LayoutWeb from "../../../layouts/web";

function DetailBerita() {
    document.title = "InHandApp - Wisata";
    const { id } = useParams();
    const [detailBerita, setDetailBerita] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        await Api.get(`/berita/detail-berita?id=${id}`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     objects: "/ulpim/pengaduan-opd",
          //     statusUsers: status,
          //   },
        })
          .then((response) => {
            console.log(response);
            setDetailBerita(response.data.data);
            setIsLoading(false);
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
            <div>
              <nav arial-aria-label="Black">
                <Link to={"/web/berita"}>
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
            <div className="mt-3 text-center underline decoration-1">Berita - {detailBerita.title} </div>
            <br />
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="rounded-lg shadow-md ">
                  {/* <img
                    className="inline-block"
                    width="100%"
                    height="100%"
                    src={detailBerita.image}
                  /> */}
                </div>
                <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                  <div class="col-span-5">
                    <Interweave content={detailBerita.content_html} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default DetailBerita;
