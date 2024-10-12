import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, detections }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='1000px' height='auto'/>
        {detections.map((detection, i) => (
          <div key={i} className='bounding-box' style={{top: detection.topRow, right: detection.rightCol, bottom: detection.bottomRow, left: detection.leftCol}}>
            <span className='detection-label'>{detection.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaceRecognition;