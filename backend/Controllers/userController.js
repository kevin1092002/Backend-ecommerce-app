const { connect } = require("../Database/connect");
const signupUser = async(req,res) =>{
  const {username,password,email}=req.body;
  const connection =connect
  const sql = `INSERT INTO users(username,password,email) VALUES(?,?,?)`;
  connection.query(sql, [username, password,email], (error) => {
    if (error) {
      console.log('Error insert to sign up table:', error);
      res.status(500).json({'message':error.sqlMessage});
    } else {
      console.log('User registered:', username);
      res.status(200).json({'Registration successful':username});
    }
  });
}

const loginUser = async(req,res) =>{
  const {username,password}=req.body;
  const sql=`SELECT * FROM users WHERE username ='${username}' AND password = '${password}'  `
  const connection =connect
  connection.query(sql, (error,data) => {
    if (error) {
      console.log('Error signing in:', error);
      res.status(500).json({err:error.sqlMessage});
    }
    if(data.length===0){
      console.log('Incorrect username or password',);
      res.status(401).json({err:"Incorrect username or password"})
    } 
    else {
      console.log('User signed in:', username);
      console.log(data[0].account)
      res.status(200).json({username:data[0].username,account:data[0].account});
    }
  });
}

module.exports ={signupUser,loginUser}