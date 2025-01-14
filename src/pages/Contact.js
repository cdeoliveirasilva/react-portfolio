import React from "react";
import Hero from "../components/Hero";
import Content from "../components/Content";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      disabled: false,
      emailSent: null,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target);

    this.setState({
      disabled: true,
    });

    Axios.post("http://localhost:3030/api", this.state)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            disabled: false,
            emailSent: true,
          });
        } else {
          this.setState({
            disabled: false,
            emailSent: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          disabled: false,
          emailSent: false,
        });
      });
  };

  render() {
    return (
      <div>
        <Hero title="Get in touch!" />
        <Content>
          <div>
            <p>
              Get in touch with me either through the contact form below,
              <br />
              or through email at <b>ca.oliveirasilva@hotmail.com</b>
            </p>
          </div>
          <br />
          <Form className="ml-7 col-12" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="full-name">Full name</Form.Label>
              <Form.Control
                id="full-name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="/" htmlFor="email">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div class="form-group">
              <label for="service-select">Choose a subject</label>
              <select class="form-control" id="service-select">
                <option>Translation</option>
                <option>Localization</option>
                <option>Transcription</option>
                <option>Other</option>
              </select>
            </div>
            <Form.Group>
              <Form.Label className="/" htmlFor="message">
                Message
              </Form.Label>

              <Form.Control
                id="message"
                name="message"
                as="textarea"
                rows="5"
                value={this.state.message}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button
              className="submitBtn"
              variant="primary"
              type="submit"
              disabled={this.state.disabled}
            >
              Submit
            </Button>

            {this.state.emailSent === true && (
              <p className="d-inline success-msg">Email sent</p>
            )}
            {this.state.emailSent === false && (
              <p className="d-inline error-msg">Email not sent</p>
            )}
          </Form>
        </Content>
      </div>
    );
  }
}

export default Contact;
