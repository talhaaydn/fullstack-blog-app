import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MyPostDetail extends Component {
    constructor(props) {
        super(props);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost() {
        let authToken = localStorage.getItem('auth-token');
        
        axios.delete(
                `/api/post/delete/${this.props.post.id}`, 
                { headers: { Authorization: `Bearer ${authToken}` } }
            )
            .then(response => {
                console.log(response.data);
                window.location.reload(); 
            })
            .catch(err => console.error(err)); 
    }

    render () {
        return (
            <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2">
                <div className="jumbotron text-center">
                    <img src={`../uploads/post_images/${this.props.post.image}`} width="300" />
                    <h1 className="display-4">{this.props.post.title}</h1>
                    <p className="lead">{this.props.post.content.slice(0, 100)}</p>
                    <Link className="btn btn-primary float-right" to={`/edit/${this.props.post.slug}`}>Edit</Link>    
                    <button className="btn btn-warning float-right mr-2" onClick={this.deletePost}>Delete</button>  
                </div>
            </div>
        )
    }
}

export default MyPostDetail;
