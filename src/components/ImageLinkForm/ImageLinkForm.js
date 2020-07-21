import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className="f5 ttu">
        {
          "This Magic iBrain will detect faces  in your picture. Git it a shoot!"
        }
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input className="f4 pa2 w-70 center" type ='text' onChange = {onInputChange}/>
          <button className="w-30 grow f4 b link ph pv2 dib white bg-red"
          onClick = {onButtonSubmit}>Detect
           </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
