import { AbstractRepository } from "../../abstract.repository";
import { IUser } from "../../../utils/common/interface";
import { User } from "./user.model";
import { conflictException } from "../../../utils/erorr";
export class UserRepository extends AbstractRepository<IUser> {
    constructor() {
        super(User);
    }
    async getAllUsers() {
        return await this.model.find();
    }
}