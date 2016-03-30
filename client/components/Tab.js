import React, { Component } from 'react';

class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="radio-box job">
        {props.types.map((item, i) =>
          <div key={i} className={ (item.value === this.state[props.name]) ? 'active' : '' }>
            <span>{item.label}</span>
            <input type="radio" name={props.name} value={item.value}
              checked={item.value === this.state[props.name]} onChange={ this.stateChange.bind(this) } />
          </div>
        )}
      </div>
    );
  }
}

export default Tabs;