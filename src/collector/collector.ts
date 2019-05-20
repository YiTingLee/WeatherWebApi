import * as request from 'request';

const url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-A6F5D598-0FD9-4C6A-B09F-AA39FAA5581A&amp;downloadType=WEB&amp;format=JSON';
const city = ['臺北市', '新北市', '桃園市']
export function getWeatherData() {
  request.get(url, (error, response, body) => {
    if (error || !response || response.statusCode !== 200) {
      return;
    }
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
}

getWeatherData();
