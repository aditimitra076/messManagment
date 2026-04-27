const pool = require("../db"); // adjust path if needed

// ======================================================
//  1. NO OF ACTIVE CARDS (DATE-WISE)
// ======================================================
const getActiveCards = async (req, res) => {
  try {
    const { date } = req.query;

    const query = `
      SELECT 
        COUNT(*) AS total_cards,
        SUM(CASE 
              WHEN open_date <= ? 
               AND (close_date IS NULL OR close_date >= ?) 
              THEN 1 ELSE 0 
        END) AS active_cards
      FROM mess_card;
    `;

    const [rows] = await pool.query(query, [date, date]);
    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  2. NET CARD (TOTAL / OPEN / CLOSED)
// ======================================================
const getNetCard = async (req, res) => {
  try {
    const query = `
      SELECT 
        COUNT(*) AS total_cards,
        SUM(close_date IS NULL) AS open_cards,
        SUM(close_date IS NOT NULL) AS closed_cards
      FROM mess_card;
    `;

    const [rows] = await pool.query(query);
    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  3. RATION SUMMARY
// ======================================================
const getRation = async (req, res) => {
  try {
    const query = `
      SELECT date, SUM(normal_expense) AS total_expense
      FROM daily_expense
      GROUP BY date
      ORDER BY date DESC;
    `;

    const [rows] = await pool.query(query);
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  4. ADD RATION CONSUMPTION
// ======================================================
const addRationConsumption = async (req, res) => {
  try {
    const { hostel_id, date, normal_expense } = req.body;

    const query = `
      INSERT INTO daily_expense (hostel_id, date, normal_expense)
      VALUES (?, ?, ?);
    `;

    await pool.query(query, [hostel_id, date, normal_expense]);

    res.json({ message: "Ration added successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  5. SPECIAL MEAL SUMMARY
// ======================================================
const getSpecialMealSummary = async (req, res) => {
  try {
    const query = `
      SELECT date, meal_name, total_cost, total_plates
      FROM special_meal
      ORDER BY date DESC;
    `;

    const [rows] = await pool.query(query);
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  6. SPECIAL MEAL POLL (CREATE)
// ======================================================
const createSpecialMealPoll = async (req, res) => {
  try {
    const { hostel_id, date, meal_name, total_cost, total_plates } = req.body;

    const query = `
      INSERT INTO special_meal (hostel_id, date, meal_name, total_cost, total_plates)
      VALUES (?, ?, ?, ?, ?);
    `;

    await pool.query(query, [hostel_id, date, meal_name, total_cost, total_plates]);

    res.json({ message: "Special meal created" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  7. GET SPECIAL MEAL
// ======================================================
const getSpecialMeal = async (req, res) => {
  try {
    const query = `SELECT * FROM special_meal ORDER BY date DESC`;
    const [rows] = await pool.query(query);
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  8. ADD SPECIAL MEAL STUDENT ENTRY
// ======================================================
const addSpecialMealStudent = async (req, res) => {
  try {
    const { id } = req.params; // special_id
    const { student_id, plates_taken } = req.body;

    const query = `
      INSERT INTO special_meal_student (special_id, student_id, plates_taken)
      VALUES (?, ?, ?);
    `;

    await pool.query(query, [id, student_id, plates_taken]);

    res.json({ message: "Student added to special meal" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  9. ADD WEEKLY EXPENSE
// ======================================================
const addWeeklyExpense = async (req, res) => {
  try {
    const { hostel_id, date, normal_expense } = req.body;

    const query = `
      INSERT INTO daily_expense (hostel_id, date, normal_expense)
      VALUES (?, ?, ?);
    `;

    await pool.query(query, [hostel_id, date, normal_expense]);

    res.json({ message: "Weekly expense added" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
//  10. GET WEEKLY EXPENSE
// ======================================================
const getWeeklyExpense = async (req, res) => {
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
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================================================
// EXPORT ALL
// ======================================================
module.exports = {
  getActiveCards,
  getNetCard,
  getRation,
  addRationConsumption,
  getSpecialMealSummary,
  createSpecialMealPoll,
  getSpecialMeal,
  addSpecialMealStudent,
  addWeeklyExpense,
  getWeeklyExpense
};