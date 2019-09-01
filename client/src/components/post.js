import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {

    render () {
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="card" style={{width: '17rem'}}>
                    <img src={`../uploads/post_images/${this.props.post.image}`} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.post.title}</h5>
                        <p className="card-text">{this.props.post.content.slice(0, 50)} ...</p>
                        <Link to={`/posts/${this.props.post.slug}`} className="btn btn-primary">More</Link>
                    </div>
                </div>
            </div>            
        )
    }
}

export default Post;
