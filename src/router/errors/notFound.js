// eslint-disable-next-line no-unused-vars
function handler(req, res, next) {
    const status = 404;
    const message = 'Not Found';

    console.log(
        `${status} - ${message} - ${req.method} ${req.originalUrl} - ${req.ip}`,
    );

    res.status(status);
    res.json({
        error: message,
        status
    });
}

module.exports = handler;