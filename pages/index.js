import Layout from '../components/Layout';
import Link from 'next/link';
import React from 'react';
import axios from 'axios'

const Index = (props) => (
  <Layout>
    <p>Hello, Next JS</p>
    <h2 className="test">
      홈 화면
    </h2>

    <ul>
      {props.data.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?title=${show.title}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.data;

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    data: data
  }
};

export default Index