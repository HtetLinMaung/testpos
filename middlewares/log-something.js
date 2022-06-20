const express = require("express");

module.exports = (req, res, next) => {
  console.log({
    url: req.url,
    params: req.params,
    body: req.body,
    query: req.query,
    headers: req.headers,
  });
  next();
};
