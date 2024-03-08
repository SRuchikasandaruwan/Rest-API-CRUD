const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample data
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// Read (GET) operation
app.get('/items', (req, res) => {
  res.json(items);
});

// Create (POST) operation
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Delete (DELETE) operation
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.status(204).end();
});

// Update (PUT) operation
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  items = items.map(item => (item.id === itemId ? updatedItem : item));
  res.json(updatedItem);
});

// Update (PATCH) operation
app.patch('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedProps = req.body;
  const itemIndex = items.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    items[itemIndex] = { ...items[itemIndex], ...updatedProps };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
