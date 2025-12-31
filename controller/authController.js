import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 


export const registerUser = async (req, res) => {
    const {username, email, password, confirmpassword} = req.body;   
    try {
        if (password !== confirmpassword) {
            return res.status(400).json({message: 'Passwords do not match'});
        }
        const existingUser = await User.findOne({ $or: [ { username }, { email } ] });  
        if (existingUser) {
            return res.status(400).json({message: 'Username or email already exists'});
        }  else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword
            });
            await newUser.save();
            return  res.status(201).json({message: 'User registered successfully' });
        }                                 
    } catch (error) {
        return res.status(500).json({message: 'Server error'});
    }       
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;  
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }           
        else{
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({message: 'Invalid username or password'});
            } else {
                const token = jwt.sign(
                    {userId: user._id, username: user.username},
                    'your_jwt_secret',
                    {expiresIn: '1h'}
                );
                return res.status(200).json({message: 'Login successful', token});
            }       
        }
    } catch (error) {
        return res.status(500).json({message: 'Server error'});
    }   
}