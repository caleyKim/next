import Layout from '../components/Layout';
import React from 'react';
import Form from  '../components/Form'
class Register extends React.Component {
  state = {
    data : [
      {
        title : '아이디',
        type : 'text',
        api : null
      },
      {
        title : '확인',
        type : 'button',
        api : 'auth/super_register'
      },
      {
        title : '비밀번호',
        type : 'password',
        api : null
      },
      {
        title : '비밀번호 확인',
        type : 'password',
        api : null
      },
      {
        title : '이름',
        type : 'text',
        api : null,
      },
      {
        title : '나이',
        type : 'number',
        api : null,
      },
      {
        title : '이메일',
        type : 'text',
        api : null,
      },
      {
        title : '주소',
        type : 'text',
        api : null,
      },
      {
        title : '핸드폰번호',
        type : 'text',
        api : null,
      },
      {
        title : '회원가입',
        type : 'submit',
        api : null,
      },
    ]
  }

  render() {
    return (
      <Layout>
        <Form data={this.state.data}></Form>
      </Layout>
    )
  }
}
export default Register;