const { StatusCodes } = require("http-status-codes");
const Job = require("../Models/Job");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  //user object hum middleware main create kar rhe hain
  //params api se aa rha hai

 //console.log(userId)
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No Job with this id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  // console.log(req)
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "")
    throw new BadRequestError(`Company or Position fields cannot be empty`);

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) throw new NotFoundError(`No Job with id ${jobId}`);
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });

  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  res.status(StatusCodes.OK).json({msg:"Deleted",job});
};

module.exports = { getAllJobs, getJob, updateJob, deleteJob, createJob };
