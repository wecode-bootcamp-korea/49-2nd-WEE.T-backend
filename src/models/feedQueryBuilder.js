const whereQuery = (image) => {
    return image != 0 && image ? "AND f.image_url IS NOT NULL" : "";
};

module.exports = {
    whereQuery
}