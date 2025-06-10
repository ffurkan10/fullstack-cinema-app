const Menu = require('../models/menuModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


// Create a new menu item
exports.createMenuItem = catchAsync(async (req, res, next) => {
    const newMenuItem = await Menu.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            menuItem: newMenuItem
        }
    });
});

// Get all menu items
exports.getAllMenuItems = catchAsync(async (req, res, next) => {
    const menuItems = await Menu.find();
    res.status(200).json({
        status: 'success',
        results: menuItems.length,
        data: {
            menuItems
        }
    });
});

// delete menu item
exports.deleteMenuItem = catchAsync(async (req, res, next) => {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!menuItem) {
        return next(new AppError('No menu item found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: menuItem
    });
});

// Update a menu item
exports.updateMenuItem = catchAsync(async (req, res, next) => {
    const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!menuItem) {
        return next(new AppError('No menu item found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            menuItem
        }
    });
});