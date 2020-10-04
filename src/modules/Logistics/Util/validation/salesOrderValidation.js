const validation = {
  email: {
    presence: {
      message: '^Please select an shipping point',
    },
  },

  password: {
    presence: {
      message: '^Please enter a password',
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters',
    },
  },
};

export default validation;
