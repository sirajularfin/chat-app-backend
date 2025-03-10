import { getDatabase } from '../integrations/database.js';
import { formatJson } from '../utils/commons.util.js';
import logger from '../utils/logger.util.js';

class User {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  save() {
    const db = getDatabase();
    return db
      .collection('user')
      .insertOne(this)
      .then(result => {
        logger(`[User] Saved user: ${this.email}`);
        return result;
      })
      .catch(err => {
        logger(`[User] Error saving user: ${this.email}`, 'error');
        logger(err, 'error');
      });
  }

  static fetchAll() {
    const db = getDatabase();
    return db
      .collection('user')
      .find()
      .toArray()
      .then(users => {
        logger(`[User] Total users fetched: ${users.length}`);
        return users;
      })
      .catch(err => {
        logger('[User] Error fetching users', 'error');
        logger(err, 'error');
      });
  }
}

export default User;
