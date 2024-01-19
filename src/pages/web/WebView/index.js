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
                  <div className="mt-4 md:flex rounded-xl md:p-1">
                    <Iframe
                      allowfullscreen
                      src="https://9a1b453b0851479281d0e77de3d07a44.elf.site"
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
      </>
    </React.Fragment>
  );
}

export default WebVIew;
