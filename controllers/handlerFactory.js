import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';
import HTTPError from '../utils/httpError.js';

export const getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.postId) filter = { post: req.params.postId };
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .paginate()
      .limitFields();

    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: {
        docs,
      },
    });
  });

export const getOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new HTTPError('Invalid Id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

export const createOne = (Model, validator) =>
  catchAsync(async (req, res, next) => {
    // set publisher in body from req.user
    if (!req.body.user) req.body.user = req.user.id;

    // // validation
    const { error, value } = validator.validate(req.body);
    if (error) {
      return next(new HTTPError(error.message, 400));
    }

    // create post
    const newDoc = await Model.create(req.body);

    // send response
    res.status(201).json({
      status: 'success',
      data: {
        doc: newDoc,
      },
    });
  });

export const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new HTTPError(`Invalid Id: ${req.params.id}`));
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new HTTPError(`Invalid Id: ${req.params.id}`));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });
