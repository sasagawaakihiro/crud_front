import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'

class CategoryDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      updateText: '',
    }
  }

  //カテゴリ名入力時
  handleInput = (e) => {
    this.setState({updateText: e.target.value})
  }
  
  //[削除]ボタンクリック時
  handleDeleate = () => {
    this.props.onDelete(this.props.data.id)
  }

  //[更新]ボタンクリック時
  handleUpdate = () => {
    if (!this.state.updateText) {
      alert('カテゴリ名を入力してください。')
      return
    }
    this.props.onUpdate(this.props.data.id, this.state.updateText)
  }

  render(){
    return(
      <div>
        <Link to={'/post_content/' +this.props.data.id}>{this.props.data.name}</Link>
        <span>
          <input type="text" value={this.state.updateText} onChange={e => this.handleInput(e)}/>
        </span>
        <span>
          {this.props.data.contents_count}件
        </span>
        <span>
          <Button variant="outline-secondary" type="submit" onClick={this.handleUpdate}>更新</Button>
        </span>
        <span>
          <Button variant="outline-danger" type="submit" onClick={this.handleDeleate}>削除</Button>
        </span>
      </div>
    )
  }
}

export default CategoryDetail