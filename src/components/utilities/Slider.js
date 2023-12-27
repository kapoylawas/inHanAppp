/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Api from "../../api";

function Slider() {
  // const slideImages = [
  //   {
  //     url: "https://admin-inhand.blitarkota.go.id/banner-img/wqeweq-19122022095939.jpg",
  //     caption: "",
  //   },
  //   {
  //     url: "https://admin-inhand.blitarkota.go.id/banner-img/zxcvbn-19122022100007.jpg",
  //     caption: "",
  //   },
  // ];

  const [setErrorMessage] = useState("");

  const [banner, setBanner] = useState([]);
  console.log(banner);
  const sort = banner.sort();

  const fetchData = async () => {
    await Api.get(`/banner`, {
      // headers: {
      //   //header Bearer + Token
      //   objects: "/ppid/daftar-informasi-publik",
      //   statusUsers: 1,
      //   lng: latitude,
      //   lat: longitude
      // },
    })
      .then((response) => {
        // console.log(response);
        setBanner(response.data.data);
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
      
      <div
        id="carouselExampleIndicators"
        className="relative rounded carousel slide"
        data-bs-ride="carousel"
      >
        <div className="relative w-full overflow-hidden rounded-lg carousel-inner">
          {sort.map((slideImage) => (
            <div className="float-left w-full carousel-item active">
              <img
                src={slideImage.img}
                className="block w-full"
                alt="Wild Landscape"
              />
            </div>
          ))}
        </div>
        <button
          className="absolute top-0 bottom-0 left-0 flex items-center justify-center p-0 text-center border-0 carousel-control-prev hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="inline-block bg-no-repeat carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="absolute top-0 bottom-0 right-0 flex items-center justify-center p-0 text-center border-0 carousel-control-next hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="inline-block bg-no-repeat carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </React.Fragment>
  );
}

export default Slider;
