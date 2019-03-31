const HttpStatus = require('http-status-codes');
const Boom = require('boom');
const axios = require('axios');
const _ = require('lodash');

const Feed = require('./feed.model');
const logger = require('../../tools/logger');

module.exports = {
  loadFeedsData: async () => {
    try {
      const feedData = await axios.get(process.env.FEED_DATA_URI);
      const feeds = await Feed.find({});
      const feedsDeleted = await Feed.find({ deleted: true });
      const { hits } = await feedData.data;
      // filter data
      const filteredHits = hits
        .filter(hit => hit.story_title !== null || hit.title !== null)
        .map(
          feed => new Feed({
            id: feed.objectID,
            title: feed.title ? feed.title : feed.story_title,
            createdAt: feed.created_at,
            author: feed.author,
            url: feed.story_url ? feed.story_url : feed.url,
          }),
        );

      const toInsert = _.differenceBy(filteredHits, feeds, 'id');
      const toInsertFiltered = _.differenceBy(toInsert, feedsDeleted, 'deleted');
      if (toInsertFiltered.length > 0) {
        await Feed.collection.insert(toInsertFiltered);
        return true;
      }
      return false;
    } catch (e) {
      logger.error('something bad happen when i tried to find feeds.', { stack: e.stack });
      return false;
    }
  },
  get: async (req, res) => {
    try {
      // const feedData = await axios.get(process.env.FEED_DATA_URI);
      // const { hits } = await feedData.data;
      const hits = await Feed.find({ deleted: false });
      if (!hits) {
        return res.status(HttpStatus.NOT_FOUND).json(Boom.notFound('feeds not found'));
      }
      // filter data
      const filteredHits = hits
        .filter(hit => hit.story_title !== null || hit.title !== null)
        .map(feed => {
          return {
            id: feed.id,
            title: feed.title ? feed.title : feed.story_title,
            createdAt: feed.createdAt,
            author: feed.author,
            url: feed.story_url ? feed.story_url : feed.url,
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
      const deletedFeed = await Feed.findOneAndUpdate(
        { id: feedId },
        { deleted: true },
        {
          new: true,
        },
      );
      return res.status(HttpStatus.OK).json({ deletedFeed });
    } catch (e) {
      logger.error('something bad happen when i tried to delete a feed.', { stack: e.stack });
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(Boom.internal(null, { params: req.params, error: e.message }));
    }
  },
};
