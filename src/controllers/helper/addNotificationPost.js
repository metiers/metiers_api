function addNotificationPost(jobId, userId, name, notes, notifyOn) { 
  return (
    `INSERT INTO Notification (jobId, userId, name, notes, type, timeStamp, notifyOn)
     VALUES (${jobId}, ${userId}, '${name}', '${notes}', 'APPLICATION', CURRENT_TIMESTAMP(), '${notifyOn}');
    `);
}

export default addNotificationPost;