import React from 'react'

class signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signinEmail: '',
      signinPassword: ''
    }
  }
  onEmailChange = (event) => {
    this.setState({signinEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signinPassword: event.target.value})
  }
  onsubmitsignin = () => {
    fetch('http://localhost:3001/signin', {
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email:this.state.signinEmail,
        password: this.state.signinPassword
      })})
      .then(response => response.json())
      .then(user => {
        if(user.id){
        this.props.loaduser(user);
        this.props.onroutechange('home')
        }
      },
    )
    
  }
  onKeyDown = (event) => {
      if (event.key === 'Enter') {
        this.onsubmitsignin();
      }
    }
  render(){
    
    const {onroutechange} = this.props;
      return (
          <div className='center container'>
              <main className="box">
              <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                      <input onChange={this.onEmailChange} required className="pa2 input-reset ba  w-100" type="email" placeholder='Email' name="email-address"  id="email-address"/>
                  </div>
                  <div className="mv3">
                      <input onKeyDown={this.onKeyDown} required onChange={this.onPasswordChange} className=" pa2 input-reset ba  w-100" placeholder='Password' type="password" name="password"  id="password"/>
                  </div>
                  </fieldset>
                  <div className="reg">
                    <p className='accno'>Don't have an account?</p>
                    <p onClick={() => onroutechange('register')} className="f6 register pointer link dim white db">Register</p>
                  </div>
                  <div className="">
                    <input id='myBtn' onClick={this.onsubmitsignin} className="b ph3 pv2 input-reset ba b--black  grow pointer f6 dib" type="submit" value="Sign in"/>
                  </div>
                  
              </div>
              </main>
          </div>
        
     
      
    )
    
  }
  
}

export default signin;