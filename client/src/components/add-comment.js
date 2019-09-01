import React, { Component } from 'react';
import axios from 'axios';

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: ''
        }
    }

    handleChange = e =>{
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();

        const newComment = {
            title: this.state.title,
            content: this.state.content
        }

        let authToken = localStorage.getItem('auth-token');
        axios.post(
                `/api/comment/create/post/${this.props.postID}`, 
                newComment,
                { headers: { Authorization: `Bearer ${authToken}` } }
            )
            .then(response => console.log(response))
            .catch(err => console.error(err));

        window.location = '/posts';

    }

    render () {
        return (
            <div>
                <h3 className="mb-2 text-center">Create New Comment</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Title </label>
                        <input  
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content </label>
                        <textarea 
                            className="form-control"  
                            id="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                            rows="4"
                        />                        
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Comment" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default AddComment;
