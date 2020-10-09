const { xml2js, flatten, groupBy } = require('../utils/helpers');
const soapRequest = require('easy-soap-request');

exports.addDeliveries = async (req, res, next) => {
  try {
    const url = 'http://www.vetorder.be/webservice.dhtml';
    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
    };
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <soap:Body>
        <GetDeliveries xmlns="http://www.vetorder.be/">
          <login>11627</login>
          <password>593940</password>
        </GetDeliveries>
      </soap:Body>
    </soap:Envelope>`;
    const { response } = await soapRequest({ url, headers, xml });
    const { body } = response;
    const result = await xml2js(body);
    const { deliveries: { delivery } } = await xml2js(result['soap:Envelope']['soap:Body'][0].GetDeliveriesResponse[0].GetDeliveriesResult[0]);
    const deliveries = groupBy(flatten(delivery.map(prod => prod.product.map(pr => {
      const product = {};
      Object.keys(pr).forEach(key => product[key] = pr[key][0]);
      return product;
    }))),'deliverydate');
    res.json({ deliveries });
  } catch (e) {
    next(e);
  }
};
