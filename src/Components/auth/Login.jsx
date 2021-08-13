import React, { useState } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap';

export default function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [resultMessage, setResultMessage] = useState("")

  const handleSubmit = (event) => {
    axios.post("http://localhost:3001/login",
      {
        user: {
          email: email,
          password: password,
        }
      },
      { withCredentials: true }
      ).then(response => {
        console.log("login response: ", response)
        if (response.data.logged_in) {
          props.handleLogin(response.data)
        }
        setResultMessage(response.data.message)
      }).catch(error => {
        console.log("registration error", error)
        props.handleLogin('何らかのエラーが発生しました。')
      }
    )
    event.preventDefault()
  }

  return (
    <div>
      <h3>ログイン</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <Button variant="outline-secondary" onClick={e => handleSubmit(e)}>ログイン</Button>
        <label>{resultMessage}</label>
      </form>
    </div>
  )
}