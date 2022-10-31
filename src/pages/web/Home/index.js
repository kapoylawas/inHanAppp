/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import CategoryMenu from "../../../components/utilities/CategoryMenu";
import Slider from "../../../components/utilities/Slider";
import LayoutWeb from "../../../layouts/web";

function Home() {
  document.title = "In Hand App - Home";
 
  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="grid grid-cols-1 p-1 text-sm bg-gray-200 rounded shadow-md">
              <img
                className="inline-block mb-1"
                width="100%"
                height="100%"
                src={require("../../../assets/images/bgHome.png")}
              />
              <Slider />
            </div>
            <CategoryMenu />
            <div>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="p-1 rounded-md shadow-md bg-red-50">
                    <div className="text-center underline decoration-1">
                      Instagram
                    </div>
                    <div class="embedsocial-hashtag" data-ref="e4cf037dbf36bb6e18c632f1d29ae4add495200a"> <a class="feed-powered-by-es feed-powered-by-es-feed-new" href="https://embedsocial.com/social-media-aggregator/"></a></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="p-2 rounded-md shadow-md bg-red-50">
                    <div className="text-center underline decoration-1">
                      Youtube
                    </div>
                    <div className="md:flex rounded-xl md:p-1">
                      {/* <div class="elfsight-app-8c962cd0-ab06-4bc9-b531-95435a34a44c"></div> */}
                    </div>
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

export default Home;
