function addNotificationPost(jobId, name, notes, notifyOn) { 
  return (
    `INSERT INTO Notification (jobId, name, notes, type, timeStamp, notifyOn)
     VALUES (${jobId}, '${name}', '${notes}', 'APPLICATION', CURRENT_TIMESTAMP(), '${notifyOn}');
    `);
}

export default addNotificationPost;