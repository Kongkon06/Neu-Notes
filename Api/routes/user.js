import express from 'express';

const router = express.Router();

router.use(express.json());
router.use('/auth',()=>{});

module.exports = router
