import React, { Component } from 'react';
import PropTypes from 'proptypes';

let friendID;


 
var pg = require('pg');

app.get('/db', function (request, response) {
    pg.defaults.ssl = true;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        client
            .query('SELECT table_schema,table_name FROM information_schema.tables;')
            .on('row', function(row) {
                console.log(JSON.stringify(row));
            });
    });
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
