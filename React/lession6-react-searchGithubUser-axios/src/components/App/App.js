import React, {Component} from 'react';
import Search from '../Search'
import UserList from '../UserList'


class App extends Component {

  constructor() {
    super()
    this.state = {
      searchName: ''
    }
  }

  search = (searchName) => {
    this.setState({searchName})
  }

  render() {
    return (
      <div className="container">
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <Search search={this.search}/>
        </section>
        <UserList searchName={this.state.searchName}/>
      </div>
    );
  }
}

export default App;
