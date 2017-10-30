import React from 'react';

import styles from "../styles/Box.css";

class Box extends React.Component {

  render() {
    return (
      <div className={styles.BoxContainer}>
        <div className={styles.Box}>
          {this.props.title ? <h2>{this.props.title}</h2> : null}
          <div className={styles.BoxContent}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Box;
