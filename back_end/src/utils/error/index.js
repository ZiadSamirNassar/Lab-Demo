export const asyncHandler = (fn) => {

    return (req, res, next) => {
        fn(req, res, next).catch( err => next(err));
    }
}

export const globalError = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Something went wrong",
        success: false,
    });
};