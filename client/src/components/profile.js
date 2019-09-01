import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',            
            email: '',
            password: '',
            avatar: null
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChangeFile = e => {
        this.setState({
            avatar: e.target.files[0]
        });
    }

    componentDidMount(){
        let authToken = localStorage.getItem('auth-token');

        axios.get(`/api/user/`, { headers: { Authorization: `Bearer ${authToken}` } })
            .then(response => {
                this.setState({
                    name: response.data.name,
                    username: response.data.username,
                    email: response.data.email,
                    avatar: response.data.avatar
                })
            })
            .catch(err => console.error(err));
    }

    onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('username', this.state.username);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('avatar', this.state.avatar);

        let authToken = localStorage.getItem('auth-token');
        axios.put(
                `/api/user/update/`,             
                formData,
                { headers: { Authorization: `Bearer ${authToken}` } }
            )
            .then(response => console.log(response));

        window.location = '/profile';
    }

    render() {
        return (
            <div>
                <h3 className="mb-2 text-center">Profile</h3>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group"> 
                        <label>Name </label>
                        <input  
                            type="text"
                            className="form-control"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Username </label>
                        <input  
                            type="text"
                            className="form-control"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Email </label>
                        <input  
                            type="text"
                            className="form-control"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Password </label>
                        <input  
                            type="password"
                            className="form-control"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    {
                        this.state.avatar !== null ?
                        <div className="form-group">
                            <img src={'../uploads/user_avatars/' + this.state.avatar} width="200" />
                        </div> : ''
                    }                   
                    
                    <div className="form-group">
                        <label>Avatar </label>
                        <input 
                            type="file" 
                            className="form-control-file" 
                            onChange={this.onChangeFile}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
} 

export default Profile;