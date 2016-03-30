import React from 'react';
import Iframe from 'react-iframe'

class MonsterFrame extends React.Component {
  constructor(props){
    super(props);
    
    console.log("monster jobs: ", this.props);

    var q = this.props.query.q.split(" ").join("-") || "Software-Engineer";
    var where = this.props.query.l.split(" ").join("-") || "San-Francisco";

    this.state = {
      iframeURL: `http://jobs.monster.com/search/?q=${q}&where=${where}`
    };
  }


  onClickDice() {
    var q = this.props.query.q.split(" ").join("+") || "Software+Engineer";
    var where = this.props.query.l.split(" ").join("+") || "San+Francisco";

    this.setState({
      iframeURL: `https://www.dice.com/jobs?q=${q}&l=${where}`
    })
  }

  onClickMonster() {
    var q = this.props.query.q.split(" ").join("-") || "Software-Engineer";
    var where = this.props.query.l.split(" ").join("-") || "San-Francisco";

    this.setState({
      iframeURL: `http://jobs.monster.com/search/?q=${q}&where=${where}`
    })
    
  }
  render(){
    return (
      <div className="iframe__container">
        <div className='iframe'>
          <Iframe url={this.state.iframeURL} />
        </div>
        <div className="iframe__aside">
          <div onClick={this.onClickMonster.bind(this)} className="iframe-site-name">Monster</div>
          <div onClick={this.onClickDice.bind(this)} className="iframe-site-name">Dice</div>
          <div className='help-container'>
            <div className="help-header">You can add jobs to Kanban from any of the above sites:</div><br></br>
              <div className="help-text"><li>Right click the link for the job on the right.</li><br></br>
              <li>Tap the target on the top bar & paste it in the box</li><br></br>
              <li>We parse the page for job details & store it in the Kanban</li><br></br>
              <li>You are done</li></div>
          </div>
        </div>
      </div>
      )
  }
 
}

export default MonsterFrame;