import React, { Component } from 'react';
import axios from 'axios';

import Comment from './comment';
import AddComment from './add-comment';

class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            content: '',
            image: '',
            createdAt: '',
            comments: [],
            isLoaded: false
        }
    }

    componentDidMount(){
        axios.get(`/api/post/${this.props.match.params.slug}`)
            .then(response => {
                console.log(response);
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    content: response.data.content,
                    image: response.data.image,
                    createdAt: response.data.createdAt
                });

                let authToken = localStorage.getItem('auth-token');
                axios.get(`/api/comment/post/${this.state.id}`, { headers: { Authorization: `Bearer ${authToken}` } })
                    .then(response => {
                        console.log(response);
                        this.setState({ comments: response.data, isLoaded: true })
                    })
                    .catch(error => console.log(error));
            })
            .catch(err => console.error(err));        
    }

    listAllComments() {
        return  this.state.comments.length > 0 ? this.state.comments.map(function(post, i){
            return <Comment key={i} comment={post} />;
        }) : 'There are no comments yet.';
    }

    render () {
        return (
            <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-xs-12">
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={`../../uploads/post_images/${this.state.image}`} class="d-block w-100" />
                        </div>                        
                    </div>
                </div>

                <h1>{this.state.title}</h1>
                <p>{this.state.content}</p>    

                <h2>Comments</h2>
                { this.listAllComments() }    
                
                <AddComment postID={this.state.id}/>
            </div>
        )
    }
}

export default PostDetail;
