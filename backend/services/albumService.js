import Album from '../models/albumModel.js';

export const getAllAlbums = async () => {
    return await Album.findAll();
};

export const getAlbumById = async (id) => {
    return await Album.findById(id);
};

export const createAlbum = async (data) => {
    return await Album.create(data);
};

export const updateAlbum = async (id, data) => {
    const album = await Album.findById(id);
    if (!album) return null;
    Object.assign(album, data);
    await album.save();
    return album;
};

export const deleteAlbum = async (id) => {
    const album = await Album.findById(id);
    if (!album) return null;
    await album.destroy();
    return album;
};

export const searchAlbums = async (query) => {
    return await Album.findAll({
        where: {
            name: {
                [Op.like]: `%${query}%`
            }
        }
    });
};

export const createCompleteAlbum = async (data) => {
    const { artist, tracks, ...albumDetails } = data;

    // Check if artist exists or create a new one
    let [artistInstance, created] = await Artist.findOrCreate({
        where: { name: artist.name },
        defaults: artist
    });

    // Create the album
    const album = await Album.create({ ...albumDetails, artistId: artistInstance.id });

    // Check each track and associate with the album
    for (let track of tracks) {
        let [trackInstance] = await Track.findOrCreate({
            where: { name: track.name },
            defaults: track
        });
        await album.addTrack(trackInstance);
    }

    return album;
};
