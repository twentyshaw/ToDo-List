import React from 'react';
import { sendPasswordResetEmail } from '../leanCloud'

export default class ForgetPassword extends React.Component{
    render(){
        return(
            <div className="forgetPassword">
                <nav>
                    <h1>ToDo<i className="iconfont icon-todo"></i></h1>
                </nav>
                <div className="userDialog-content">
                    <form className="forgetOff" onSubmit={this.resetPass.bind(this)}>
                        <div className="row">
                            <label><i className="iconfont icon-mail"></i></label>
                            <input type="text" placeholder="请输入您的电子邮件地址"
                                value={this.props.formData.email}
                                onChange={this.props.changeFormData.bind(null,'email')}/>
                        </div>
                        <div className="action">
                            <button type="submit">获取重置密码地址</button>
                            <div className="forget">
                                <a href="#" onClick={this.props.backtoSignIn}>返回登陆</a>
                            </div>
                        </div> 
                    </form>               
                </div>
            </div>
        )
    }

    resetPass(e){
        e.preventDefault()
        let successFn = function(){
            alert("发送成功！请检查您的邮箱获取重置密码地址")
        }
        let errorFn = (error) => {
            alert("发送失败，原因：" + error)
        }
        sendPasswordResetEmail(this.props.formData.email, successFn, errorFn)
    }
}