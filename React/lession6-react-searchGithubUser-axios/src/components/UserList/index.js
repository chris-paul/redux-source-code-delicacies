/**
 * 用户列表组件
 */
import './userList.css'
import React, {Component, PropTypes} from 'react'
import axios from 'axios'

class UserList extends Component {

  constructor() {
    super()
    this.state = {
      firstView: true,
      loading: false,
      users: null,
      error: null
    }
  }

  /*
  当接收到来自父组件的属性更新(关联的state更新了)时回调
   */
  componentWillReceiveProps(newProps) {
    console.log('发送ajax请求 '+newProps.searchName)
    //更新状态
    this.setState({firstView: false, loading:true})

    let searchName = newProps.searchName
    axios.get('https://api.github.com/search/users?q='+searchName)
      .then((response) => {
        console.log(response);
        this.setState({loading:false, users:response.data.items})
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading:false, error:error})
      });
  }

  render() {

    console.log('render()2 ', this.state)

    if (this.state.firstView) {
      return <h2>Enter name to search</h2>;
    } else if (this.state.loading) {
      return <h2>Loading result...</h2>;
    } else if (this.state.error) {
      return <h2>{this.state.error}</h2>;
    } else {
      return (
        <div className="row">
          {
            this.state.users.map((user) => (
              <div className="card" key={user.html_url}>
                <a href={user.html_url} target="_blank">
                  <img src={user.avatar_url} style={{width: '100px'}}/>
                </a>
                <p className="card-text">{user.login}</p>
              </div>
            ))
          }
        </div>
      );
    }
  }
}
UserList.propTypes = {
  searchName: PropTypes.string.isRequired
}

export default UserList