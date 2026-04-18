export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    if (err.code === '23505') {
        return res.status(409).json({
            success: false,
            message: 'Email already exists'
        });
    }

    if (err.code === '28P01') {
        return res.status(500).json({
            success: false,
            message: 'Database authentication failed'
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
};

export const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
};
