const { DataTypes } = require('sequelize');
const { postgresClient } = require('../db/postgres');

// One row = one user liking one caption.
// The unique index on (captionID, userID) is what guarantees "one like per person",
// even if the same request arrives twice at the same moment.
const Like = postgresClient.define(
    'Like',
    {
        likeID:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        userID:{
            type: DataTypes.UUID,
            allowNull: false
        },

        captionID:{
            type: DataTypes.UUID,
            allowNull: false
        }
    },

    {
        tableName: "ylike",
        updatedAt: false,
        indexes: [
            { unique: true, fields: ['captionID', 'userID'] }
        ]
    }
);

module.exports = { Like };
