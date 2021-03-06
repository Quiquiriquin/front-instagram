import React, { Component } from "react";
import "./Post.css";

class Post extends Component {

  render() {
    const nickname = this.props.data.user.user_name;
    const avatar = this.props.data.user.profile_pic;
    const image = this.props.data.url;
    const caption = this.props.data.description;
    return (
      <article className="Post" ref="Post">
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img src={avatar} alt={nickname} />
            </div>
            <div className="Post-user-nickname">
              <span>{nickname}</span>
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt={caption} src={image} />
          </div>
        </div>
        <div className="Post-caption">
          <strong>{nickname}</strong> {caption}
        </div>
      </article>
    );
  }
}

export default Post;
      