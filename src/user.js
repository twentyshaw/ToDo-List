import React from 'react'
import SignUpAndSignIn from './components/signUpAndSignIn'
import ForgetPassword from './components/forgetPassword'

class userDialog extends React.Component{
    constructor(){
        super()
        this.state = {
            selected: 'signIn',
            selectedTab: 'signUpAndSignIn',
            formData: {
                username: '',
                password: '',
                email:''
            }
        }
    }
    
    render(){
        return(
            <div className="userDialog-wrapper">
                <div className="userDialog">
                    {this.state.selectedTab === 'signUpAndSignIn'?
                    <SignUpAndSignIn selected={this.state.selected}
                     switch={this.switch.bind(this)}
                     formData={this.state.formData}
                     onSignIn={this.props.onSignIn}
                     onSignUp={this.props.onSignUp}
                     changeFormData={this.changeFormData.bind(this)}
                     forgetPass={this.forgetPass.bind(this)}/>:
                    <ForgetPassword formData={this.state.formData}
                     changeFormData={this.changeFormData.bind(this)}
                     backtoSignIn={this.backtoSignIn.bind(this)}
                    />}
                </div>
            </div>
        )
    }

    forgetPass(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgetPassword'
        this.setState(stateCopy)
    }

    backtoSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signUpAndSignIn'
        this.setState(stateCopy)
    }

    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    switch(e){
        this.setState({
            selected: e.target.value
        })
    }
}

export default userDialog