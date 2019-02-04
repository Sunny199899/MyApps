import React, { Component } from 'react';
import Main from '../components/Main'
import User from '../components/User'
import {connect} from 'react-redux'
import {setName} from '../actions/userActions' 

class App extends Component {
  componentDidMount()
  {
    const user = localStorage.getItem('loggedUser');
    if(user == null)
      this.props.history.push('\login');
    this.props.setName(user);
  }
  render() {
    return (
      <div className="App">
        <Main changeName = {() => {this.props.setName("Anna")}}/>
        <User username={this.props.user.name}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName :(name) => {dispatch(setName(name))}
  }
}

const mapStateToProps = (state) => {
  return {
    user:state.user,
    math:state.math
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
