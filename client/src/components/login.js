import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/api/user/login', user)
            .then(response => {
                localStorage.setItem('auth-token', response.data.token);
                window.location = "/my-posts";
            })
            .catch(error => console.log(error.response.data));
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Login</h5>
                            <form className="form-signin" onSubmit={this.onSubmit}>
                            <div className="form-label-group">
                                <input 
                                    type="text" 
                                    id="username"
                                    className="form-control" 
                                    placeholder="Username" 
                                    required 
                                    autoFocus 
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                />
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="form-label-group">
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="form-control" 
                                    placeholder="Password" 
                                    required 
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;