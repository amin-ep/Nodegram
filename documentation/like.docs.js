const getAllLikes = {
  tags: ['Like'],
  description: 'List all of the Likes',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              user: '62544789512334565125',
              post: '665dd76b2a1d4c12b519c80b',
            },
          },
        },
      },
    },
  },
};

const toggleLike = {
  tags: ['Like'],
  description: 'toggle like on post',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            post: {
              type: 'string',
              description: 'id of post that the user wants to like',
              example: '665dc54aba28c34e6c5d6a03',
            },
            user: {
              type: 'string',
              description: 'id of user that likes the post',
              example: '665dc54aba28c34e6c5d6a03',
            },
          },
        },
      },
    },
  },
};

const getLike = {
  tags: ['Like'],
  description: 'Get a Like by id',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the like',
      type: 'string',
      example: '62544789512334565125',
    },
  ],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              user: '62544789512334565125',
              post: '665dd76b2a1d4c12b519c80b',
            },
          },
        },
      },
    },
    404: {
      description: 'Not found!',
    },
  },
};

export const likeDocs = {
  '/likes': {
    get: getAllLikes,
    post: toggleLike,
  },
  '/likes/id': {
    get: getLike,
  },
};
