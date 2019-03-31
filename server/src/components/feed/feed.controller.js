const HttpStatus = require('http-status-codes');
const Boom = require('boom');
const axios = require('axios');

const logger = require('../../tools/logger');

module.exports = {
  get: async (req, res) => {
    try {
      const feedData = await axios.get(process.env.FEED_DATA_URI);
      const { hits } = await feedData.data;
      if (!hits) {
        return res.status(HttpStatus.NOT_FOUND).json(Boom.notFound('feeds not found'));
      }
      // filter data
      const filteredHits = hits
        .filter(hit => hit.story_title !== null || hit.title !== null)
        .map(feed => {
          return {
            id: feed.objectID,
            title: (feed.title) ? feed.title : feed.story_title,
            createdAt: feed.created_at,
            author: feed.author,
            url: (feed.story_url) ? feed.story_url : feed.url,
          };
        });

      return res.status(HttpStatus.OK).json({ hits: filteredHits });
    } catch (e) {
      logger.error('something bad happen when i tried to find feeds.', { stack: e.stack });
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(Boom.internal(null, { params: req.params, error: e.message }));
    }
  },
  deleteFeed: async (req, res) => {
    try {
      const { feedId } = req.params;
      return res.status(HttpStatus.NO_CONTENT);
    } catch (e) {
      logger.error('something bad happen when i tried to delete a feed.', { stack: e.stack });
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(Boom.internal(null, { params: req.params, error: e.message }));
    }
  },
};
