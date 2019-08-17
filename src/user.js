import React from 'react'
import { signUp, signIn } from './leanCloud'


class userDialog extends React.Component{
    constructor(){
        super()
        this.state = {
            slected: 'signUp',
            formData: {
                username: '',
                password: ''
            }
        }
    }
    
    render(){
        let signUpForm = (
            <form className="signup" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" placeholder="请设定用户名"
                           value={this.state.formData.username}
                           onChange={this.changeFormData.bind(this,'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" placeholder="请设定密码"
                           value={this.state.formData.password}
                           onChange={this.changeFormData.bind(this,'password')}/>
                </div>
                <div className="row action">
                    <button type="submit">注册</button>
                </div>
            </form>
        )

        let signInForm = (
            <form className="signin" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" placeholder="请输入您的用户名"
                           value={this.state.formData.username}
                           onChange={this.changeFormData.bind(this,'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" placeholder="请输入您的密码"
                           value={this.state.formData.password}
                           onChange={this.changeFormData.bind(this,'password')}/>
                </div>
                <div className="row action">
                    <button type="submit">登陆</button>
                </div>
            </form>
        )

        return(
            <div className="userDialog-wrapper">
                <div className="userDialog">
                    <nav onChange={this.switch.bind(this)}>
                        <label>
                            <input type="radio" value="signUp" 
                                   checked={this.state.slected === "signUp"} 
                                   onChange={this.switch.bind(this)}/>注册
                        </label>
                        <label>
                            <input type="radio" value="signIn" 
                                   checked={this.state.slected === "signIn"}
                                   onChange={this.switch.bind(this)}/>登陆
                        </label>
                    </nav>
                    <div className="userDialog-content">
                        {this.state.slected === "signUp"? signUpForm : null}
                        {this.state.slected === "signIn"? signInForm : null}
                    </div>
                </div>
            </div>
        )
    }

    signUp(e){
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user) => {
            this.props.onSignup(user)
        }
        let error = (error) => {
            console.log(error.code)
            switch(error.code){
                case 202:
                    alert("用户名已被占用")
                    break
                default:
                    alert(error)
                    break
            }
        }
        
        signUp(username,password,success,error)
    }

    signIn(e){
        e.preventDefault(e)
        let {username,password} = this.state.formData
        let success = (user) => {
            this.props.onSignIn(user)
        }
        let error = (error) => {
            switch(error.code){
                case 210:
                    alert("用户名或密码错误")
                    break
                default:
                    alert(error)
                    break
            }
        }

        signIn(username,password,success,error)
    }

    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    switch(e){
        this.setState({
            slected: e.target.value
        })
    }
}

export default userDialog