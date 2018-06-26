import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from '../models/users';

const IndexPage = ({model}) => {
  if (model.state.loading) {
    return 'Loading...';
  }

  if (model.state.error) {
    return `Error: ${model.state.error.message}`;
  }

  if (!model.state.list) {
    model.loadAll();
    return 'Loading...';
  }

  const items = model.state.list
    .map(id => model.state.cache[id])
    .map(({id, icon}) => (
      <li key={id}>
        <img src={icon} style={{width: '1em', height: '1em'}} />
        <Link to={`/user/${id}`}>{id}</Link>
      </li>
    ));

  return (
    <ul>
      {items}
    </ul>
  )
};

export default connect(IndexPage);
