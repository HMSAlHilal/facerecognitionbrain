import React ,{Component} from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'a73c71c45a014bd5bc5d65fff8f10e85'
});


const particlesOptions={
  particles:{
    number:{
      value: 80,
      density:{
        enable: true,
        value_area: 600
      }
    }
  }
}
class App extends Component{
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{}

    }
  }

  calculateFaceLocation =(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);

    return{
      leftCol:clarifaiFace.left_col*width,
      rightCol:width-clarifaiFace.right_col*width,
      topRow:clarifaiFace.top_row*height,
      bottomRow:height-clarifaiFace.bottom_row*height
    }
  }

displayFaceBox=(box) =>{
  console.log(box);
  this.setState({box:box});
}

  onInputChange=(event) =>{
   
    this.setState({input:event.target.value});
  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    
      app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
                          .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
                          .catch(err=> console.log(err));
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles'
                  params={particlesOptions}
        />

        <Navigation />
        <Logo />
        <Rank/>
        <ImageLinkForm 
                      onInputChange={this.onInputChange} 
                      onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
       
      </div>
    );
  }
}

export default App;
