import { AbstractRepository } from "../../abstract.repository";
import { IComment } from "../../../utils/common/interface";
import { Comment } from "./comment.model";
export class CommentRepository extends AbstractRepository<IComment> {
    constructor() {
        super(Comment);
    }
}
    