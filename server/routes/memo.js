var express = require("express");
var router = express.Router();
const memoController = require("../controllers/memoController");

router.get("/", memoController.readAll);
router.post("/", memoController.write);
//테스트용
router.get("/:memoId", memoController.readOne);
router.put("/:memoId", memoController.update);
router.delete("/:memoId", memoController.delete);

module.exports = router;
