import Track from '../models/trackModel.js';

export const getAllTracks = async () => {
    return await Track.findAll();
};

export const getTracksByAlbum = async (albumId) => {
    return await Track.findAll({
        where: { album_id: albumId }
    });
};

export const getTrackById = async (id) => {
    return await Track.findById(id);
};

export const createTrack = async (data) => {
    return await Track.create(data);
};

export const updateTrack = async (id, data) => {
    const track = await Track.findById(id);
    if (!track) return null;
    Object.assign(track, data);
    await track.save();
    return track;
};

export const deleteTrack = async (id) => {
    const track = await Track.findById(id);
    if (!track) return null;
    await track.destroy();
    return track;
};

export const searchTracks = async (query) => {
    return await Track.findAll({
        where: {
            name: {
                [Op.like]: `%${query}%`
            }
        }
    });
};
