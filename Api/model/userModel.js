import auth from '../middleware/utils.js'
import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();
async function adminCr(req,res){
  try{
    const { username,password } = req.body;
    if(!username || !password){
      res.status(400).json({msg:'Missing required fields'});
    }
    const existingUser = await prisma.user.findMany(); 
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists',existingUser });
    }

    const hashedPassword = await auth.hashPassword(password); 

    const createdUser = await prisma.user.create({
      data:{
        username : username,
        password_hash : hashedPassword
      }
    });
    res.status(201).json({ id: createdUser.id, email: createdUser.email });
  }catch(error){
    res.status(500);
  }
}

async function login(req, res){
  try {
    const { username, password } = req.body;
    
    const user = await prisma.user.findMany({
      where:{
          username:username
      }
    })
    if (!user || !(await auth.comparePassword(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokens = auth.generateTokens(user);
    
    // Store refresh token
    await db('refresh_tokens').insert({
      user_id: user.id,
      token: tokens.refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function refershToken(req, res){
  try {
    const { refreshToken } = req.body;
    
    const decoded = await auth.verifyRefreshToken(refreshToken);
    const storedToken = await db('refresh_tokens')
      .where({ token: refreshToken, revoked: false })
      .first();

    if (!storedToken || new Date(storedToken.expires_at) < new Date()) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const user = await db('users').where({ id: decoded.userId }).first();
    if (!user) return res.status(401).json({ error: 'User not found' });

    const newTokens = auth.generateTokens(user);
    
    // Update refresh token
    await db('refresh_tokens')
      .where({ id: storedToken.id })
      .update({ revoked: true });

    await db('refresh_tokens').insert({
      id: uuidv4(),
      user_id: user.id,
      token: newTokens.refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.json({
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken
    });
    
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export default {
  adminCr,login,refershToken
}
