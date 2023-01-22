const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Joi = require("joi");
const { response } = require("express");

const app = express();

const PORT = 8080;

let rank = 13;

let img =
  "https://cdn.animaapp.com/projects/63aaf7e2426e9824f0350c11/releases/63aaf8f2426e9824f0350c13/img/avatar-placeholder-129@2x.png";

const ArtistSchema = new mongoose.Schema({
  img: String,
  name: String,
  change: Number,
  NFTsold: Number,
  volume: Number,
  rank: Number,
  nft: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NFTs",
    },
  ],
});

const NFTschema = new mongoose.Schema({
  img: String,
  title: String,
  price: Number,
  Hbid: Number,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artists",
  },
});

const ArtistModel = mongoose.model("Artists", ArtistSchema);
const NFTmodel = mongoose.model("NFTs", NFTschema);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://AliMusa04:sGSZqg0CxSPG6y2z@cluster0.tfsnsqn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected with DataBase");
  })
  .catch((err) => {
    console.log({ err });
  });

const AddArtisSchema = Joi.object({
  name: Joi.string().required(),
  change: Joi.number().required(),
  NFTsold: Joi.number().required(),
  volume: Joi.number().required(),
});

const AddNFtSchema = Joi.object({
  img: Joi.string().required(),
  title: Joi.string().required(),
  price: Joi.number().required(),
  Hbid: Joi.number().required(),
});

app.use(express.json());
app.use(cors());

// ARTIST POST
app.post(
  "/api/artists",
  (req, res, next) => {
    let { error } = AddArtisSchema.validate(req.body);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  },
  async (req, res) => {
    var query = ArtistModel.find();

    query.count(function (error, count) {
      if (error) console.log(error);
      const newArtist = new ArtistModel({
        ...req.body,
        img,
        rank: count + 1,
      });
      newArtist
        .save()
        .then(() =>
          res.send({ message: "Artist created succsefully !", newArtist })
        );
    });

    // query.count(function (error, count) {
    //   if (error) console.log(error);

    //   const newUser = new ArtistModel({ ...req.body, img, rank: count + 1 });

    // });
    // newUser.save();

    // res.status(201).send({ message: "Artist created succsefully !", newUser });
  }
);

// ARTIST GET
app.get("/api/artists", (req, res) => {
  ArtistModel.find()
    .populate("nft")
    .exec((error, artist) => {
      if (error) return response.status(500).send({ error });

      res.send(artist);
    });
});

// (error, artists) => {
//   if (error) return res.status(500).send({ error });

//   res.send(artists);
// }

//NFT GET
app.get("/api/marketplace", (req, res) => {
  // NFTmodel.find(null, (error, nfts) => {
  //   if (error) return res.status(500).send({ error });

  //   res.send(nfts);
  // });
  NFTmodel.find()
    .populate("artist")
    .exec((error, data) => {
      if (error) return res.status(500).send({ error });

      res.send(data);
    });
});

//NFT POST
app.post(
  "/api/marketplace/:userId",
  (req, res, next) => {
    let { error } = AddNFtSchema.validate(req.body);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).send({ error: message });
    }
  },
  async (req, res) => {
    let newNFT = new NFTmodel({
      ...req.body,
      artist: req.params.userId,
    });
    await newNFT
      .save()
      .then(() =>
        res.status(200).send({ message: "NFT created succsesfully", newNFT })
      );

    // nftId = NFTmodel.findOne({ title: req.body.title }, (error, nft) => {
    //   if (error) return res.status(500), send({ error });

    //   res.status(200).send(nft._id);
    // }),

    ArtistModel.findByIdAndUpdate(
      req.params.userId,
      {
        $push: {
          nft: ajksjdk,
        },
      },
      (error, data) => {
        if (error) return res.status(500).send({ error });

        res.send(data);
      }
    );
  }
);

app.listen(PORT, () => {
  console.log("Server runing on" + PORT);
});
