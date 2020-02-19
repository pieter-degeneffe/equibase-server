# Equibase back-end
Express + Node.js back-end for Equibase web Application
## Database
Document based database using MongoDB. Validation, casting and object nodeling happens via Mongoose
## Authentication
User authentication is provided via Auth0
## API endpoints
#### Customer
`POST /customer` Create a new customer  
`GET /customer` Get all Customers  
`GET /customer/:id` Get an existing customer  
`PUT /customer/:id` Update an existing customer  
`DELETE /customer/:id` Delete an existing customer  
