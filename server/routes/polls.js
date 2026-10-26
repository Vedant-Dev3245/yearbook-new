const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const {
  allPolls,
  getPoll,
  createPoll,
  updatePoll,
  deletePoll,
  votePoll,
  leaderboard,
} = require("../views/polls");

router.get("/leaderboard", leaderboard);
router.get("/", allPolls);
router.get("/:id", getPoll);
router.post("/", isAdmin, createPoll);
router.patch("/:id", isAdmin, updatePoll);
router.delete("/:id", isAdmin, deletePoll);
router.put("/:id/vote", votePoll);

module.exports = router;
