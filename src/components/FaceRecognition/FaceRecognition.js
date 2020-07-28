import React from "react";
import './FaceRecognition';

const FaceRecognition = ({imageUrl, box}) => { 
  return (
    <div className='center ma'> 
    <div className='absolute mt3'>
    <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/> 
    <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomCol, left: box.leftCol}}></div>
    </div>
      
    </div>
  );
};

export default FaceRecognition;
