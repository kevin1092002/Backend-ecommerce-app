const { connect } = require("../Database/connect");
const get_all_item = async (req,res)=>  {
    const sql = "SELECT * FROM products";
    const connection = connect
    connection.query(sql, (err,data) => {
    if(err){ 
      console.log(err);
      res.status(500).json(err);
    }
    return res.status(200).json(data);
    });
}


const get_item = async(req,res) => {
    const id = req.params.id; // Extract the parameter from the route
    const sql = `
    SELECT * FROM products
    WHERE id = ?;
  `;
  const connection = connect

  connection.query(sql, [id], (error, results) => {
    if (error) {
      console.error('Error fetching paintings:', error);
      res.status(500).json({'Error occurred while fetching the paintings.':error.sqlMessage});
    } else {
      res.json(results);
    }
  });
}

const create = async(req, res)=> {
    const { name, des,pic_uri, price, color,category } = req.body;
    const connection = connect
  
    const sql = `INSERT INTO products (name, des,pic_uri, price, color,category) VALUES (?, ?, ?, ?, ?,?)`;
  
    connection.query(sql, [name, des,pic_uri, price, color,category], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error creating product', error: err });
        return;
      }
      res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    });
  };

const search =async(req,res)=>{
    const name=req.params.searchValue;
    const sql = `SELECT * FROM products WHERE name LIKE ?`;
    const connection = connect
    const search = `%${name}%`;
    connection.query(sql, [search], (error, data) => {
      if (error) {
        console.error('Error searching by name:', error);
        res.status(500).json({'Error occurred while searching.':error.sqlMessage});
      } else {
        console.log(data);
        res.json(data);
      }
    });
}

const edit = async(req,res) =>{
    const { id } = req.params;
    const { name, des,pic_uri, price, color } = req.body;
    const connection = connect
   
    const sql = `UPDATE products SET name = ?, des = ?, pic_uri = ?, price = ?, color = ? WHERE id = ?`;
  
    connection.query(sql, [name, des, pic_uri,price, color, id], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error updating product', error: err });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Product not found '+id });
        return;
      }
      res.status(200).json({ message: 'Product updated successfully' });
    });
}


const delete_=async (req,res)=>{
        const { id } = req.params;
        const connection = connect
        
      
        const sql = `DELETE FROM products WHERE id = ?`;
      
        connection.query(sql, [id], (err, result) => {
          if (err) {
            res.status(500).json({ message: 'Error deleting product', error: err });
            return;
          }
          if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
          }
          res.status(200).json({ message: 'Product deleted successfully' });
        });
      
}

module.exports ={
    delete_,
    edit,search,
    create,
    get_item,
    get_all_item}