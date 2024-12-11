const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Създаване на нова категория
router.post('/', async (req, res) => {
  const { name, description, parentCategory } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Моля, попълнете всички полета.' });
  }

  try {
    const newCategory = new Category({ name, description, parentCategory });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Неуспешно създаване на категория.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('parentCategory');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при извличане на категориите.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate('parentCategory');
    if (!category) {
      return res.status(404).json({ error: 'Категорията не е намерена.' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при извличане на категорията.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, parentCategory } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, parentCategory },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Категорията не е намерена.' });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Неуспешно актуализиране на категорията.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Категорията не е намерена.' });
    }
    res.json({ message: 'Категорията беше изтрита успешно.' });
  } catch (error) {
    res.status(500).json({ error: 'Неуспешно изтриване на категорията.' });
  }
});

module.exports = router;
