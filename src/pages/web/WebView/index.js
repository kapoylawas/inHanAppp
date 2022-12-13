/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import Iframe from "react-iframe";

function WebVIew() {
  return (
    <React.Fragment>
      <>
        <div className="pt-2 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div className="grid grid-cols-4 mt-5">
              <div className="col-span-4">
                <div className="p-1 rounded-md shadow-md bg-gray-50">
                  <div className="text-center underline decoration-1">
                    Instagram
                  </div>
                  <div
                    className="embedsocial-hashtag"
                    data-ref="e4cf037dbf36bb6e18c632f1d29ae4add495200a"
                  >
                    {" "}
                    <a
                      className="feed-powered-by-es feed-powered-by-es-feed-new"
                      href="https://embedsocial.com/social-media-aggregator/"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="p-2 rounded-md shadow-md bg-gray-50">
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
          </div>
        </div>
      </>
    </React.Fragment>
  );
}

export default WebVIew;
