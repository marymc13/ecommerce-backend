const router = require('express').Router();
const { Category, Product } = require('../../models');

//find all categories
router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});
//find one category
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  ]
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err));
});
//create new category
router.post('/', (req, res) => {
  Category.create ({
    category_name: req.body.category_name
  })
  .then((categories) => res.json(categories))
  .catch((err) => res.status(500).json(err));
});
//update category
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});
//delete category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
});

module.exports = router;
