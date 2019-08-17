import React from 'react';
import 'normalize.css';
import './App.css';
import Input from './components/input';
import Item from './components/items';
import * as localStore from './localstorage'


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      newTodo: '',
      index: 0,
      toDoLists: localStore.load('toDoLists') || [
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
        <header className="App-header">
          <span className="ttl">ToDo<i className="iconfont icon-todo"></i></span>
        </header>
        <div className="top">
          <h1>今日目标</h1>
          <div className="input">
            <Input 
            content={this.state.newTodo}
            onChange={this.changeCont.bind(this)} 
            submitOn={this.add.bind(this)}/>
            <button className="btn add"><i className="iconfont icon-zhuijia"></i></button>
          </div>
        </div>
        <div className="items">
          <ol>{todos}</ol>
        </div>
      </div>
    )
  }

  componentDidUpdate(){
    localStore.save('toDoLists',this.state.toDoLists)
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

}

export default App;
