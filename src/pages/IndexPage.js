import React from 'react';
import {Link} from 'react-router-dom';

import {withUsers} from '../models/users';

const IndexPage = ({users}) => {
  if (users.state.loading) {
    return 'Loading...';
  }

  if (users.state.error) {
    return `Error: ${users.state.error.message}`;
  }

  if (!users.state.list) {
    users.loadAll();
    return 'Loading...';
  }

  const items = users.state.list.map(id => users.state.cache[id]).map(({id, icon}) => (
    <li key={id}>
      <img src={icon} style={{width: '1em', height: '1em'}} />
      <Link to={`/user/${id}`}>{id}</Link>
    </li>
  ));

  return <ul>{items}</ul>;
};

export default withUsers(IndexPage);
