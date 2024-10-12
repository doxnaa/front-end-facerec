import React from 'react'

class register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }
  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  
  onsubmitregister = () => {
    fetch('http://localhost:3001/register', {
      method: "post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email:this.state.email,
        password: this.state.password
      })})
      .then(response => response.json())
      .then(user => {
        if(user.id){
        this.props.loaduser(user)
        this.props.onroutechange('home')
        }
      },
    )
    
  }
  // onKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     this.onsubmitregister();
  //   }
  // }
  
  render(){
    const {onroutechange} = this.props;
      return (

      <div className="  mv4   center">
      <main className="box1">
        <form >
          <div id="sign_up" className="  ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
              <input required onChange={this.onNameChange} placeholder='Name' className="pa2 input-reset ba  w-100" type="text" name="name"  id="name"/>
          </div>
          <div className="mt3">
              <input required onChange={this.onEmailChange} placeholder='Email' className="pa2 input-reset ba  w-100" type="email" name="email-address"  id="email-address"/>
          </div>
          <div className="mv3">
              <input required onChange={this.onPasswordChange} placeholder='Password' className="pa2 input-reset ba  w-100" type="password" name="password"  id="password"/>
          </div>
          </div>
          <div className="reg">
                    <p className='accno'>Already have an account?</p>
                    <p onClick={() => onroutechange('signin')} className="f6 register pointer link dim white db">Signin</p>
                  </div>
          <div className="">
            <input onClick={this.onsubmitregister} className="b ph3 pv2 input-reset pointer f6 dib" id='myBtn1' type="button" value="Register"/>
          </div>
          </form>
      </main>
      </div>
    )
  }
  
}

export default register;