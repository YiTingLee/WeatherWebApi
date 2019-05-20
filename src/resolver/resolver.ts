import { WeatherModel } from './../model/weather.model';
const locationMapping = {
  'TAIPEI': '臺北市',
  'NEWTAIPEI': '新北市',
  'TAOYUAN': '桃園市'
}
export const resolvers = {
  Query: {
    async getWeather(preObj, args, context, info) {
      const date = new Date(args.req.time);
      const twelveHourBefore = new Date(date)
      twelveHourBefore.setHours(date.getHours() - 12);

      const weather = await WeatherModel.findOne(
        {
          location: locationMapping[args.req.location],
          startTime: { $gte: twelveHourBefore, $lt: date }
        }
      )
      if (!weather) {
        throw Error('No Record');
      }
      // endTime = startTime + 12 hours
      const endTime = new Date(weather['startTime']);
      endTime.setHours(date.getHours() + 12);
      weather['endTime'] = endTime;
      return weather;
    }
  }
}
