# WeatherWebApi

 - use nodejs, graphql, mongodb, and weather open data to build a weather webAPI.
 - need to install typescript, node, nodemon on your machine.

```
git clone https://github.com/YiTingLee/WeatherWebApi.git
cd WeatherWebApi
npm install
npm run start or npm run start:dev
```

## How to use

 - query
```
query ($request: WeatherReq!) {
  getWeather(req: $request) {
    location
    wx
    startTime
    endTime
    maxT
    minT
    ci
    pop
  }
}
```

- query variables

```
{
  "request": {
    "time": "2019-05-21T16:46:56.078Z",
    "location": "TAIPEI"
  }
}
```

- result
```
{
  "data": {
    "getWeather": {
      "location": "臺北市",
      "wx": "多雲時晴",
      "startTime": "1558432800000",
      "endTime": "1558411200000",
      "maxT": 21,
      "minT": 19,
      "ci": "稍有寒意",
      "pop": 0
    }
  }
}
```
