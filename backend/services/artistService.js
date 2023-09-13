import Artist from '../models/artistModel.js';

const getAllArtists = async () => {
    return await Artist.findAll();
};

const getArtistById = async (id) => {
    return await Artist.findById(id);
};

const createArtist = async (data) => {
    return await Artist.create(data);
};

const updateArtist = async (id, data) => {
    const artist = await Artist.findById(id);
    if (!artist) return null;
    Object.assign(artist, data);
    await artist.save();
    return artist;
};

const deleteArtist = async (id) => {
    const artist = await Artist.findById(id);
    if (!artist) return;
    await artist.destroy();
};

export {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
};
