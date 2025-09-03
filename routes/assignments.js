import express from "express";
import { assignments as assignmentsFromFile } from "../data/assignments.js";

let assignments = [...assignmentsFromFile];

const assignmentsRouter = express.Router();

// GET /assignments - Get all assignments
assignmentsRouter.get("/", (req, res) => {
  return res.json({
    data: assignments,
  });
});

// GET /assignments/:id - Get assignment by ID
assignmentsRouter.get("/:id", (req, res) => {
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

// POST /assignments - Create new assignment
assignmentsRouter.post("/", (req, res) => {
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

// PUT /assignments/:id - Update assignment by ID
assignmentsRouter.put("/:id", (req, res) => {
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

// DELETE /assignments/:id - Delete assignment by ID
assignmentsRouter.delete("/:id", (req, res) => {
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

export { assignmentsRouter, assignments };
