import {Agenda} from 'react-native-calendars';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';

const mobius = {key: 'mobius', color: 'cyan'};
const lecture = {key: 'lecture', color: 'blue'};
const team = {key: 'team', color: 'teal'};

const getEventData = () => {
  let events = {
    '2020-11-02': [
      {
        name: 'Group Project - Mobius ',
        start: '2:00 pm',
        end: '4:00 pm',
        other: 'Mobius Description',
        key: 'mobius',
        color: 'cyan',
      },
    ],

    '2020-11-03': [
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
        key: 'lecture',
        color: 'blue',
      },
    ],

    '2020-11-05': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
        other: 'Team Description',
        key: 'team',
        color: 'teal',
      },
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
        key: 'lecture',
        color: 'blue',
      },
    ],

    '2020-11-09': [
      {
        name: 'Group Project - Mobius ',
        start: '2:00 pm',
        end: '4:00 pm',
        other: 'Mobius Description',
        key: 'mobius',
        color: 'cyan',
      },
    ],

    '2020-11-10': [
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
        key: 'lecture',
        color: 'blue',
      },
    ],

    '2020-11-12': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
        other: 'Team Description',
        key: 'team',
        color: 'teal',
      },
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
        key: 'lecture',
        color: 'blue',
      },
    ],

    '2020-11-16': [
      {
        name: 'Group Project - Mobius ',
        start: '2:00 pm',
        end: '4:00 pm',
        other: 'Mobius Description',
        key: 'mobius',
        color: 'cyan',
      },
    ],

    '2020-11-17': [
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
        key: 'lecture',
        color: 'blue',
      },
    ],

    '2020-11-19': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
        other: 'Team Description',
        key: 'team',
        color: 'teal',
      },
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
        key: 'lecture',
        color: 'blue',
      },
    ],

    '2020-11-23': [
      {
        name: 'Group Project - Mobius ',
        start: '2:00 pm',
        end: '4:00 pm',
        other: 'Mobius Description',
        key: 'mobius',
        color: 'cyan',
      },
    ],

    '2020-11-24': [
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
        key: 'lecture',
        color: 'blue',
      },
    ],

    '2020-11-26': [
      {
        name: 'CSCE 4901 - Team Presentation',
        start: '11:30 am',
        end: '12:50 pm',
        other: 'Team Description',
        key: 'team',
        color: 'teal',
      },
      {
        name: 'CSCE 3550 - Lecture',
        start: '4:00 pm',
        end: '5:20 pm',
        other: 'Lecture Description',
        key: 'lecture',
        color: 'blue',
      },
    ],
  };

  return [events, false];
};

export default function AgendaList({props, navigation, route}) {
  const [monthData, loadingData] = getEventData();

  const renderItem = (item, firstItemInDay) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => Alert.alert(item.name, item.other)}>
        <>
          <Text>
            {item.start}
            {/* {item.start} - {item.end} */}
          </Text>
          <Text>{item.name}</Text>
        </>
      </TouchableOpacity>
    );
  };

  if (loadingData || !monthData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Agenda
        items={monthData}
        renderItem={(item, firstItemInDay) => {
          return renderItem(item, firstItemInDay);
        }}
        renderEmptyData={() => {
          return (
            <Text style={styles.emptyDate}>
              No events scheduled for this day.
            </Text>
          );
        }}
        markedDates={{
          '2020-11-02': {
            dots: [mobius],
          },

          '2020-11-03': {
            dots: [lecture],
          },

          '2020-11-05': {
            dots: [lecture, team],
          },

          '2020-11-09': {
            dots: [mobius],
          },

          '2020-11-10': {
            dots: [lecture],
          },

          '2020-11-12': {
            dots: [lecture, team],
          },
          '2020-11-16': {
            dots: [mobius],
          },

          '2020-11-17': {
            dots: [lecture],
          },

          '2020-11-19': {
            dots: [lecture, team],
          },

          '2020-11-23': {
            dots: [mobius],
          },

          '2020-11-24': {
            dots: [lecture],
          },

          '2020-11-26': {
            dots: [lecture, team],
          },
        }}
        markingType={'multi-dot'}
        theme={{
          agendaKnobColor: '#059033',
        }}
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    textAlign: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
