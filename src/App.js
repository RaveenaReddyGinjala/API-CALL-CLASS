import React, { Component } from "react";
import "./App.css";
// import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      filtereddata: [],
      dropdownValue: "ALL",
      searchTerm: "",
    };
  }

  // componentDidMount() {
  //   axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
  //     console.log(response.data);
  //     this.setState({ data: response.data });
  //     this.setState({ filtereddata: response.data });
  //     this.setState({ loading: false });
  //   });
  // }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ data: data });
        this.setState({ filtereddata: data });
        this.setState({ loading: false });
      });
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
    const newlist = this.state.data.filter((item) => {
      if (this.state.dropdownValue === "complete") {
        return (
          item.title.toLowerCase().includes(e.target.value) &&
          item.completed === true
        );
      } else if (this.state.dropdownValue === "Incomplete") {
        return (
          item.title.toLowerCase().includes(e.target.value) &&
          item.completed === false
        );
      } else {
        return item.title.toLowerCase().includes(e.target.value);
      }
    });

    console.log(newlist);

    this.setState({ filtereddata: newlist });
  };

  handleDropDown = (e) => {
    this.setState({ dropdownValue: e.target.value });

    if (e.target.value === "ALL" && this.state.searchTerm === "") {
      this.setState({ filtereddata: this.state.data });
    } else {
      const newlist = this.state.data.filter((item) => {
        if (e.target.value === "complete") {
          return (
            item.completed === true &&
            item.title.toLowerCase().includes(this.state.searchTerm)
          );
        } else if (e.target.value === "Incomplete") {
          return (
            item.completed === false &&
            item.title.toLowerCase().includes(this.state.searchTerm)
          );
        } else {
          return item.title.toLowerCase().includes(this.state.searchTerm);
        }
      });

      this.setState({ filtereddata: newlist });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>API CALL</h1>
        {this.state.loading ? (
          <>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </>
        ) : (
          <>
            <div className="search-container">
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Search Title"
              ></input>
              <select value={this.dropdownValue} onChange={this.handleDropDown}>
                <option value="ALL">ALL</option>
                <option value="complete">complete</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>

            {this.state.filtereddata.length ? (
              <table>
                <tr>
                  <th>USER ID</th>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>STATUS</th>
                </tr>
                {this.state.filtereddata.map((item) => {
                  return (
                    <tr>
                      <td>{item.userId}</td>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.completed ? "complete" : "Incomplete"}</td>
                    </tr>
                  );
                })}
              </table>
            ) : (
              <h1>NO MATCH FOUND!</h1>
            )}
          </>
        )}
      </div>
    );
  }
}

export default App;
