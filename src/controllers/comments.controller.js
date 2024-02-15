import Comment from "../models/comments.model.js";

export const postComment = async (req, res) => {
  try {
    const { userId, title, description, publication} = req.body;
    console.log(req);
    const newComment = new Comment({
      user: userId,
      title,
      description,
      publication,
    });

    const commentSaved = await newComment.save();
    res.status(200).json(commentSaved);
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};
