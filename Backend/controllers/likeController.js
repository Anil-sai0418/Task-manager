const Like = require('../models/like');

// Helper function
const getClientIpForLike = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        return xForwardedFor.split(',')[0].trim();
    }

    return req.socket.remoteAddress || req.connection.remoteAddress || 'unknown';
};

// Toggle Like
exports.toggleLike = async (req, res) => {
    try {
        const { sessionId, userId } = req.body;

        // Validate input: either userId (for logged-in users) or sessionId (for guests)
        if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Valid sessionId is required'
            });
        }

        // Get client's IP address
        const ipAddress = getClientIpForLike(req);

        // Get user agent
        const userAgent = req.headers['user-agent'] || 'unknown';

        // Toggle like (userId takes priority for logged-in users)
        const result = await Like.registerLike(userId || null, sessionId.trim(), ipAddress, userAgent);

        console.log(`[Like] ${result.isNewLike ? 'NEW' : 'TOGGLED'} like: UserID=${userId || 'anonymous'}, Liked=${result.liked}`);

        res.status(200).json({
            success: true,
            liked: result.liked,
            message: result.liked ? 'Thanks for loving our app!' : 'Like removed',
            isNewLike: result.isNewLike
        });

    } catch (error) {
        console.error('Error toggling like:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while toggling like',
            error: error.message
        });
    }
};

// Get Total Likes
exports.getTotalLikes = async (req, res) => {
    try {
        const count = await Like.getTotalLikes();

        res.status(200).json({
            success: true,
            totalLikes: count,
            message: `Total users loved this: ${count}`
        });

    } catch (error) {
        console.error('Error getting total likes:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while getting total likes',
            error: error.message
        });
    }
};

// Check User Like
exports.checkUserLike = async (req, res) => {
    try {
        const { sessionId, userId } = req.body;

        if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Valid sessionId is required'
            });
        }

        const ipAddress = getClientIpForLike(req);
        const result = await Like.checkUserLike(userId || null, sessionId.trim(), ipAddress);

        res.status(200).json({
            success: true,
            liked: result.liked,
            message: result.liked ? 'User has liked' : 'User has not liked'
        });

    } catch (error) {
        console.error('Error checking user like:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while checking user like',
            error: error.message
        });
    }
};

// Get Like Stats
exports.getLikeStats = async (req, res) => {
    try {
        const stats = await Like.getLikeStats();

        res.status(200).json({
            success: true,
            stats: stats,
            message: 'Like statistics retrieved'
        });

    } catch (error) {
        console.error('Error getting like stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while getting like stats',
            error: error.message
        });
    }
};
