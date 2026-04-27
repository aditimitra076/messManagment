export const messDocs = `
/**
 * @openapi
 * /api/mess/net-card:
 *   get:
 *     tags:
 *       - Mess
 *     summary: Get total open and closed cards
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @openapi
 * /api/mess/no-of-active-cards:
 *   get:
 *     tags:
 *       - Mess
 *     summary: Get active cards by date
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @openapi
 * /api/mess/ration:
 *   get:
 *     tags:
 *       - Mess
 *     summary: Get ration summary
 */

/**
 * @openapi
 * /api/mess/ration-consumption:
 *   post:
 *     tags:
 *       - Mess
 *     summary: Add ration consumption
 */
`;