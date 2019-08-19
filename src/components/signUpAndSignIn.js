import React from 'react'
import SignInForm from './signInForm'
import SignUpForm from './signUpForm'

export default class SignUpAndSignIn extends React.Component{
    render(){
        return(
            <div className="signUpAndSignIn">
                <nav>
                    <h1>ToDo<i className="iconfont icon-todo"></i></h1>
                    <div className="nav-inner">
                        <label>
                            <input type="radio" value="signUp" 
                                checked={this.props.selected === "signUp"} 
                                onChange={this.props.switch}/>
                        </label>
                        <label>
                            <input type="radio" value="signIn" 
                                checked={this.props.selected === "signIn"}
                                onChange={this.props.switch}/>
                        </label>
                    </div>
                </nav>
                <div className="userDialog-content">
                    {this.props.selected === "signUp"? 
                     <SignUpForm formData={this.props.formData}
                      onSignUp={this.props.onSignUp}
                      changeFormData={this.props.changeFormData}/>
                     : null}
                    {this.props.selected === "signIn"? 
                     <SignInForm formData={this.props.formData}
                      onSignIn={this.props.onSignIn}
                      changeFormData={this.props.changeFormData}
                      forgetPass={this.props.forgetPass}/>    
                     : null}
                </div>
            </div>
        )
    }
}