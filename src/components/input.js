import React from 'react';

class Input extends React.Component{
    render(){
        return(
            <input type="text" defaultValue={this.props.content} onKeyPress={this.submit.bind(this)}/>
        )
    }
    submit(e){
        if (e.key === 'Enter') {
            this.props.submitOn(e)        
        }
    }
}

export default Input