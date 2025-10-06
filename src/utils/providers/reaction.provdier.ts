import { NotFoundException } from "../erorr";
import { CommentRepository } from "../../db/model/comment/comment.repositoryl";
import { PostRepository } from "../../db/model/post/post.reposcitory";
import { REACTION } from "../../utils/common/enum";

export const ReactionProvider = async (
  repo: CommentRepository | PostRepository,
  id: string,
  userId: string,
  reaction: string
) => {  const entity = await repo.exist({ _id: id });
  if (!entity) throw new NotFoundException("Entity not found");

  const reactionIndex = entity.reaction.findIndex((r) => r.userId.toString() === userId.toString());

  if (reactionIndex === -1) {
    await repo.update(
      { _id: id },
      {
        $push: {
          reaction: {
            reaction: [undefined, null, ""].includes(reaction)
              ? REACTION.LIKE
              : reaction,
            userId,
          },
        },
      }
    );
  }
  else if ([undefined, null, ""].includes(reaction)) {
    await repo.update(
      { _id: id },
      { $pull: { reaction: { userId } } }
    );
  }
  else {
    await repo.update(
      { _id: id, "reaction.userId": userId },
      { "reaction.$.reaction": reaction }
    );
  }
};
