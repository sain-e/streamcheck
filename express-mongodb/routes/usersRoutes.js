import { Router } from 'express';
import { ObjectId } from 'mongodb';

const router = Router();
const COLLECTION_NAME = 'users';

// GET /api/v1/users
router.get('/', async (req, res) => {
    try {
        const db = req.app.locals.db; // get db instance from app.locals
        const users = await db.collection(COLLECTION_NAME).find().toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET /api/v1/users/:id
router.get('/:id', async (req, res) => {
    try {
        const db = req.app.locals.db; // get db instance from app.locals
        const id = req.params.id;

        const user = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST 
/* 
router.post('/', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const response = await db.collection(COLLECTION).find().toArray();  
        res.json(response); 
    } catch (error) {
        console.error("Error fetching pedidos:", error); 
        res.status(500).json({ error: "Failed to fetch pedidos" });
    }
}); */


router.delete('/:id', async (req, res) => {
  /*try {
    // You can implement your delete logic here, example:
    const db = req.app.locals.db;
    const id = req.params.id;

    // If your id is ObjectId, import ObjectId from mongodb and convert
    // import { ObjectId } from 'mongodb';
    // const result = await db.collection('productos').deleteOne({ _id: new ObjectId(id) });

    // For now, just dummy response:
    res.json({ message: `DELETE producto with id: ${id}` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: 'Failed to delete user' });
  }*/
});

export default router;