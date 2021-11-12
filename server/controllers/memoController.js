const express = require("express");
const Memo = require("../models/memo.js");

const memo = {
  findAll: async (req, res) => {
    Memo.findAll()
      .then((memos) => {
        if (!memos.length)
          return res.status(404).send({ err: "Memo not found" });
        res.send(memos);
      })
      .catch((err) => res.status(500).send(err));
  },
  write: async (req, res) => {
    Memo.create(req.body)
      .then((memo) => res.send(memo))
      .catch((err) => res.status(500).send(err));
  },
  readOne: async (req, res) => {
    Memo.findOneByMemoId(req.params.memoID)
      .then((memo) => {
        if (!memo) return res.status(404).send({ err: "Memo not found" });
        res.send(memo);
      })
      .catch((err) => res.status(500).send(err));
  },
  update: async (req, res) => {
    Memo.updateByMemoID(req.params.memoID, req.body)
      .then((memo) => res.send(memo))
      .catch((err) => res.status(500).send(err));
  },
  delete: async (req, res) => {
    Memo.deleteByMemoID(req.params.memoID)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
};

module.exports = memo;
