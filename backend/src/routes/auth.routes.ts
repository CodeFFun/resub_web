import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { authorizedMiddleware, adminOnlyMiddleware } from "../middleware/authorized.middleware";
import { uploads } from "../middleware/upload.middleware";

let authController = new AuthController();
const router = Router();

router.get("/profile", authController.getProfile)
// router.get("/users", authController.getAllUsers)
router.get("/users/:id", authController.getUserById)
router.get("/users/role/:role", authController.getUSersByRole)
router.post("/register", authController.register)
router.post("/login", authController.login)
router.patch("/update", authorizedMiddleware, uploads.single("profilePictureUrl"), authController.updateUser)
router.patch("/update-by-email", authController.updateUserByEmail);
router.post("/admin/create-users", authorizedMiddleware,adminOnlyMiddleware, authController.register);
router.get("/admin/users", authorizedMiddleware,adminOnlyMiddleware, authController.getAllUsers);
router.get("/admin/users/:id",authorizedMiddleware,adminOnlyMiddleware, authController.getUserById);
router.patch("/admin/update-users/:id", authorizedMiddleware,adminOnlyMiddleware, uploads.single("profilePictureUrl"), authController.updateUserByAdmin);

export default router;