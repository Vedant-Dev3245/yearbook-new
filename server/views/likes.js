const { QueryTypes, UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
const { postgresClient } = require("../db/postgres");
const { Caption } = require("../models/caption");
const { Like } = require("../models/like");
const { recordLikeMilestone } = require("./notifications");

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Shared checks for like / unlike. Returns the caption, or sends the error response and returns null.
const findLikeableCaption = async (req, res) => {
    const { captionID } = req.params;

    if (!UUID_RE.test(captionID)) {
        res.status(400).send({ status: "failure", message: "Invalid quote" });
        return null;
    }

    const caption = await Caption.findByPk(captionID, {
        attributes: ["captionID", "writerID", "targetID", "status"],
    });

    // only captions that are actually visible on a wall (status 1 = accepted) can be liked
    if (!caption || caption.status !== 1) {
        res.status(404).send({ status: "failure", message: "Quote not found" });
        return null;
    }

    // you can't like what you wrote yourself
    if (caption.writerID === req.user.id) {
        res.status(403).send({ status: "failure", message: "You can't like your own quote" });
        return null;
    }

    return caption;
};

// PUT /profiles/captions/:captionID/like
// "Make sure I like this caption." Safe to repeat: liking twice still leaves exactly one like.
const likeCaption = async (req, res) => {
    try {
        const caption = await findLikeableCaption(req, res);
        if (!caption) return;

        let created = true;
        try {
            await Like.create({ userID: req.user.id, captionID: caption.captionID });
        } catch (err) {
            if (err instanceof UniqueConstraintError) created = false; // already liked, that's fine
            else throw err;
        }

        const likeCount = await Like.count({ where: { captionID: caption.captionID } });
        if (created) await recordLikeMilestone(caption, likeCount);

        return res.status(200).send({ status: "success", liked: true, likeCount });
    } catch (err) {
        if (err instanceof ForeignKeyConstraintError) {
            return res.status(401).send({ status: "failure", message: "Account not found, please log in again" });
        }
        console.log("[likeCaption Route] There was an error: ", err);
        return res.status(500).send({
            status: "failure",
            message: "There was an error, Please try after some time",
        });
    }
};

// DELETE /profiles/captions/:captionID/like
// "Make sure I don't like this caption." Also safe to repeat.
const unlikeCaption = async (req, res) => {
    try {
        const { captionID } = req.params;
        if (!UUID_RE.test(captionID)) {
            return res.status(400).send({ status: "failure", message: "Invalid quote" });
        }

        await Like.destroy({ where: { userID: req.user.id, captionID } });
        const likeCount = await Like.count({ where: { captionID } });

        return res.status(200).send({ status: "success", liked: false, likeCount });
    } catch (err) {
        console.log("[unlikeCaption Route] There was an error: ", err);
        return res.status(500).send({
            status: "failure",
            message: "There was an error, Please try after some time",
        });
    }
};

// Adds likeCount / likedByMe / canLike to a list of caption objects with ONE query,
// then orders them: most liked first, ties keep oldest first.
// If the likes table doesn't exist yet (not synced), the wall still loads with zero likes.
const decorateCaptions = async (captions, viewerID) => {
    if (!captions || captions.length === 0) return [];

    let stats = new Map();
    try {
        const rows = await postgresClient.query(
            `SELECT "captionID",
                    COUNT(*)::int AS "count",
                    COALESCE(BOOL_OR("userID" = :me), false) AS "mine"
             FROM ylike
             WHERE "captionID" IN (:ids)
             GROUP BY "captionID"`,
            {
                replacements: { me: viewerID, ids: captions.map((c) => c.captionID) },
                type: QueryTypes.SELECT,
            }
        );
        stats = new Map(rows.map((r) => [r.captionID, r]));
    } catch (err) {
        console.log("[decorateCaptions] could not load likes: ", err.message);
    }

    return captions
        .map((c) => {
            const s = stats.get(c.captionID);
            return {
                ...c,
                likeCount: s ? s.count : 0,
                likedByMe: s ? s.mine : false,
                canLike: c.writerID !== viewerID,
            };
        })
        .sort(
            (a, b) =>
                b.likeCount - a.likeCount ||
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
};

module.exports = { likeCaption, unlikeCaption, decorateCaptions };
