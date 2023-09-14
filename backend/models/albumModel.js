import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Artist from './artistModel.js'; // Import the Artist model for the association

const Album = sequelize.define('Album', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  release_date: {
    type: DataTypes.DATE
  },
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'artists', // This is the name of the table in the database, not the model name in the code.
      key: 'id'
    }
  }
}, {
  timestamps: false, // Since you didn't specify any timestamp fields in the SQL
  tableName: 'albums'
});

Album.belongsTo(Artist, { foreignKey: 'artist_id' }); // Define the association

export default Album;
