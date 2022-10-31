/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";

function CategoryMenu(params) {
  return (
    <React.Fragment>
      <div>
        <div>
          <div className="grid items-center grid-cols-4 gap-5 mt-5 text-center md:gap-5">
            <div className="col-span-2 p-4 text-xs text-center rounded-md shadow-md bg-red-50 md:col-span-1 lg:col-span-1">
              <Link to="/web/ppid">
                <div>
                  <img
                    src={require("../../assets/images/folder.png")}
                    width="30"
                    className="inline-block mb-2"
                  />
                </div>
                PPID
              </Link>
            </div>
            <div className="col-span-2 p-4 text-xs text-center rounded-md shadow-md bg-red-50 md:col-span-1 lg:col-span-1">
              <Link>
                <div>
                  <img
                    src={require("../../assets/images/fruit-shop.png")}
                    width="30"
                    className="inline-block mb-2"
                  />
                </div>
                Blikosda
              </Link>
            </div>
            <div className="col-span-2 p-4 text-xs text-center rounded-md shadow-md bg-red-50 md:col-span-1 lg:col-span-1">
              <Link>
                <div>
                  <img
                    src={require("../../assets/images/review.png")}
                    width="30"
                    className="inline-block mb-2"
                  />
                </div>
                Ulpim
              </Link>
            </div>
            <div className="col-span-2 p-4 text-xs text-center rounded-md shadow-md bg-red-50 md:col-span-1 lg:col-span-1">
              <Link>
                <div>
                  <img
                    src={require("../../assets/images/letter.png")}
                    width="30"
                    className="inline-block mb-2"
                  />
                </div>
                Silpulsitron
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CategoryMenu;
