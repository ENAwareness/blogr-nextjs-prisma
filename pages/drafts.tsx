import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false
    },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return {
    props: { drafts }
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <div className="page">
          <h1>My Drafts</h1>
          <div className="message">You need to be authenticated to view this page.</div>
        </div>
        <style jsx>{`
          .page {
            padding-top: 3rem;
          }

          h1 {
            font-size: 1.75rem;
            font-weight: 500;
            margin: 0 0 2rem 0;
            color: #2c2c2c;
          }

          .message {
            padding: 2rem;
            background: #ffffff;
            border: 1px solid #e5e5e5;
            border-radius: 6px;
            color: #666666;
            text-align: center;
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
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

export default Drafts;
