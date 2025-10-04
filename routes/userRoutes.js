import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const userRouter = express.Router();

// admin
userRouter.get('/admin', authMiddleware, authorizeRoles('admin'), (req, res) =>
  res.json({ message: 'admin route' })
);

// manger
userRouter.get(
  '/manager',
  authMiddleware,
  authorizeRoles('admin', 'manager'),
  (req, res) => res.json({ message: 'manager route' })
);

// user
userRouter.get(
  '/user',
  authMiddleware,
  authorizeRoles('admin', 'manager', 'user'),
  (req, res) => res.json({ message: 'user route' })
);

export default userRouter;
