import express, { Router } from "express";
import authController from "../../../../adapters/controller/user/userAuthController";
import { userDbRepository } from "../../../../application/repositories/user/userRepositoryInf";
import { userRepositoryMongoDB } from "../../../database/mongodb/repositories/user/userAuthRepositoryImp";
import { AuthServiceInterface } from "../../../../application/services/user/userAuthServiceInt";
import { authServices } from "../../../services/user/userAuthServiceImp";

const authRouter = (): Router => {
  const router = express.Router();
  const controllers = authController(
    AuthServiceInterface,
    authServices,
    userDbRepository,
    userRepositoryMongoDB
  );

  router.post("/sign-up", controllers.registerUser);

  router.post("/sign-in", controllers.loginUser);

  router.post("/google", controllers.googleUser);

  router.get('/verify-google-user/:email',controllers.verifyGoogleUser)

  router.put('/:userId',controllers.updateUser);

  router.get('/forgot-password/:email',controllers.emailCheck)

  router.put('/new-password/:email',controllers.newPassword)

  router.get("/:friendId", controllers.getUser);

  router.get('/profile/:userId',controllers.getProfile);

  router.get('/:userId/user',controllers.getUserDetails);

  router.get('/:name/search',controllers.searchUser)

  return router;
};

export default authRouter;
