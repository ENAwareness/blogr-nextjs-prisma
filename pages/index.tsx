import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return {
    props: { feed },
    revalidate: 10
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .page {
          padding-top: 3rem;
        }

        h1 {
          font-size: 1.75rem;
          font-weight: 500;
          margin: 0 0 2.5rem 0;
          color: #2c2c2c;
          letter-spacing: 0.02em;
        }

        .post + .post {
          margin-top: 1.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
