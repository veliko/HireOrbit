import React, { Component, PropTypes } from 'react';
import RemoveButton from './RemoveButton';

class NotesList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      currentNote: ''
    }
  }

  handleNoteInputChange(e) {
    this.setState({
      currentNote: e.target.value
    });
  }

  handleEnterPress(e) {
    if (e.key === "Enter") {
      let notes = this.props.notes || [];
      notes = notes.concat([this.state.currentNote]);
      this.setState({
        currentNote: ''
      });
      this.props.updateCardNotes(this.props.card_id, notes);
    }
  }

  handleNoteRemove(noteId) {
    let notes = [...this.props.notes];
    notes.splice(noteId, 1);
    this.props.updateCardNotes(this.props.card_id, notes);
  }

  render() {
    let notes = <span className="card__list__entry">"You notes will appear here"</span>;
    if (this.props.notes && this.props.notes.length > 0) {
      notes = this.props.notes.map((note, noteIndex) => {
        return (
          <div className="card__list__entry" key={`${note}${noteIndex}`}>
            <RemoveButton removeTarget={noteIndex} 
                          removeAction={this.handleNoteRemove.bind(this)} />
            <span>{(note)}</span>
          </div>
        );
      });
    }

    return ( 
      <div className="notes__list">
        {notes}
        <input type="text" 
               className="card__input"
               placeholder="Write note and press Enter" 
               onChange={this.handleNoteInputChange.bind(this)}
               onKeyPress={this.handleEnterPress.bind(this)}
               value={this.state.currentNote} />
      </div>
    );
  }
}

export default NotesList;