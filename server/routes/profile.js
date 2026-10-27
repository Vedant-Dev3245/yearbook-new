const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const { 
    addProfile, 
    getProfile, 
    editProfile, 
    writeCaption, 
    searchUsers, 
    searchAllUsers,
    deleteProfile 
} = require("../views/profile");
const { likeCaption, unlikeCaption } = require("../views/likes");

router.put("/captions/:captionID/like", likeCaption);
router.delete("/captions/:captionID/like", unlikeCaption);
router.get("/search", searchUsers);
router.get("/searchall", searchAllUsers);
router.post("/:id/caption", writeCaption);
router.get("/:id", getProfile);
router.post("/", addProfile);
router.patch("/edit", editProfile);
router.delete("/:id", isAdmin, deleteProfile);

module.exports = router;