import { commentDocs } from './comment.docs.js';
import { likeDocs } from './like.docs.js';
import { postDocs } from './post.docs.js';
import { userDocs } from './user.docs.js';

export const swaggerDocumentation = {
  openapi: '3.0.0',
  info: {
    title: 'Nodegram',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local Dev',
    },
  ],
  tags: [
    {
      name: 'User',
      description: 'User routes',
    },
    {
      name: 'Post',
      description: 'Post routes',
    },
    {
      name: 'Comment',
      description: 'Comment routes',
    },
    {
      name: 'Like',
      description: 'Like routes',
    },
  ],
  paths: {
    ...userDocs,
    ...postDocs,
    ...commentDocs,
    ...likeDocs,
  },
};
