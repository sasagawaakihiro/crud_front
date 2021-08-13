import React from 'react'
import axios from 'axios'
import ContentDitail from './ContentDitail'
import update from 'react-addons-update'
import PostForm from './PostForm'

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: [],
      uniqueId: '',
    }
  }

  //投稿一覧取得：Cookieを使用するため、遅延実行する
  timeout(msec) {
    setTimeout(() => {
      axios.post('http://localhost:3001/getList', {
          category_id: this.props.match.params.categoryId,
          u: this.state.uniqueId
      },{ withCredentials: true })
        .then((results) => {
          console.log(results)
          this.setState({contents: results.data})
        })
        .catch((data) =>{
          console.log(data)
        }
      )
    }, msec);
  }

  componentDidMount() {
    var now = new Date();
    //投稿非表示機能を実現するため匿名ユーザごとにユニークな値をCookieで保持する
    var uniqueId = String(now.getHours()) + String(now.getMinutes()) + String(now.getSeconds()) + String(now.getMilliseconds())
    axios.post('http://localhost:3001/uniqueId', {
        uniqueId: uniqueId
      },
      { withCredentials: true })
      .then((results) => {
        //Cookie登録に成功したらステートに保存する
        this.setState({uniqueId: results.data})
        console.log(results)
      })
      .catch((data) =>{
        console.log(data)
      })
    this.timeout(500);
  }

  //新規投稿
  createContent = (postContent) => {
    postContent.category_id = this.props.match.params.categoryId
    axios.post('http://localhost:3001/contents', {
        postContent: postContent
      }
      , { withCredentials: true })
      .then((response) => {
        const newData = update(this.state.contents, {$push:[response.data]})
        this.setState({contents: newData})
      })
      .catch((data) =>{
        console.log(data)
      }
    )
  }

  //投稿非表示更新
  hideProduct = (id) => {
    axios.patch(`http://localhost:3001/contents/${id}`, {
      is_hide: true
    },
    { withCredentials: true })
      .then(() => {
        const contentIndex = this.state.contents.findIndex(x => x.id === id)
        const contents = update(this.state.contents, {$splice: [[contentIndex, 1]]})
        this.setState({contents: contents})
      })
      .catch((data) =>{
        console.log(data)
      })
  }

  render() {
    return (
      <div>
        {this.state.contents.map((data) => {
          return(
            <ContentDitail data={data} key={data.id} uniqueId={this.state.uniqueId} onUpdate={this.hideProduct}/>
          )
        })}
        <PostForm postContent={this.createContent}/>
      </div>
    )
  }
}

export default Content