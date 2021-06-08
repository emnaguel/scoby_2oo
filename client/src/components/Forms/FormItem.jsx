import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import Button from "../Base/Button";
import "../../styles/form.css";
import axios from "axios";

class FormItem extends Component {
  state = {
    name: "",
    category: "",
    quantity: 0,
    address: "",
    description: "",
    image: "",
    contact: "",
    lat: 0,
    lng: 0,
    formattedAddress: ""
  };

  inputFileRef = React.createRef();
  
  handleChange = (event) => {
    
    
    if(event.target.type === "radio") {
      this.setState({
        contact: event.target.name
      })
    } else {
   
      this.setState({
        [event.target.id]: event.target.value,
      });
      
    }
 


  }

  handleSubmit = (event) => {
    event.preventDefault();
    const file = this.inputFileRef.current.files[0];


    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )
    const myFormData = new FormData();
    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
    myFormData.append("name", this.state.name);
    myFormData.append("image", file);
    myFormData.append("category", this.state.category);
    myFormData.append("quantity", this.state.quantity);
    myFormData.append("address", this.state.address);
    myFormData.append("description", this.state.description);
    
    myFormData.append("contact", this.state.contact);
    
    myFormData.append("formattedAddress", this.state.formattedAddress);
    myFormData.append("latitude", this.state.lat);
    myFormData.append("longitude", this.state.lng);

    axios
    .post("http://localhost:8000/api/items", myFormData, {withCredentials: true})
    .then((response) => {
      console.log("clientside", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  
  };

  handlePlace = (place) => {

    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.

    console.log(place)
    this.setState({
      address: place.place_name,
      lat: place.geometry.coordinates[0],
      lng: place.geometry.coordinates[1],
      formattedAddress: place.place_name,
    })

  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              onChange={this.handleChange}
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" defaultValue="-1" onChange={this.handleChange}>
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input onChange={this.handleChange} className="input" id="quantity" type="number" />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              onChange={this.handleChange}
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input 
            className="input" 
            id="image" 
            type="file"
            ref={this.inputFileRef}
             />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" name="email" onChange={this.handleChange}/>
              user email
            </div>
            <input type="radio" name="phone"  onChange={this.handleChange}/>
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <Button className="btn-submit">Add Item</Button>
        </form>
      </div>
    );
  }
}

export default FormItem;
