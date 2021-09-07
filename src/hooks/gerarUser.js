// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { v4: uuid_v4 } = require('uuid');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    context.data.id = uuid_v4();
    
    if (context.params.user) {
      context.data.userId = context.params.user.id;
    }

    context.params.$returning = true;
    
    return context; 
  };
};