import * as userService from "../services/user.service.js"

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        console.log(users);
        res.status(200).json({ message: "User list sent", code: 200, data: users });
        myLogs("✅", `User list sent`);
    } catch (e) {
        res.status(500).json({ message: "Error retrieving data", code: 500, data: e.message });
        myLogs("❌", `Error retrieving users data`);
      }
}

export const getUserById = async () => {
    try {

    } catch (e) {
        
    }
}