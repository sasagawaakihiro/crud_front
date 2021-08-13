import React, { useEffect,useState } from 'react';
import axios from 'axios'
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/auth/Login';
import Logout from './Components/auth/Logout';
import Manage from './Components/manage/Manage';
import Registration from './Components/auth/Registration';
import Content from './Components/Content';
import CategoryList from './Components/CategoryList';

export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン")

  const handleLogin = () => {
    setLoggedInStatus("ログイン済み")
  }

  const handleLogout = () => {
    setLoggedInStatus("未ログイン")
  }

  useEffect(() => {
    checkLoginStatus()
  })

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
    .then(response => {
      console.log("login response: ", response)
      if (response.data.logged_in) {
        setLoggedInStatus("ログイン済み")
      } else if (!response.data.logged_in) {
        setLoggedInStatus("未ログイン")
      }
    })
    .catch(error => {
      console.log(error)
      setLoggedInStatus("未ログイン")
    })
  }

    return (
      <div className="App">
        <Container>
          <BrowserRouter>
            <Header loggedInStatus={loggedInStatus} />
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/category">
                <CategoryList />
              </Route>
              <Route exact path="/login">
                <Login handleLogin={handleLogin}/>
              </Route>
              <Route exact path="/logout">
                <Logout handleLogout={handleLogout}/>
              </Route>
                <Route exact path="/manage" component={Manage}/>
              <Route exact path="/signup">
              <Registration />
              </Route>
              <Route path='/post_content/:categoryId' component={Content} />
            </Switch>
            </BrowserRouter>
        </Container>
      </div>
    );
}
