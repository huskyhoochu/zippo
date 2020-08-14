import { GetServerSideProps } from 'next';
import { PostsOrPages, PostOrPage, SettingsResponse } from '@tryghost/content-api';

import getSettings from './api/settings';
import getPosts from './api/posts';
import Layout from '../components/layout';

interface Props {
  settings: SettingsResponse;
  posts: PostsOrPages;
}

const Home: React.FC<Props> = ({ posts, settings }: Props) => {
  return (
    <Layout settings={settings}>
      <p className="font-serif">안녕하세요</p>
      {Array.prototype.map.call(posts, (post: PostOrPage) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.published_at}</p>
        </div>
      ))}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const settings = await getSettings();
  const posts = await getPosts({ limit: '12', order: 'published_at ASC' });

  return {
    props: {
      settings,
      posts,
    },
  };
};

export default Home;
