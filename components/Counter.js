import React, { Component } from 'react';
import Value from './Value';
import Control from './Control';
import {connect} from 'react-redux';
import * as actions from '../actions'
class Counter extends Component {
  constructor(props){
    super(props);
    this.setRandomColor = this.setRandomColor.bind(this)
  }
  setRandomColor() {
    const color = [
      Math.floor((Math.random() * 55) + 200),
      Math.floor((Math.random() * 55) + 200),
      Math.floor((Math.random() * 55) + 200)
    ]
    this.props.handleSetColor(color)
  }
  render() {
    const { counter, color } = this.props;
    const style = {
      background : `rgb(${color[0]},${color[1]},${color[2]})`
    }
    
    return (
      <div style={style}>
        <Value number={this.props.number}/>
        <Control 
          onRandomizeColor={this.setRandomColor}
          onSubtract={this.props.handleDecrement}
          onPlus={this.props.handleIncrement} 
        />
        <div>dummy {counter.dummy} {counter.number} {this.props.color}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter : state.counter,
    color : state.ui.color
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleIncrement : () => { dispatch(actions.increment()) },
    handleDecrement : () => { dispatch(actions.decrement())},
    handleSetColor : (color) => { dispatch(actions.setColor(color));}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);