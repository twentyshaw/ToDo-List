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
      index: 1,
      toDoLists: [
        {id:this.index, title:'GOAL 01',content:'等待添加'}
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
            <Input content={this.state.newTodo} submitOn={this.add.bind(this)}/>
            <button className="add"><i className="iconfont icon-zhuijia"></i></button>
          </div>
        </div>
        <div className="items"><Item ToDo={this.state.toDoLists}/></div>
      </div>
    )
  }

  add(e){
    if(this.state.index !== undefined){
      if(this.state.index>1){
        console.log(this.state.toDoLists)
        this.state.toDoLists.push({
          id: this.idMaker(),
          title: `GOAL 0${this.state.index}`,
          content: e.target.value
        })
        this.setState({
          newTodo: '',
          toDoLists: this.state.toDoLists
        })
      }else{
        this.setState({
          toDoLists: [
            {id:'1', 
            title:'GOAL 01',content:e.target.value}
          ]
        })
        this.idMaker()
      }
    }else{
      alert("已达到添加上限！")
    }
  }

  idMaker(){
    if(this.state.index<5){
      let number = this.state.index + 1
      this.setState({
        index: number
      })
    }else{
      this.setState({
        index: undefined
      })
    }

    console.log(this.state.index)
  }

}

export default App;
