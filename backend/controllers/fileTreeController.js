import File from '../models/File.js';

export const updateFileTree = async (req, res) => {

    const currentTree = req?.body?.tree || null;
    const id = req?.user?.id;

    if (!currentTree || !id) {
        return res.status(404).json({ success: false, message: 'No tree found' });
    }

    const usersFileTree = await File.findOne({userid: id }) || null;

    if (!usersFileTree) {
        return res.status(404).json({ success: false, message: 'No tree found' });
    }

    usersFileTree.tree = currentTree;

    await usersFileTree.save();

    res.send({
        success: true,
        updatedTree: usersFileTree.tree,
    });
};

export const getFileTree = async (req, res) => {

    const id = req?.user?.id || null;

    if (!id) {
        return res.status(404).json({ success: false, message: 'No tree found' });
    }

    const usersFileTree = await File.findOne({userid: id }) || null;

    if (!usersFileTree) {
        return res.status(404).json({ success: false, message: 'No tree found' });
    }

    res.send({
        success: true,
        currentTree: usersFileTree.tree,
    });
};