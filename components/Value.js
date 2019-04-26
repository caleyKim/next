import React, {Component} from "react";
import PropTypes from 'prop-types'

const propTypes = {
  number : PropTypes.number
}

const defaultProps = {
  number : -1
}
class Value extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>{this.props.number}</h1>
      </div>
    )
  }
}

Value.propType = propTypes;
Value.defaultProps = defaultProps;

export default Value;