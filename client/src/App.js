import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Component imports
import ListAllPosts from './components/all-posts';
import PostDetail from './components/post-detail';
import MyPosts from './components/my-posts';
import PostCreate from './components/post-create';
import PostEdit from './components/post-edit';
import Login from './components/login';
import Register from "./components/register";
import Profile from './components/profile';
import withAuth from './components/with-auth';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLogin: false
    }
  }

  componentDidMount(){
    if(localStorage.getItem('auth-token'))
      this.setState({ isLogin: true })
  }

  handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location = '/login';
  }

  render () {
    return (
      <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container">
              <Link to="/" className="navbar-brand">ReactExpressBlogAPI</Link>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav ml-3 mr-auto">
                  <li className="navbar-item">
                    <Link to="/posts" className="nav-link">Posts</Link>
                  </li>
                  { 
                    this.state.isLogin ? 
                    <Fragment>
                      <li className="navbar-item">
                        <Link to="/my-posts" className="nav-link">My Posts</Link>
                      </li>
                      <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Post</Link>
                      </li>  
                    </Fragment>  : ''                  
                  } 
                </ul>
                <ul className="navbar-nav my-2">
                  { 
                    this.state.isLogin ? 
                    <Fragment>
                      <li className="navbar-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                      </li>
                      <li className="navbar-item">
                          <a className="nav-link" onClick={this.handleLogout} style={{cursor: 'pointer'}}>Logout</a>
                      </li>                    
                    </Fragment> : 
                    <Fragment>
                      <li className="navbar-item">
                        <Link to="/login" className="nav-link">Login</Link>
                      </li>
                      <li className="navbar-item">
                        <Link to="/register" className="nav-link">Register</Link>
                      </li> 
                    </Fragment>                  
                  } 
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <Route path="/posts" exact component={ListAllPosts} />
            <Route path="/posts/:slug" component={PostDetail} />
            <Route path="/profile" component={withAuth(Profile)} />
            <Route path="/my-posts" component={withAuth(MyPosts)} />
            <Route path="/edit/:slug" component={withAuth(PostEdit)} />
            <Route path="/create" component={withAuth(PostCreate)} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>          
      </Router>
    )
  }
}

export default App;
