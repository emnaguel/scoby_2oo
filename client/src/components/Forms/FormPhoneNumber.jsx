import React, { Component } from 'react'
import Button from "../Base/Button";

export class FormPhoneNumber extends Component {
    handleChange = (event) => {
        console.log("HANDLECGANGE")
        console.log(event.target.value)
        this.props.change(event.target.value)
    }

    handlSubmit = (event) => {
        console.log("yo")
        event.preventDefault()
        this.props.submit(event)
    }
    render() {
        return (
            <div>
                <form className="form" onSubmit={() => this.handleSubmit}>
                    <div className="form-group">
                    <label className="label" htmlFor="phoneNumber">
                        Phone number
                    </label>
                    <input
                        className="input"
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        placeholder="Add phone number"
                        onChange = {() => this.handleChange}
                    />
                    </div>
                    <Button className="form__button">Add phone number</Button>
              </form>
            </div>
        )
    }
}

export default FormPhoneNumber
