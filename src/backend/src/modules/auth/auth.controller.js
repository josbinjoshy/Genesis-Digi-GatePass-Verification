import { authService } from './auth.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const authController = {
  register: asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: result,
    });
  }),

  login: asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  }),

  getProfile: asyncHandler(async (req, res) => {
    // req.user is attached by the `authenticate` middleware (next files)
    const profile = await authService.getProfile(req.user.userId);
    res.status(200).json({
      success: true,
      data: profile,
    });
  }),
};
