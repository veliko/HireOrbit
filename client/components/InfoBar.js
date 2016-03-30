import React, { Component, PropTypes } from 'react';
import Moment from 'moment';

let InfoBar = (props) => {
  return (
    <div className="info__bar">
      <span className="info__bar__upcoming__event">{props.event ? props.event.summary : null}</span>
      <span className="info__bar__time">{props.event.start ? Moment(props.event.start.dateTime).calendar() : null}</span>
    </div>
  );
};

export default InfoBar;