var mysql = require('mysql'); //npm i


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307, 
  password: "",
  database: "chatbot_db"
});

con.connect(function(err) {
    if (err) throw err

});


function fetchChatReply(msg){
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM que_ans_tb WHERE que LIKE '%"+msg+"%'",
      [msg],
      (err, result) => {
        //return err ? reject(err) : resolve(result[0].ans);

        if (err){
          return reject(err);
        }else if(result.length == 0){
          
          return resolve("Sorry, Cannot get you.. :(");
        }else{
          return resolve(result[0].ans);
        }

      }
    );
  });
}



module.exports.fetchChatReply=fetchChatReply;