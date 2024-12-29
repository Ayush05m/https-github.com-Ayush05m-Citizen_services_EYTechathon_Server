import Scheme from '../../models/Scheme.js';

export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find()
      .select('-__v')
      .sort('-createdAt');
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schemes' });
  }
};

export const createScheme = async (req, res) => {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ message: 'Error creating scheme' });
  }
};

export const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: 'Error updating scheme' });
  }
};

export const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }
    res.json({ message: 'Scheme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting scheme' });
  }
};

export const getSchemeStats = async (req, res) => {
  try {
    const stats = await Scheme.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};