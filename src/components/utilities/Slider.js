/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Slide } from "react-slideshow-image";

function Slider() {
  const slideImages = [
    {
      url: "../../assets/bg.png",
      caption: "",
    },
    {
      url: "../../assets/bg.png",
      caption: "",
    },
    {
      url: "../../assets/bg.png",
      caption: "",
    },
  ];

  return (
    <React.Fragment>
      <Slide style={{zIndex: '0'}} >
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div>
                <img
                  className="inline-block"
                  width="100%"
                  height="100%"
                  src={require("../../assets/bg.png")}
                />
              <span>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </React.Fragment>
  );
}

export default Slider;
