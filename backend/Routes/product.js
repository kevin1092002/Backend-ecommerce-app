const express = require("express");
const {
    get_all_item,
    get_item,
    search,
    edit,
    delete_,
    create
} = require("../Controllers/product_Controller");

const router = express.Router();

router.get("/items", get_all_item);

router.get("/item/:id", get_item);

router.get("/search/:searchValue",search)

router.put('/edit/:id', edit);
router.delete('/delete/:id', delete_);
router.post('/create_products', create);


module.exports = router;