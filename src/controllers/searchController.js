import request from 'request';
import { db } from '../database/index.js';

export default {
  githubPost: (req, res) => {
    request('https://authenticjobs.com/api/?api_key=b2a41d0ac3e14ba92be9ee4b0d810a93&format=json&method=aj.jobs.search&keywords=' + req.body.searched + '&perpage=100', 
      function (error, response, body) {
        res.send(body);
      },
    );
  },
  companySearchPost: (userId, data, callback) => {
    data.jobs.map((job, i) => {
      console.log('this is userId', userId);
      const check = `SELECT * from Company where name = '${job.company.name}'`;
      if (job.company.location === undefined) {
        job.company.location = {
          city: null,
          state: null,
        };
      }
      const sql =
        `INSERT INTO ${TABLE} (userId, name, city, state) 
          VALUES (${userId}, '${job.company.name}', 
              '${job.company.location.city}', 
              '${job.company.location.state}')`;
      console.log('company post sql', sql);
      db.query(check, (err, results) => {
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            console.log('posting company in db', job.company.name);
          });
        } else {
          console.log('not posting company in db', job.company.name);
        }
      });
    });
    callback('finished');
  },
  searchPost: (userId, data, callback) => {
    console.log('USER ID in DB search post', userId);
    data.jobs.map((job, i) => {
      job.description = JSON.stringify(job.description.replace(/<(?:.|\n)*?>/gm, ''));
      console.log('this is the job', job)
      const subquery = `SELECT id FROM Company WHERE name = '${job.company.name}'`;
      const subquery2 = `SELECT id from Job WHERE name = '${job.title}'`;
      const check =  `SELECT * FROM Job WHERE name = '${job.title}'`;
      const sql = `INSERT INTO Job (companyId, name, description, priority, notes, source, status, link) VALUES ((${subquery}), '${job.title}', ${job.description}, 3, '', 'Search', 'Will Apply', '${job.apply_url}')`;
      const sql2 = `INSERT INTO Event (jobId, name, notes, timeStamp, type) VALUES ((${subquery2}), 'Created', '', CURRENT_TIMESTAMP(), 'Searched')`;  
      const sql3 = `INSERT INTO Contact (userId, companyId, firstName, lastName) VALUES (${userId}, (${subquery}), 'N/A', 'N/A')`;
      db.query(check, (err, results) => {
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            console.log('posting job in db', job.title);
            db.query(sql2, (err, results) => {
              console.log('posting into event', job.title);
            });
            db.query(sql3, (err, results) => {
              console.log('posting into contact', job.title);
            });
          });
        } else {
          console.log('not posting job in db', job.title);
        }
      });
    });
    callback('finished');
  },
};
