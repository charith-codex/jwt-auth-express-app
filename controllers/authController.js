import sql from '../configs/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`INSERT INTO users (name, email, password, role) VALUES (${name}, ${email}, ${hashedPassword}, ${role})`;

    res
      .status(201)
      .json({ message: 'User registered successfully', success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = users[0]

    if (!user) {
      return res
        .status(404)
        .json({ message: `user ${email} not found`, success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials', success: false });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
