import React from 'react';
import { signIn } from '../leanCloud'

export default class SignInForm extends React.Component{
    render(){
        return(
            <form className="signin" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label><i className="iconfont icon-user"></i></label>
                    <input type="text" placeholder="请输入您的用户名"
                           value={this.props.formData.username}
                           onChange={this.props.changeFormData.bind(null,'username')}/>
                </div>
                <div className="row">
                    <label><i className="iconfont icon-pswd"></i></label>
                    <input type="password" placeholder="请输入您的密码"
                           value={this.props.formData.password}
                           onChange={this.props.changeFormData.bind(null,'password')}/>
                </div>
                <div className="action">
                    <button type="submit">登陆</button>
                </div>
                <div className="forget">
                    <a href="#" onClick={this.props.forgetPass}>忘记密码?</a> {/*为什么这里可以直接调用forgetPass，不用bind*/}
                </div>
            </form>
        )
    }

    signIn(e){
        e.preventDefault(e)
        let {username,password} = this.props.formData
        let success = (user) => {
            this.props.onSignIn(user)
        }
        let error = (error) => {
            console.log(error)
            switch(error.code){
                case 210:
                    alert("用户名或密码错误")
                    break
                case 211:
                    alert("用户不存在")
                default:
                    break
            }
        }

        signIn(username,password,success,error)
    }
}