import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Identicon from 'identicon.js';
import MdCreate from 'react-icons/lib/md/create';
import MdClose from 'react-icons/lib/md/close';
import hashCode from "../helpers/hashCode";
import styles from '../styles/Message.css';
import Spinner from "./Spinner";

class Message extends React.Component {
  state = {
    editMode: false,
  };

  toggleEditMode = () => {
    this.setState({editMode: !this.state.editMode});
  };

  keyPress = (e) => {
    if(e.keyCode === 13 && e.target.value.trim().length > 0) {
      debugger;
      this.props.updateMessage(this.props.data.id, e.target.value);
      this.toggleEditMode();
    }
  };

  render() {
    const {deleteMessage} = this.props;
    const {id, message, username, updated} = this.props.data;
    const data = new Identicon(hashCode(username), {size: 30, margin: -0.0, background: [241, 241, 241]}).toString();

    return (
      <div className={styles.messageRow}>
        <div className={styles.avatarContainer} title={username}>
          <img src={'data:image/png;base64,'+data} alt={username}/>
          <p>{username.split(' ').map(parts => parts[0]).join('')}</p>
        </div>
        <div className={styles.triangle}></div>
        <div className={styles.messageContainer}>
          <div className={styles.message}>
            {!this.state.editMode ? <span>{message}</span> :
              <input defaultValue={message} autoFocus className={styles.messageInputField} onKeyDown={this.keyPress} />
            }
            <MdCreate onClick={() => this.toggleEditMode()} title="Edit" style={{cursor: 'pointer'}}/>
            <MdClose onClick={() => deleteMessage(id)} title="Delete" style={{cursor: 'pointer'}}/>
          </div>
          <small className={styles.messageDate}>{updated ? new Date(updated).toLocaleString() : <Spinner style={{width: '12px', height: '12px', margin: '2px'}} />}</small>
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(
  Message,
  graphql`
      fragment Message on ChatMessage {
          id
          message
          username
          updated
      }
  `,
);
