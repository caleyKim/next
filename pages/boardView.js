import Layout from '../components/Layout';

export default (props) => (
  <Layout>
    <h2>제목 : {console.log(props)}{props.query.title}</h2>
    <p>
      상세 내용
    </p>
  </Layout>
)