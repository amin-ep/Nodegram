import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      minLength: [3, 'A title has 3 characters or more'],
      maxLength: [20, 'A title has 25 characters or less'],
      index: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'A post must have some descriptions'],
      trim: true,
    },
    location: [Number],
    image: {
      type: String,
      required: true,
    },
    slug: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      index: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'post',
  localField: '_id',
});

postSchema.virtual('likeQuantity', {
  ref: 'Like',
  foreignField: 'post',
  localField: '_id',
  count: true,
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'comments',
    select: '-post user text createdAt',
  })
    .populate({
      path: 'likes',
      select: '-post user',
    })
    .populate('likeQuantity');

  next();
});

postSchema.virtual('popular').get(function () {
  if (this.likeQuantity >= 20) {
    return true;
  }
});

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    trim: true,
    replacement: '-',
  });
  next();
});

export default mongoose.model('Post', postSchema);
