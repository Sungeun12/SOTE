const SearchService = require('../services/search');

exports.search = (req, res) => {
    const { query } = req;
    SearchService.search(query)
    .then(data => res.json({ success: true, data }))
    .catch(err => res.json({ success: false, err }));
}