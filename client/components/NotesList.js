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
    let notes = "You notes will appear here";
    if (this.props.notes && this.props.notes.length > 0) {
      notes = this.props.notes.map((note, noteIndex) => {
        return (
          <div className="note-container" key={`${note}${noteIndex}`}>
            <span className="note">{note}</span><RemoveButton removeTarget={noteIndex} removeAction={this.handleNoteRemove.bind(this)} />
          </div>
        );
      });
    }

    return ( 
      <div>
        {notes}
        <input type="text" 
               placeholder="Write note and press Enter" 
               onChange={this.handleNoteInputChange.bind(this)}
               onKeyPress={this.handleEnterPress.bind(this)}
               value={this.state.currentNote} />
      </div>
    );
  }
}

export default NotesList;