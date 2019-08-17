import React from 'react';

class Item extends React.Component{
    render(){
        return(
            <div>
                <input type="checkbox" 
                checked={this.props.ToDo.status === 'completed'}
                onChange={this.toggle.bind(this)}/>
                <h3>{this.props.ToDo.title}</h3>
                <p className={"content "+this.props.ToDo.status}>{this.props.ToDo.content}</p>
                <button className="btn delete" onClick={this.delete.bind(this)}><i className="iconfont icon-delete"></i></button>
            </div>
        )
    }

    toggle(e){
        console.log(this.props.ToDo.status)
        this.props.onToggle(e,this.props.ToDo)
    }

    delete(e){
        this.props.onDelete(e,this.props.ToDo)
    }
}
export default Item