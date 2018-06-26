import React, {Component, createContext} from 'react';

import axios from 'axios';

const UsersContext = createContext({
  state: {
    loading: false,
    error: null,
    cache: {},
    list: null,
  },
  loadAll: () => undefined,
  load: () => undefined,
});

export const withUsers = Component => props => (
  <UsersContext.Consumer>{users => <Component users={users} {...props} />}</UsersContext.Consumer>
);

export class UsersProvider extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: null,
      cache: {},
      list: null,
    };
  }

  render() {
    const state = this.state;
    const users = {
      state,
      loadAll: async () => {
        if (state.list || state.loading) {
          return;
        }

        try {
          this.setState({loading: true});
          const {data: users} = await axios.get('http://localhost:3000/users');
          const cache = Object.assign({}, this.state.cache);
          for (const user of users) {
            cache[user.id] = user;
          }
          const list = users.map(({id}) => id);
          this.setState({cache, list});
        } catch (error) {
          this.setState({error});
        } finally {
          this.setState({loading: false});
        }
      },
      load: async id => {
        if (state.cache[id] || state.loading) {
          return;
        }

        try {
          this.setState({loading: true});
          const {data: user} = await axios.get(`http://localhost:3000/user/${id}`);
          const cache = Object.assign({}, this.state.cache, {[user.id]: user});
          this.setState({cache});
        } catch (error) {
          this.setState({error});
        } finally {
          this.setState({loading: false});
        }
      },
      update: async (id, icon) => {
        if (state.loading) {
          return;
        }

        try {
          this.setState({loading: true});
          const {data: user} = await axios.post(`http://localhost:3000/user/${id}`, {icon});
          const cache = Object.assign({}, this.state.cache, {[user.id]: user});
          this.setState({cache});
        } catch (error) {
          this.setState({error});
        } finally {
          this.setState({loading: false});
        }
      },
    };

    return <UsersContext.Provider value={users}>{this.props.children}</UsersContext.Provider>;
  }
}
