const { alterSync } = require('../db/sync');
const { postgresClient } = require("../db/postgres");
const { Op, Model } = require("sequelize");

const {User} = require('../models/user');
const {Caption} = require('../models/caption');
const {Commitment} = require('../models/commitment');
const {Nomination} = require('../models/nomination');
const {Poll} = require('../models/poll');
const {Vote} = require('../models/vote');
const {Like} = require('../models/like');
const { recordNewCaption } = require('./notifications');

const jwt = require("jsonwebtoken");
const Filter = require("bad-words");
const words = require("../bad-words.json");

// A person can write on someone's wall more than once, but EVERY quote is a request
// that the wall owner has to approve (being nominated does not skip approval).
// You can only have ONE request waiting at a time. Once it is approved (or declined)
// you can send another.
const sendRequest = async (req, res) => {
  try {
    const senderID = req.user.id;
    const targetID = req.body.targetId;

    var caption = req.body.caption;

    if (senderID == targetID) {
      return res.status(403).send({
        status: "failure",
        message: "You can't write for yourself",
      });
    }

    if (caption == null || String(caption).trim() === "") {
      console.log("[sendRequest Route] There is no caption sent");
      return res.status(400).send({
        status: "failure",
        message: "Please enter a quote",
      });
    }
    caption = String(caption).trim().slice(0, 1000);

    const target = await User.findByPk(targetID);

    if (!target) {
      console.log("The target user doesn't exist");
      return res.status(400).send({
        status: "failure",
        message: "The target User doesn't exist"
      });
    }

    // Only one request can be waiting for approval at a time.
    const pending = await Caption.findOne({where: {
      writerID: senderID,
      targetID: targetID,
      status: 0
    }});

    if (pending) {
      return res.status(409).send({
        status: "failure",
        message: "You already have a quote waiting for approval. You can send another once it's approved or declined.",
      });
    }

    const new_caption = await Caption.create({
      writerID: senderID,
      targetID: targetID,
      caption: caption,
      status: 0
    });

    // If the target had nominated the sender, this request answers that invitation,
    // so the "wants you to write a quote" card goes away.
    const nomination = await Nomination.findOne({where: {
      nominatorID: targetID,
      targetID: senderID,
      status: 0
    }});
    if (nomination) {
      nomination.status = 1;
      await nomination.save();
    }

    console.log("[sendRequest Route] Request sent succesfully: ", new_caption.toJSON());

    return res.status(200).send({
      status: "success",
      approved: false,
      message: "Request sent successfully!",
    });
  } catch (err) {
    console.log("[sendRequest Route] There was an erorr: ", err);

    return res.status(500).send({
      status: "failure",
      message: "There was an error, Please try after some time",
      error: err
    });
  }
};

const allRequests = async (req, res) => {
  try {
    console.log("[allRequests Route] This is the req.user: ", req.user);
    const senderID = req.user.id;

    const requests = await Caption.findAll({
      where: {
        [Op.and]: [
          {targetID: senderID},
          {status: 0}
        ]
      },
      include: {
        model: User,
        as: 'writer',
        attributes: ['name', 'bitsId', 'imageUrl', 'quote']
      }
    });

    const declined_requests = await Caption.findAll({where: {
      [Op.and]: [
        {targetID: senderID},
        {status: -1}
      ]
    }});

    console.log("The requests are: ", requests);
    console.log("The declined_requests are: ", declined_requests);

    return res.status(200).send({
      status: "success",
      requests: requests,
      declined_requests: declined_requests,
    });
  } catch (err) {
    console.log("[allRequests Route] There was an error: ", err);
    return res.status(500).send({
      status: "failure",
      message: "There was an error, Please try after some time",
      error: err
    });
  }
};

// Nominating someone also approves the caption they have waiting for you (if any).
const nominateUser = async (req, res) => {
  try {
    const senderID = req.user.id;
    const receiverID = req.body.receiverId;

    if (receiverID == senderID) {
      console.log("[nominateUser Route] You can't nominate yourself!!!");
      return res.status(403).send({
        status: "failure",
        message: "You can't nominate yourself",
      });
    }

    const target = await User.findByPk(receiverID);

    if (!target) {
      console.log("The target user doesn't exist");
      return res.status(403).send({
        status: "failure",
        message: "The target user doesn't exist"
      });
    }

    const nomination = await Nomination.findOne({where: {
      [Op.and]: [
        {nominatorID: senderID},
        {targetID: receiverID}
      ]
    }});

    // captions this person sent you that are still waiting for approval
    const pending = await Caption.findAll({where: {
      writerID: receiverID,
      targetID: senderID,
      status: 0
    }});

    if (nomination && pending.length === 0) {
      console.log("Target has already been nominated!!");
      return res.status(403).send({
        status: "failure",
        message: "You've already nominated this person (approving their quote request does this automatically).",
      });
    }

    const record = nomination || await Nomination.create({
      nominatorID: senderID,
      targetID: receiverID,
      status: 0
    });

    if (pending.length > 0) {
      for (const waiting of pending) {
        waiting.status = 1;
        await waiting.save();
        await recordNewCaption(waiting);
      }
      record.status = 1;
      await record.save();
      console.log("Caption updated to approved status.");
      return res.status(200).send({
        status: "success",
        message: "Target has been nominated and quote approved"
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Target has been nominated"
    });
  } catch (err) {
    console.log("[nominateUser Route] An error occurred: ", err);
    return res.status(400).send({
      status: "failure",
      message: "There was an error, please try again after sometime",
      error: err
    });
  }
};

const declineRequest = async (req, res) => {
  try {
    const senderID = req.user.id;
    const receiverID = req.body.receiverId;

    // only the caption that is waiting gets declined; earlier approved ones stay on the wall
    const [declined] = await Caption.update(
      { status: -1 },
      { where: { writerID: receiverID, targetID: senderID, status: 0 } }
    );

    if (declined === 0) {
      console.log("[declineRequest Route] The request or user doesn't exist anymore");
      return res.status(403).send({
        status: "failure",
        message: "The user or the request doesn't exist anymore"
      });
    }

    await Nomination.destroy({where: {
      [Op.and]: [
        {nominatorID: senderID},
        {targetID: receiverID}
      ]
    }});

    return res.status(200).send({
      status: "success",
      message: "The request was declined successfully"
    });
  } catch (err) {
    console.log("[declineRequest Route] There was an error: ", err);
    return res.status(400).send({
      status: "failure",
      message: "There was an error, Please try after some time",
      error: err
    });
  }
};

module.exports = { allRequests, nominateUser, declineRequest, sendRequest };
