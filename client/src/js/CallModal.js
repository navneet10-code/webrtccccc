import React from 'react';
import PropTypes from 'proptypes';
import classnames from 'classnames';



function CallModal({ status, callFrom, startCall, rejectCall}) {
  
     
	   audio = new Audio('http://hipehome.com/nokia-ringtone-2019-256k-46684.mp3')
       audio.play();
        console.log('Here we draw a circle');


   const acceptWithVideo = (video) => {
    const config = { audio: true, video };
    
    return () => startCall(false, callFrom, config);
    
  };
  
  

  return (
    <div className={classnames('call-modal', status)}>
      <p>
        <span className="caller">{`${callFrom} is calling`}</span>
      </p>
  

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
