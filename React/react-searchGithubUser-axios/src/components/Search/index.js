/**
 * 搜索组件
 */
import React, {Component, PropTypes} from 'react'

class Search extends Component {

  search = () => {
    let searchName = this.refs.searchName.value.trim()
    if(searchName!='') {
      this.props.search(searchName)
    }
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="enter the name you search" ref="searchName"/>
        <button onClick={this.search}>Search</button>
      </div>
    )
  }
}
Search.propTypes = {
  search: PropTypes.func.isRequired
}

export default Search