import Layout from '../components/Layout';
import Link from 'next/link';
import React from 'react';
import Counter from '../components/Counter'
import {crud} from '../services/api'
import Router from 'next/router'

class Login extends React.Component {
  state = {
    user_id : '',
    password : '',
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      method : 'post',
      path : `auth/login`,
      data : {
        ...this.state
      }
    }
    const results = await crud(data)
    if(results){
      window.localStorage.setItem('token',results.token)
      Router.push('/')
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  render() {
    return (
      <Layout>
        <div>
          <form onSubmit={this.handleSubmit}>
            아이디 : 
            <input 
              type="text" 
              placeholder="아이디"
              name="user_id"
              autoComplete="off"
              onChange={this.handleChange}
            /> 
            <br/>
            패스워드 : 
            <input 
              type="password" 
              placeholder="비밀번호"
              name="password"
              autoComplete="off"
              onChange={this.handleChange}
            /> 
            <br/>
            <button type="submit">제출</button>
          </form>
          <Link href={`/register`}>
            <a>회원가입</a>
          </Link>
        </div>
        <Counter />
      </Layout>
    )
  }
}
export default Login;