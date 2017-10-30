import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import Message from "./Message";
import {chooseNewUser} from "./App";
import createChatMessage from "../mutations/createChatMessage";
import updateChatMessage from "../mutations/updateChatMessage";
import deleteChatMessage from "../mutations/deleteChatMessage";

import styles from '../styles/MessagesContainer.css';

class MessagesContainer extends React.Component {
  keyPress = (e) => {
    if(e.keyCode === 13 && e.target.value.trim().length > 0){
      const {relay, data, simpleState: state} = this.props;
      createChatMessage(relay.environment, data, state.activeUser, e.target.value);
      chooseNewUser();
      e.target.value = '';
    }
  };

  updateMessage = (id, text) => {
    const {relay} = this.props;
    updateChatMessage(relay.environment, id, text);
  };

  deleteMessage = (id) => {
    const {relay, data} = this.props;
    deleteChatMessage(relay.environment, data, id);
  };

  render() {
    const {totalCount, edges} = this.props.data.allChatMessages || {};
    console.log(totalCount);

    return (
      <div className={styles.messagesContainer}>
        <div className={styles.messageContainerHeader}>You left {totalCount} message(s) for yourself.</div>
        <div className={styles.messageListContainer}>
          {
            edges.map((edge, i) => <Message data={edge.node} key={i} updateMessage={this.updateMessage} deleteMessage={this.deleteMessage} />)
          }
        </div>
        <input className={styles.messageInputField} onKeyDown={this.keyPress} />
      </div>
    );
  }
}

export default  createFragmentContainer(
  MessagesContainer,
  graphql`
      fragment MessagesContainer on Query {
          allChatMessages(first: 50) @connection(key: "AppQuery_allChatMessages") {
              totalCount
              edges {
                  node {
                      ...Message
                  }
              }
          }
      }
  `,
);
