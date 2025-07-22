import { fakerES_MX as faker } from '@faker-js/faker';
import User from '../models/user.model.js';

const createRandomUsers = async (count = 10) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
    });
    const name = `${firstName} ${lastName}`;
    const password = 'password123';
    const user = await User.create({ name, email, password });
    users.push(user);
  }
  console.log(users);
  return users;
};

export default createRandomUsers;