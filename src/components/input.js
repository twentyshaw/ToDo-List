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
            if (e.target.value.trim() !== "") {
                this.props.submitOn(e)                  
            }else{
                alert("你还没有输入任何内容！")
            }
        }
    }
}

export default Input