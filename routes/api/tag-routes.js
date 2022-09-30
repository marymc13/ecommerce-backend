const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
 Tag.findAll({
  attribues: ['id', 'tag_name'],
  include:[
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  ]
 })
 .then((tags) => res.json(tags))
 .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
Tag.findOne ({
  where: {
    id: req.params.id
  },
  include: [ {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
  }
]
})
.then((tags) => res.json(tags))
.catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err)); 
});

module.exports = router;
