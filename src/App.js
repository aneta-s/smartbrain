import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Register from "./components/Register/Register";


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
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false
    };
  }

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState({ box: box });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),

      bottomRow: height - (clarifaiFace.bottom_col * height),
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      /* .predict({id:'a403429f2ddf4b49b307e318f00e528b', version:'34ce21a40cc24b6b96ffee54aabff139'}, this.state.input) */
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };
  onRouteChange = (route)=> { 
    if (route === 'signout'){ 
      this.setState({isSignedIn: false}) 
    } else if (route === 'home'){ 
      this.setState({isSignedIn: true}) 
    } 
      this.setState({route: route}); 
    
  }


  render() {
    const {isSignedIn, box, imageUrl, route} =this.state;
    return (
      <div className="App">
        <Particles className="Particles" params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === "home" 
        ?  <div> 
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
            />
          </div>
          : ( 
         route === "signin" 
          ? <SignIn onRouteChange={this.onRouteChange} /> 
          : <Register onRouteChange={this.onRouteChange} />
          )
         //// <SignIn onRouteChange={this.onRouteChange} /> : 20. RENDER THE HOMESCREEN (MOVE THIS LINE OF CODE BOTTOM) 
      
        }
      </div>
    );
  }
}

export default App;
