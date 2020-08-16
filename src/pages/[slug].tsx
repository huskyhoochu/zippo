import { GetServerSideProps } from 'next';
import { SettingsResponse, Tags, PostOrPage } from '@tryghost/content-api';

import Layout from '../components/layout';
import getSettings from './api/settings';
import getTags from './api/tags';
import getPost from './api/post';

interface Props {
  settings: SettingsResponse;
  tags: Tags;
  post: PostOrPage;
}

const Post: React.FC<Props> = (props: Props) => {
  return (
    <Layout {...props}>
      <p>{props.post.title}</p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const settings = await getSettings();
  const tags = await getTags({
    limit: 'all',
    order: 'name ASC',
    filter: 'accent_color:#000000',
  });

  const post = await getPost({ slug: slug as string });

  return {
    props: {
      settings,
      tags,
      post,
    },
  };
};

export default Post;
