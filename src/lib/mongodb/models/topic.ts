import mongoose, { Schema } from "mongoose";

const gameSession = new Schema(
  {
    userName: String,
    trys: Number,
  },
  {
    timestamps: true,
  }
);

const game = mongoose.models.game || mongoose.model("game", gameSession);

export default game;