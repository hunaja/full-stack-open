import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Navbar, Nav, Container, Alert } from 'react-bootstrap'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { initializeUser, logoutUser } from './reducers/loginReducer'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  
  useEffect(() => dispatch(initializeUser()), [])

  if (!user) {
    return (
      <div>
        <h2>login to the application</h2>

        {notification && <i>{notification}</i>}

        <LoginForm />
      </div>
    )
  }

  const handleLogout = () => dispatch(logoutUser())

  return (
    <Router>
      <div className="container">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" href="/">
                  blogs
                </Nav.Link>
                <Nav.Link as={Link} to="/users" href="/users">
                  users
                </Nav.Link>
              </Nav>
              <Nav>
                <Navbar.Text>
                  <i>{user.name}</i>
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {notification && <Alert variant="success">{notification}</Alert>}
        <Switch>
          <Route exact path="/">
            <BlogList />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App