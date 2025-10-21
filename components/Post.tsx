import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2.5rem;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        div:hover {
          border-color: #d0d0d0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transform: translateY(-1px);
        }

        div h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-weight: 500;
          color: #2c2c2c;
        }

        div small {
          color: #999999;
          font-size: 0.875rem;
        }

        div :global(p) {
          margin-top: 1rem;
          color: #666666;
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
};

export default Post;
