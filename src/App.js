import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import './App.css'
import Rank from './components/rank/Rank'
import Signin from './components/signin/signin'
import Register from './components/register/register'
import FaceRecognition from './components/facerecognition/facerecognition';


const initialState = {
    input: '',
    imageUrl: '',
    detections: [],
    route: 'signin',
    issignedin: false,
    user: {
      id: '',
      name: '',
      email: '', 
      entries: 0,
      joined: ''
    }
  }



class App extends Component {
  constructor() {
  super();
  this.state = initialState;
  };
  loaduser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email, 
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  calculateDetections = (data) => {
  if (data.outputs && data.outputs[0].data.regions) {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map(region => {
      const boundingBox = region.region_info.bounding_box;
      const concept = region.data.concepts[0];
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height),
        label: concept.name,
        confidence: concept.value
      };
    });
  }
  return [];
};
  displayFaceBox = (box) => {
    this.setState({box: box});
  };
  
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input }, () => {
        const raw = JSON.stringify({
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": this.state.imageUrl
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'  // Add this line
            },
            body: raw
        };

        fetch("http://localhost:3001/api/clarifai", requestOptions)
            .then(response => response.json())
            .then(response => {
              if (response) {
                console.log(response); 
                const detections = this.calculateDetections(response);
                this.setState({ detections: detections });

                fetch('http://localhost:3001/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    id: this.state.user.id
                  })
                })
                  .then(response => response.json())
                  .then(count => {
                    this.setState(Object.assign(this.state.user, { entries: count}))
                  })
                  .catch(console.log)
        
              }
                
            })                
            
            .catch(error => {
                console.log('Error:', error);
            });
    });
};

    
  onroutechange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({issignedin: true})
    }
    this.setState({route: route})
  };   

  render(){
  const { imageUrl, detections } = this.state;
  return (
    <div className='App'>
      <Navigation issignedin={this.state.issignedin} onroutechange={this.onroutechange}/>
      {this.state.route === 'home'
      ? <div>
          <Rank  name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
          <FaceRecognition detections={detections} imageUrl={imageUrl} />
        </div>
      : (
        this.state.route === 'signin' 
        ? <Signin loaduser={this.loaduser} onroutechange={this.onroutechange}/>
        : <Register loaduser={this.loaduser} onroutechange={this.onroutechange}/>
      ) 
      
        }
      
     
    </div>
  )
};
}

export default App;
