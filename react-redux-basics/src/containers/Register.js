import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import FacebookLogin from 'react-facebook-login'

const facebookLoginwasClickedCallback = (response, login) => {
    console.log(response);
    if(response.status == "unknown")
    {
      alert("no valid account");
      return;
    }
    localStorage.setItem("loggedUser", response.name);
    login.props.history.push('/');
  };
  

class Register extends Component {
    state = {
        name:null,
        email:null,
        password:null,
        repeatPassword:null,
        wrongCase:null
    }
    backToLogin = () => {
        setTimeout(() => {
            this.props.history.push('/Login');
        }, 500);
    }
    signupUser = (e) => {
        console.log(this.state);
        this.setState({...this.state, wrongCase:null});
        e.preventDefault();
        if(this.state.name==null 
        || this.state.email==null
        || this.state.password !== this.state.repeatPassword)
        {
            this.setState({...this.state, wrongCase:"Invalid name, email or user password!"});
            return console.log("Invalid input", this.state);
        }
        if(this.state.password.length < 8)
        {
            this.setState({...this.state, wrongCase:"Weak password! More than 8 letters"});
            return console.log("Invalid input", this.state);
        }

        let newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
        var request = new Request('http://localhost:3001/signup',{
          method:'POST',
          headers: new Headers({'Content-Type' : 'application/json'}),
          body: JSON.stringify(newUser)
        })
        fetch(request)
        .then(response => {
          response.json()
          .then(data => {
            if(data.type == "EXISTING_USER")
                this.setState({wrongCase:"User already exists"});
            else if(data.type == "USER_REGISTERED")
            {
                this.setState({wrongCase:"Success!"});
                this.backToLogin();
            }
            console.log(data)
          })
        })
      };
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.signupUser}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <p className="text-muted">{this.state.wrongCase}</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" onChange= {(e) => {this.setState({name:e.target.value, wrongCase:null})}} autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" onChange= {(e) => {this.setState({email:e.target.value, wrongCase:null})}} autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" onChange= {(e) => {this.setState({password:e.target.value, wrongCase:null})}} autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" onChange= {(e) => {this.setState({repeatPassword:e.target.value, wrongCase:null})}} autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                    <Row>
                    <Col xs="12" sm="6">
                           <FacebookLogin textButton="faceBook" appId="2629133763793904" autoLoad={false} fields="name" callback={(data) => {facebookLoginwasClickedCallback(data, this)}} cssClass="btn-facebook px-4" tag ='Button'/>
                        </Col>
                        <Col xs="12" sm="6">
                            <Button color="success" block onClick={() => {this.backToLogin()}}>Back to Login</Button>
                        </Col>
                    </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
