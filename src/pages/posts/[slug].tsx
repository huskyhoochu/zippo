import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SettingsResponse, Tags, PostOrPage } from '@tryghost/content-api';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import Layout from '../../components/layout';
import getSettings from '../api/settings';
import getTags from '../api/tags';
import getPost from '../api/post';

interface Props {
  settings: SettingsResponse;
  tags: Tags;
  post: PostOrPage;
}

const Post: React.FC<Props> = (props: Props) => {
  const router = useRouter();

  return (
    <Layout {...props} router={router}>
      <Head>
        <title>{`${props.post.title} | ${props.settings.title}`}</title>
        <meta
          property="og:site_name"
          content={`${props.post.title} | ${props.settings.title}`}
          key="site-name"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/posts/${props.post.slug}`}
          key="canonical"
        />
        <meta property="og:type" content="article" key="type" />
        <meta
          property="og:title"
          content={`${props.post.title} | ${props.settings.title}`}
          key="title"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}/posts/${props.post.slug}`}
          key="url"
        />
        <meta
          property="og:image"
          content={props.post.feature_image}
          key="img"
        />
        <meta
          property="twitter:title"
          content={`${props.post.title} | ${props.settings.title}`}
          key="twitter-title"
        />
        <meta
          property="twitter:url"
          content={`${process.env.NEXT_PUBLIC_URL}/posts/${props.post.slug}`}
          key="twitter-url"
        />
        <meta
          property="twitter:image"
          content={props.post.feature_image}
          key="twitter-img"
        />
      </Head>
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
