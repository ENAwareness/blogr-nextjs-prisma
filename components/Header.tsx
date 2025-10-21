import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="nav-link" data-active={isActive('/')}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .nav-link {
          text-decoration: none;
          color: #666666;
          display: inline-block;
          font-weight: 400;
          font-size: 14px;
          padding: 0.5rem 0;
          position: relative;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #333333;
        }

        .left a[data-active='true'] {
          color: #333333;
        }

        .left a[data-active='true']::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #333333;
        }

        a + a {
          margin-left: 2rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="nav-link" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <style jsx>{`
          .nav-link {
            text-decoration: none;
            color: #666666;
            display: inline-block;
            font-weight: 400;
            font-size: 14px;
            padding: 0.5rem 0;
            position: relative;
            transition: color 0.2s ease;
          }

          .nav-link:hover {
            color: #333333;
          }

          .left a[data-active='true'] {
            color: #333333;
          }

          .left a[data-active='true']::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: #333333;
          }

          a + a {
            margin-left: 2rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Loading...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }

          p {
            font-size: 13px;
            color: #999999;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #666666;
            display: inline-block;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid #d0d0d0;
            padding: 0.5rem 1.5rem;
            border-radius: 4px;
            background: #ffffff;
          }

          .right a:hover {
            border-color: #999999;
            color: #333333;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="nav-link" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a className="nav-link" data-active={isActive('/drafts')}>
            My drafts
          </a>
        </Link>
        <style jsx>{`
          .nav-link {
            text-decoration: none;
            color: #666666;
            display: inline-block;
            font-weight: 400;
            font-size: 14px;
            padding: 0.5rem 0;
            position: relative;
            transition: color 0.2s ease;
          }

          .nav-link:hover {
            color: #333333;
          }

          .left a[data-active='true'] {
            color: #333333;
          }

          .left a[data-active='true']::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: #333333;
          }

          a + a {
            margin-left: 2rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name}
        </p>
        <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #666666;
            display: inline-block;
            font-size: 14px;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1.5rem;
            color: #999999;
            margin: 0;
          }

          a + a {
            margin-left: 0.5rem;
          }

          .right {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          button {
            border: 1px solid #d0d0d0;
            background: #ffffff;
            border-radius: 4px;
            padding: 0;
            transition: all 0.2s ease;
          }

          button:hover {
            border-color: #999999;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
          }

          button a {
            padding: 0.5rem 1.5rem;
            display: block;
          }

          button:hover a {
            color: #333333;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2.5rem 2rem;
          align-items: center;
          max-width: 900px;
          margin: 0 auto;
          border-bottom: 1px solid #e5e5e5;
          background: #fafafa;
        }
      `}</style>
    </nav>
  );
};

export default Header;
