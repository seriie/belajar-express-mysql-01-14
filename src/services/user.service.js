import queryDb from "../helper/query.js"

export const getAllUsers = async () => {
    const rows = await queryDb("SELECT * FROM users");
    return rows;
}

export const getUsersById = async () => {
    const {id} = params.id

    const rows = await queryDb("SELECT * FROM users WHERE id = ?", id);
    return rows[0];
}