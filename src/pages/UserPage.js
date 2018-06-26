import React from 'react';

import {withUsers} from '../models/users';
import UserEditor from '../components/UserEditor';

const UserPage = ({users, match: {params: {id}}}) => {
  if (users.state.loading) {
    return 'Loading...';
  }

  if (users.state.error) {
    return `Error: ${users.state.error.message}`;
  }

  if (!users.state.cache[id]) {
    users.load(id);
    return 'Loading...';
  }

  const user = users.state.cache[id];

  return (
    <div>
      <h2>{user.id}</h2>
      <img src={user.icon} />
      <UserEditor {...user} onUpdate={icon => users.update(user.id, icon)} />
    </div>
  );
};

export default withUsers(UserPage);
