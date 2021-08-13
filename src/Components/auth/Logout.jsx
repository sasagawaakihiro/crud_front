import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resultMessage: ''
    }
  }
  handleLogoutClick = () => {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        console.log(response)
        this.setState({ resultMessage: response.data.message })
        this.props.handleLogout()
      }).catch(error => {
        console.log(error)
        this.setState({resultMessage: '何らかのエラーが発生しました。'})
      })
    
  }
  render() {
    return (
      <div>
        <h3>ログアウト</h3>
        <Button variant="outline-secondary" onClick={this.handleLogoutClick}>ログアウト</Button>
        <label>{this.state.resultMessage}</label>
      </div>
    )
  }
}
export default Logout