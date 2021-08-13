import React from 'react'
import { Link } from 'react-router-dom'

class CategoryDetail extends React.Component {
  render(){
    return(
      <div>
        <Link to={'/post_content/' +this.props.data.id}>{this.props.data.name}</Link>
      </div>
    )
  }
}

export default CategoryDetail