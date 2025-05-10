import { MDXRemote } from 'next-mdx-remote-client/rsc';

// Optionally, define custom components for MDX here
const components = {
  // Add custom MDX components here if needed
};

export function MDXRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
