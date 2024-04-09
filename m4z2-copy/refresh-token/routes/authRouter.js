import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router()

router.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({email}, {_id: 1}).lean()
    if(user) {
        return res.status(409).json({message: "This email is already taken."})
    }
    try {
        const newUser = new User({username, email})
        await newUser.setPassword(password)
        await newUser.save()
        return res.status(201).json({ message: 'Created' })
    } catch (e) {
        next(e)
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!user) {
        return res.status(401).json({message: "No such user"})
    }
    const isPasswordCorrect = await user.validatePassword(password)
    if(isPasswordCorrect) {
        const payload = {
            id: user._id,
            username: user.username,
        };
        const token = jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: '20s'}
        )
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '30d'}
        );
        return res.json({token, refreshToken})
    } else {
        return res.status(401).json({message: "wrong password"})
    }
})

router.post('/refresh-token', async (req, res) => {
    const {email, refreshToken} = req.body;
    const user = await User.findOne({email})


    if(!user) {
        return res.status(401).json({message: "No such user"})
    }


    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }


    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const payload = {
            id: user._id,
            username: user.username,
        };


        const accessToken = jwt.sign(payload, process.env.SECRET, {expiresIn: '20s'});
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '30d'}
        );
        return res.json({ accessToken, refreshToken });
    });
})


export default router;