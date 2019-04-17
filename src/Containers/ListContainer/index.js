import React, { Component } from "react";
import "./style.css";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import "react-table/react-table.css";
import MyTAble from "./table.js";
import "./style.css";

import { myDB } from "../../config";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      data: [
        { label: "ID" },
        { label: "Product" },
        { label: "Date" },
        { label: "status" }
      ],
      data1: [],
      selected: []
    };
  }
  componentWillMount() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    myDB.collection("users").onSnapshot(snapshot => {
      let data = [];
      snapshot.forEach(function(doc) {
        let obj = doc.data();
        obj.id = doc.id;
        data.push(obj);
        console.log(data);
      });
      console.log(data);
      this.setState({ data1: data });
    });
  }
  getdata = () => {
    return myDB
      .collection("users")
      .get()
      .then(snapshot => {
        let data = [];
        snapshot.forEach(item => {
          let obj = item.data();
          obj.id = item.id;
          // let dateString = new Date(obj.date);
          // obj.date = dateString;
          // obj.date = dateString.getDate()+'/'+dateString.getMonth()+'/'+dateString.getFullYear();
          data.push(obj);
        });
        console.log(data);
        this.setState({ data1: data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  gotochat = () => {
    console.log("gotoroute");
    this.props.history.push("/chat");
  };
  render() {
    console.log(this.state.data1);
    return (
      <div className={"homeContainer"}>
        <div className={""}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography
                variant="h6"
                color="inherit"
                className={this.props.classes.grow}
              >
                Nike
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  this.gotochat();
                }}
              >
                Chat
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <div className={"homeBody"}>
          <MyTAble
            handleCheckbox={this.handleCheckbox}
            onSelectAllClick={this.onSelectAllClick}
            data={this.state.data}
            data1={this.state.data1}
            selected={this.state.selected}
            handleDateChange={this.handleDateChange}
            getData={this.getdata}
            gotochat={this.gotochat}
          />
        </div>
        <button onClick={this.getdata}>Get</button>
      </div>
    );
  }
}

const mainstyle = theme => ({
  button: {
    marginRight: "10px",
    marginBottom: "10px"
  },
  grow: {
    flexGrow: 1
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: "block"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },

  grid: {
    width: "100%",
    display: "block"
  }
});

export default withStyles(mainstyle)(Home);
// {
//     address: "Creation park residency, Trivandrum.",
//     name: "Shaik Abbas",
//     phoneNumber: "+918686642987",
//     status: "",
//     id: "Z9bzpZZXDlzYiQ4ViTnc"
// },
// {
//     address: "Creation Pard Residency, Trivandrum",
//     name: "Priya Darshan",
//     phoneNumber: "+918903272149",
//     status: "Busy.",
//     id: "Jzt79qEkZHTlHApwEejm"
// }
