import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            email: '',
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

        const newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/api/user/register', newUser)
            .then(response => {
                console.log(response.data.message);
                setTimeout(this.props.history.push('/login'), 1000);
            })
            .catch(error => console.log(error.response.data))
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Register</h5>
                            <form className="form-signin" onSubmit={this.onSubmit}>
                            <div className="form-label-group">
                                <input 
                                    type="text" 
                                    id="name"
                                    className="form-control" 
                                    placeholder="Name" 
                                    required 
                                    autoFocus
                                    onChange={this.handleChange}
                                    value={this.state.name} 
                                />
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="form-label-group">
                                <input 
                                    type="text" 
                                    id="username" 
                                    className="form-control" 
                                    placeholder="Username" 
                                    required 
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                />
                                <label htmlFor="username">Username</label>
                            </div>

                            <div className="form-label-group">
                                <input 
                                    type="email" 
                                    id="email"
                                    className="form-control" 
                                    placeholder="Email address" 
                                    required 
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />
                                <label htmlFor="email">Email address</label>
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

                            <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;