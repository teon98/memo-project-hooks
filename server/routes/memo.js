var express = require("express");
var router = express.Router();
const memoController = require("../controllers/memoController");

router.get("/", memoController.findAll);
router.post("/", memoController.write);
router.get("/:memoID", memoController.readOne);
router.put("/:memoID", memoController.update);
router.delete("/:memoID", memoController.delete);
module.exports = router;
