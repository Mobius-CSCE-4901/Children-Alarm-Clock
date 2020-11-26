import React, {Component} from 'react';
import {AppState, Appearance} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from './themes';

/*Navigation Calls*/
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/*Icon Imports*/
import IonIcons from 'react-native-vector-icons/Ionicons';

/*Screen Calls*/
import ClockScreen from './screens/Clock';
import SettingsScreen from './screens/Settings';

import AlarmScreen from './screens/Alarm';
import TimerScreen from './screens/Timer';
import AgendaList from './screens/Agenda';

/* Additional Components */
//import {Permission, PERMISSION_TYPE} from './helpers/permissions';
import {FileManager, SETTINGS_STORAGE_KEY} from './helpers/FileManager';
import { ClockFaceAppContext } from './helpers/AppContextProvider';

const Tab = createBottomTabNavigator();

// Implicit since DefaultTheme is not found for some reason
const AppTabs = (newTheme: any) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // Function that controls the icons and their color when selected/deselected
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          } else if (route.name === 'Alarm') {
            iconName = focused ? 'alarm' : 'alarm-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Timer') {
            iconName = focused ? 'timer' : 'timer-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          }

          return <IonIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        // Colors that the tabs will take. Will need to be adjusted for dark mode, if possible
        activeTintColor: newTheme.primaryColor,
        inactiveTintColor: 'gray',
        activeBackgroundColor: newTheme.secondaryColor,
        inactiveBackgroundColor: newTheme.bgColor,
      }}>
      <Tab.Screen
        name="Home"
        component={ClockScreen}
        options={{
          title: 'Home',
          //tabBarBadge: 5      // TODO: Use the badge to indicate number of timers that went off, etc.
        }}
      />
      <Tab.Screen name="Alarm" component={AlarmScreen} />
      <Tab.Screen name="Calendar" component={AgendaList} />
      <Tab.Screen name="Timer" component={TimerScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

class AppLandingPage extends Component {
  _updateSettings = () => {
    FileManager.ReadJSONData(SETTINGS_STORAGE_KEY).then((token) => {
      this.setState({analogClockFace: token.analogClockFace});
    }).catch((error) => {
      console.error('Error Updating Setting State in AppLandingPage: ' + error); });
  };

  state = {
    appState: AppState.currentState,
    theme: Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme,
    analogClockFace: false, // For initializing and Context
    setAnalogClockFaceFn: this._updateSettings, // For initializing and Context
  };

  _updateTheme = (newAppState: string) => {
    if (newAppState === 'active') {
      // Update the theme state when the app is loaded back in
      this.state.theme =
        Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;
    }
    this.setState({appState: newAppState});
  };

  componentDidMount() {
    AppState.addEventListener('change', this._updateTheme);
    AppState.addEventListener('change', this._updateSettings);

    // Test if the settings file is already created. If not, create one
    FileManager.ReadJSONData(SETTINGS_STORAGE_KEY).then((token) => {
      // Copy this JSON when using this object for settings
      let SettingsPayload = {
        analogClockFace: false,
      };

      if (token == null) {
        FileManager.WriteJSONToDisk(
          SETTINGS_STORAGE_KEY,
          SettingsPayload,
          false,
        );
      }
    }).catch((error) => {
      console.error('Error Requesting Settings in AppLandingPage: ' + error); 
    });

    this._updateSettings();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._updateTheme);
    AppState.removeEventListener('change', this._updateSettings);
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <ClockFaceAppContext.Provider value={
          {
            AnalogClockValue: this.state.analogClockFace, 
            setClockFaceValue: this.state.setAnalogClockFaceFn
          }
          }>
          <NavigationContainer>{AppTabs(this.state.theme)}</NavigationContainer>
        </ClockFaceAppContext.Provider>
      </ThemeProvider>
    );
  }
}

const App = () => {
  return <AppLandingPage />;
};

export default App;
/*
const App = () => {
  const theme = Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme;

  // Check and get permissions when the app is loaded here
  // For some reason, the app will only check one permission at a time
  //Permission.checkPermission(PERMISSION_TYPE.microphone); //TODO: Move this to a more appropriate place when the user can use audio
  Permission.checkPermission(PERMISSION_TYPE.photo);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
*/
