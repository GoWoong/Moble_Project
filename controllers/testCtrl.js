const connection = require('../dbConfig');

const testCtrl = {
    gettests : async (req,res) => {
        connection.query('SELECT * FROM test',(error,rows) =>{
            if(error) throw error;
            res.send(rows);
        })
    },
    inserttest : async (req,res) => {

        //javascript 구조분해할당
        const{data1,data2,data3,data4} = req.body;
        const sql = `INSERT INTO test(data1,data2,data3,data4)
        VALUES(${data1},${data2},${data3},${data4});`

        connection.query(
            sql,(error,rows) => {
                if(error) throw error;
                res.send(rows);
            }
        )

    }
}
module.exports = testCtrl;
