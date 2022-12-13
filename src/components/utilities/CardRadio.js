/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
// import Iframe from "react-iframe";
import Api from "../../api";
import LoadingSpinner from "./LoadingSpinner";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

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
        // console.log("data", response);
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
              <div className="p-2 text-xs text-center bg-gray-100 rounded-md shadow-md">
                <div className="text-center underline decoration-1">Radio</div>
                <br></br>
                <div>
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="grid grid-cols-4 gap-4 mt-5">
                      <div className="col-span-4">
                        <div className="p-2 text-xs text-center bg-gray-500 rounded-md shadow-md">
                          <AudioPlayer
                            src={radio.radio}
                            autoPlayAfterSrcChange={false}
                          />
                        </div>
                      </div>
                    </div>
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
