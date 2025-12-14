import logger from '#config/logger.js';
import { signupSchema, signinSchema } from '#validations/auth.validation.js';
import { formatValidationError } from '#utils/format.js';
import { createUser, authenticateUser } from '#services/auth.service.js';
import { jwttoken } from '#utils/jwt.js';

export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { name, email, password, role } = validationResult.data;

    const newUser = await createUser({ name, email, password, role });

    logger.info(`User ${email} signed up successfully`);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    logger.error('Signup error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const validationResult = signinSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { email, password } = validationResult.data;

    const user = await authenticateUser({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwttoken.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    logger.info(`User ${email} signed in successfully`);

    res.status(200).json({
      message: 'Sign in successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Sign in error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signOut = async (req, res, next) => {
  try {
    // For JWT, sign out is handled client-side by removing the token
    res.status(200).json({ message: 'Sign out successful' });
  } catch (error) {
    logger.error('Sign out error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
