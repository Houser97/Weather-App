import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const ICON_COLOR = 'white'
export const TEXT_COLOR = 'white'
export const ICON_SIZE = 100

export const weatherIcons = {
    Thunderstorm: <Ionicons name="thunderstorm-outline" size={ICON_SIZE} color={ICON_COLOR} />,
    Drizzle: <Feather name="cloud-drizzle" size={ICON_SIZE} color={ICON_COLOR} />,
    Rain: <Ionicons name="rainy-outline" size={ICON_SIZE} color={ICON_COLOR} />,
    Snow: <Ionicons name="snow" size={ICON_SIZE} color={ICON_COLOR} />,
    Tornado: <MaterialCommunityIcons name="weather-tornado" size={ICON_SIZE} color={ICON_COLOR} />,
    Clear: <MaterialCommunityIcons name="weather-sunset" size={ICON_SIZE} color={ICON_COLOR} />,
    Clouds: <Entypo name="icloud" size={ICON_SIZE} color={ICON_COLOR} />,
}

export const iconsUnits = {
  pressure: {
    icon: <Entypo name='air' size={24} color={TEXT_COLOR} />,
    unit: 'Pa',
  },
  humidity: {
    icon: <Entypo name='drop' size={24} color={TEXT_COLOR} />,
    unit: '%',
  },
  wind: {
    icon: <Fontisto name="wind" size={24} color={TEXT_COLOR} />,
    unit: 'km/h'
  },
  visibility: {
    icon: <MaterialIcons name="visibility" size={24} color={TEXT_COLOR} />,
    unit: 'm'
  },
}