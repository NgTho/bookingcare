import db from "../models/index";
import {
    createNewUser,
    getAllUser,
    getDetailUser,
    updateUser,
    deleteUser
}
    from "../services/CrudServices";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        //console.log(data);
        return res.render("homepage.ejs", { data: JSON.stringify(data) })
    } catch (e) {
        console.log(e);
    }
    //return res.send("Hello");
}
let getCrud = (req, res) => {
    return res.render("crud.ejs");
}
let postCrud = async (req, res) => {
    await createNewUser(req.body);
    return res.redirect("/get-crud");
}
let displayCrud = async (req, res) => {
    let data = await getAllUser();
    //console.log(data);
    return res.render("displayCrud.ejs", { data: data });
}
let editCrud = async (req, res) => {
    let id = req.params.id;
    if (id) {
        let data = await getDetailUser(id);
        //console.log(data);
        return res.render("editCrud.ejs", { data: data });
    } else {
        return res.send("User not found");
    }
}
let updateCrud = async (req, res) => {
    let data = req.body;
    //console.log(data);
    if (data) {
        await updateUser(data);
        return res.redirect("/get-crud");
    } else {
        return res.send("User not found");
    }
}
let deleteCrud = async (req, res) => {
    let id = req.params.id;
    //console.log(data);
    if (id) {
        await deleteUser(id);
        return res.redirect("/get-crud");
    } else {
        return res.send("User not found");
    }
}
export { getHomePage, getCrud, postCrud, displayCrud, editCrud, updateCrud, deleteCrud }