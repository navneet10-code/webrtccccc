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




<html>
<body>

<style>
    html, body {
        margin: 0!important;
        padding: 0!important;
    }

    video {
        max-width: 100%;
    }
</style>

<title>RecordRTC Google Chrome Extension API</title>
<h1>How to use RecordRTC_Extension? <a href="https://github.com/muaz-khan/Chrome-Extensions/tree/master/screen-recording#call-from-your-own-website">Check API/Documentation</a></h1>
<p>This chrome extension is required: <a href="https://chrome.google.com/webstore/detail/recordrtc/ndcljioonkecdnaaihodjgiliohngojp">Link To Google Chrome Extension</a></p>

<br>

<select id="RecordRTC_Extension_Options">
    <option value="0">Screen Only (wihtout audio)</option>
    <option value="1">Screen + Microphone</option>
    <option value="2">Screen + Speakers</option>
    <option value="3">Screen + Microphone + Speakers</option>
    <option value="4">Chrome Tab</option>
    <option value="5">Chrome Tab (Audio Only)</option>
    <option value="6">Full Screen + Camera</option>
    <option value="7">Microphone + Camera</option>
    <option value="8">Microphone + Speakers</option>
    <option value="9">Microphone Only</option>
    <option value="10">Speakers Only</option>
</select>
<button id="btn-start-recording">Start Recording</button>
<button id="btn-stop-recording" disabled>Stop Recording</button>

<hr>
<video controls autoplay playsinline></video>


<script>
if(typeof RecordRTC_Extension === 'undefined') {
    alert('RecordRTC chrome extension is either disabled or not installed.');
}

// first step
var recorder = new RecordRTC_Extension();

var video = document.querySelector('video');

function stopRecordingCallback(blob) {
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(blob);
    recorder = null;
}

document.getElementById('btn-start-recording').onclick = function() {
    this.disabled = true;
    // you can find list-of-options here:
    // https://github.com/muaz-khan/Chrome-Extensions/tree/master/screen-recording#getsupoortedformats
    var options = recorder.getSupoortedFormats()[document.getElementById('RecordRTC_Extension_Options').value];

    // second step
    recorder.startRecording(options, function() {
        document.getElementById('btn-stop-recording').disabled = false;
    });
};

document.getElementById('btn-stop-recording').onclick = function() {
    this.disabled = true;

    // third and last step
    recorder.stopRecording(stopRecordingCallback);
};
</script>

<footer style="margin-top: 20px;"><small id="send-message"></small></footer>
<script src="https://www.webrtc-experiment.com/common.js"></script>
  


</body>
</html>





{this.renderControlButtons()}
<button
type="button"
className="btn-action hangup fa fa-phone"
onClick={() => endCall(true)}
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
