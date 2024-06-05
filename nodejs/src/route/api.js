import express from "express";
import {
    handleLogin,
    getAllUser,
    createUser,
    editUser,
    deleteUser,
    getAllCode,
} from "../controller/userController"
import {
    getRole,
    createMarkdown,
    getDetail,
    bulkCreateSchedule,
    getSchedule
} from "../controller/doctorController"
let router = express.Router();

const initApiRouter = (app) => {
    router.post('/login', handleLogin);
    router.get('/get-all-user', getAllUser);
    router.post('/create-user', createUser);
    router.put('/edit-user', editUser);
    router.delete('/delete-user', deleteUser);
    router.get('/allcode/:type', getAllCode);
    router.post('/get-role', getRole);
    router.post('/create-markdown', createMarkdown);
    router.get('/get-detail/:id', getDetail);
    router.post('/bulk-create-schedule', bulkCreateSchedule);
    router.get('/get-schedule/:id/:date', getSchedule);
    return app.use('/api/', router);
}
export { initApiRouter };