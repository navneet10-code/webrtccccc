import React from 'react';
import PropTypes from 'proptypes';
import classnames from 'classnames';

function abc() {
    var myadido = document.getElementById("myautoload");

    setTimeout(function() {
    myadido.play();

    },500); }

function CallModal({ status, callFrom, startCall, rejectCall }) {
  const acceptWithVideo = (video) => {
    const config = { audio: true, video };
    return () => startCall(false, callFrom, config);
    abc();
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

<audio autoplay id="myautoload">
<source src="C:/Users/Public/Music/Sample Music/kalimba.mp3" type="audio/mp3">
Your browser does not support the audio element.
</audio>

CallModal.propTypes = {
  status: PropTypes.string.isRequired,
  callFrom: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  rejectCall: PropTypes.func.isRequired
};

export default CallModal;
