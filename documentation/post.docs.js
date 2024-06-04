const getAllPosts = {
  tags: ['Post'],
  description: 'List all of the posts',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              title: 'Santiago Bernabeu',
              description: 'A stadium in madrid!',
              location: [35.6611029, , 51.327658],
              image: 'santiago.jpeg',
              slug: 'santiago-bernabeu',
              user: '665dc54aba28c34e6c5d6a03',
              createdAt: '2024-06-03T14:46:05.528+00:00',
            },
          },
        },
      },
    },
  },
};

const createPost = {
  tags: ['Post'],
  description: 'Create a post',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'anything',
              example: 'santiago bernabeu stadium',
            },
            description: {
              type: 'string',
              description: 'something about title',
              example: 'description',
            },
            location: {
              type: 'array',
              description:
                'latitude and logitude if the post is about a place ',
              expamle: [35.6611029, , 51.327658],
            },
            image: {
              type: 'string',
              description: 'an image about post',
              example: 'santiago.jpeg',
            },
            user: {
              type: 'string',
              description: 'id of user that published the post',
              example: '665dc54aba28c34e6c5d6a03',
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'post created',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              title: 'Santiago Bernabeu',
              description: 'A stadium in madrid!',
              location: [35.6611029, , 51.327658],
              image: 'santiago.jpeg',
              slug: 'santiago-bernabeu',
              user: '665dc54aba28c34e6c5d6a03',
              createdAt: '2024-06-03T14:46:05.528+00:00',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request! invalid data sent or some fields are required',
    },
  },
};

const getPost = {
  tags: ['Post'],
  description: 'Get a post by id',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the post',
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
              title: 'Santiago Bernabeu',
              description: 'A stadium in madrid!',
              location: [35.6611029, , 51.327658],
              image: 'santiago.jpeg',
              slug: 'santiago-bernabeu',
              user: '665dc54aba28c34e6c5d6a03',
              createdAt: '2024-06-03T14:46:05.528+00:00',
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

const deletePost = {
  tags: ['Post'],
  description: 'Delete a post based on Id',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the post',
      type: 'string',
      example: '62544789512334565125',
    },
  ],

  responses: {
    204: {
      description: 'No content',
    },

    404: {
      description: 'User not found!',
    },
  },
};

const updatePost = {
  tags: ['Post'],
  description: 'Update post',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the post',
      type: 'string',
      example: '62544789512334565125',
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'anything',
              example: 'santiago bernabeu stadium',
            },
            description: {
              type: 'string',
              description: 'something about title',
              example: 'description',
            },
            location: {
              type: 'array',
              description:
                'latitude and logitude if the post is about a place ',
              expamle: [35.6611029, , 51.327658],
            },
            image: {
              type: 'string',
              description: 'an image about post',
              example: 'santiago.jpeg',
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              title: 'Santiago Bernabeu',
              description: 'A stadium in madrid!',
              location: [35.6611029, 51.327658],
              image: 'santiago.jpeg',
              slug: 'santiago-bernabeu',
              user: '665dc54aba28c34e6c5d6a03',
              createdAt: '2024-06-03T14:46:05.528+00:00',
            },
          },
        },
      },
    },

    400: {
      description:
        'Bad Request: invalid data sent or some fields are required!',
    },
    404: {
      description: 'Post not found!',
    },
  },
};

const getPostComments = {
  tags: ['Post'],
  description: 'Get comments of a post by post id',
  parameters: [
    {
      name: 'postId',
      in: 'query',
      description: 'id of the post',
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
              text: 'some texts',
              user: '665dc54aba28c34e6c5d6a03',
              post: '665dc54aba28c34e6c5d6a03',
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

const createCommentOnPost = {
  tags: ['Post'],
  description: 'Create a post',
  parameters: [
    {
      name: 'postId',
      in: 'query',
      description: 'id of the post',
      type: 'string',
      example: '62544789512334565125',
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'anything about post',
              example: 'some opinions',
            },
            post: {
              type: 'string',
              description: 'id of post that the user wants to send comment',
              example: '665dc54aba28c34e6c5d6a03',
            },
            user: {
              type: 'string',
              description: 'id of user that published the post',
              example: '665dc54aba28c34e6c5d6a03',
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'post created',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              text: 'anything about post',
              user: '665dc54aba28c34e6c5d6a03',
              post: '665dd76b2a1d4c12b519c80b',
              createdAt: '2024-06-03T14:46:05.528+00:00',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request! invalid data sent or some fields are required',
    },
  },
};

const getPostLikes = {
  tags: ['Post'],
  description: 'Get likes of a post by postId',
  parameters: [
    {
      name: 'postId',
      in: 'query',
      description: 'id of the post',
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

const toggleLikeOnPost = {
  tags: ['Post'],
  description: 'toggle like on post',
  parameters: [
    {
      name: 'postId',
      in: 'query',
      description: 'id of the post',
      type: 'string',
      example: '62544789512334565125',
    },
  ],
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

export const postDocs = {
  '/posts': {
    get: getAllPosts,
    post: createPost,
  },
  '/posts/id': {
    get: getPost,
    delete: deletePost,
    patch: updatePost,
  },
  '/posts/postId/comments': {
    get: getPostComments,
    post: createCommentOnPost,
  },
  '/posts/postId/likes': {
    get: getPostLikes,
    post: toggleLikeOnPost,
  },
};
