import{ Router } from "express";
import { allowRoles } from "../middleware/role.js";
import { authMiddleware } from "../middleware/auth.js";
import { getMessCardView } from "../controller/card.controller.js";

const router = Router();

/**
 * @swagger
 * /api/mess/get-card-view:
 *   get:
 *     summary: Get mess card monthly view
 *     description: Returns mess card details for a student including active days, special meals, and subscriptions for a given month and year.
 *     tags: [Mess]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: Month (1-12)
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2026
 *         description: Year (e.g. 2026)
 *     responses:
 *       200:
 *         description: Mess card data fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   "student_id": 1,
 *                   "name": "Adarsh",
 *                   "card_id": 10,
 *                   "status": "ACTIVE",
 *                   "effective_open_date": "2026-02-01",
 *                   "effective_close_date": "2026-02-28",
 *                   "active_days_in_month": 28,
 *                   "special_meal_days": 3,
 *                   "total_special_plates": 5,
 *                   "subscriptions": "Milk (2026-02-01 to 2026-02-28)"
 *                 }
 *               ]
 *       400:
 *         description: Missing or invalid query parameters
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "error": "month and year are required"
 *               }
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       403:
 *         description: Forbidden (user is not a STUDENT)
 *       500:
 *         description: Server error
 */
router.get("/get-card-view" ,authMiddleware ,allowRoles("STUDENT") ,  getMessCardView);

export default router;