import User from '../../models/user';

export default {
  signup: (_, { fullName, username, password, email }) => {
    const [first_name, ...last_name] = fullName.split(' ');

    return User.create({ first_name, last_name, username, password, email });
  }
}
