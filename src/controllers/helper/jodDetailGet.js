function jobDetailGet(id){ 
  return (    
  `SELECT 
      j.id as job_id, 
      j.title as job_title_name
      j.description as job_description, 
      j.notes as job_notes, 
      j.source as job_source,
      j.status,
      j.ranking,
      j.deadline as deadline,
      j.link as url,
      j.resource,
      
      comp.id as company_id, 
      comp.name as company_name, 
      comp.description as company_description,
      comp.phone as company_phone,
      comp.address1 as company_address1,
      comp.address2 as company_address2,
      comp.city as company_city,
      comp.state as company_state,
      comp.zip as company_zip
      FROM Job j
      INNER JOIN Company comp 
          on comp.id = j.companyId
      WHERE j.id = ${id};`
      )
  }
  
  export default jobDetailGet;