import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

const app = new Clarifai.App({
  apiKey: "54a850dc83c84628a9b74c73d1151366",
});

const particleOptions = {
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",   
      imageUrl: '' 
    };
  }

  onInputChange = (event) => {
 this.setState({input: event.target.value});
  };
  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input}) 
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, this.state.input 
      )
      .then(
        function (response) {
          console.log(response);
          // do something with response
        },
        function (err) {
          // there was an error
        }
      );
  };
  render() {
    return (
      <div className="App">
        <Particles className="Particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl = {this.state.imageUrl}/> 
      </div>
    );
  }
}

export default App;
