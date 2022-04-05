import express from "express";
import bodyParser from "body-parser";
import { assignments as assignmentsFromFile } from "./data/assignments.js";
import { comments as commentsFromFile } from "./data/comments.js";

let assignments = [...assignmentsFromFile];
let comments = [...commentsFromFile];

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Hello Teacher!!");
});

app.get("/assignments", (req, res) => {
  return res.json({
    data: assignments,
  });
});

app.get("/assignments/:id", (req, res) => {
  const assignmentId = +req.params.id;
  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      messsage: `Assignment ${assignmentId} not found`,
    });
  }

  const assignment = assignments.filter((assign) => assign.id === assignmentId);

  return res.json({
    data: assignment[0],
  });
});

app.post("/assignments", (req, res) => {
  const newAssignment = req.body;
  const newAssignmentId = assignments[assignments.length - 1].id + 1;

  assignments.push({
    id: newAssignmentId,
    ...newAssignment,
  });

  return res.json({
    message: "New assignment has been created successfully",
  });
});

app.put("/assignments/:id", (req, res) => {
  const updateAssignment = req.body;
  const assignmentId = +req.params.id;

  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      messsage: `Assignment ${assignmentId} not found`,
    });
  }

  const assignmentIndex = assignments.findIndex((assign) => {
    return assign.id === assignmentId;
  });

  assignments[assignmentIndex] = {
    id: assignmentId,
    ...updateAssignment,
  };

  return res.json({
    message: `Assignment ${assignmentId} has been updated successfully`,
  });
});

app.delete("/assignments/:id", (req, res) => {
  const assignmentId = +req.params.id;

  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      messsage: `Assignment ${assignmentId} not found`,
    });
  }

  assignments = assignments.filter((assign) => {
    return assign.id !== assignmentId;
  });

  return res.json({
    message: `Assignment ${assignmentId} has been deleted successfully`,
  });
});

app.get("/assignments/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;

  const assignmentComments = comments.filter((comment) => {
    return assignmentId == comment.assignmentId;
  });

  return res.json({
    data: assignmentComments,
  });
});

app.post("/assignments/:id/comments", (req, res) => {
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

app.delete("/assignments/:id/comments", (req, res) => {
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

app.get("/accounts", function (req, res) {
  res.send("View all accounts");
});

app.get("/accounts/:id", function (req, res) {
  res.send("View an account by id");
});

app.post("/accounts", function (req, res) {
  res.send("Create an account");
});

app.put("/accounts/:id", function (req, res) {
  res.send("Update an account by id");
});

app.delete("/accounts/:id", function (req, res) {
  res.send("Delete an account by id");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
