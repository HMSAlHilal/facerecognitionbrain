import React from 'react';
import './FaceRecognition.css';

const FaceRecognition =({imageUrl,box}) => {
	
	const faceBox=box.map((face,index)=>{
		return (<div  key={index} className='bounding-box' style={{top: face.topRow, right: face.rightCol,bottom: face.bottomRow,left:face.leftCol}}></div>);
	})
	return(

			<div className="center ma">
				<div className='absolute mt2'>
					<img id='inputimage' alt= 'Face Recongnition' src={imageUrl} width='500px' height='auto'/>
								
					{faceBox}
					
				</div>
			</div>
		);
}

export default FaceRecognition;