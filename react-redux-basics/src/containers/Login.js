import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  state = {
    name:null,
    password: null,
    wrongCase:null
  }
  doLogin = () => {
    localStorage.setItem("loggedUser", this.state.name);
    this.props.history.push('/');
  }
  loginUser = (e) =>{
    e.preventDefault();
    console.log(this.state);
    if(this.state.name == null || this.state.password == null)
    {
      this.setState({wrongCase : "Input username or password!"});
      return console.log("Input Error!");
    }

    let newUser = {
      name: this.state.name,
      password: this.state.password 
    }
    var request = new Request('http://localhost:3001/login',{
      method:'POST',
      headers: new Headers({'Content-Type' : 'application/json'}),
      body: JSON.stringify(newUser)
    })
    fetch(request)
    .then(response => {
      response.json()
      .then(data => {
        if(data.type == "VALID_USER")
        {
          this.doLogin();
        }
        else if(data.type == "INVALID_USER")
        {
          this.setState({wrongCase : "Login failed!"});
          return console.log("No valid user!");
        }
        console.log(data)
      })
    })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.loginUser}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <p className="text-muted">{this.state.wrongCase}</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" onChange={(e)=>{this.setState({wrongCase:null, name:e.target.value})}} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={(e)=>{this.setState({wrongCase:null, password:e.target.value})}}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
