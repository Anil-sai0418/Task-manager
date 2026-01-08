const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  // User ID (if logged in) - primary identifier
  userId: {
    type: String,
    trim: true,
    sparse: true  // Allow null for anonymous users
  },
  
  // Session ID - for anonymous/guest users
  sessionId: {
    type: String,
    trim: true,
    sparse: true
  },
  
  // IP Address - fallback identifier for anonymous users
  ipAddress: {
    type: String,
    trim: true
  },
  
  // User Agent to track device info
  userAgent: {
    type: String,
    trim: true
  },
  
  // Whether user liked or unliked (true = liked, false = unliked)
  liked: {
    type: Boolean,
    default: true
  },
  
  // Timestamp when user liked/unliked
  likedAt: {
    type: Date,
    default: Date.now
  },

  // Updated timestamp
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Unique indexes:
// 1. Logged-in users identified by userId
// 2. Anonymous users identified by sessionId + ipAddress
likeSchema.index({ userId: 1 }, { unique: true, sparse: true });
likeSchema.index({ sessionId: 1, ipAddress: 1 }, { unique: true, sparse: true });

// Static method to register or update a like
likeSchema.statics.registerLike = async function(userId, sessionId, ipAddress, userAgent) {
  try {
    let likeRecord;
    let query;
    
    // Determine search criteria based on whether user is logged in
    if (userId) {
      // Logged-in user: use userId
      query = { userId };
    } else {
      // Anonymous user: use sessionId + ipAddress
      query = { sessionId, ipAddress };
    }
    
    likeRecord = await this.findOne(query);
    
    if (likeRecord) {
      // User already liked/unliked, toggle it
      likeRecord.liked = !likeRecord.liked;
      likeRecord.updatedAt = new Date();
      await likeRecord.save();
      return { 
        isNewLike: false, 
        liked: likeRecord.liked, 
        likeRecord 
      };
    } else {
      // New like from this user
      likeRecord = new this({ 
        userId: userId || null,
        sessionId: sessionId || null,
        ipAddress,
        userAgent,
        liked: true,
        likedAt: new Date()
      });
      await likeRecord.save();
      return { 
        isNewLike: true, 
        liked: true, 
        likeRecord 
      };
    }
  } catch (error) {
    console.error('[Like] Error registering like:', error);
    throw error;
  }
};

// Static method to get total likes count
likeSchema.statics.getTotalLikes = async function() {
  try {
    // Count only records where liked === true
    const count = await this.countDocuments({ liked: true });
    return count;
  } catch (error) {
    console.error('[Like] Error getting total likes:', error);
    throw error;
  }
};

// Static method to check if user already liked
likeSchema.statics.checkUserLike = async function(userId, sessionId, ipAddress) {
  try {
    let query;
    
    // Determine search criteria based on whether user is logged in
    if (userId) {
      // Logged-in user: use userId
      query = { userId };
    } else {
      // Anonymous user: use sessionId + ipAddress
      query = { sessionId, ipAddress };
    }
    
    const likeRecord = await this.findOne(query);
    if (likeRecord) {
      return { liked: likeRecord.liked, likeRecord };
    }
    return { liked: false, likeRecord: null };
  } catch (error) {
    console.error('[Like] Error checking user like:', error);
    throw error;
  }
};

// Static method to get like statistics
likeSchema.statics.getLikeStats = async function() {
  try {
    const totalLikes = await this.countDocuments({ liked: true });
    const totalUnlikes = await this.countDocuments({ liked: false });
    const totalInteractions = await this.countDocuments();
    
    const likePercentage = totalInteractions > 0 
      ? ((totalLikes / totalInteractions) * 100).toFixed(2)
      : 0;

    return {
      totalLikes,
      totalUnlikes,
      totalInteractions,
      likePercentage: `${likePercentage}%`
    };
  } catch (error) {
    console.error('[Like] Error getting like stats:', error);
    throw error;
  }
};

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
