import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    image: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      minLength: [5, 'A username has at least 5 characters'],
      maxLength: [12, 'A username has 12 characters or less'],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    emailVerifyKey: String,
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user'],
    },
    password: {
      type: String,
      minLength: [8, 'A password has atleast 8 characters'],
      maxLength: [12, 'A password has 12 characters or less'],
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    emailVerifyKey: String,
    active: {
      type: Boolean,
      default: true,
    },
    changedPasswordAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'user',
  localField: '_id',
});

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'posts',
//     select: 'title image -user likesQuantity',
//   })
//     .populate({
//       path: 'comments',
//       select: '-user text post',
//     })
//     .populate({
//       path: 'likes',
//       select: '-user post createdAt',
//     });
//   next();
// });

// userSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword,
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.generateEmailVerification = function () {
  this.emailVerifyKey = uuid();
  return this.emailVerifyKey;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.changedPasswordAt) {
    const changedTimestamp = this.changedPasswordAt.getTime() / 1000;

    console.log(changedTimestamp > JWTTimestamp);

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createresetPasswordToken = function () {
  this.passwordResetToken = uuid();
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return this.passwordResetToken;
};

export default mongoose.model('User', userSchema);
