import express from "express";

const accountsRouter = express.Router();

// GET /accounts - Get all accounts
accountsRouter.get("/", function (req, res) {
  res.send("View all accounts");
});

// GET /accounts/:id - Get account by ID
accountsRouter.get("/:id", function (req, res) {
  res.send("View an account by id");
});

// POST /accounts - Create new account
accountsRouter.post("/", function (req, res) {
  res.send("Create an account");
});

// PUT /accounts/:id - Update account by ID
accountsRouter.put("/:id", function (req, res) {
  res.send("Update an account by id");
});

// DELETE /accounts/:id - Delete account by ID
accountsRouter.delete("/:id", function (req, res) {
  res.send("Delete an account by id");
});

export { accountsRouter };
