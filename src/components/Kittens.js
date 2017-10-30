import React from 'react';

import styles from '../styles/Kittens.css';

const kittenUrl = 'http://thecatapi.com/api/images/get?format=src';

class Kittens extends React.Component {
  render() {
    return (
      <img className={styles.Kittens} src={kittenUrl} alt="Wait for it ... it's coming :)" />
    );
  }
}

export default Kittens;