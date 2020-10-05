const axios = require('axios');
const { xml2js } = require('../utils/helpers');
const parseString = require('xml2js').parseString;
const soapRequest = require('easy-soap-request');

exports.addDeliveries = async (req, res, next) => {
  try {
    const url = 'http://www.vetorder.be/webservice.dhtml';
    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
    };
    const xml = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><GetDeliveries xmlns="http://www.vetorder.be/"><login>11627</login><password>593940</password></GetDeliveries></soap:Body></soap:Envelope>';
    const { response } = await soapRequest({ url, headers, xml });
    const { body } = response;
    console.log(body);
    const result = await xml2js(body);
    const test = await xml2js(result['soap:Envelope']['soap:Body'][0].GetDeliveriesResponse[0].GetDeliveriesResult[0]);
    res.send(test.deliveries.delivery);
    // const config = {
    //   method: 'post',
    //   url: 'http://www.vetorder.be/webservice.dhtml',
    //   headers: {
    //     'Content-Type': 'application/xml'
    //   },
    //   data: data
    // };

    // const response = await axios(config);
    // const result = await xml2js(response.data);
    // res.send(response.data);
  } catch (e) {
    next(e);
  }
};
