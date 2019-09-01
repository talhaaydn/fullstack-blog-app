import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount(){
    }

    render () {
        return (
            <div className="mt-5 mb-5">                
                <div className="media mt-1">
                    <div class="media-body">
                        <h5 className="mt-0">{this.props.comment.title}</h5>
                        {this.props.comment.content}
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;
