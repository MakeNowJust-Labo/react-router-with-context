import React from 'react';

import {connect} from '../models/users';

const IndexPage = ({model, match}) => {
  const id = match.params.id;

  if (model.state.loading) {
    return 'Loading...';
  }

  if (model.state.error) {
    return `Error: ${model.state.error.message}`;
  }

  if (!model.state.cache[id]) {
    model.load(id);
    return 'Loading...';
  }

  const user = model.state.cache[id];

  return (
    <div>
      <h2>{user.id}</h2>
      <img src={user.icon} />
    </div>
  )
};

export default connect(IndexPage);
