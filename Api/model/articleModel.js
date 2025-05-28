import { PrismaClient } from '../generated/prisma/client.js';
// Create Article
const prisma = new PrismaClient();
export async function createAticle(req, res){
  try {
    const { title, content, htmlContent } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const createdArticle = await prisma.article.create({
      data:{
        title:title,
        content:content,
        html_content: htmlContent
      }
    })    
      res.json(createdArticle);
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update Article
export async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, content, htmlContent } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [updatedArticle] = await prisma.article.update({
      where:{
        id:id
      },
      data:{
          title:title,
          content:content,
          html_content:htmlContent
      }
    })

    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(updatedArticle);
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete Article
export async function deleteArticle(req, res){
  try {
    const { id } = req.params;

    const deletedCount = await prisma.article.delete({
      where:{
        id:id
      }
    })

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Single Article
export async function getArticle(req, res)  {
  try {
    const { id } = req.params;

    const article = await db('articles')
      .where({ id })
      .first();

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

