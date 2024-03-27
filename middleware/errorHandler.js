export const errorHandler = (err, req, res, next) => {
    const errStatus = err.message.split(':')[0];
    const errorReason = err.message.split(':')[1];
    res.status(errStatus).json({ error: errorReason });
};