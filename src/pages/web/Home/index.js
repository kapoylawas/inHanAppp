/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import CategoryMenu from "../../../components/utilities/CategoryMenu";
import LayoutWeb from "../../../layouts/web";
import Iframe from "react-iframe";
import CardRadio from "../../../components/utilities/CardRadio";
import Api from "../../../api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
import "react-slideshow-image/dist/styles.css";
import Slider from "../../../components/utilities/Slider";

function Home() {
  document.title = "In Hand App - Home";

  //token
  const token = Cookies.get("token");

  //history
  const history = useHistory();

  const dataNip = localStorage.getItem("nip");

  //state user logged in
  const [user, setUser] = useState({});

  const status = localStorage.getItem("status");

  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    await Api.get(
      `/profile2?nip_nik=${dataNip.replaceAll('"', "")}&status=${status}`,
      {
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
          objects: "/profile",
          statusUsers: status,
        },
      }
    )
      .then((response) => {
        setLoading(false);
        // console.log("data", response);
        //set data response to state "categories"
        setUser(response.data.data.data_user);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const logoutHandler = async (e) => {
    //remove token and localstorage
    Cookies.remove("token");
    localStorage.clear();

    //show toast
    toast.success("Logout Successfully.", {
      duration: 4000,
      position: "top-right",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    //redirect login page
    history.push("admin/login");
  };

  //hook
  useEffect(() => {
    //call function "fetchDataUser"
    if (token) {
      fetchData();
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <LayoutWeb>
        <>
          <div className="pt-20 pb-20">
            <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
              {token ? (
                <>
                  <div class="grid grid-cols-5 gap-4 p-3 mb-3 bg-white rounded-md shadow-sm">
                    <div class="col-span-5">
                      <i class="fa fa-user-circle" aria-hidden="true"></i>{" "}
                      <img
                        src={require("../../../assets/images/programmer.png")}
                        width="30"
                        className="inline-block mb-2 mr-1"
                      />{" "}
                      {isLoading ? "LOADING..." : ""} Hai... , {user.nama}{" "}
                      <span>
                        {" "}
                        <button
                          onClick={logoutHandler}
                          className="float-right px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700"
                        >
                          Logout
                        </button>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="rounded-lg shadow-md ">
                {/* <img
                  className="inline-block"
                  width="100%"
                  height="100%"
                  src={require("../../../assets/bg.png")}
                /> */}
                <Slider />
              </div>
              <CategoryMenu />
              <div>
                <div className="grid grid-cols-4 gap-4 mt-5">
                  <div className="col-span-4">
                    <div className="p-1 bg-gray-100 rounded-md shadow-md">
                      <div className="text-center underline decoration-1">
                        Instagram
                      </div>
                      <div
                        class="embedsocial-hashtag"
                        data-ref="e4cf037dbf36bb6e18c632f1d29ae4add495200a"
                      >
                        <a
                          class="feed-powered-by-es feed-powered-by-es-feed-new"
                          href="https://embedsocial.com/social-media-aggregator/"
                          target="_blank"
                          title="Widget by EmbedSocial"
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-4 gap-4 mt-5">
                  <div className="col-span-4">
                    <div className="p-2 bg-gray-100 rounded-md shadow-md">
                      <div className="text-center underline decoration-1">
                        Youtube
                      </div>
                      <div className="mt-4 md:flex rounded-xl md:p-1">
                        <Iframe
                          allowfullscreen
                          src="https://my.walls.io/r3vqy?nobackground=1&amp;show_header=0"
                          style="border:0;height:800px;width:100%"
                          loading="lazy"
                          width="100%"
                          height="520px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <CardRadio />
            </div>
          </div>
        </>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Home;
