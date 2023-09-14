import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Album from './albumModel.js'; // Import the Album model for the association

const Artist = sequelize.define('Artist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Tilføj evt. flere felter her.
}, {
  timestamps: true,  // Dette tilføjer created_at og updated_at felter i databasen.
  tableName: 'artists',  // Navnet på tabellen i databasen.
});

Artist.hasMany(Album, { foreignKey: 'artist_id' }); // Define the association

export default Artist;
