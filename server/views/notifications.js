const { Op } = require("sequelize");
const { Notification } = require("../models/notification");
const { Caption } = require("../models/caption");
const { User } = require("../models/user");
const { Nomination } = require("../models/nomination");

// A writer is notified when their caption reaches one of these like counts.
const LIKE_MILESTONES = [1, 5, 10, 25, 50, 100];

// ---- helpers called by other views (best effort: they never break the main action) ----

// Someone wrote a caption on `caption.targetID`'s wall.
const recordNewCaption = async (caption) => {
    try {
        await Notification.findOrCreate({
            where: { userID: caption.targetID, type: "new_caption", captionID: caption.captionID },
            defaults: { actorID: caption.writerID, count: 0 },
        });
    } catch (err) {
        console.log("[recordNewCaption] could not save notification: ", err.message);
    }
};

// A caption just got a like and now has `likeCount` likes.
const recordLikeMilestone = async (caption, likeCount) => {
    try {
        const reached = LIKE_MILESTONES.filter((m) => m <= likeCount).pop();
        if (!reached) return;

        const existing = await Notification.findOne({
            where: { userID: caption.writerID, type: "caption_like", captionID: caption.captionID },
        });

        // Only ever move forward, so liking/unliking repeatedly can't spam the writer.
        if (existing) {
            if (existing.count >= reached) return;
            existing.count = reached;
            existing.readAt = null;
            existing.changed("updatedAt", true); // push it back to the top of the list
            await existing.save();
        } else {
            await Notification.create({
                userID: caption.writerID,
                type: "caption_like",
                captionID: caption.captionID,
                count: reached,
            });
        }
    } catch (err) {
        console.log("[recordLikeMilestone] could not save notification: ", err.message);
    }
};

// ---- routes ----

// GET /notifications  -> the 30 most recent notifications for the logged-in user
const getNotifications = async (req, res) => {
    try {
        const rows = await Notification.findAll({
            where: { userID: req.user.id },
            order: [["updatedAt", "DESC"]],
            limit: 30,
            include: [
                { model: User, as: "actor", attributes: ["userID", "name", "bitsId"] },
                {
                    model: Caption,
                    as: "caption",
                    attributes: ["captionID", "targetID", "status"],
                    include: [{ model: User, as: "target", attributes: ["userID", "name"] }],
                },
            ],
        });

        // hide notifications about captions that are no longer visible on a wall
        const items = rows
            .filter((n) => n.caption && n.caption.status === 1)
            .map((n) => n.toJSON());

        // friends who nominated you and you haven't opened the tab since
        const nominationUnread = await Nomination.count({
            where: { targetID: req.user.id, status: 0, readAt: { [Op.is]: null } },
        });

        return res.status(200).send({
            status: "success",
            unreadCount: items.filter((n) => !n.readAt).length,
            nominationUnread,
            items,
        });
    } catch (err) {
        console.log("[getNotifications Route] There was an error: ", err);
        return res.status(500).send({
            status: "failure",
            message: "There was an error, Please try after some time",
        });
    }
};

// POST /notifications/read  -> mark everything as read
const markNotificationsRead = async (req, res) => {
    try {
        await Notification.update(
            { readAt: new Date() },
            { where: { userID: req.user.id, readAt: { [Op.is]: null } } }
        );
        await Nomination.update(
            { readAt: new Date() },
            { where: { targetID: req.user.id, readAt: { [Op.is]: null } } }
        );
        return res.status(200).send({ status: "success" });
    } catch (err) {
        console.log("[markNotificationsRead Route] There was an error: ", err);
        return res.status(500).send({
            status: "failure",
            message: "There was an error, Please try after some time",
        });
    }
};

module.exports = {
    LIKE_MILESTONES,
    recordNewCaption,
    recordLikeMilestone,
    getNotifications,
    markNotificationsRead,
};
