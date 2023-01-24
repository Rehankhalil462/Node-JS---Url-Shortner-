import URL from "url";
import dns from "dns";
import { URLModal } from "../models/URLSchema.js";

export const shortenURL = async (req, res) => {
  const original_url = req.body.url;
  try {
    const modifiedURL = new URL.URL(original_url);
    if (modifiedURL) {
      dns.lookup(modifiedURL.hostname, async (err, address, family) => {
        if (err) {
          res.json({ error: "invalid url" });
          return;
        } else {
          const url = await URLModal.findOne({ original_url });
          if (url) {
            res.json({
              short_url: url.short_url,
              original_url: url.original_url,
            });
          } else {
            URLModal.find()
              .exec()
              .then(async (data) => {
                let url = new URLModal({
                  short_url: `${process.env.BASE}/${data.length + 1}`,
                  original_url,
                  urlId: data.length + 1,
                  date: new Date(),
                });
                await url.save().then(() => {
                  res.json({
                    short_url: `${process.env.BASE}/${Number(data.length + 1)}`,
                    original_url,
                  });
                });
              });
          }
        }
      });
    } else {
      res.json({ error: "invalid url" });
      return;
    }
  } catch (error) {
    res.status(error.status || 500).json({
      error: {
        message: error.message,
      },
    });
  }
};

export const getShortUrl = async (req, res) => {
  const url = await URLModal.findOne({ urlId: req.params.id });
  if (url) {
    res.redirect(url.original_url);
  } else {
    res.json({ error: "Wrong Format || Url not found" });
  }
};
