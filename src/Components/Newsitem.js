import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date } = this.props;

    return (
      <div>
        <div id="card-box">
        <div className="card" id="card" >
          <img
            src={
              imgUrl
                ? imgUrl
                : "https://media.istockphoto.com/id/1384855457/video/breaking-news-in-the-article-and-text.jpg?s=640x640&k=20&c=4gZdfxwLO8CVLmicqfPUkC5rjOGZ3GfWcpCUl3MwegM="
            }
            className="card-img-top"
            alt="Breaking News"
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description?description+"...":""}</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
