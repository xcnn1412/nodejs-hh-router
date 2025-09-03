import express from "express";
import { comments as commentsFromFile } from "../data/comments.js";

let comments = [...commentsFromFile];

const commentsRouter = express.Router();

// GET /assignments/:id/comments - Get comments for specific assignment
commentsRouter.get("/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;

  const assignmentComments = comments.filter((comment) => {
    return assignmentId == comment.assignmentId;
  });

  return res.json({
    data: assignmentComments,
  });
});

// POST /assignments/:id/comments - Add comment to specific assignment
commentsRouter.post("/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;
  const newComment = req.body;
  const commentId = comments[comments.length - 1].id + 1;

  comments.push({
    id: commentId,
    assignmentId,
    ...newComment,
  });

  return res.json({
    message: `Comment of assignment ${assignmentId} has been added to assignment.`,
  });
});

// DELETE /assignments/:id/comments - Delete all comments for specific assignment
commentsRouter.delete("/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;

  const hasFound = comments.find(
    (comment) => comment.assignmentId === assignmentId
  );
  if (!hasFound) {
    return res.status(404).json({
      message: `${assignmentId} not found`,
    });
  }

  comments = comments.filter((comment) => {
    return comment.assignmentId != assignmentId;
  });

  return res.json({
    message: `Comment of assignment ${assignmentId} has been deleted.`,
  });
});

export { commentsRouter, comments };
