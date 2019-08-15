import React from 'react';

class Item extends React.Component{
    render(){
        let items = this.props.ToDo.map(item=>{
            return <li>{item.title}</li>
        })
        return(
            <ol>{items}</ol>
        )
    }
}
export default Item