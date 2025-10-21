import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="page">
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content (Markdown supported)"
            rows={12}
            value={content}
          />
          <div className="actions">
            <input disabled={!content || !title} type="submit" value="Create" />
            <a className="back" href="#" onClick={() => Router.push('/')}>
              Cancel
            </a>
          </div>
        </form>
      </div>
      <style jsx>{`
        .page {
          padding-top: 3rem;
        }

        form {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          padding: 3rem;
          max-width: 700px;
          margin: 0 auto;
        }

        h1 {
          font-size: 1.75rem;
          font-weight: 500;
          margin: 0 0 2rem 0;
          color: #2c2c2c;
          letter-spacing: 0.02em;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.75rem;
          margin: 0 0 1.5rem 0;
          border-radius: 4px;
          border: 1px solid #d0d0d0;
          font-size: 16px;
          color: #333333;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }

        input[type='text']:focus,
        textarea:focus {
          outline: none;
          border-color: #999999;
        }

        textarea {
          resize: vertical;
          line-height: 1.6;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        input[type='submit'] {
          background: #ffffff;
          border: 1px solid #d0d0d0;
          border-radius: 4px;
          padding: 0.75rem 1.5rem;
          color: #666666;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        input[type='submit']:hover:not(:disabled) {
          border-color: #999999;
          color: #333333;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }

        input[type='submit']:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .back {
          color: #999999;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s ease;
        }

        .back:hover {
          color: #666666;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
