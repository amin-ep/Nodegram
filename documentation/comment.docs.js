const getAllComments = {
  tags: ['Comment'],
  description: 'List all of the Comments',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              text: 'some texts',
              post: '665dc54aba28c34e6c5d6a03',
              user: '665dc54aba28c34e6c5d6a03',
            },
          },
        },
      },
    },
  },
  404: {
    description: 'Not found!',
  },
};

const craeteComment = {
  tags: ['Comment'],
  description: 'Create a Comment',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'anything',
              example: 'santiago bernabeu stadium',
            },
            post: {
              type: 'string',
              description: 'post id',
              example: '665dc54aba28c34e6c5d6a03',
            },
            user: {
              type: 'string',
              description: 'id of user that published the post',
              example: '665dc54aba28c34e6c5d6a03',
            },
            parentComment: {
              type: 'string',
              description:
                'this is for replies on comments, if a comment has a parentComment field it means that is a reply of a comment',
              example: 'some text',
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
              text: 'some texts',
              user: '665dc54aba28c34e6c5d6a03',
              post: '665dc54aba28c34e6c5d6a03',
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

const getComment = {
  tags: ['Comment'],
  description: 'Get a comment by id',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the comment',
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
              parentComment: '665dc54aba28c34e6c5d6a03',
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

const updateComment = {
  tags: ['Comment'],
  description: 'Update comment',
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
            text: {
              type: 'string',
              description: 'opinion about a post',
              example: 'some text',
            },
          },
        },
      },
    },
  },
};

const deleteComment = {
  tags: ['Comment'],
  description: 'Delete a comment based on Id',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the comment',
      type: 'string',
      example: '62544789512334565125',
    },
  ],

  responses: {
    204: {
      description: 'No content',
    },

    404: {
      description: 'comment not found!',
    },
  },
};

const createReply = {
  tags: ['Comment'],
  description: 'Create a Comment',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'anything',
              example: 'santiago bernabeu stadium',
            },
            post: {
              type: 'string',
              description: 'post id',
              example: '665dc54aba28c34e6c5d6a03',
            },
            user: {
              type: 'string',
              description: 'id of user that published the post',
              example: '665dc54aba28c34e6c5d6a03',
            },
            parentComment: {
              type: 'string',
              description:
                'this is for replies on comments, if a comment has a parentComment field it means that is a reply of a comment',
              example: 'some text',
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
              text: 'some texts',
              user: '665dc54aba28c34e6c5d6a03',
              post: '665dc54aba28c34e6c5d6a03',
              parentComment: '665dc54aba28c34e6c5d6a03',
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

export const commentDocs = {
  '/comments': {
    get: getAllComments,
    post: craeteComment,
  },
  '/comments/id': {
    get: getComment,
    patch: updateComment,
    delete: deleteComment,
  },
  '/comments/replies': {
    post: createReply,
  },
};
