const pool = require("../db");

// ======================================================
//  1. GET NO OF ACTIVE CARDS (DATE-WISE)
// ======================================================
exports.getActiveCards = async (req, res) => {
  try {
    const { date } = req.query;

    const query = `
      SELECT 
        COUNT(*) AS total_cards,
        SUM(
          CASE 
            WHEN open_date <= ? 
             AND (close_date IS NULL OR close_date >= ?) 
            THEN 1 ELSE 0 
          END
        ) AS active_cards
      FROM mess_card;
    `;

    const [rows] = await pool.query(query, [date, date]);

    return res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  2. NET CARD (TOTAL / OPEN / CLOSED)
// ======================================================
exports.getNetCard = async (req, res) => {
  try {
    const query = `
      SELECT 
        COUNT(*) AS total_cards,
        SUM(close_date IS NULL) AS open_cards,
        SUM(close_date IS NOT NULL) AS closed_cards
      FROM mess_card;
    `;

    const [rows] = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  3. GET RATION SUMMARY
// ======================================================
exports.getRation = async (req, res) => {
  try {
    const query = `
      SELECT date, SUM(normal_expense) AS total_expense
      FROM daily_expense
      GROUP BY date
      ORDER BY date DESC;
    `;

    const [rows] = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  4. ADD RATION CONSUMPTION
// ======================================================
exports.addRationConsumption = async (req, res) => {
  try {
    const { hostel_id, date, normal_expense } = req.body;

    const query = `
      INSERT INTO daily_expense (hostel_id, date, normal_expense)
      VALUES (?, ?, ?);
    `;

    await pool.query(query, [hostel_id, date, normal_expense]);

    return res.status(201).json({
      success: true,
      message: "Ration consumption added"
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  5. SPECIAL MEAL SUMMARY
// ======================================================
exports.getSpecialMealSummary = async (req, res) => {
  try {
    const query = `
      SELECT special_id, date, meal_name, total_cost, total_plates
      FROM special_meal
      ORDER BY date DESC;
    `;

    const [rows] = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  6. CREATE SPECIAL MEAL
// ======================================================
exports.createSpecialMeal = async (req, res) => {
  try {
    const { hostel_id, date, meal_name, total_cost, total_plates } = req.body;

    const query = `
      INSERT INTO special_meal (hostel_id, date, meal_name, total_cost, total_plates)
      VALUES (?, ?, ?, ?, ?);
    `;

    await pool.query(query, [
      hostel_id,
      date,
      meal_name,
      total_cost,
      total_plates
    ]);

    return res.status(201).json({
      success: true,
      message: "Special meal created"
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  7. GET SPECIAL MEALS
// ======================================================
exports.getSpecialMeals = async (req, res) => {
  try {
    const query = `SELECT * FROM special_meal ORDER BY date DESC`;

    const [rows] = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  8. ADD STUDENT TO SPECIAL MEAL
// ======================================================
exports.addSpecialMealStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, plates_taken } = req.body;

    const query = `
      INSERT INTO special_meal_student (special_id, student_id, plates_taken)
      VALUES (?, ?, ?);
    `;

    await pool.query(query, [id, student_id, plates_taken]);

    return res.status(201).json({
      success: true,
      message: "Student added to special meal"
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  9. ADD WEEKLY EXPENSE
// ======================================================
exports.addWeeklyExpense = async (req, res) => {
  try {
    const { hostel_id, date, normal_expense } = req.body;

    const query = `
      INSERT INTO daily_expense (hostel_id, date, normal_expense)
      VALUES (?, ?, ?);
    `;

    await pool.query(query, [hostel_id, date, normal_expense]);

    return res.status(201).json({
      success: true,
      message: "Weekly expense added"
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
//  10. GET WEEKLY EXPENSE
// ======================================================
exports.getWeeklyExpense = async (req, res) => {
  try {
    const query = `
      SELECT 
        YEAR(date) AS year,
        WEEK(date) AS week,
        SUM(normal_expense) AS total_expense
      FROM daily_expense
      GROUP BY YEAR(date), WEEK(date)
      ORDER BY year DESC, week DESC;
    `;

    const [rows] = await pool.query(query);

    return res.status(200).json({
      success: true,
      data: rows
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};