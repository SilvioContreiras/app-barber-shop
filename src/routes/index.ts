import { Router } from 'express';

const routes = Router();

routes.post('/users', (req, res) => {
  const { name, age } = req.body;

  const user = {
    name,
    age,
  };

  return res.json(user);
});

export default routes;
