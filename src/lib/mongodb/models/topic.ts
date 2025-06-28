import { timeStamp } from "console";
import monsoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    userName: string,
    trys: number,
  },
  {
    timeStamp: true,
  }
);

const Topic = mongooose.models.Topic || SiMongoose.model("Topic", topicSchema);

export default Topic;