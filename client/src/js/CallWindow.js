import React, { Component } from 'react';
import PropTypes from 'proptypes';
import classnames from 'classnames';
import _ from 'lodash';


var endTime = new Date().setTime(1362009600000);
var currentTime = new Date().getTime();
var remainingTime = endTime - currentTime;
//var mins = 5;
var mins = Math.floor((remainingTime/1000)/60);
// calculate the seconds (don't change this! unless time progresses at a different speed for you...)
//var secs = mins * 60;
var secs = Math.floor(remainingTime/1000);


class CallWindow extends Component {
constructor(props) {
super(props);
this.state = {
Video: true,
Audio: true
};

this.btns = [
{ type: 'Video', icon: 'fa-video-camera' },
{ type: 'Audio', icon: 'fa-microphone' }
];







}

componentDidMount() {
this.setMediaStream();






}

componentWillReceiveProps(nextProps) {
const { config: currentConfig } = this.props;
// Initialize when the call started
if (!currentConfig && nextProps.config) {

const { config, mediaDevice } = nextProps;
_.forEach(config, (conf, type) => mediaDevice.toggle(_.capitalize(type), conf));

this.setState({
Video: config.video,
Audio: config.audio
});
}



}
startTimer(duration, display) {
var timer = duration, minutes, seconds;
setInterval(function () {
minutes = parseInt(timer / 60, 10);
seconds = parseInt(timer % 60, 10);

minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;

display.textContent = minutes + ":" + seconds;

if (--timer < 0) {
timer = duration;console.log('ooooooooooooooooooooooooooooo');
setTimeout(endCall(true), 5000 )

}
  else{console.log('Tgggggggggggggggggggggggggggggggggggg');}
}, 1000);
}

abc(){
var fiveMinutes = 60 * .5,
display = document.querySelector('#time');
this.startTimer(fiveMinutes, display);
}



  
 
 recordd() {
   
   if(typeof RecordRTC_Extension === 'undefined') {
    alert('RecordRTC chrome extension is either disabled or not installed.');
}
    console.log('yayayyayayayayaya');
    var recorder = new RecordRTC_Extension();

    //var video = document.querySelector('video');
    this.disabled = true;
    // you can find list-of-options here:
    // https://github.com/muaz-khan/Chrome-Extensions/tree/master/screen-recording#getsupoortedformats
    var options = recorder.getSupoortedFormats()[1];
    recorder.startRecording(options, function() {
        document.getElementById('btn-stop-recording').disabled = false;
    });
    
}
  
  stopRecordingCallback(blob) {
    console.log('stop');
    /*var video = document.querySelector('video');
    
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(blob);
    console.log('value',video.src);*/
    recorder = null;
}
  
  
  
  
  records() {
    console.log('stop recording');
  var recorder = new RecordRTC_Extension();
  this.disabled = true;

    // third and last step
    recorder.stopRecording(this.stopRecordingCallback());
}
    
 
  
  
  



componentDidUpdate() {
this.setMediaStream();
}

setMediaStream() {
const { peerSrc, localSrc } = this.props;
if (this.peerVideo && peerSrc) {this.abc();this.peerVideo.srcObject = peerSrc;}
if (this.localVideo && localSrc) this.localVideo.srcObject = localSrc;
}

/**
* Turn on/off a media device
* @param {String} deviceType - Type of the device eg: Video, Audio
*/
toggleMediaDevice(deviceType) {
const { mediaDevice } = this.props;
const deviceState = _.get(this.state, deviceType);
this.setState({ [deviceType]: !deviceState });
mediaDevice.toggle(deviceType);
}

renderControlButtons() {
const getClass = (icon, type) => classnames(`btn-action fa ${icon}`, {
disable: !_.get(this.state, type)
});

return this.btns.map(btn => (
<button
key={`btn${btn.type}`}
type="button"
className={getClass(btn.icon, btn.type)}
onClick={() => this.toggleMediaDevice(btn.type)}
/>
));
}

render() {
const { status, endCall } = this.props;
return (
<div className={classnames('call-window', status)}>
<video id="peerVideo" ref={el => this.peerVideo = el} autoPlay />
<video id="localVideo" ref={el => this.localVideo = el} autoPlay muted />



<div className="video-control">
<div id="timer">

<span id="time"></span>
</div>




{this.renderControlButtons()}
<button
type="button"
className="btn-action hangup fa fa-phone"
onClick={() => endCall(true)}
/>

<button
type="button"
className="btn-action hangup fa fa-phone"
onClick={() => this.recordd()}
/>

<button
type="button"
className="btn-action hangup fa fa-phone"
onClick={() => this.records()}
/>


</div>
</div>
);
}
}

CallWindow.propTypes = {
status: PropTypes.string.isRequired,
localSrc: PropTypes.object, // eslint-disable-line
peerSrc: PropTypes.object, // eslint-disable-line
config: PropTypes.object, // eslint-disable-line
mediaDevice: PropTypes.object, // eslint-disable-line
endCall: PropTypes.func.isRequired
};

export default CallWindow;
