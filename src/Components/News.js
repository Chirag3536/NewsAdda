import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  capitalizef = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults:0
    };
    document.title = `NewsAdda - ${this.capitalizef(this.props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // let url = "https://newsapi.org/v2/everything?q=cricket&category=${this.props.category}&apiKey=04644a98900341948294aa2f6a39d913&page=1&pageSize=21";
    this.setState({ loading: true });
    let data = await fetch(url);
    let response = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: response.articles,
      totalPages: Math.ceil(response.totalResults / this.props.pageSize),
      loading: false,
      totalResults: response.totalResults
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async()=>{
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // let url = "https://newsapi.org/v2/everything?q=cricket&category=${this.props.category}&apiKey=04644a98900341948294aa2f6a39d913&page=1&pageSize=21";
    this.setState({ loading: true });
    let data = await fetch(url);
    let response = await data.json();
    this.setState({
      articles: this.state.articles.concat(response.articles),
      totalPages: Math.ceil(response.totalResults / this.props.pageSize),
      loading: false,
      totalResults: response.totalResults
    });
  }

  // onPrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=04644a98900341948294aa2f6a39d913&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   // let url = "https://newsapi.org/v2/everything?q=cricket&category=${this.props.category}&apiKey=04644a98900341948294aa2f6a39d913&page=1&pageSize=21";
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let response = await data.json();
  //   this.setState({
  //     articles: response.articles,
  //     totalPages: Math.ceil(response.totalResults / this.props.pageSize),
  //     loading: false,
  //     page: this.state.page - 1
  //   });
  // };

  // onNextClick = async () => {

  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=04644a98900341948294aa2f6a39d913&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   // let url = "https://newsapi.org/v2/everything?q=cricket&category=${this.props.category}&apiKey=04644a98900341948294aa2f6a39d913&page=1&pageSize=21";
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let response = await data.json();
  //   this.setState({
  //     articles: response.articles,
  //     totalPages: Math.ceil(response.totalResults / this.props.pageSize),
  //     loading: false,
  //     page: this.state.page + 1
  //   });
  // };

  render() {
    return (
      <>
        <div className="container my-5">
          <h1 className="text-center" style={{ padding: "25px" }}>
            Today's topNews On :- {this.capitalizef(this.props.category)}
          </h1>
          {/* {this.state.loading && <Loading />} */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loading/>}
          >
            <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
            </div>
          </InfiniteScroll>
        </div>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.onPrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page >= this.state.totalPages}
            type="button"
            className="btn btn-dark"
            onClick={this.onNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
