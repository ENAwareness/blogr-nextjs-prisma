import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id)
    },
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  });
  return {
    props: post
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT'
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE'
  });
  Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div className="page">
        <article className="post-content">
          <h2>{title}</h2>
          <p className="author">By {props?.author?.name || 'Unknown author'}</p>
          <div className="content">
            <ReactMarkdown children={props.content} />
          </div>
        </article>
        {((!props.published && userHasValidSession && postBelongsToUser) ||
          (userHasValidSession && postBelongsToUser)) && (
          <div className="actions">
            {!props.published && userHasValidSession && postBelongsToUser && (
              <button onClick={() => publishPost(props.id)}>Publish</button>
            )}
            {userHasValidSession && postBelongsToUser && (
              <button onClick={() => deletePost(props.id)}>Delete</button>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .page {
          padding-top: 3rem;
        }

        .post-content {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          padding: 3rem;
        }

        h2 {
          font-size: 2rem;
          font-weight: 500;
          margin: 0 0 0.75rem 0;
          color: #2c2c2c;
          letter-spacing: 0.02em;
        }

        .author {
          color: #999999;
          font-size: 0.875rem;
          margin: 0 0 2rem 0;
        }

        .content :global(p) {
          color: #666666;
          line-height: 1.8;
          margin: 1rem 0;
        }

        .content :global(h1),
        .content :global(h2),
        .content :global(h3) {
          color: #2c2c2c;
          font-weight: 500;
          margin: 2rem 0 1rem 0;
        }

        .content :global(code) {
          background: #f5f5f5;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
        }

        .content :global(pre) {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
        }

        .actions {
          margin-top: 1.5rem;
          display: flex;
          gap: 0.75rem;
        }

        button {
          background: #ffffff;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          padding: 0.75rem 1.5rem;
          color: #666666;
          font-size: 14px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        button:hover {
          border-color: #999999;
          color: #333333;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </Layout>
  );
};

export default Post;
