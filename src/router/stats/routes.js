const express = require('express');
const router = express.Router();
const { toDomainLanguage } = require('../mappers');
const { asyncHandler } = require('../utils/asyncHandler');

function create(service) {
  router.get(
    '/',
    asyncHandler(async (req, res) => {
      // TODO: Handle validation properly
      const apiLanguages = req.query.languages.split(',');
      const domainLanguages = apiLanguages.map(l => toDomainLanguage(l));
      const stats = await service.compareLanguagesByIssues(domainLanguages);
      res.json({
        stats,
      });
    }),
  );

  return router;
}

module.exports.create = create;
