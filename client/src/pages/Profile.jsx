import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
import "../styles/CardItem.css";
import Button from "../components/Base/Button";
import axios from "axios";
import FormPhoneNumber from "../components/Forms/FormPhoneNumber"
class Profile extends Component {
  state={
    phoneNumber: '',
    items: []
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/users/me/items', {withCredentials: true})
    .then((response) => {
        this.setState({
            items: response.data
        })
    })
    .catch((error) => {
        console.log(error)
    })
}

  handleChange = (event) => {
    console.log(event)
    this.setState({
      phoneNumber: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { authContext } = this.props;

    axios.patch("http://localhost:8000/api/users/me",  this.state, {withCredentials: true})
      .then((data) => {

         authContext.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  render() {


    const { authContext } = this.props;
    const { user } = authContext;

    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          This is profile, it's protected !
        </h2>
        <p>
          Checkout the<b>ProtectedRoute</b> component in
          <code>./components/ProtectRoute.jsx</code>
        </p>
        <a
          style={{ color: "dodgerblue", fontWeight: "bold" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://reacttraining.com/react-router/web/example/auth-workflow"
        >
          React router dom Demo of a protected route
        </a>

        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p> {user.phoneNumber}</p>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>
          {!user.phoneNumber && 
            <div className="user-contact">
              <h4>Add a phone number</h4>
              <FormPhoneNumber submit={this.handleSubmit} change={this.handleChange} />

            </div>
          }

          {!this.state.items && 
          <div className="CardItem">
            <div className="item-empty">
              <div className="round-image">
                <img src="/media/personal-page-empty-state.svg" alt="" />
              </div>
              <p>You don't have any items :(</p>
            </div>
          </div>
        }
       
          {this.state.items &&   <h3>Your items</h3>}
          {this.state.items && this.state.items.map((item) => {
            return(
            <div className="CardItem" key={item._id}>
              <div className="item">
                <div className="round-image">
                  <img
                    src="https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100"
                    alt="item"
                  />
                </div>
                <div className="description">
                  <h2>{item.name}</h2>
                  <h4>Quantity: {item.quantity}</h4>
                  <p>{item.description}</p>
                  <div className="buttons">
                    <span>
                      <button className="btn-secondary">Delete</button>
                    </span>
                    <span>
                      <button className="btn-primary">Edit</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            )
          })
        }
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
