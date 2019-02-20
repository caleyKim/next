import Layout from '../components/Layout';
import Link from 'next/link';

const BoardLink = (props) => (
  <li>
    <Link as={`/board/${props.title}`} href={`/boardView?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

export default () => (
  <Layout>
    <h2>게시판 리스트</h2>
    <ul>
      <BoardLink title="Next Board 1"/>
      <BoardLink title="Next Board 2"/>
      <BoardLink title="Next Board 3"/>
    </ul>
  </Layout>
)