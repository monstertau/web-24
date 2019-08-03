import React from 'react';
import _ from 'lodash';
import './App.css';
class App extends React.Component {
  state = {
    result: [],
    inputWord: '',
    nextPageToken: '',
  }
  handleResult = _.debounce((event) => {
    event.preventDefault();
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.inputWord}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          result: [...this.state.result,...data.items],
          nextPageToken: data.nextPageToken,
        });
        console.log(this.state.result);
        
      })
      window.onscroll = _.debounce((event) => {
        event.preventDefault();
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;

        console.log('offset = ' + offset);
        console.log('height = ' + height);

        if (offset === height) {
          fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.inputWord}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${this.state.nextPageToken}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              let nextPageToken = this.state.nextPageToken;
              console.log(data);
              for (let i = 0; i < data.items.length; i++) {
                const title = data.items[i].snippet.title;
                const thumbnailsurl = data.items[i].snippet.thumbnails.medium.url;
                const description = data.items[i].snippet.description;
                const videoId = data.items[i].id.videoId
                //   console.log(title);
                //   console.log(thumbnailsurl);
                //   console.log(description);
                const out = document.getElementById("root")
                out.insertAdjacentHTML(
                  `beforeend`,

                  `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${videoId}?autoplay=true" target="blank">
                            <img src="${thumbnailsurl}" alt=""/>
                            <div class="video_info">
                                <h2 class="title">${title}</h2>
                                <p class="description">${description}</p>
                                <span>View >></span>
                            </div>    
                            </a>
                            `
                );


              }
            })
        }
      }, 1000);
  }, 1000);
  render() {
    return (

      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <img className="head" src="https://www1-lw.xda-cdn.com/files/2017/08/After-12-Years-Google-Gives-YouTube-a-New-Logo.png" alt=""></img>
            <h1>Let's search</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <form id="search">
              <div className="form-group" onInput={this.handleResult}>
                <input type="text" value={this.state.inputWord} className="form-control" onChange={(event) => {
                  this.setState({
                    inputWord: event.target.value,
                  });
                  console.log(this.state.inputWord);
                }} />
                <br />
              </div>

            </form>
          </div>
        </div>
        {this.state.result.map((item, index) => {
          return (
            <a key={index} className="result col-md-12" href={`https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true`} target="blank">
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <div className="video_info">
                <h2 className="title">{item.snippet.title}</h2>
                <p className="description">{item.snippet.description}</p>
                <span>View >></span>
              </div>
            </a>
          );
        })}
      </div>
    )

  }
}
export default App;