import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap';

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      subject: '',
      body: '',
      category_id: null
    }
  }

  //[名前]テキストボックス変更時
  handleChangeName = (e) => {
    this.setState({name: e.target.value})
  }
  //[メールアドレス]テキストボックス変更時
  handleChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }
  //[件名]テキストボックス変更時
  handleChangeSubject = (e) => {
    this.setState({subject: e.target.value})
  }
  //[本文]テキストボックス変更時
  handleChangeBody = (e) => {
    this.setState({body: e.target.value})
  }

  //投稿ボタンクリック時
  hundleSubmit = (e) => {
    if (!this.state.body) {
      alert('本文は入力必須です。')
      return
    }
    this.props.postContent(this.state)
    this.setState({
      name: '',
      email: '',
      subject: '',
      body: '',
      category_id: null
    })
  }

  render(){
    return(
      <div>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3">
              <Form.Label>名前</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={ e => this.handleChangeName(e)}/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control type="email" value={this.state.email} onChange={ e => this.handleChangeEmail(e)}/>
            </Form.Group>
          </Row>
        
          <Form.Group className="mb-3">
            <Form.Label>件名</Form.Label>
            <Form.Control type="text" value={this.state.subject} onChange={ e => this.handleChangeSubject(e)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>本文（必須）</Form.Label>
            <Form.Control as="textarea" rows={3} value={this.state.body} onChange={ e => this.handleChangeBody(e)}/>
          </Form.Group>
        </Form>
        <Button variant="outline-secondary" onClick={this.hundleSubmit}>投稿</Button>
      </div>
    )
  }
}

export default PostForm