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
`GET /customer/:customerId` Get a customer  
`PUT /customer/:customerId` Update a customer  
`DELETE /customer/:customerId` Delete a customer  
`POST /customer/:customerId/contact` Add a contact to a customer  
`PUT /customer/:customerId/contact/:contactId` Update the contact of a customer  
`DELETE /customer/:customerId/contact/:contactId` Delete a contact from a customer  
`GET /customer/search/:searchValue` Search for a customer  
`GET /customer/:customerId/horse` Get the horses of a customer  
