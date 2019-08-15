import React from 'react';

class Item extends React.Component{
    render(){
        let items = this.props.ToDo.map(item=>{
            return (
            <li>
                <h3>{item.title}</h3>
                <p className='content'>{item.content}</p>
            </li>
            )
        })
        return(
            <ol>{items}</ol>
        )
    }
}
export default Item