const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const userRoutes = require("./Routes/user");
const productRoutes = require("./Routes/product");
const { connect } = require("./Database/connect");
app.use(cors());
app.use(express.json());



// Create a MySQL database connection (can be extend to do )
connect.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MARIADB');
  }
});
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


