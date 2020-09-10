exports.colors = ['Rood', 'Oranje', 'Geel', 'Groen', 'Blauw', 'Indigo', 'Violet'];
exports.swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Equibase Api',
      version: '1.0.0',
      description:
        'A test project to understand how easy it is to document and Express API',
      contact: {
        name: 'Unikoo',
        url: 'https://unikoo.be',
        email: 'arne.herbots@unikoo.be'
      }
    },
    servers: [
      {
        url: 'http://localhost:8081/api/'
      }
    ]
  },
  apis: ['./routes/api/*.js']
};
exports.modificationTypes = {
  BUY: 'Aankoop',
  SEL: 'Verkoop',
  CHECK: 'Controle',
  ADMINISTRATION: 'Toediening',
  DAMAGED: 'Beschadigd',
};
exports.productTypes = ['Materiaal', 'Geneesmiddel', 'Voedingssupplement', 'Ontsmettingsmiddel'];
exports.taxes = ['6%', '21%'];
