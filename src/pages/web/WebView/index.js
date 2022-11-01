/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

function WebVIew() {
  return (
    <React.Fragment>
        <div className="pt-20 pb-20">
          <div className="container grid grid-cols-1 p-3 mx-auto sm:w-full md:w-6/12">
            <div>
              <div className="grid grid-cols-4 gap-4 mt-5">
                <div className="col-span-4">
                  <div className="p-1 rounded-md shadow-md bg-red-50">
                    <div className="text-center underline decoration-1">
                      Instagram
                    </div>
                    <div
                      class="embedsocial-hashtag"
                      data-ref="e4cf037dbf36bb6e18c632f1d29ae4add495200a"
                    >
                      {" "}
                      <a
                        class="feed-powered-by-es feed-powered-by-es-feed-new"
                        href="https://embedsocial.com/social-media-aggregator/"
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
}

export default WebVIew;
