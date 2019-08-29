import React from 'react';
import PropTypes from 'proptypes';
import classnames from 'classnames';



function CallModal({ status, callFrom, startCall, rejectCall}) {
  function abc() {var audio = new Audio('https://www.w3schools.com/tags/horse.mp3');
   audio.play();
                 }
   const acceptWithVideo = (video) => {
    const config = { audio: true, video , audio};
    
    return () => startCall(true , false , callFrom, config);
    
  
   };
  
  
   
  return (
    <div className={classnames('call-modal', status)}>
      <p>
        <span className="caller">{`${callFrom} is calling`}</span>
<form>
         <input type="button" onclick="abc()" value="Click" />
      </form>
       
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
