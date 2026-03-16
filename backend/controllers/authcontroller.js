// Import database connection
const db = require("../config/db");

// Login function
exports.login = (req, res) => {

  const { username, password } = req.body;

  const query =
  "SELECT * FROM users WHERE username=? AND password=?";

  db.query(query,[username,password],(err,result)=>{

    if(err){
      return res.status(500).json(err);
    }

    if(result.length===0){
      return res.json({
        success:false,
        message:"Invalid login"
      });
    }

    res.json({
      success:true,
      user:result[0]
    });

  });

};