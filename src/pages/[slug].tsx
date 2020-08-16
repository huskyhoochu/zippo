import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { SettingsResponse, Tags, PostOrPage } from '@tryghost/content-api';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

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
      <div className="post">
        <div
          className="post__thumbnail"
          style={{ backgroundImage: `url(${props.post.feature_image})` }}
        />
        <div className="zippo-container">
          <div className="post__meta">
            <p>{props.post.primary_tag.name}</p>
            <p className="time">
              {format(parseISO(props.post.published_at), 'yyyy-MM-dd')}
            </p>
          </div>
          <div className="post__title">
            <h3>{props.post.title}</h3>
            <hr />
          </div>
          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: props.post.html }}
          />
          <div className="post__nav">
            <Link href={`/tag/${props.post.primary_tag.slug}`}>
              <a>List</a>
            </Link>
          </div>
        </div>
      </div>
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

  const post = await getPost({ slug: slug as string }, { include: 'tags' });

  return {
    props: {
      settings,
      tags,
      post,
    },
  };
};

export default Post;
