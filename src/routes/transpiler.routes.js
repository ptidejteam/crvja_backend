import express from 'express';
import { transpileCode } from '#root/src/controllers/transpiler.controller.js';

const router = express.Router();
 
// The base path (e.g., /api/transpile) is defined in app.js
router.post('/', transpileCode);

export default router;