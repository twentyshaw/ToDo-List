import React from 'react';
import { signUp } from '../leanCloud'

export default class SignUpForm extends React.Component{
    render(){
        return(
            <form className="signup" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label><i className="iconfont icon-user"></i></label>
                    <input type="text" placeholder="请设定用户名"
                           value={this.props.formData.username}
                           onChange={this.props.changeFormData.bind(null,'username')}/>
                </div>
                <div className="row">
                    <label><i className="iconfont icon-mail"></i></label>
                    <input type="text" placeholder="请输入您的电子邮件地址"
                           value={this.props.formData.email}
                           onChange={this.props.changeFormData.bind(null,'email')}/>
                </div>
                <div className="row">
                    <label><i className="iconfont icon-pswd"></i></label>
                    <input type="password" placeholder="请设定密码"
                           value={this.props.formData.password}
                           onChange={this.props.changeFormData.bind(null,'password')}/>
                </div>
                <div className="action">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
    }

    signUp(e){
        e.preventDefault()
        let {email,username, password} = this.props.formData
        let success = (user) => {
            this.props.onSignUp(user)
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
        
        signUp(email,username,password,success,error)
    }
}