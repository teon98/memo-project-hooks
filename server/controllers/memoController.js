const express = require("express");
const Memo = require("../models/memo.js");

const memo = {
  readAll: async (req, res) => {
    const memos = await Memo.findAll();
    try {
      if (!memos.length)
        return res.status(404).send({
          err: "memo not found",
        });
      res.send(memos);
      console.log("안녕하세요", req.body.id);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  write: async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send("data를 입력해주세요.");
        return;
      }
      const result = await Memo.create(req.body);
      console.log("result : ", result);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  readOne: async (req, res) => {
    const id = req.params.id;
    const findmemo = await Memo.findById(id);
    try {
      if (!req.params.id)
        return res.status(404).send({
          err: "memo not found",
        });
      res.send(findmemo);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  update: async (req, res) => {
    try {
      const result = await Memo.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          content: req.body.content,
          author: req.body,
        }
      );
      console.log("result : ", result);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  delete: async (req, res) => {
    try {
      if (!req.params.id) {
        res.status(400).send("해당 데이터가 없습니다.");
        return;
      }
      const result = await Memo.remove({ _id: req.params.id });
      console.log("result : ", result);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = memo;
