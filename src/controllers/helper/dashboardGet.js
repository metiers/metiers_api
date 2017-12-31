function dashboardGet(userId) { 
  return (
    `SELECT j.id, j.status, j.ranking as rating, 
        CAST(j.deadline as DATE) as deadline, j.link as url, 
        j.title as job_title_name, c.name as company_name, 
        MIN(CAST(j.createdAt as DATE)) as created_date 
      FROM Job j 
      INNER JOIN Company c on j.companyId = c.id 
      WHERE c.userId = ${userId} 
      GROUP BY j.id, c.name;`);
}

export default dashboardGet;