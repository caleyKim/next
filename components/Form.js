import React, { Component } from 'react';


class Form extends Component {
  state = {

  }
  constructor(props){
    super(props);
  }
  handleChange = () => {
    
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }
  propsData = () => {
    const el = this.props.data.map((item,index) => {
      return(
        <div key={index}>
          {(() => {
            switch (item.type) {
              case "text":   
                return (
                  <p>
                    <span>
                      {item.title}
                    </span>
                    <input type="text"/>
                  </p>
                );
              case "number": 
                return (
                  <p>
                    <span>
                      {item.title}
                    </span>
                    <input type="number"/>
                  </p>
                );
              case "password": 
                return (
                  <p>
                    <span>
                      {item.title}
                    </span>
                    <input type="password"/>
                  </p>
                );
              case "button":  
                return (
                  <p>
                    <button type="button">{item.title}</button>
                  </p>
                );
              case "submit":  
                return (
                  <p>
                    <button type="submit">{item.title}</button>
                  </p>
                );
              default:      
                return "#FFFFFF";
            }
          })()}
        </div>
      )
    })
    return el
  }
  render() {
    const style = this.props.style
    
    return (
      <form onSubmit={this.handleSubmit} style={style}>
        {this.propsData()}
      </form>
    );
  }
}
export default Form;