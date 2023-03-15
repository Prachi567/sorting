const express = require('express')
const app = express()
const mysql = require('mysql2')

app.set('view engine','ejs')


const conn = mysql.createConnection({

    
            host:"localhost",
            user:'root',
            password:'root',
            database:'StudentDB'
})

conn.connect((err) =>
{
   if(err)
   {
    console.log("error");
   }
   console.log("succeed");
})

// /:page -> req.params.page
// /page?no=4 -> req.query.no

app.get('/page',(req,res)=>
{
    var v1 = parseInt(req.query.no) || 1;
    var sort = req.query.sort || 'sd_id';
    var order = req.query.order || 'asc';
    var limit1 = 100;
    var offset = (v1 - 1) * limit1;
    var sql = `select * from student_express order by ${sort}  ${order} limit ${offset},${limit1}`;
    conn.query(sql,(err,data) =>
    {
        if(err) throw err;

        var count = "select count(sd_id) as x from student_express";

    conn.query(count,(err,result) =>   
    {
        if(err) throw err;

        var prachi = result[0].x;
        var div = Math.floor(prachi/limit1) + 1;
        console.log(v1);
        
        res.render('index4.ejs',{data,div,v1,sort,order});
    });
    })

   
    
});

app.listen(3700);
