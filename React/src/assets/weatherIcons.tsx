import Clear from './icons/weather/clear-day.svg'
import ClearNight from './icons/weather/clear-night.svg'
import Drizzle from './icons/weather/dayDrizzle.svg'
import DrizzleNight from './icons/weather/nightDrizzle.svg'
import Haze from './icons/weather/hazeDay.svg'
import HazeNight from './icons/weather/hazeNight.svg'
import Mist from './icons/weather/mist.svg'
import Rain from './icons/weather/dayRain.svg'
import RainNight from './icons/weather/nightRain.svg'
import Smoke from './icons/weather/smokeDay.svg'
import SmokeNight from './icons/weather/smokeNight.svg'
import Snow from './icons/weather/snowDay.svg'
import SnowNight from './icons/weather/snowNight.svg'
import Thunderstorm from './icons/weather/thunderstormsDay.svg'
import ThunderstormNight from './icons/weather/thunderstormsNight.svg'
import Tornado from './icons/weather/tornado.svg'
import Dust from './icons/weather/dustDay.svg'
import DustNight from './icons/weather/dustNight.svg'
import Fog from './icons/weather/fogDay.svg'
import FogNight from './icons/weather/fogNight.svg'
import Humidity from './icons/general/humidity.svg'
import Clouds from './icons/weather/cloudyDay.svg'
import CloudsNight from './icons/weather/cloudyNight.svg'
import Barometer from './icons/general/barometer.svg'
import WindSpeed from './icons/general/dust-wind.svg'
import Sunrise from './icons/weather/sunrise.svg'
import Sunset from './icons/weather/sunset.svg'
import Min from './icons/general/thermometer-colder.svg'
import Max from './icons/general/thermometer-warmer.svg'
import FeelsDay from './icons/weather/day.svg'
import FeelsNight from './icons/weather/night.svg'

// Se define index signature para poder ingresar al objeto de forma dinámica.
interface iconsType {
    [index: string]: string
}

export const weatherIcons: iconsType = {
    //Day
    Thunderstorm,
    Drizzle,
    Rain,
    Snow,
    Clear,
    Clouds,
    Haze,
    Dust,
    Fog,
    Smoke,

    //Night
    ThunderstormNight,
    DrizzleNight,
    ClearNight,
    RainNight,
    SmokeNight,
    SnowNight,
    DustNight,
    FogNight,
    CloudsNight,
    HazeNight,

    //General
    Tornado,
    Mist,
    Humidity,
    Barometer,
    WindSpeed,
    Sunrise,
    Sunset,
    Min,
    Max,
    FeelsDay,
    FeelsNight
}