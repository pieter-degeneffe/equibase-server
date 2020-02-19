# Equibase back-end
Express + Node.js back-end for Equibase web Application
## Database
Document based database using MongoDB. Validation, casting and object nodeling happens via Mongoose
## Authentication
User authentication is provided via Auth0
## API endpoints
#### Customers
`POST /customer` Create a new customer  
`GET /customer` Get all customers  
`GET /customer/:customerId` Get a customer  
`PUT /customer/:customerId` Update a customer  
`DELETE /customer/:customerId` Delete a customer  
`POST /customer/:customerId/contact` Add a contact to a customer  
`PUT /customer/:customerId/contact/:contactId` Update the contact of a customer  
`DELETE /customer/:customerId/contact/:contactId` Delete a contact from a customer  
`GET /customer/search/:searchValue` Search for a customer  
`GET /customer/:customerId/horse` Get the horses of a customer  
#### Horses
`POST /horse` Create a new horse  
`GET /horse` Get all horses
`GET /horse/:horseId` Get a horse  
`PUT /horse/:horseId` Update a horse  
`DELETE /horse/:horseId` Delete a horse
`POST /horse/:horseId/passport` Create a new horse passport
`DELETE /horse/:horseId/passport` Delete a horse passport
#### Locations
`POST /location` Create a new location  
`GET /location` Get all locations
`GET /location/:locationId` Get a location  
`PUT /location/:locationId` Update a location  
`DELETE /location/:locationId` Delete a location
#### Nitrogen containers
`POST /nitrogenContainer` Create a new nitrogen container
`GET /nitrogenContainer` Get all nitrogen containers
`PUT /nitrogenContainer/:nitrogenContainerId` Update a nitrogen container
`DELETE /nitrogenContainer/:nitrogenContainerId` Delete a nitrogen container
#### Search
`GET /search/:searchValue` Search for a customer or horse  
