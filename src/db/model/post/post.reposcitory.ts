import { AbstractRepository } from "../../abstract.repository";
import { Ipost } from "../../../utils/common/interface";
import { Post } from "./post.model";

export class PostRepository extends AbstractRepository<Ipost> {
  constructor() {
    super(Post);
  }
}
