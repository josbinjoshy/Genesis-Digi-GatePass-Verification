const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/apply-gatepass",(req,res)=>{

    const {
        student_id,
        destination,
        reason,
        out_date,
        out_time,
        expected_return
    } = req.body;


    const sql = `
    INSERT INTO gatepasses
    (
        student_id,
        destination,
        reason,
        out_date,
        out_time,
        expected_return
    )
    VALUES (?,?,?,?,?,?)
    `;


    db.query(
        sql,
        [
            student_id,
            destination,
            reason,
            out_date,
            out_time,
            expected_return
        ],

        (err,result)=>{

            if(err){
                console.log(err);
                return res.status(500)
                .json({
                    message:"Database error"
                });
            }


            res.json({
                message:"Gatepass applied successfully"
            });

        }
    );

});


app.listen(3000,()=>{
    console.log("Server running");
});
