import { db } from '../database/index.js';

export default {
  editNotes: (req, res) => {
    const data = req.body

    db.query(`UPDATE job SET notes='${data.jobNotes}' WHERE id=${data.jobId}`, (err) => {
      if (err) throw err;
    })

    db.query(`INSERT INTO history (jobId, name, timeStamp) VALUES (${data.jobId}, 'Edited Notes', CURRENT_TIMESTAMP());`, (err) => {
      if (err) throw err;
    })
  }
}