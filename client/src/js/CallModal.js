import React from 'react';
import PropTypes from 'proptypes';
import classnames from 'classnames';





function CallModal({ status, callFrom, startCall, rejectCall }) {
  var myadido = document.getElementById("myautoload");
   const acceptWithVideo = (video) => {
    const config = { audio: true, video };
    
    return () => startCall(false, callFrom, config);
    myadido.play();
  };
  
  

  return (
    <div className={classnames('call-modal', status)}>
      <p>
        <span className="caller">{`${callFrom} is calling`}</span>
      </p>
     
      
<audio autoplay id="myautoload" src="https://www.w3schools.com/tags/horse.mp3" type="audio/mp3"/>
     

      <button
        type="button"
        className="btn-action fa fa-video-camera"
        onClick={acceptWithVideo(true)}
      />
      <button
        type="button"
        className="btn-action fa fa-phone"
        onClick={acceptWithVideo(false)}
      />
      <button
        type="button"
        className="btn-action hangup fa fa-phone"
        onClick={rejectCall}
      />
    </div>
  );

}

CallModal.propTypes = {
  status: PropTypes.string.isRequired,
  callFrom: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  rejectCall: PropTypes.func.isRequired
};

export default CallModal;
