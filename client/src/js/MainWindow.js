import React, { Component } from 'react';
import PropTypes from 'proptypes';

let friendID;



let pg = require('pg');
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

// include an OR statement if you switch between a local dev db and 
// a remote heroku environment

let connString = process.env.DATABASE_URL || 'postgres://fyngdzukkahhbq:1961b06d70494c1ca70d54fbc09eac2edeaa687f0d4f828cca4ec94052d22eea@ec2-54-221-212-126.compute-1.amazonaws.com:5432/dd1i094ii9uj7m
';
const { Pool } = require('pg');

const pool = new Pool({
  connectionString : connString
});









class MainWindow extends Component {
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  callWithVideo(video) {
    const { startCall } = this.props;
    const config = { audio: true, video };
    return () => startCall(true, friendID, config);
  }


  callWithVideoTest(audio) {
    const { startCall } = this.props;
    const config = { audio: true };
    return () => startCall(true, friendID, config);
  }
  
  
  
  render() {
    const { clientId } = this.props;
    document.title = `${clientId} - VideoCall`;
    return (
      <div className="container main-window">
        <div>
          <h3>
            Hi, your ID is
            <input
              type="text"
              className="txt-clientId"
              defaultValue={clientId}
              readOnly
            />
          </h3>
          <h4>Get started by calling a friend below</h4>
        
      
    
          <input
            type="text"
            className="txt-clientId"
            spellCheck={false}
            placeholder="Your friend ID"
            onChange={event => friendID = event.target.value}
          />
          <div>
            <button
              type="button"
              className="btn-action fa fa-video-camera"
              onClick={this.callWithVideo(true)}
            />
            <button
              type="button"
              className="btn-action fa fa-phone"
              onClick={this.callWithVideoTest()}
            />
          </div>
        </div>
      </div>
    );
  }
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired
};

export default MainWindow;
