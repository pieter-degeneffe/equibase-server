const colors = ['Rood','Oranje','Geel','Groen','Blauw','Indigo','Violet']
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Equibase Api",
      version: "1.0.0",
      description:
        "A test project to understand how easy it is to document and Express API",
      // license: {
      //   name: "MIT",
      //   url: "https://choosealicense.com/licenses/mit/"
      // },
      contact: {
        name: "Unikoo",
        url: "https://unikoo.be",
        email: "arne.herbots@unikoo.be"
      }
    },
    servers: [
      {
        url: "http://localhost:8081/api/"
      }
    ]
  },
  apis: ['./routes/api/*.js']
};
const productTypes = ['Materiaal', 'Geneesmiddel', 'Voedingssupplement', 'Ontsmettingsmiddel'];
const taxes = ['6%', '21%'];
module.exports = {colors, swaggerOptions, productTypes, taxes};
