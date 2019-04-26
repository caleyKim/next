import React, { Component } from 'react';



class Form extends Component {
  constructor(props){
    super(props);
  }
  handleSubmit = () => {
    return console.log('!!')
  }
  render() {
    const data = this.props.data;
    const style = {
      // background : `rgb(${color[0]},${color[1]},${color[2]})`
    }
    
    return (
      <form onSubmit={this.handleSubmit()} style={style}>
        <button type="submit"> 서브밋</button>
      </form>
    );
  }
}
export default Form;