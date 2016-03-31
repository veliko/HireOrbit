import React, { Component } from 'react';

let Video = () => {
  return (
    <div>
    	<div className="video-overlay"></div>
	    <video autoPlay loop poster="img/EarthShineCyan.jpg" id="bgvid">
	      <source src="video/EarthShineCyan.mp4" type="video/mp4" />
	    </video>
    </div>
  );
};

export default Video;