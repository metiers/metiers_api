function updateCompanyInfo(data){ 
  return (    
    `UPDATE company SET 

    name='${data.name}', 
    description='${data.description}',
    phone='${data.phone}',
    address1='${data.address1}',
    address2='${data.address2}',
    city='${data.city}',
    state='${data.state}',
    zip='${data.zip}'

    WHERE id=${data.companyId};`
  )
}
  
export default updateCompanyInfo;
