import request from 'request';
import { db } from '../database/index.js';

export default {
  githubPost: (req, res) => {
    console.log('githubpost is hitting')
    request('https://authenticjobs.com/api/?api_key=b2a41d0ac3e14ba92be9ee4b0d810a93&format=json&method=aj.jobs.search&keywords=' + req.body.searched + '&perpage=100', 
      function (error, response, body) {
        res.send(body);
      },
    );
  },
  companySearchPost: (req, res) => {
    req.body.jobs.map((job, i) => {
      console.log('this is userId', req.body.id);
      const check = `SELECT * from Company where name = '${job.company.name}' AND userId=${req.body.id}`;
      if (job.company.location === undefined) {
        job.company.location = {
          city: null,
          state: null,
        };
      }
      const sql =
        `INSERT INTO Company (userId, name, city, state) 
          VALUES (${req.body.id}, '${job.company.name}', 
              '${job.company.location.city}', 
              '${job.company.location.state}')`;
      db.query(check, (err, results) => {
        console.log(job.company.name, req.body.id);
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            console.log('posting company in db', job.company.name);
          });
        } else {
          console.log('not posting company in db', job.company.name);
        }
      });
    });
    res.send('posted company in db');
  },
  jobSearchPost: (req, res) => {
    console.log('USER ID in DB search post', req.body.id);
    req.body.jobs.map((job, i) => {
      console.log(job.title, req.body.id, job.company.name);
      job.description = JSON.stringify(job.description.replace(/<(?:.|\n)*?>/gm, ''));
      const subquery = `SELECT id FROM Company WHERE name = '${job.company.name}' AND userId=${req.body.id}`;
      const subquery2 = `SELECT id from Job WHERE title = '${job.title}' AND userId=${req.body.id}`;
      const check = `SELECT * FROM Job WHERE title = '${job.title}' AND userId=${req.body.id}`;
      const sql = `INSERT INTO Job (userId, companyId, title, description, deadline, ranking, source, status, link, createdAt) VALUES (${req.body.id}, (${subquery}), '${job.title}', ${job.description}, '', 3, 'Search', 'Will Apply', '${job.apply_url}', CURRENT_TIMESTAMP())`;
      const sql2 = `INSERT INTO History (jobId, name, timeStamp) VALUES ((${subquery2}), 'Saved Searched Job', CURRENT_TIMESTAMP())`;  
      db.query(check, (err, results) => {
        console.log('this is results', results);
        if (results.length === 0) {
          db.query(sql, (err, results) => {
            console.log('posting job in db', job.title);
            db.query(sql2, (err, results) => {
              console.log('posting into history', job.title);
            });
          });
        } else {
          console.log('not posting job in db', job.title);
        }
      });
    });
    res.send('posted in job');
  },
};
