import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      resultMessage: ''
    }
  }

  setEmail = (e) => {
    this.setState({email: e.target.value})
  }
  setPassword = (e) => {
    this.setState({password: e.target.value})
  }
  setPasswordConfirmation = (e) => {
    this.setState({passwordConfirmation: e.target.value})
  }
  handleSubmit = (e) => {
    axios.post("http://localhost:3001/signup",
      {
        user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation
        }
      },
      { withCredentials: true }
      ).then(response => {
          this.setState({ resultMessage: response.data.message })
      }).catch(error => {
          console.log("registration error", error)
          this.setState({ resultMessage: '何らかのエラーが発生しました。' })
      }
    )
    e.preventDefault()

  }
  render() {
    return (
      <div>
        <h3>新規登録</h3>
        <form>
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={this.state.email}
            onChange={e => this.setEmail(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            value={this.state.password}
            onChange={e => this.setPassword(e)}
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="確認用パスワード"
            value={this.state.passwordConfirmation}
            onChange={e => this.setPasswordConfirmation(e)}
          />
          <Button variant="outline-secondary" onClick={e => this.handleSubmit(e)}>登録</Button>
          <label>{this.state.resultMessage}</label>
        </form>
      </div>
    )
  }
}

export default Registration