import { WeatherModel } from './../model/weather.model';
import * as request from 'request';

const url = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-A6F5D598-0FD9-4C6A-B09F-AA39FAA5581A&downloadType=WEB&format=JSON';
const cityList = ['臺北市', '新北市', '桃園市']
export function getWeatherData() {
  request.get(url, async (error, response, body) => {
    if (error || !response || response.statusCode !== 200) {
      return;
    }
    const newWeatherList = convertDataForDB(JSON.parse(body));
    await WeatherModel.deleteMany({ startTime: { '$gte': newWeatherList[0].startTime }});
    WeatherModel.insertMany(newWeatherList);
  });
}

function convertDataForDB({ cwbopendata }) {
  if (!cwbopendata || !cwbopendata.dataset || !cwbopendata.dataset.location) {
    return;
  }
  const location = cwbopendata.dataset.location.filter(item => cityList.includes(item.locationName));
  const result = [];
  location.forEach(element => {
    for(let i = 0; i < 3; i++) {
      const item = {};
      item['location'] = element.locationName;
      item['wx'] = element.weatherElement[0].time[i].parameter.parameterName;
      item['maxT'] = Number(element.weatherElement[1].time[i].parameter.parameterName);
      item['minT'] = Number(element.weatherElement[2].time[i].parameter.parameterName);
      item['ci'] = element.weatherElement[3].time[i].parameter.parameterName;
      item['pop'] = Number(element.weatherElement[4].time[i].parameter.parameterName);
      item['startTime'] = new Date(element.weatherElement[0].time[i].startTime);
      result.push(item);
    }
  })
  return result;
}
