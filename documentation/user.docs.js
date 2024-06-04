const getAllUsers = {
  tags: ['User'],
  description: 'List all of the users',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: true,
              createdAt: 'Date',
            },
          },
        },
      },
    },
  },
};

const signup = {
  tags: ['User'],
  description: 'Create a user account',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'a unique email',
              example: 'info@email.io',
            },
            username: {
              type: 'string',
              description: 'a unique username',
              example: 'username123',
            },
            password: {
              type: 'string',
              description: 'a password that contains atleast 8 charcters',
              expamle: 'password1234',
            },
            role: {
              type: 'string',
              description: 'admin, author or user. by default it sets on user',
              example: 'user',
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'A verification code sent to your email!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: false,
              createdAt: 'Date',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request!',
    },
  },
};

const login = {
  tags: ['User'],
  description: 'Create a user account',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'a unique email',
              example: 'info@email.io',
            },
            password: {
              type: 'string',
              description: 'a password that contains atleast 8 charcters',
              expamle: 'password1234',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'you are logged in',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              email: 'info@email.io',
              username: 'username123',
              password: 'password123',
              role: 'user',
              verified: false,
              createdAt: 'Date',
            },
          },
        },
      },
    },
    400: {
      description: 'Incorrect email or password!',
    },
  },
};

const getUser = {
  tags: ['User'],
  description: 'Get a user by id',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the user',
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
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: true,
              createdAt: 'Date',
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

const verifyEmail = {
  tags: ['User'],
  description: 'Verify your account',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: true,
              createdAt: 'Date',
            },
          },
        },
      },
    },

    400: {
      description: 'verification key expired',
    },

    400: {
      description: 'invalid key!',
    },
  },
};

const forgetPassword = {
  tags: ['User'],
  description: 'Forgetpassword',
  parameters: [
    {
      name: 'token',
      in: 'query',
      description: 'token that sent to email',
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
            password: {
              type: 'string',
              description: '',
              example: 'info@email.io',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          message: 'Token sent to your email!',
        },
      },
    },

    404: {
      description: 'there is no user with this email!',
    },
  },
};

const resetPassword = {
  tags: ['User'],
  description: 'Reset password',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'a password that contains atleast 8 charcters',
              example: 'password123',
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: true,
              createdAt: 'Date',
            },
          },
        },
      },
    },

    400: {
      description: 'Invalid password sent',
    },

    400: {
      description: 'Invalid or expired token',
    },
  },
};

const getMe = {
  tags: ['User'],
  description: 'Get user based on authorization token',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: true,
              createdAt: 'Date',
            },
          },
        },
      },
    },
  },
};

const deletMe = {
  tags: ['User'],
  description: 'Delete user based on authorization token',
  responses: {
    204: {
      description: 'No content',
    },
  },
};

const updateMe = {
  tags: ['User'],
  description: 'Update user based on authorization token',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'a password that contains atleast 8 charcters',
              example: 'password123',
            },
            username: {
              type: 'string',
              description: 'a unique username',
              example: 'username123',
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
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: true,
              createdAt: 'Date',
            },
          },
        },
      },
    },

    400: {
      description:
        'Bad Request: invalid email or username or user wants to update password!',
    },

    404: {
      description: 'User not found!',
    },
  },
};

const updateMyPassword = {
  tags: ['User'],
  description: 'Update user based on authorization token',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
              expamle: 'password123',
              description: 'a password that contains atleast 8 charcters',
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
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: true,
              createdAt: 'Date',
            },
          },
        },
      },
    },

    400: {
      description:
        'Bad Request: invalid email or username or user wants to update password!',
    },

    404: {
      description: 'User not found!',
    },
  },
};

const updateUser = {
  tags: ['User'],
  description: 'Update user',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the user',
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
            email: {
              type: 'string',
              description: 'a unique email',
              example: 'info@email.io',
            },
            username: {
              type: 'string',
              description: 'a unique username',
              example: 'username123',
            },
            password: {
              type: 'string',
              description: 'a password that contains atleast 8 charcters',
              expamle: 'password1234',
            },
            role: {
              type: 'string',
              description: 'admin, author or user. by default it sets on user',
              example: 'user',
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
              email: 'info@email.io',
              username: 'username123',
              password: 'hashedpassword',
              role: 'user',
              verified: true,
              createdAt: 'Date',
            },
          },
        },
      },
    },

    400: {
      description:
        'Bad Request: invalid email or username or user wants to update password!',
    },
    404: {
      description: 'User not found!',
    },
  },
};

const deleteUser = {
  tags: ['User'],
  description: 'Delete a user based on Id',
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'id of the user',
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

export const userDocs = {
  '/users': {
    get: getAllUsers,
  },
  '/users/id': {
    get: getUser,
    path: updateUser,
    delete: deleteUser,
  },
  '/users/signup': {
    post: signup,
  },
  '/users/login': {
    post: login,
  },
  '/users/verifyEmail/key': {
    post: verifyEmail,
  },
  '/users/forgetPassword': {
    post: forgetPassword,
  },
  '/users/resetPassword/token': {
    post: resetPassword,
  },

  '/users/me': {
    get: getMe,
  },
  '/users/deleteMe': {
    delete: deletMe,
  },
  '/users/updateMe': {
    patch: updateMe,
  },
  '/users/updateMyPassword': {
    patch: updateMyPassword,
  },
};
