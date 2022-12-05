/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import Api from "../../api";
import LoadingSpinner from "./LoadingSpinner";

function CardRadio() {
  const [radio, setRadio] = useState([]);
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    await Api.get(`/radio`, {
      headers: {
        //header Bearer + Token
        objects: "/radio",
        statusUsers: 1,
        lng: latitude,
        lat: longitude,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setRadio(response.data.data);
        console.log("data", response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
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
      <div>
        <div>
          <div className="grid items-center grid-cols-4 gap-5 mt-5 text-center md:gap-5">
            <div className="col-span-4">
              <div className="p-2 text-xs text-center bg-red-200 rounded-md shadow-md">
                <div className="text-center underline decoration-1">Radio</div>
                <br></br>
                <div>
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <Iframe
                      allowtransparency="true"
                      style="padding:10px;background:#000;webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px;width:560px;margin:0 auto;overflow:hidden;"
                      url={radio.radio}
                      display="block"
                      frameborder="0"
                      height="184"
                      width="100%"
                      position="relative"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CardRadio;
