import * as models from './models.js';

class ParkQueuesClient {
  constructor() {
     this.baseUrl = '/api/v0'; // Same scheme, host, and port.
  }

  /* Make a JSON API call to the server.
   * Then strip off the defensive prefix from the response. */
  async doFetch(resource, httpMethod, body) {
    const url = this.baseUrl + resource;
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
    };
    const options = {
      method: httpMethod,
      credentials: 'same-origin',
      headers: headers,
    };
    if (body !== null) {
      options['body'] = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (response.status !== 200) {
      throw new Error(
          `Got error response from server ${resource}: ${response.status}`);
    }
    const rawResponseText = await response.text();
    const XSSIPrefix = ')]}\'\n';
    if (!rawResponseText.startsWith(XSSIPrefix)) {
      console.log(rawResponseText);
      throw new Error(
          `Response does not start with XSSI prefix: ${XSSIPrefix}`);
    }
    return JSON.parse(rawResponseText.substr(XSSIPrefix.length));
  }

  doGet(resource, body) {
    return this.doFetch(resource, 'GET', body);
  }

  
  // //////////////////////////////////////////////////////////////
  // Specific API calls

  getRegionsAndParks() {
    return this.doGet('/parks')
      .then((res) => new models.World(res));
    // TODO: catch((error) => { display message }
  }

  getPark(parkId) {
    return this.doGet(`/parks/${parkId}`).then((res) => {
      const parkData = res;
      if (parkData.error) return {};
      return new models.Park(parkData);
    });
    // TODO: catch((error) => { display message }
  }

};

export const pqClient = new ParkQueuesClient();
