import React, { Component } from 'react';
import axios from 'axios';

import Post from './post';

class ListAllPosts extends Component {

  constructor(props) {
    super(props);
    this.state = { posts: [] }
  }

  componentDidMount() {
    axios.get('api/post/page/1')
      .then(response => {
        this.setState({ posts: response.data.posts })
      })
      .catch(err => console.error(err));
  }

  listAllPosts() {
    return this.state.posts.map(function(post, i){
        return <Post key={i} post={post} />;
    })
  }

  render () {
    return (
      <div>  
        <h3 className="text-center mb-3">All Posts</h3>
        <div className="row">
          { this.listAllPosts() }
        </div>
      </div>
    )
  }
}

export default ListAllPosts;
