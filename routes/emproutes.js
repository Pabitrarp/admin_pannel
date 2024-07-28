const express = require('express');
const empcontroller = require('../controller/empcontroller');
const { upload } = require('../middleware/multermiddleware'); // Adjust the path if necessary
const router = express.Router();

router.post("/empsignup", upload.single('image'), empcontroller.emp_signup);
router.get("/emplist",empcontroller.get_allemp);
router.get("/count",empcontroller.countemp);
router.delete('/emplist/:id',empcontroller.deleteEmployee);
router.put('/emplist/:id', upload.single('image'), empcontroller.updateEmployee);
module.exports = router;
