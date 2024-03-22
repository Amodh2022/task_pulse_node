const bodyParser = require("body-parser");
const db = require("./database/db");
const app = require("express")();
const port = 3000;

app.use(bodyParser.json());

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).send("Internal Server Error");
      throw error;
    }
    res.json(results);
  });
});

// Get a user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE user_id = ?", [id], (error, results) => {
    if (error) {
      res.status(500).send("Internal Server Error");
      throw error;
    }
    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Check if the user already exists
  db.query(
    "SELECT * FROM users WHERE name = ? AND email = ?",
    [name, email],
    (error, results) => {
      if (error) {
        console.log("Database error:", error);
        res.status(500).json({message:"Internal Server Error In Database"});
        return;
      }

      if (results.length > 0) {
        res.status(200).json({ message: "User already exists" });
      } else {
        // Insert the new user
        db.query(
          "INSERT INTO users (name, email) VALUES (?, ?)",
          [name, email],
          (error, results) => {
            if (error) {
              if (error.code === "ER_DUP_ENTRY") {
                // Check if the error is due to duplicate entry
                res.status(409).json({ message: error.code }); // Conflict status code for duplicate entry
              } else {
                console.error("Database error:", error);
                res.status(500).json({message:"Internal Server Error"});
              }
              return;
            }
            res.status(200).json({ message: "User added successfully" });
          }
        );
      }
    }
  );
});

// Update a user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query(
    "UPDATE users SET name = ?, email = ? WHERE user_id = ?",
    [name, email, id],
    (error, results) => {
      if (error) {
        res.status(500).send("Internal Server Error");
        throw error;
      }
      res.send("User updated successfully");
    }
  );
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE user_id = ?", [id], (error, results) => {
    if (error) {
      res.status(500).send("Internal Server Error");
      throw error;
    }
    res.json({ message: "User deleted SuccessFully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
