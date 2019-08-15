import React from 'react';

class Input extends React.Component{
    render(){
        return(
            <input type="text" defaultValue={this.props.content}/>
        )
    }
}

export default Input