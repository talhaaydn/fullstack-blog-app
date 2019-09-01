import React, { Component } from 'react';
import axios from 'axios';

import MyPostDetail from './my-post-detail';

class MyPosts extends Component {

  constructor(props) {
    super(props);
    this.state = { posts: [] }
  }

  componentDidMount() {
    let authToken = localStorage.getItem('auth-token');

    axios.get('/api/post/user', { headers: { Authorization: `Bearer ${authToken}` } })
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(err => console.error(err));
  }

  listAllPosts() {
    return this.state.posts.map(function(post, i){
        return <MyPostDetail key={i} post={post} />;
    })
  }

  render () {
    return (
      <div>  
        <h3 className="text-center mb-3">My Posts</h3>
        <div className="row">
          { this.state.posts.length > 0 ? this.listAllPosts() : 'We can not find any post for user' } 
        </div>
      </div>
    )
  }
}

export default MyPosts;