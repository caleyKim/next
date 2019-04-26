
import React, { Component } from "react";
import { connect } from "react-redux";
class Index extends Component {
  render() {
    const { counter } = this.props;
    return (
      <React.Fragment>
        <h1>This is Home</h1>
        <h2>counter {counter.number}!</h2>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}
export default connect(mapStateToProps)(Index);