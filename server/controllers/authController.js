const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id, role) => {
    return jwt.sign({ id: id, role: role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role || "user",
    });

    const token = signToken(newUser._id, newUser.role);

    const userWithoutRole = newUser.toObject(); 
    delete userWithoutRole.role;

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: userWithoutRole,
        },
    });
})


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email}).select("+password").select("+role");

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = signToken(user._id, user.role);

    res.status(200).json({
        status: 'success',
        token,
    })
})

exports.userInformation = catchAsync(async (req, res, next) => {
    
    const user = await User.findById(req.params.id).select("-password");
    if(!user) {
        return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
})


exports.protect = catchAsync(async (req, res, next) => {
    //? 1) Getting token and checking if it's there
    let token;

    //? Check if the authorization header exists and starts with "Bearer "
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; //? Extract the token after 'Bearer'
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    //? 2) Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    //? 3) Check if user still exists
    const currentUser = await User.findById(decoded.id); //? Find the user by the ID decoded from the token
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    req.user = currentUser; //? Attach the user to the request object for further use in the application
    next(); 
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        //? roles ['admin', 'lead-guide']. role='user'
        
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next()
    }
}
