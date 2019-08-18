import React from 'react';
import 'normalize.css';
import './App.css';
import Input from './components/input';
import Item from './components/items';
import UserDialog from './user'
import { getUserCurrent, signOut } from './leanCloud'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      newTodo: '',
      user:getUserCurrent() || {},
      index: 0,
      toDoLists: [
        {id:this.index, 
         title:'GOAL',
         content:'等待添加',
         status:null,
         deleted: false}
      ]
    }
  }

  render(){
    let todos = this.state.toDoLists.filter(item => item.deleted !== true).map(todo=>{
      return (
      <li className={this.state.toDoLists.id}>
          <Item ToDo={todo}
                onToggle={this.toggle.bind(this)}
                onDelete={this.delete.bind(this)}/>
      </li>
      )
    })
    return (
      <div className="App">
        {this.state.user.id?
          null:
          <UserDialog onSignup={this.onSignupOrSignIn.bind(this)}
                      onSignIn={this.onSignupOrSignIn.bind(this)}/>}
        <header className="App-header">
          <div className="ttl">ToDo<i className="iconfont icon-todo"></i></div>
          <div className="user-bar">
            <h1>Welcome! { this.state.user.username || ""}</h1>
            {this.state.user.id? 
            <button onClick={this.signOut.bind(this)}>
              <i className="iconfont icon-sign_out"></i>
              <span className="hide">注销登陆</span>
            </button>:null}
          </div> 
        </header>
        <div className="top">
          <h2>今日目标</h2>
          <div className="input">
            <Input 
            content={this.state.newTodo}
            onChange={this.changeCont.bind(this)} 
            submitOn={this.add.bind(this)}/>
            <span className="add"><i className="iconfont icon-enter1"></i></span>
          </div>
        </div>
        <div className="items">
          <ol>{todos}</ol>
        </div>
      </div>
    )
  }

  componentDidUpdate(){
  }

  onSignupOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }

  changeCont(e){
    this.setState({
      newTodo: e.target.value
    })
  }

  add(e){
      if(this.state.index>0){
        this.state.toDoLists.push({
          id: this.idMaker(),
          title: "GOAL",
          content: e.target.value,
          status:null,
          deleted: false
        })
        this.setState({
          newTodo: '',
          toDoLists: this.state.toDoLists
        })
      }else{
        this.setState({
          newTodo: '',
          toDoLists: [
            {id: 1, 
            title:"GOAL",
            content:e.target.value,
            status:null,
            deleted: false}]
        })
        this.idMaker()
      }
  }

  idMaker(){
      let number = this.state.index + 1
      this.setState({
        index: number
      })
      return number
  }

  toggle(e,todo){
    console.log(todo.status)
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state) 
    console.log(todo.status)
  }

  delete(e,todo){
    todo.deleted = true
    this.setState({
      deleted:true
    })
  }

  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

}

export default App;
