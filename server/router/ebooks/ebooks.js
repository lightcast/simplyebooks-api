const verifyEbookCode = function(ebookCode) {
  return new Promise(function(resolve, reject) {
    let sql = `SELECT COALESCE(COUNT(ID),0) AS EbookCount, ebookUUID  FROM ebookCodes WHERE ebookCode =  '${ebookCode}' GROUP BY ID`;
    pool.getConnection(function(err, connection) {
      connection.query(sql, function(err, result) {
        connection.release();
        resolve(result);
      })
    });
  });
}



  let created = moment(new Date()).format("YYYY-MM-DD");
