import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import "../styles/global.css";
import axios from "axios";
import Card from './CardInfo'

class MapHome extends React.Component {
    state={
        items: [],
        displayCard: false,
        cardItem: null
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/items')
        .then((response) => {

            this.setState({
                items: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
  // Implement react map box here.
  handleClick = (item) => {

      this.setState({
          displayCard: true,
          cardItem: item
      })
  }
  render() {
    const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_API_KEY
    });

    return (
      <div>
        <h1>MAPBOX MAP HERE</h1>
        <p>On MapHome /</p>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '90vh',
            width: '90vw'
          }}
          center={[2.3522, 48.8566]}
          
        >
        {this.state.items.map((item) => {

            return(<div>
              
                <Marker
            onClick= {() => this.handleClick(item)}
            coordinates={item.location.coordinates}
            anchor="bottom">
            
            <div className="marker"></div>
          </Marker>


            </div>)
        })}

  

        </Map>

   
          {this.state.displayCard && <Card item={this.state.cardItem}/>}
          
   
      </div>
    );
  }
};

export default MapHome;

