import React from 'react';

import theme from '../theme';

const styles = {
  container: {
    height: '100%',
    padding: '0 1em'
  },

  name: {
    display: 'inline',
    margin: 0,
    fontSize: '1.250em',
    fontWeight: 900
  },

  description: {
    marginLeft: '1em',
    fontSize: '0.813em',
    color: theme.colors.textColorLight
  }
};

export default ({ name, description }) => (
  <div style={styles.container} className="u-truncate">
    <h3 style={styles.name}>{name}</h3>
    <span style={styles.description}>{description}</span>
  </div>
);
