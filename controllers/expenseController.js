const Expense = require("../models/Expense");

exports.createExpense = async (req, res) => {
  try {
    const { date, category, amount1, amount2, remarks } = req.body;
    const receiptPath = req.file ? req.file.path : null;

    const expense = await Expense.create({
      date,
      category,
      amount1,
      amount2,
      remarks,
      receiptPath,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error creating expense", error });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};
