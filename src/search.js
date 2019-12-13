import React from "react";
import Input from "./input.jsx";
import DataList from "./typeahead.jsx";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      selectedOption: "",
      selectedObject: {}
    };
    this.inputChange = this.inputChange.bind(this);
    this.inputEnter = this.inputEnter.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {}
  inputChange(e) {
    let value = e.target.value;
    this.setState(state => ({
      selectedOption: value
    }));
    let articles = this.state.articles;
    let item;

    for (let i = 0; i < articles.length; i++) {
      if (value === articles[i].Title) {
        item = articles[i];
      }
    }
    this.setState(state => ({
      selectedObject: item
    }));
  }
  inputEnter(event) {
    if (event.keyCode === 8) {
      this.setState(state => ({
        articles: []
      }));
    }
  }
  search(e) {
    let api;
    if (this.state.selectedObject) {
      api =
        "https://www.omdbapi.com/?apikey=d64049c9&plot=short&t=" +
        this.state.selectedOption;
    } else {
      api =
        "https://www.omdbapi.com/?apikey=d64049c9&s=" +
        this.state.selectedOption;
    }
    let selectedObject = this.state.selectedObject;
    let setData = function(data) {
      if (selectedObject) {
        return [data];
      } else {
        return data.Search;
      }
    };
    fetch(api)
      .then(response => response.json())
      .then(data =>
        this.setState(state => ({
          articles: setData(data),
          selectedObject: data
        }))
      );

    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    let selectedObject = this.state.selectedObject;
    return (
      <section>
        <form>
          <Input
            label="Movie Search"
            id="animals"
            list="something"
            onInputChange={this.inputChange}
            onInputKeyDown={this.inputEnter}
          />
          <input type="submit" value="Search" onClick={this.search} />
          <DataList id="something" articles={this.state.articles} />
        </form>
        {this.state.selectedObject && (
          <div>
            {Object.keys(this.state.selectedObject).map(function(key, index) {
              return (
                <span key={index} className={key}>
                  {key === "Title" && <span>{selectedObject[key]} - </span>}
                  {key === "Year" && <span>{selectedObject[key]} - </span>}
                  {key === "Type" && selectedObject[key]}
                  {key === "Plot" && <p>{selectedObject[key]}</p>}
                  {key === "Writer" && <p>Writer(s):{selectedObject[key]}</p>}
                  {key === "Actors" && <p>Actors:{selectedObject[key]}</p>}
                  {key === "Runtime" && <span>{selectedObject[key]} - </span>}
                  {key === "Genre" && selectedObject[key]}
                  {key === "Poster" && (
                    <div>
                      <img src={selectedObject[key]} width="375" alt="" />
                    </div>
                  )}
                  {key === "Error" && (
                    <span style={{ color: "red", fontSize: "32px" }}>
                      {selectedObject[key]}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}
export default Search;
