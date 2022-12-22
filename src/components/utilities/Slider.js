/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import Api from "../../api";

function Slider() {
  const slideImages = [
    {
      url: "https://admin-inhand.blitarkota.go.id/banner-img/wqeweq-19122022095939.jpg",
      caption: "",
    },
    {
      url: "https://admin-inhand.blitarkota.go.id/banner-img/zxcvbn-19122022100007.jpg",
      caption: "",
    },
  ];

  const [setErrorMessage] = useState("");

  const fetchData = async () => {

    await Api.get(
      `/banner`,
      {
        // headers: {
        //   //header Bearer + Token
        //   objects: "/ppid/daftar-informasi-publik",
        //   statusUsers: 1,
        //   lng: latitude,
        //   lat: longitude
        // },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    //call function "fetchDataPlaces"
    fetchData();
    // setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div>
                <img
                  className="inline-block"
                  width="100%"
                  height="100%"
                  src={slideImage.url}
                />
            </div>
          </div>
        ))}
      </Slide>
    </React.Fragment>
  );
}

export default Slider;
