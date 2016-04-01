import React, { Component, PropTypes } from 'react';
import Utils from '../utils/Utils';

class CardForm extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      company: '',
      jobtitle: '',
      snippet: '',
      city: '',
      state: '',
      country: '',
      url: ''
    };
  }

  componentWillMount() {
    console.log("will be setting the following state: ", this.props);
    if(this.props.cardData) {
      let cardData = this.props.cardData;
      this.setState({
        company: cardData.job_data.company || '',
        jobtitle: cardData.job_data.jobtitle || '',
        snippet: cardData.job_data.snippet || '',
        city: cardData.job_data.city || '',
        state: cardData.job_data.state || '',
        country: cardData.job_data.country || '',
        url: cardData.job_data.url || ''
      });
    }
  }

  handleChange(field, e) {
    let value = e.target.value;
    this.setState({
      [field]: value
    });
  }

  createAndSubmitCard(e) {
    e.preventDefault();
    let jobkey = this.props.cardData ? this.props.cardData.card_id : ("usercard" + Math.random().toString().slice(2));
    let card = [{
      card_id: jobkey,
      status: 'interested',
      job_data: {
        jobkey: jobkey,
        company: this.state.company,
        date: (new Date()).toUTCString(),
        jobtitle: this.state.jobtitle,
        snippet: this.state.snippet,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        url: this.state.url,
        expired: false,
        formattedlocation: '',
        source: 's',
        latitude: 's',
        longitude: 's',
        sponsored: false,
        expired: false,
        indeedapply: false,
        formattedlocationfull: 's',
        nouniqueurl: false,
        formattedrelativetime: 's',
        onmousedown: 's' 
      },
      events: [],
      rating: 0
    }];

    this.props.toggleModalState();
    this.props.addCardsToKanban(card);

    // remainder of code is responsible for persisting card to db
    let cardPositions = this.props.cards.reduce((result, card, index) => {
      result[card.card_id] = index;
      return result;
    }, {});

    let cardIsInKanban = Boolean(cardPositions[card.card_id] !== undefined);
    
    if (!cardIsInKanban) {
      cardPositions[card[0].card_id] = Object.keys(cardPositions).length;
      cardPositions = JSON.stringify(cardPositions);

      let cardsAndPositions = {
        cards: card,
        cardPositions
      }
      console.log("card details: ", cardsAndPositions);
      Utils.persistCardsToKanban(cardsAndPositions);

    } else { 
      console.log("Card is already in Kanban");
    }
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" 
                 value={this.state.company}
                 onChange={this.handleChange.bind(this, 'company')}
                 placeholder="Company Name"
                 required={true}
                 autofocus={true} />
          <input type="text" 
                 value={this.state.jobtitle}
                 onChange={this.handleChange.bind(this, 'jobtitle')}
                 placeholder="Job Title"
                 required={true}
                 autofocus={true} />
          <textarea onChange={this.handleChange.bind(this, 'snippet')}
                    value={this.state.snippet}
                    placeholder="Job Description"></textarea>
          <input type="text" 
                 value={this.state.city}
                 onChange={this.handleChange.bind(this, 'city')}
                 placeholder="City" />
          <input type="text"
                 value={this.state.state}
                 onChange={this.handleChange.bind(this, 'state')} 
                 placeholder="State" />
          <input type="text" 
                 value={this.state.country}
                 onChange={this.handleChange.bind(this, 'country')} 
                 placeholder="Country" />
          <input type="text" 
                 value={this.state.url}
                 onChange={this.handleChange.bind(this, 'url')} 
                 placeholder="Paste Job Link Here" />
          <button onClick={this.props.toggleModalState.bind(this)}>Cancel</button>
          <button onClick={this.createAndSubmitCard.bind(this)}>Create Card</button>
        </form>
      </div>
    );
  }
}

export default CardForm;