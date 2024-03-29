import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export const ICON_COLOR = 'white'
export const TEXT_COLOR = 'white'
export const ERROR_COLOR = '#ffd98e'//'#ffbd67'
export const ICON_SIZE = 100
export const ICON_SIZE_SMALL = 40

export const filterOptions = [{status: 'daily'}, {status: 'hourly'}]

export const weatherIcons = {
    Thunderstorm: <Ionicons name="thunderstorm-outline" size={ICON_SIZE} color={ICON_COLOR} />,
    Drizzle: <Feather name="cloud-drizzle" size={ICON_SIZE} color={ICON_COLOR} />,
    Rain: <Ionicons name="rainy-outline" size={ICON_SIZE} color={ICON_COLOR} />,
    Snow: <Ionicons name="snow" size={ICON_SIZE} color={ICON_COLOR} />,
    Tornado: <MaterialCommunityIcons name="weather-tornado" size={ICON_SIZE} color={ICON_COLOR} />,
    Clear: <Feather name="sun" size={ICON_SIZE} color={ICON_COLOR} />,
    Clouds: <Entypo name="icloud" size={ICON_SIZE} color={ICON_COLOR} />,
}

export const MistCategory = <Fontisto name="day-haze" size={ICON_SIZE} color={ICON_COLOR} />
export const MistCategorySmall = <Fontisto name="day-haze" size={ICON_SIZE_SMALL} color={ICON_COLOR} />

export const weatherIconsSmall = {
  Thunderstorm: <Ionicons name="thunderstorm-outline" size={ICON_SIZE_SMALL} color={ICON_COLOR} />,
  Drizzle: <Feather name="cloud-drizzle" size={ICON_SIZE_SMALL} color={ICON_COLOR} />,
  Rain: <Ionicons name="rainy-outline" size={ICON_SIZE_SMALL} color={ICON_COLOR} />,
  Snow: <Ionicons name="snow" size={ICON_SIZE_SMALL} color={ICON_COLOR} />,
  Tornado: <MaterialCommunityIcons name="weather-tornado" size={ICON_SIZE_SMALL} color={ICON_COLOR} />,
  Clear: <Feather name="sun" size={ICON_SIZE_SMALL} color={ICON_COLOR} />,
  Clouds: <Entypo name="icloud" size={ICON_SIZE_SMALL} color={ICON_COLOR} />,
}

export const iconsUnits = {
  pressure: {
    icon: <Entypo name='air' size={30} color={TEXT_COLOR} />,
    unit: 'hPa',
  },
  humidity: {
    icon: <Entypo name='drop' size={30} color={TEXT_COLOR} />,
    unit: '%',
  },
  wind: {
    icon: <Fontisto name="wind" size={30} color={TEXT_COLOR} />,
    unit: {metric:'km/h', imperial: 'mph'}
  },
  visibility: {
    icon: <MaterialIcons name="visibility" size={30} color={TEXT_COLOR} />,
    unit: 'm'
  },
  feels_like: {
    icon: <FontAwesome name="thermometer-2" size={30} color={ICON_COLOR} />,
    unit: {metric:'°C', imperial: '°F'}
  }
}