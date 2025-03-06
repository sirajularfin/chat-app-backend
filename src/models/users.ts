const users = [];

class User {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  save() {
    users.push(this);
  }
}

export default User;
