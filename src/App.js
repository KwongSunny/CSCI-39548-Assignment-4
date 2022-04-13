// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';

class App extends Component {

  componentDidMount(){  
    fetch("https://moj-api.herokuapp.com/debits")
      .then(res => res.json()
        .then(data => {
          this.setState({debits: data});
        }));

    fetch("https://moj-api.herokuapp.com/credits")
      .then(res => res.json()
        .then(data => {
          this.setState({credits: data});
        }));
  }

  calculateDebit = () => {
    //parse through this.state.debits
    //add together all the amounts and return it

  }

  calculateCredit = () => {
    //parse through this.state.credits
    //add together all the amounts and return it

  }

  calculateBalance = () => {
    //balance = calculateCredit - calculateDebit
    
  }

  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      }
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const DebitComponent = () => (<Debits balance = {this.state.accountBalance} totalDebit = {0} totalCredit = {0} debits = {this.state.debits}/>)
    const CreditComponent = () => (<Credits balance = {this.state.accountBalance} totalDebit = {0} totalCredit = {0} credits = {this.state.credits}/>)
    
    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debits" render={DebitComponent}/>
          <Route exact path="/credits" render={CreditComponent}/>

        </div>
      </Router>
    );
  }
}

export default App;