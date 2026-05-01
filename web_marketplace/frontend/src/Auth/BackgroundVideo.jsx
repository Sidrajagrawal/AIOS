import React from 'react';

const BackgroundVideo = ({ videoSrc }) => {
  return (
    <div>
      <video autoPlay loop muted playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-[0.4] saturate-[1.2]"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;