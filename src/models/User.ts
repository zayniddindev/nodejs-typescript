import { Model } from "objection";
import db from "../config/db/db";

Model.knex(db);

class User extends Model {
  public id: any;
  public token!: string;
  public pwd!: string;
  public length!: number;

  static get tableName() {
    return "users";
  }

  static async showAllCustomers(page: number, limit: number) {
    return await this.query().select().where("role", "customer");
  }

  static async showAllAdmins() {
    return await this.query().select().where("role", "admin");
  }

  static async findOne(email: string) {
    return await this.query().select().where("email", email);
  }

  static async createAdmin(data: object) {
    return this.query().insert(data);
  }

}

export default User;
