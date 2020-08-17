import {
  SettingsResponse,
  Tags,
  Tag,
  PostsOrPages,
  PostOrPage,
} from '@tryghost/content-api';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import Layout from '../../components/layout';
import getSettings from '../api/settings';
import getTags from '../api/tags';
import getTag from '../api/tag';
import getPosts from '../api/posts';

interface Props {
  settings: SettingsResponse;
  tags: Tags;
  tag: Tag;
  posts: PostsOrPages;
}

const TagPage: React.FC<Props> = (props: Props) => {
  return (
    <Layout {...props}>
      <Head>
        <title>{`${props.tag.name} | ${props.settings.title}`}</title>
        <meta
          property="og:site_name"
          content={`${props.tag.name} | ${props.settings.title}`}
          key="site-name"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_URL}/tag/${props.tag.slug}`}
          key="canonical"
        />
        <meta property="og:type" content="article" key="type" />
        <meta
          property="og:title"
          content={`${props.tag.name} | ${props.settings.title}`}
          key="title"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_URL}/tag/${props.tag.slug}`}
          key="url"
        />
        <meta property="og:image" content={props.tag.feature_image} key="img" />
        <meta
          property="twitter:title"
          content={`${props.tag.name} | ${props.settings.title}`}
          key="twitter-title"
        />
        <meta
          property="twitter:url"
          content={`${process.env.NEXT_PUBLIC_URL}/tag/${props.tag.slug}`}
          key="twitter-url"
        />
        <meta
          property="twitter:image"
          content={props.tag.feature_image}
          key="twitter-img"
        />
      </Head>
      <div className="tag">
        <div className="zippo-container">
          <div className="tag__title-group">
            <h3>{props.tag.name}</h3>
          </div>
          <div className="tag__body">
            {Array.prototype.map.call(props.posts, (post: PostOrPage) => (
              <Link key={post.id} href={`/posts/${post.slug}`}>
                <a className="item">
                  <div className="item__thumbnail">
                    <img src={post.feature_image} alt={post.slug} />
                  </div>
                  <div className="item__meta">
                    <p className="item__meta__time">
                      {format(parseISO(post.published_at), 'yyyy-MM-dd')}
                    </p>
                  </div>
                  <p>{post.title}</p>
                </a>
              </Link>
            ))}
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

  const tag = await getTag(
    { slug: slug as string },
    { include: 'count.posts' },
  );
  const posts = await getPosts({
    filter: `primary_tag:${slug as string}`,
    include: 'tags',
  });

  return {
    props: {
      settings,
      tags,
      tag,
      posts,
    },
  };
};

export default TagPage;
