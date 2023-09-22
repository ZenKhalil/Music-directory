import Artist from '../models/artistModel.js';
import { Op } from 'sequelize';

 const getAllArtists = async (queryParams) => {
    const page = parseInt(queryParams.page, 10) || 1; 
    const limit = parseInt(queryParams.limit, 100) || 100; 
    const offset = (page - 1) * limit;

    const sort = queryParams.sort || 'name'; 
    const order = queryParams.order || 'ASC'; 
    
    return await Artist.findAll({
    attributes: ['id', 'name', 'biography'],
    order: [[sort, order]],
    limit: limit,
    offset: offset
});

};

const getArtistById = async (id) => {
    return await Artist.findByPk(id, {
        attributes: ['id', 'name', 'biography']  // Add this line
    });
};

const createArtist = async (data) => {
    return await Artist.create(data);
};

const updateArtist = async (id, data) => {
    const artist = await Artist.findByPk(id);
    if (!artist) return null;
    Object.assign(artist, data);
    await artist.save();
    return artist;
};

const deleteArtist = async (id) => {
    const artist = await Artist.findByPk(id);
    if (!artist) return;
    await artist.destroy();
};

const searchArtists = async (query) => {
    return await Artist.findAll({
        where: {
            name: {
                [Op.like]: `%${query}%`
            }
        }
    });
};

export {
    searchArtists,
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
};
