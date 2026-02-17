const Visitor = require('../models/visitor');

// Utility function to get client IP address
const getClientIp = (req) => {
    // Check for various headers set by proxies
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        // x-forwarded-for can contain multiple IPs, take the first one
        return xForwardedFor.split(',')[0].trim();
    }

    return req.socket.remoteAddress || req.connection.remoteAddress || 'unknown';
};

// Register Visitor
exports.registerVisitor = async (req, res) => {
    try {
        const { sessionId } = req.body;

        // Validate session ID
        if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Valid sessionId is required'
            });
        }

        // Get client's IP address
        const ipAddress = getClientIp(req);

        // Get user agent for bot detection and device tracking
        const userAgent = req.headers['user-agent'] || 'unknown';

        // Register or update visitor
        const result = await Visitor.registerVisitor(ipAddress, sessionId.trim(), userAgent);

        console.log(`[Visitor] ${result.isNewVisitor ? 'NEW' : 'RETURNING'} visitor registered: IP=${ipAddress}, Session=${sessionId}`);

        res.status(200).json({
            success: true,
            message: result.isNewVisitor ? 'New visitor registered' : 'Visitor session updated',
            isNewVisitor: result.isNewVisitor,
            visitorId: result.visitor._id
        });

    } catch (error) {
        console.error('Error registering visitor:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while registering visitor',
            error: error.message
        });
    }
};

// Get Visitor Count
exports.getVisitorCount = async (req, res) => {
    try {
        const count = await Visitor.getUniqueVisitorCount();

        res.status(200).json({
            success: true,
            totalVisitors: count,
            message: `Total unique visitors: ${count}`
        });

    } catch (error) {
        console.error('Error getting visitor count:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while getting visitor count',
            error: error.message
        });
    }
};

// Get Visitor Stats
exports.getVisitorStats = async (req, res) => {
    try {
        const stats = await Visitor.getVisitorStats();

        res.status(200).json({
            success: true,
            stats: stats,
            message: 'Visitor statistics retrieved'
        });

    } catch (error) {
        console.error('Error getting visitor stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while getting visitor stats',
            error: error.message
        });
    }
};
