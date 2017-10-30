import React from 'react';
import styles from '../styles/Spinner.css';

export default class Spinner extends React.Component {
  render() {

    return (
      <span className={styles.spinner} style={this.props.style || {width: '40px', height: '40px'}}></span>
    );
  }
}
