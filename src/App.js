import React from 'react';
import 'normalize.css';
import './App.css';
import Input from './components/input';
import Item from './components/items'


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      newTodo: '',
      toDoLists: [
        {id:'1', title:'GOAL 01'},
        {id:'2', title:'GOAL 02'},
        {id:'3', title:'GOAL 03'},
        {id:'4', title:'GOAL 04'},
        {id:'5', title:'GOAL 05'},
      ]
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <span className="ttl">ToDo<i className="iconfont icon-todo"></i></span>
        </header>
        <div className="top">
          <h1>今日目标</h1>
          <div className="input">
            <Input content={this.state.newTodo}/>
            <button className="add"><i className="iconfont icon-zhuijia"></i></button>
          </div>
        </div>
        <div className="items"><Item ToDo={this.state.toDoLists}/></div>
      </div>
    )
  }
}

export default App;
