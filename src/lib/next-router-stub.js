// Next.js compatibility stubs for react-router-dom
import React from 'react';
import { useRouter } from 'next/router';

// Mock Link component that uses Next.js Link
export const Link = ({ to, children, ...props }) => {
  const NextLink = require('next/link').default;
  return <NextLink href={to} {...props}>{children}</NextLink>;
};

// Mock NavLink component that uses Next.js Link
export const NavLink = ({ to, children, activeClassName, ...props }) => {
  const NextLink = require('next/link').default;
  const router = useRouter();
  const isActive = router.pathname === to;

  return (
    <NextLink href={to} {...props}>
      <span className={isActive ? activeClassName : ''}>{children}</span>
    </NextLink>
  );
};

// Mock useLocation hook using Next.js router
export const useLocation = () => {
  const router = useRouter();
  return {
    pathname: router.pathname,
    search: '',
    hash: '',
    state: null,
  };
};

// Mock Navigate component
export const Navigate = ({ to, replace = false }) => {
  const router = useRouter();

  // Perform navigation on mount
  React.useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, replace, router]);

  return null;
};

// Mock BrowserRouter component
export const BrowserRouter = ({ children }) => {
  return children;
};

// Mock Routes component
export const Routes = ({ children }) => {
  return children;
};

// Mock Route component
export const Route = () => {
  return null;
};