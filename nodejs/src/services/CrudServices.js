import db, { sequelize } from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await hashPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hash,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === 1 ? "Male" : "Female",
                roleId: data.roleId
            })
            resolve("create new user success");
        } catch (e) {
            reject(e);
        }
    })
}


let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll();
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
    /* //cách dùng raw queries
    let users = await sequelize.query("select * from users");
    return users; */
}
let getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne(
                {
                    where: { id: id }
                }
            );
            users ? resolve(users) : resolve({});
        } catch (e) {
            reject(e);
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address
                },
                {
                    where: { id: data.id }
                }
            )
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy(
                {
                    where: { id: id }
                }
            )
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
export { createNewUser, getAllUser, getDetailUser, updateUser, deleteUser }