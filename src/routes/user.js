import express from 'express';
import myLogs from '../utils/myLogs';
import queryDb from '../helper/query';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, age } = req.body;

   try {
        const query = "INSERT INTO users (name, age) VALUES (?, ?)";
        await queryDb(query, [name, age]);

        res.status(200).json({ message: "User created successfully!" });
        myLogs("✅", "User created!")
    } catch (e) {
        res.status(500).json({ message: {
            error: "Error while creating user!"
        }});
        myLogs("❌", "Error while creating user")
    }
});

router.get('/', async (req, res) => {
    try {
        const query = "SELECT * FROM USERS";
        await queryDb(query);
    } catch (e) {
        myLogs("✅", `User list sent`)

    }
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.userId === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
});

module.exports = router;