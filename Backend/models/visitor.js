const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  // Use IP address as primary identifier (even for localhost)
  ipAddress: {
    type: String,
    required: true,
    trim: true
  },
  
  // Session ID to prevent multiple counts in same session
  sessionId: {
    type: String,
    required: true,
    trim: true
  },
  
  // User Agent to detect bots and track device info
  userAgent: {
    type: String,
    trim: true
  },
  
  // First visit timestamp
  firstVisitAt: {
    type: Date,
    default: Date.now
  },
  
  // Last visit timestamp for tracking active users
  lastVisitAt: {
    type: Date,
    default: Date.now
  },
  
  // Number of visits in current session
  visitCount: {
    type: Number,
    default: 1
  },
  
  // Country/Location (if using geo-IP service in future)
  location: {
    type: String,
    default: null
  },
  
  // Unique index to prevent duplicate entries for same IP+Session
  // This ensures we count unique visitor sessions, not individual page loads
}, { 
  timestamps: true,
  collection: 'visitors'
});

// Index for faster queries
visitorSchema.index({ ipAddress: 1, sessionId: 1 }, { unique: true });
visitorSchema.index({ lastVisitAt: -1 });
visitorSchema.index({ createdAt: -1 });

// Static method to register or update visitor
visitorSchema.statics.registerVisitor = async function(ipAddress, sessionId, userAgent) {
  try {
    // Try to find existing visitor session
    let visitor = await this.findOne({ 
      ipAddress, 
      sessionId 
    });

    if (visitor) {
      // Existing session - just update last visit
      visitor.lastVisitAt = new Date();
      visitor.visitCount += 1;
      await visitor.save();
      return { isNewVisitor: false, visitor };
    } else {
      // New visitor/session - create entry
      visitor = new this({
        ipAddress,
        sessionId,
        userAgent,
        firstVisitAt: new Date(),
        lastVisitAt: new Date(),
        visitCount: 1
      });
      await visitor.save();
      return { isNewVisitor: true, visitor };
    }
  } catch (error) {
    console.error('Error registering visitor:', error);
    throw error;
  }
};

// Static method to get unique visitor count
// Counts distinct IP+SessionId combinations (not total page views)
visitorSchema.statics.getUniqueVisitorCount = async function() {
  try {
    const count = await this.countDocuments({});
    return count;
  } catch (error) {
    console.error('Error getting visitor count:', error);
    throw error;
  }
};

// Static method to get stats for monitoring
visitorSchema.statics.getVisitorStats = async function() {
  try {
    const total = await this.countDocuments({});
    const last24h = await this.countDocuments({
      lastVisitAt: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    });
    const last7d = await this.countDocuments({
      lastVisitAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    });
    
    return {
      totalVisitors: total,
      visitorsLast24h: last24h,
      visitorsLast7d: last7d
    };
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    throw error;
  }
};

module.exports = mongoose.model('Visitor', visitorSchema);
