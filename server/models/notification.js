const { DataTypes } = require('sequelize');
const { postgresClient } = require('../db/postgres');

// Types:
//   'new_caption'  -> someone wrote a caption on your wall   (actorID = the writer)
//   'caption_like' -> a caption YOU wrote reached a like milestone (count = the milestone)
// Like notifications are milestone based (1, 5, 10, 25, 50, 100), not one per like,
// so a popular caption does not flood the writer.
const Notification = postgresClient.define(
    'Notification',
    {
        notificationID:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        userID:{
            type: DataTypes.UUID,   // who receives it
            allowNull: false
        },

        type:{
            type: DataTypes.STRING(32),
            allowNull: false
        },

        captionID:{
            type: DataTypes.UUID,
            allowNull: false
        },

        actorID:{
            type: DataTypes.UUID,   // who caused it (only used for 'new_caption')
            allowNull: true
        },

        count:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        readAt:{
            type: DataTypes.DATE,
            allowNull: true
        }
    },

    {
        tableName: "ynotification",
        indexes: [
            // one notification per (person, kind, caption); like milestones update the same row
            { unique: true, fields: ['userID', 'type', 'captionID'] }
        ]
    }
);

module.exports = { Notification };
