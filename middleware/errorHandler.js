export const errorHandler = (err, req, res, next) => {
    const errStatus = err.message.split(':')[0];
    const errorReason = err.message.split(':')[1];
    if(!isNaN(errStatus))
        res.status(errStatus).json({ error: errorReason });
    else
        res.status(500).json({ error: errStatus });
};