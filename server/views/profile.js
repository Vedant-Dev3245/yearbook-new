const { alterSync } = require('../db/sync');
const { postgresClient } = require("../db/postgres");
const { Op, Model } = require("sequelize");

const {User} = require('../models/user');
const {Caption} = require('../models/caption');
const {Commitment} = require('../models/commitment');
const {Nomination} = require('../models/nomination');
const {Poll} = require('../models/poll');
const {Vote} = require('../models/vote');
const { decorateCaptions } = require('./likes');
const { recordNewCaption } = require('./notifications');
const { sendRequest } = require('./nominations');
const { Like } = require('../models/like');

const jwt = require("jsonwebtoken");
const Filter = require("bad-words");
const words = require("../bad-words.json");

const addProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      console.log("[addProfile Route] User already exists: ", user.userID);
      return res.status(400).send({
        status: "failure",
        message: "User Exists Already",
      });
    } else {

      // Formatting the BITS ID and extracting branches:

      const bitsId = req.body.id;

      const stringyear = bitsId.substring(0,4);
      const year = Number(stringyear);

      let senior = false;

      if(year<=2023){
        senior = true;
      }

      if(req.body.email.substring(0,5) == "h2025"){
        senior = true;
      }

      let branchCode = bitsId.substring(4, bitsId.length - 4);

      if (branchCode.includes("B")) {
        branchCode = [branchCode.substring(0, 2), branchCode.substring(2, 4)];
      } else if ((branchCode[0] = "A")) {
        branchCode = [branchCode.substring(0, 2)];
      } else {
        branchCode = [branchCode];
      }

      // Quote Filtering:

      var quote = (req.body.quote || "").toString().trim().slice(0, 140);
      // Creating the user:

      const user = await User.create({
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
        bitsId: bitsId,
        personalEmail: req.body.pEmail,
        phone: req.body.phone,
        quote: quote,
        branchCode: branchCode,
        imageUrl: req.body.imgUrl,
        senior: senior
      });

      // Creating a JWT token for the created user:

      const token = jwt.sign({ 
        id: user.userID, 
        bitsID: user.bitsId, 
        email: user.email, 
        branchCode: user.branchCode,
        senior: senior
      },
        process.env.TOKEN_KEY,
        { 
          expiresIn: "180d" 
        }
      );

      // // Dev Testing: 

      // console.log("The user is created: ", user.toJSON());
      // console.log("The JWT token is: ", token);

      // adding Commitments for the user: 

      const commitments = req.body.commitments;
      if (!commitments) {
          console.log("[addProfile Route] Commitments body data is empty");
      }else{
        await user.setCommitments([]);
        for(const returncommitment of commitments){
          console.log("[settingCommitments] This is the current commitment: ", returncommitment);
          let commitment = await Commitment.findOne({where: {commitment_name: returncommitment}})
          await user.addCommitment(commitment);
        }
      }

      return res.status(200).send({
        message: "Profile created",
        id: user.userID,
        token: token,
      });
    }
  } catch (err) {
    console.log("[addProfile Route] There was an error: ", err);
    return res.status(500).send({
      status: "failure",
      msg: "There was an error, Please try after some time",
      error: err
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findByPk(userID);

    if(!user){
      console.log("[editProfile Route] User not found");
      return res.status(400).send({
        status: "failure",
        message: "User not found"
      })
    }
  
    const imgUrl = req.body.imgUrl;
    var quote = (req.body.quote || "").toString().trim().slice(0, 140);
  
    if (imgUrl !== null) {
      user.imageUrl = imgUrl;
    }
    
    if(quote){
      if (quote !== "") {
        user.quote = quote;
      }
    }
  
    await user.save();
    console.log("User updated succesfully, user: ", user);
    return res.status(200).send({
      status: "success",
      message: "Successfully Updated",
      user: user.toJSON()
    });

  }catch (error) {
    console.log("[editProfile Route] An error has occurred: ", error);
    return res.status(400).send({
      status: "failure",
      message: "[editProfile Route] There was an error, Please try after some time",
      error: error
    });
  };
};

const getProfile = async (req, res) => {
  try {
    const userID = req.params.id
    const user = await User.findByPk(userID, {
      attributes: ['userID', 'imageUrl', 'name', 'bitsId', 'quote', 'email', 'personalEmail', 'phone', 'branchCode', 'senior'],
      include: [{
        required: false,
        model: Caption,
        as: 'captions',
        where: {
          status: 1,
        },
        include: [{
          model: User,
          as: 'writer',
          attributes: ['userID', 'name', 'bitsId', 'imageUrl']
        }
        ]},
        {
          required: false,
          model: Nomination,
          as: 'nominatedby',
          where: {
            status: 0
          },
          include: [{
            model: User,
            as: 'nominator'
          }]
        },
        {
          required: false,
          model: Commitment,
          as: 'commitments',
          attributes: ['commitment_name', 'commitment_imageUrl'],
          include:{
            required: false,
            model: User,
            as: 'members',
            where: {
              senior: true
            },
            attributes: ['userID', 'name', 'bitsId']
          }
        }
      ]
    });

    if (!user) {
      console.log("[getProfile Route] The user doesn't exist");
      return res.status(400).send({
        status: "failure",
        message: "User does not exist"
      });
    }

    const profile = user.toJSON();
    profile.captions = await decorateCaptions(profile.captions, req.user.id);

    return res.status(200).send(profile);
  } catch (err) {
    console.log("There was an error", err);
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userID = req.params.id;

    await User.destroy({where: { userID: userID }});

    console.log("Delete Execution Succesful: Profile has been Deleted");

    return res.status(200).send({
      status: "success",
      message: "Profile deleted"
    });

  } catch(err){
    console.log("[deleteProfile Route] There was an error: ", err);
    return res.status(500).send({
      status: "failure",
      message: "There was an error, Please try after some time",
      error: err
    });
  }
};

const searchUsers = async (req, res) => {
  try{
    const search_term = req.query.name;

    if(!search_term){
      return res.status(400).send({ message: "search term is required"});
    }

    if(search_term == ""){
      let results = await User.findAll({
        attributes: ['userID', 'name', 'bitsId'],
        where: {
          userID: {
            [Op.not]: req.user.id // req.user.id for production and req.body.id for testing
          },
          senior: true
        }
      });

      return res.status(200).send(results);

    }

    const search_value = `%${search_term}%`;

    let results = await User.findAll({
      attributes: ['userID', 'name', 'bitsId'],
      where: {
        userID: {
          [Op.not]: req.user.id // req.user.id for production and req.body.id for testing
        },
        [Op.or]: [
          {
            name: {
              [Op.iLike]: search_value
            }
          },
          {
            bitsId: {
              [Op.iLike]: search_value
            }
          }
        ],
        senior: true
      }
    })

    return res.status(200).send(results);

  }catch(e){
    console.log("[searchUsers Route] There was an error: ", e);
    return res.status(500).send({ 
      status: "failure",
      message: "There was an error",
      error: e 
    });
  }
};

const searchAllUsers = async (req, res) => {
  try{
    const search_term = req.query.name;

    if(!search_term){
      return res.status(400).send({ message: "search term is required"});
    }

    const search_value = `%${search_term}%`;

    let results = await User.findAll({
      attributes: ['userID', 'name', 'bitsId'],
      where: {
        userID: {
          [Op.not]: req.user.id // req.user.id for production and req.body.id for testing
        },
        [Op.or]: [
          {
            name: {
              [Op.iLike]: search_value
            }
          },
          {
            bitsId: {
              [Op.iLike]: search_value
            }
          }
        ]
      }
    })

    return res.status(200).send(results);

  }catch(e){
    console.log("[searchUsers Route] There was an error: ", e);
    return res.status(500).send({ 
      status: "failure",
      message: "There was an error",
      error: e 
    });
  }
};

// Writing on a wall always goes through the approval request, even for a nominated friend.
// (Kept as its own route so older clients keep working; it just hands over to sendRequest.)
const writeCaption = async (req, res) => {
  req.body = { ...(req.body || {}), targetId: req.params.id };
  return sendRequest(req, res);
};


module.exports = {
  editProfile,
  writeCaption,
  addProfile,
  searchUsers,
  searchAllUsers,
  getProfile,
  deleteProfile,
};