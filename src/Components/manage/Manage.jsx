import React from 'react'
import axios from 'axios'
import CategoryList from './CategoryList'

class Manage extends React.Component {
  componentWillMount() {
    console.log('histry'+this.props.history);
    axios.get("http://localhost:3001/logged_in"
      , { withCredentials: true })
      //未ログインまたはサーバエラーでログイン画面に遷移する
      .then(response => {
        console.log("login response: ", response)
        if (!response.data.logged_in) {
          this.props.history.push('/login');
        }
      })
      .catch(error => {
        console.log(error)
        this.props.history.push('/login');
    })
  }

  render() {
      return (
        <div>
          <CategoryList />
        </div>
      )
    }
  
}
export default Manage