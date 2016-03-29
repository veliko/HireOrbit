import React from 'react';
import Iframe from 'react-iframe'

class MonsterFrame extends React.Component {
  constructor(){
    super();

    this.state = {
      iframeURL: "http://jobs.monster.com/search/?q=react"
    };
  }


  onClickDice() {
    this.setState({
      iframeURL: "https://www.dice.com/jobs?q=react"
    })
  }

  onClickMonster() {
    this.setState({
      iframeURL: "http://jobs.monster.com/search/?q=react"
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
        </div>
      </div>
      )
  }
 
}

export default MonsterFrame;