import mongoose, { Schema } from "mongoose";

const gameSessionSchema = new Schema(
  {
    userName: String,
    targetWord: String,
    wordLength: Number,
    unique: Boolean,
    trys: Number,
  },
  {
    timestamps: true,
  }
);
/*------------------- Clear the model if it exists to avoid caching issues -------------------*/
if (mongoose.models.gameSession) {
  delete mongoose.models.gameSession;
}

const game = mongoose.model("gameSession", gameSessionSchema);

export default game;
