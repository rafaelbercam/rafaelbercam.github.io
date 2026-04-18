const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const VALID_LANGS = ['pt', 'en'];
const VALID_SECTIONS = ['experience', 'education', 'certifications', 'skills', 'languages', 'volunteer'];

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and token generation
 *   - name: Curriculum
 *     description: CRUD operations for resume JSON content
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonalInfo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         title:
 *           type: string
 *         location:
 *           type: string
 *         email:
 *           type: string
 *         linkedin:
 *           type: string
 *         github:
 *           type: string
 *         lastUpdate:
 *           type: string
 *     CurriculumItem:
 *       type: object
 *       additionalProperties: true
 */

function getFilePath(lang) {
  if (!VALID_LANGS.includes(lang)) {
    return null;
  }
  return path.join(__dirname, '..', `../data-${lang}.json`);
}

async function readData(lang) {
  const filePath = getFilePath(lang);
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

async function writeData(lang, data) {
  const filePath = getFilePath(lang);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

router.use(authMiddleware);

/**
 * @swagger
 * /api/curriculum/{lang}:
 *   get:
 *     tags:
 *       - Curriculum
 *     summary: Get the full curriculum JSON for the requested language
 *     parameters:
 *       - name: lang
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pt, en]
 *     responses:
 *       200:
 *         description: Full curriculum data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/curriculum/:lang', async (req, res, next) => {
  try {
    const data = await readData(req.params.lang);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/curriculum/{lang}/{section}:
 *   get:
 *     tags:
 *       - Curriculum
 *     summary: Get a specific section from the curriculum
 *     parameters:
 *       - name: lang
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pt, en]
 *       - name: section
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [personal, experience, education, certifications, skills, languages, volunteer]
 *     responses:
 *       200:
 *         description: Section data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/curriculum/:lang/:section', async (req, res, next) => {
  try {
    const { lang, section } = req.params;
    const data = await readData(lang);

    if (section === 'personal') {
      return res.json(data.personal);
    }

    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }

    res.json(data[section]);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/curriculum/{lang}/personal:
 *   patch:
 *     tags:
 *       - Curriculum
 *     summary: Update the personal section of the curriculum
 *     parameters:
 *       - name: lang
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pt, en]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalInfo'
 *     responses:
 *       200:
 *         description: Updated personal info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PersonalInfo'
 */
router.patch('/curriculum/:lang/personal', async (req, res, next) => {
  try {
    const { lang } = req.params;
    const data = await readData(lang);
    data.personal = { ...data.personal, ...req.body };
    await writeData(lang, data);
    res.json(data.personal);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/curriculum/{lang}/{section}:
 *   post:
 *     tags:
 *       - Curriculum
 *     summary: Add a new item to a section
 *     parameters:
 *       - name: lang
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pt, en]
 *       - name: section
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [experience, education, certifications, skills, languages, volunteer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Section updated with new item
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post('/curriculum/:lang/:section', async (req, res, next) => {
  try {
    const { lang, section } = req.params;
    const data = await readData(lang);

    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }

    data[section].push(req.body);
    await writeData(lang, data);
    res.status(201).json(data[section]);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/curriculum/{lang}/{section}/{index}:
 *   put:
 *     tags:
 *       - Curriculum
 *     summary: Replace an item in a section by index
 *     parameters:
 *       - name: lang
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pt, en]
 *       - name: section
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [experience, education, certifications, skills, languages, volunteer]
 *       - name: index
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated section item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/curriculum/:lang/:section/:index', async (req, res, next) => {
  try {
    const { lang, section, index } = req.params;
    const itemIndex = Number(index);
    const data = await readData(lang);

    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }

    if (!Array.isArray(data[section]) || itemIndex < 0 || itemIndex >= data[section].length) {
      return res.status(404).json({ message: 'Item not found' });
    }

    data[section][itemIndex] = req.body;
    await writeData(lang, data);
    res.json(data[section][itemIndex]);
  } catch (error) {
    next(error);
  }
});

router.delete('/curriculum/:lang/:section/:index', async (req, res, next) => {
  try {
    const { lang, section, index } = req.params;
    const itemIndex = Number(index);
    const data = await readData(lang);

    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({ message: 'Invalid section name' });
    }

    if (!Array.isArray(data[section]) || itemIndex < 0 || itemIndex >= data[section].length) {
      return res.status(404).json({ message: 'Item not found' });
    }

    data[section].splice(itemIndex, 1);
    await writeData(lang, data);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
