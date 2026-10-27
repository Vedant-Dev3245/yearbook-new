const associateModels = async (User, Commitment, Poll, Vote, Nomination, Caption, Like, Notification) => {

    // Commitments - Users Associations
    // User has MANY commitments and a Commitment have MANY users

    User.belongsToMany(Commitment, {
        foreignKey: 'userID',
        as: 'commitments',
        through: 'ymemberlist',
        onDelete: 'CASCADE'
    });

    Commitment.belongsToMany(User, {
        foreignKey: 'commitmentID',
        as: 'members',
        through: 'ymemberlist',
        onDelete: 'CASCADE'
    });

    // Users - Captions Associations
    // User has MANY captions and a Caption has ONE writer and ONE target

    User.hasMany(Caption, {
        foreignKey: 'writerID',
        as: 'written_captions',
        onDelete: 'CASCADE'
    });

    User.hasMany(Caption, {
        foreignKey: 'targetID',
        as: 'captions',
        onDelete: 'CASCADE'
    });

    Caption.belongsTo(User, {
        foreignKey: 'writerID',
        as: 'writer'
    });
    
    Caption.belongsTo(User, {
        foreignKey: 'targetID',
        as: 'target'
    });

    // Users - Nominations Associations
    // User has MANY Nominations and a Nomination has ONE nominator and ONE target

    User.hasMany(Nomination, {
        foreignKey: 'nominatorID',
        as: 'nominatedpeople',
        onDelete: 'CASCADE'
    });

    User.hasMany(Nomination, {
        foreignKey: 'targetID',
        as: 'nominatedby',
        onDelete: 'CASCADE'
    });

    Nomination.belongsTo(User, {
        foreignKey: 'nominatorID',
        as: 'nominator'
    });
    
    Nomination.belongsTo(User, {
        foreignKey: 'targetID',
        as: 'target'
    });

    // Users - Votes, Polls - Votes, Polls - Commitments Associations
    // User has MANY Votes and a Vote has ONE voter and ONE target
    // Poll has MANY Votes and a Vote has ONE poll
    // Poll has ONE Commitment and a Commitment has MANY polls

    User.hasMany(Vote, {
        foreignKey: 'voterID',
        as: 'voted',
        onDelete: 'CASCADE'
    });

    User.hasMany(Vote, {
        foreignKey: 'targetID',
        as: 'votes',
        onDelete: 'CASCADE'
    });

    Vote.belongsTo(User, {
        foreignKey: 'voterID',
        as: 'voter'
    });
    
    Vote.belongsTo(User, {
        foreignKey: 'targetID',
        as: 'target'
    });

    Poll.hasMany(Vote, {
        foreignKey: 'pollID',
        as: 'allvotes',
        onDelete: 'CASCADE'
    });

    Vote.belongsTo(Poll, {
        foreignKey: 'pollID',
        as: 'parentpoll'
    });

    Commitment.hasMany(Poll, {
        foreignKey: 'commitmentID',
        as: 'commitmentpolls',
        onDelete: 'CASCADE'
    });

    Poll.belongsTo(Commitment, {
        foreignKey: 'commitmentID',
        as: 'parentcommitment'
    });

    // Likes
    // A Caption has MANY likes; a User has MANY likes. Deleting either removes the likes.

    Caption.hasMany(Like, {
        foreignKey: 'captionID',
        as: 'likes',
        onDelete: 'CASCADE'
    });

    Like.belongsTo(Caption, {
        foreignKey: 'captionID',
        as: 'caption'
    });

    User.hasMany(Like, {
        foreignKey: 'userID',
        as: 'likesGiven',
        onDelete: 'CASCADE'
    });

    Like.belongsTo(User, {
        foreignKey: 'userID',
        as: 'liker'
    });

    // Notifications
    // A User receives MANY notifications; a notification may point at one Caption and one actor.

    User.hasMany(Notification, {
        foreignKey: 'userID',
        as: 'notifications',
        onDelete: 'CASCADE'
    });

    Notification.belongsTo(User, {
        foreignKey: 'userID',
        as: 'recipient'
    });

    User.hasMany(Notification, {
        foreignKey: 'actorID',
        as: 'notificationsCaused',
        onDelete: 'CASCADE'
    });

    Notification.belongsTo(User, {
        foreignKey: 'actorID',
        as: 'actor'
    });

    Caption.hasMany(Notification, {
        foreignKey: 'captionID',
        as: 'notifications',
        onDelete: 'CASCADE'
    });

    Notification.belongsTo(Caption, {
        foreignKey: 'captionID',
        as: 'caption'
    });

    const associatedModels = {User, Commitment, Poll, Vote, Nomination, Caption, Like, Notification};

    return associatedModels;
};

module.exports = associateModels;