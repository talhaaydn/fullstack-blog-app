import React, { Component } from 'react';
import axios from 'axios';

class PostCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            content: '',
            image: null,
            metaTitle: '',
            metaDescription: '',
        }        
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChangeFile = e => {
        this.setState({
            image: e.target.files[0]
        });
    }

    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('image', this.state.image);
        formData.append('metaTitle', this.state.metaTitle);
        formData.append('metaDescription', this.state.metaDescription);

        let authToken = localStorage.getItem('auth-token');
        axios.post(
                '/api/post/create', 
                formData,
                { headers: { Authorization: `Bearer ${authToken}` } }
            )
            .then(response => console.log(response))
            .catch(err => console.error(err));

        window.location = '/my-posts';

    }

    render() {
        return (
            <div>
                <h3 className="mb-2 text-center">Create New Post</h3>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
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
                        <label>Image </label>
                        <input 
                            type="file" 
                            className="form-control-file" 
                            onChange={this.onChangeFile}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Meta Title </label>
                        <input  
                            type="text"
                            className="form-control"
                            id="metaTitle"
                            value={this.state.metaTitle}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Meta Description </label>
                        <textarea                              
                            className="form-control"
                            id="metaDescription"
                            value={this.state.metaDescription}
                            onChange={this.handleChange}
                            rows="2"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default PostCreate;