import { GetServerSideProps } from 'next';
import {
  PostsOrPages,
  PostOrPage,
  SettingsResponse,
  Tags,
} from '@tryghost/content-api';

import getSettings from './api/settings';
import getPosts from './api/posts';
import getTags from './api/tags';
import Layout from '../components/layout';

interface Props {
  settings: SettingsResponse;
  tags: Tags;
  posts: PostsOrPages;
  featured: PostsOrPages;
}

const Home: React.FC<Props> = ({ settings, tags, posts, featured }: Props) => {
  return (
    <Layout settings={settings} tags={tags}>
      <p className="font-serif">안녕하세요</p>
      {Array.prototype.map.call(featured, (post: PostOrPage) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.published_at}</p>
        </div>
      ))}
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
  const tags = await getTags({
    limit: 'all',
    order: 'name ASC',
    filter: 'accent_color:#000000',
  });

  const posts = await getPosts({ limit: '12', order: 'published_at DESC' });
  const featured = await getPosts({ limit: 1, filter: 'featured:true' });
  return {
    props: {
      settings,
      tags,
      posts,
      featured,
    },
  };
};

export default Home;
