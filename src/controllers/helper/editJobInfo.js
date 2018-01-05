function updateJobInfo(data){ 
  return (    
    `UPDATE job SET

    title='${data.title}',
    description='${data.description}',
    source='${data.source}',
    status='${data.status}',
    ranking='${data.ranking}',
    deadline='${data.deadline}',
    link='${data.link}'
    
    WHERE id=${data.jobId};`
  )
}
  
export default updateJobInfo;
