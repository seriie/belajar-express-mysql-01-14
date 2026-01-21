import express, { application } from "express";
import myLogs from "../utils/myLogs.js";
import queryDb from "../helper/query.js";
import * as userController from "../controllers/user.controller.js"

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, age } = req.body;

  try {
    const query = "INSERT INTO users (name, age) VALUES (?, ?)";
    await queryDb(query, [name, age]);

    res.status(200).json({ message: "User created successfully!" });
    myLogs("✅", "User created!");
  } catch (e) {
    res.status(500).json({
      message: {
        error: "Error while creating user!",
      },
    });
    myLogs("❌", "Error while creating user");
  }
});

router.get("/", async (req, res) => {
  await userController.getUsers(req, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM users WHERE id = ?";
    const result = await queryDb(query, [id]);

    if (result.length < 1) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({
      message: {
        error: "Error retrieving form data",
      },
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  try {
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }

    if (age !== undefined) {
      fields.push("age = ?");
      values.push(age);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    await queryDb(query, values);

    res.status(200).json({ message: "User updated successfully!" });
    myLogs("✅", "User updated!");
  } catch (e) {
    res.status(500).json({ message: e.message });
    myLogs("❌", "An error occurred while updating data!");
  }
});

router.delete('/', async (req, res) => {
    try {
        const query = "DELETE FROM users"
        const result = await queryDb(query);

        res.status(200).json({ message: "User deleted successfully!", result })
        myLogs("✅", "Successfully deleted user")
    } catch (e) {
        res.status(500).json({ message: e.message })
        myLogs("c", "An error ocurred while deleting data!")
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const query = "DELETE FROM users WHERE id = ?"
        const result = await queryDb(query, id)

        res.status(200).json({ message: `User ${id} deleted successfully!`, result })
        myLogs("✅", `Successfully deleted user with id ${id}`)
    } catch (e) {
        res.status(500).json({ message: e.message })
        myLogs("❌", `An error ocurred while deleting user with id ${id}`)
    }
})

export default router;
