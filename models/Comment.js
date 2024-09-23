import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: String,
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

commentSchema.virtual('replies', {
  ref: 'Comment',
  foreignField: 'parentComment',
  localField: '_id',
});

commentSchema.pre('find', function (next) {
  this.populate({ path: 'replies' });

  next();
});

commentSchema.pre('save', async function (next) {
  await this.populate({
    path: 'user',
    select: 'username image',
  });
  next();
});

export default mongoose.model('Comment', commentSchema);
