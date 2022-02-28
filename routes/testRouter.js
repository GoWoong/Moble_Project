const testCtrl = require("../controllers/testCtrl")
const router = require("express").Router();

router.route('/')
.get(testCtrl.gettests)
.post(testCtrl.inserttest)

module.exports=router