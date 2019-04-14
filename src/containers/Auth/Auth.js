import React, { Component } from 'react'
import FormValidator from '../../containers/FormValidator/FormValidator'
class Auth extends Component {

    constructor() {
        super();
    
        this.validator = new FormValidator([
          { 
            field: 'email', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Email is required.' 
          },
          { 
            field: 'email',
            method: 'isEmail', 
            validWhen: true, 
            message: 'That is not a valid email.'
          },
          { 
            field: 'phone', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Pleave provide a phone number.'
          },
        //   {
        //     field: 'phone', 
        //     method: 'matches',
        //     args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
        //     validWhen: true, 
        //     message: 'That is not a valid phone number.'
        //   },
          { 
            field: 'password', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Password is required.'
          },
          { 
            field: 'password_confirmation', 
            method: 'isEmpty', 
            validWhen: false, 
            message: 'Password confirmation is required.'
          },
          { 
            field: 'password_confirmation', 
            method: this.passwordMatch,   // notice that we are passing a custom function here
            validWhen: true, 
            message: 'Password and password confirmation do not match.'
          }
        ]);
        state={
            name:'',
            email:'',
            street:'',
            zip:''
            // email: '',
            // phone: '',
            // password: '',
            // password_confirmation: '',
            // validation: this.validator.valid(),
        }
    }

    passwordMatch = (confirmation, state) =>{
        return state.password === confirmation
    } 
    handleInputChange = event => {
        event.preventDefault();
    
        this.setState({
          [event.target.name]: event.target.value,
        });
    }
    handleFormSubmit = event => {
        event.preventDefault();
    
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
    
        if (validation.isValid) {
          // handle actual form submission here
        }
    }

    render(){
        let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation            
        return (
            <div className={styles.ContactData}>
                <h4>Enter your personal info: </h4>
                <form className="demoForm">
                    <h2>Sign up</h2>

                    <div className={validation.email.isInvalid && 'has-error'}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control"
                        name="email"
                        placeholder="john@doe.com"
                        onChange={this.handleInputChange}
                    />
                    <span className="help-block">{validation.email.message}</span>
                    </div>

                    <div className={validation.phone.isInvalid && 'has-error'}>
                    <label htmlFor="phone">Phone</label>
                    <input type="phone" className="form-control"
                        name="phone"
                        placeholder="(xxx)xxx-xxxx"
                        onChange={this.handleInputChange}
                    />
                    <span className="help-block">{validation.phone.message}</span>
                    </div>

                    <div className={validation.password.isInvalid && 'has-error'}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                    <span className="help-block">{validation.password.message}</span>
                    </div>

                    <div className={validation.password_confirmation.isInvalid && 'has-error'}>
                    <label htmlFor="password_confirmation">Password Again</label>
                    <input type="password" className="form-control"
                        name="password_confirmation"
                        onChange={this.handleInputChange}
                    />
                    <span className="help-block">{validation.password_confirmation.message}</span>
                    </div>

                    <button onClick={this.handleFormSubmit} className="btn btn-primary">
                    Sign up
                    </button>
                </form>
                <form onSubmit={this.orderHandler}>
                    <Input inputtype='input' type="text" name='name' label="Your Name" required={true} changed={(event)=>{this.changedHandler(event,'name')}} value={this.state.name}></Input>
                    <Input inputtype='input' type="email" name='email' label="Email" required={true} changed={(event)=>{this.changedHandler(event,'email')}}  value={this.state.email}></Input>
                    <Input inputtype='input' type="text" name='street' label='Street' required={true} changed={(event)=>{this.changedHandler(event,'street')}}   value={this.state.street}></Input>
                    <Input inputtype='input' type="text" name='zip' label='Zip Code' required={true} changed={(event)=>{this.changedHandler(event,'zip')}} value={this.state.zip}></Input>
                    <Input 
                        inputtype='select' 
                        name='deliveryMethod' 
                        label='Delivery Method' 
                        options={[{value:'fastest', displayValue:'Fastest'},{value:'cheapest', displayValue:'Cheapest'}]}
                        changed={(event)=>{this.changedHandler(event,'deliveryMethod')}}
                        value={this.state.deliveryMethod}></Input>
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        )
    }
}

export default Auth