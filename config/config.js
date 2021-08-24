module.exports = {

	db: {
  
	  "user": process.env.DB_USER || "ruas",
	  "password": process.env.DB_PASSWORD || "123",
	  "host": process.env.DB_HOST || "127.0.0.1",
	  "port": process.env.DB_PORT || 3306,
	  "schema": process.env.DB_SCHEMA || "ruas-backend"
  
	}
  
}