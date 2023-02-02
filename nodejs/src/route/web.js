import express from "express";
import {
    getHomePage,
    getCrud,
    postCrud,
    displayCrud,
    editCrud,
    updateCrud,
    deleteCrud
} from "../controller/homeController";
let router = express.Router();
let initWebRouter = (app) => {
    router.get("/", getHomePage);
    router.get("/crud", getCrud);
    router.post("/post-crud", postCrud);
    router.get("/get-crud", displayCrud);
    router.get("/edit-crud/:id", editCrud);
    router.post("/update-crud", updateCrud);
    router.get("/delete-crud/:id", deleteCrud);
    return app.use("/", router)
}
export { initWebRouter }