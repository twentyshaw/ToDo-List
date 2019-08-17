import React from 'react';

class Input extends React.Component{
    render(){
        return(
            <input type="text" 
            value={this.props.content}
            onChange={this.changeCont.bind(this)} 
            onKeyPress={this.submit.bind(this)}/>
        )
    }

    changeCont(e){
        this.props.onChange(e)
    }

    submit(e){
        if (e.key === 'Enter') {
            this.props.submitOn(e)        
        }
    }
}

export default Input