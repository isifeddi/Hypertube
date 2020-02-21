const queries = {
    SELECT : {
        GetUserByEmail:     "SELECT users.*,DATE_FORMAT(users.birthday,'%Y-%m-%d') as transDate FROM users \
                            WHERE users.email = ?",
        GetUserById:        "SELECT users.*,DATE_FORMAT(users.birthday,'%Y-%m-%d') as transDate FROM users \
                            WHERE users.id = ?",
        GetUserByUsername:  "SELECT users.*,DATE_FORMAT(users.birthday,'%Y-%m-%d') as transDate FROM users \
                            WHERE users.username = ?",
        GetUserByToken:     "SELECT * FROM users WHERE verif_token = ?",
        GetProfilePic :     "SELECT path FROM images WHERE user_id = ? AND isProfilePic = 1",
        CheckEditUsername:  "SELECT username from users where username = ? AND id != ?",
        CheckEditEmail:     "SELECT email from users where email = ? AND id != ?",
    },
    INSERT : {
        AddImage:           'INSERT INTO images (user_id, path,isProfilePic) VALUES (?, ?, ?)',
        AddUser:            'INSERT INTO users (lastname, firstname, username, email, password) VALUES (?, ?, ?, ?, ?)',
        CreateInterest:     "INSERT INTO interests (interest, createdBy) VALUES (?, ?)",
        InsertUserInter:    "INSERT INTO usersInterests (uId, iId) VALUES (?, ?)",
        blockUser :         "INSERT INTO blockList (blocker_id, blocked_id,date) VALUES (?, ?, NOW())",
        likeUser :          "INSERT INTO likesList (liker_id, liked_id, date) VALUES (?, ?, NOW())",
        reportUser :        "INSERT INTO reportList (reporter_id, reported_id,date) VALUES (?, ?, NOW())",
        viewProfileUser :   "INSERT INTO viewProfileList (viewer, viewed, date) VALUES (?,?,NOW())",
        insertMessage:      "INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)",
        insertNotif:        "INSERT INTO notifications (`by`, receiver, content, seen) VALUES (?, ?, ?, ?)",
    },
    UPDATE : {
        Update:             'UPDATE users SET name = ?, email = ?, sex = ? WHERE id = ?',
        UpdateToken:        'UPDATE users SET verif_token = ? WHERE email = ?',
        ResetPassword:      'UPDATE users SET password = ? WHERE verif_token = ?',
        Confirmed:          'UPDATE users SET confirmed = 1 WHERE email = ?',
        notConfirmed:       'UPDATE users SET confirmed = 0 WHERE email = ?',
        UpdateInfo:         "UPDATE users SET gender = ?, sexOrient = ?, birthday = ?, age = ?, bio = ? WHERE id = ?",
        UpdateProfile:      "UPDATE users SET firstname = ?, lastname = ?, username = ?, email = ?, gender = ?, birthday = ?, age = ?, sexOrient = ?, bio = ? \
                            WHERE id = ?",
        UpdatePassword:     "UPDATE users SET password = ? WHERE id = ?",
        UpdateOnline:       "UPDATE users SET isOnline = 1 ,lastSignIn = null WHERE id = ?",
        UpdateOffline:      "UPDATE users SET isOnline = 0 ,lastSignIn = NOW() WHERE id = ?",
        UpdateStep:         "UPDATE users SET complete = ? WHERE id = ?",
        UpdateLocation:     "UPDATE users SET latitude = ? , longitude = ? WHERE id = ?",
        setProfilePic:      'UPDATE images SET IsProfilePic = 1 WHERE id = ? && user_id = ?',
        resetProfilePic :   'UPDATE images SET isProfilePic = 0 WHERE user_id = ?',
        setFirstProPic :    'UPDATE  images SET isProfilePic = 1 WHERE user_id = ? ORDER BY id ASC LIMIT 1',
        updateRating :      'UPDATE users SET rating = rating  + ?  WHERE id = ? AND rating <= 5',
        openNotif:          'UPDATE notifications SET seen = 1',
    },
    DELETE : {
        delImages :         'DELETE FROM `images` WHERE id = ? && user_id = ?',
        DeleteUserInter:    "DELETE FROM `usersInterests` WHERE uId = ?",
        deblockUser :       "DELETE FROM blockList WHERE blocker_id = ? AND blocked_id = ?",
        dislikeUser :       "DELETE FROM likesList WHERE liker_id = ? AND liked_id = ?",
    },
}

module.exports = queries;