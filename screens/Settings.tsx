import React from 'react';
import {useColorScheme, Text, View, Switch} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from '../themes';
import * as StylesModule from '../components/stylesheet';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {FileManager, SETTINGS_STORAGE_KEY} from '../helpers/FileManager';
import { render } from 'react-dom';

export class SettingsScreen extends React.Component {
  state = {
    analogClockFace: false,
  }

  //Any settings that change here need to be written back to storage
  _WriteSettingsToFile = () =>
  {
    let NewSettingsPayload = {
      analogClockFace: this.state.analogClockFace,
    };

    FileManager.WriteJSONToDisk(SETTINGS_STORAGE_KEY, NewSettingsPayload, false);
  };

// Start here so we can send our JSON object to the Settings screen after retrieval
  _SettingsInit = async () => {

    // Let our file manager resolve the promise

    await FileManager.ReadJSONData(SETTINGS_STORAGE_KEY)
    .then((token) => {
      if (token != null)
      {
        this.setState({analogClockFace: token.analogClockFace});
        console.log('[INIT] Set analogClockFace to ' + this.state.analogClockFace);
      }
    }).catch((error) => {
      console.error('Error Loading in Settings: ' + error);
    });
  };

  componentDidMount = () =>
  {
    this._SettingsInit();
  };

  componentWillUnMount = () =>
  {
    this._WriteSettingsToFile();
  };
 
  render()
  {
    return (
      <StylesModule.SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <StylesModule.ScrollView>
            {SettingSwitchItem("Use Analog Clock", this.state.analogClockFace, (value) => {
              // If it was set to true, then set it back to false
              this.setState({analogClockFace: value}, () => {
                console.log('New State: analogClockFace ' + this.state.analogClockFace);
                // Write settings to file
                this._WriteSettingsToFile();
              });
            })
            }
          </StylesModule.ScrollView>
        </View>
      </StylesModule.SafeAreaView>
    );
  }
}

// Allows the creation of switch items
export const SettingSwitchItem = (label:string, value: boolean, onValueChange: (value:boolean) => void) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <StylesModule.Text style={{transform: [{scale: 1.1}]}}>{label}</StylesModule.Text>
      <Switch value={value} onValueChange={onValueChange} style={{ transform: [{scale: 1.5}]}}/>
    </View>
  );
}

export default SettingsScreen;
