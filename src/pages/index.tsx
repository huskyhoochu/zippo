import { GetServerSideProps } from 'next';
import Link from 'next/link';
import {
  PostsOrPages,
  PostOrPage,
  SettingsResponse,
  Tags,
} from '@tryghost/content-api';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

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
      <div className="home">
        <div className="zippo-container">
          {Array.prototype.map.call(featured, (post: PostOrPage) => (
            <Link key={post.id} href={post.slug}>
              <a className="home__featured">
                <div className="home__featured__text-group">
                  <div className="meta">
                    <p>{post.primary_tag.name}</p>
                    <p className="time">
                      {format(parseISO(post.published_at), 'yyyy-MM-dd')}
                    </p>
                  </div>
                  <div className="title">
                    <h3>{post.title}</h3>
                    <hr />
                  </div>
                  <div className="excerpt">
                    <p>{post.excerpt}</p>
                  </div>
                </div>
                <div
                  className="home__featured__thumbnail"
                  style={{ backgroundImage: `url(${post.feature_image})` }}
                />
              </a>
            </Link>
          ))}
          <div className="home__recent">
            <h2 className="home__recent__title">Recent Posts</h2>
            <div className="home__recent__items">
              {Array.prototype.map.call(posts, (post: PostOrPage) => (
                <Link key={post.id} href={post.slug}>
                  <a className="item">
                    <div
                      className="item__thumbnail"
                      style={{ backgroundImage: `url(${post.feature_image})` }}
                    />
                    <div className="item__meta">
                      <p>{post.primary_tag.name}</p>
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
      </div>
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

  const posts = await getPosts({
    limit: '12',
    order: 'published_at DESC',
    include: 'tags',
  });
  const featured = await getPosts({
    limit: 1,
    filter: 'featured:true',
    include: 'tags',
  });
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
