import Layout from '../components/Layout';
import Link from 'next/link';
import React from 'react';

import axios from 'axios'

class User extends React.Component {
  static async getInitialProps ({req}){
    const response = await axios.get('http://localhost:9090/users');
    return {
      result : response.data
    }
  }
  state = {
    name : 'ddd',
    age : '',
    married : false,
    comment : ''
  }
  test(e){
    e.preventDefault();
    console.log('data')
  }
  render() {
    const { result } = this.props;
    
    
    return (
      <div>
        <p>Hello, Next JS</p>
        <h2>
          홈 화면
        </h2>

        <ul>
          
          {result.map((results,index) => (
            <li key={index}>
              <p>이름 : {results.name}</p>
              <p>나이 : {results.age}</p>
              <p>결혼여부 : {results.married == false ? '안함' : '했음'}</p>
              <p>설명 : {results.comment}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={this.test}>
          이름 : <input type="text" value={this.state.name}/> <br/>
          나이 : <input type="number"/> <br/>
          결혼여부 : <input type="text"/> <br/>
          설명 : <input type="comment"/> <br/>
          <button type="submit">제출</button>
        </form>
        {this.state.name}
        
      </div>
    )
  }
}
export default User;