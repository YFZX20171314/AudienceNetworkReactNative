import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import { AppEventsLogger } from 'react-native-fbsdk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment-timezone';

import * as dateRangeActions from '../actions/dateRange';

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  displayBlock: {
    flex: 6,
    flexDirection: 'row',
  },
  display: {
    flexDirection: 'row',
    padding: 10,
  },
  iconBlock: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RangePicker = (props) => {
  const { startDate, endDate, setPreviousDateRange, setNextDateRange, navigation } = props;

  let startYearShowAs = '';
  let endYearShowAs = '';

  if (!(moment(startDate).year() === moment(endDate).year() && moment(startDate).year() === moment().year())) {
    startYearShowAs = `, ${moment(startDate).year()}`;
    endYearShowAs = `, ${moment(endDate).year()}`;
  }

  return (<View style={styles.container}>
    <TouchableOpacity
      style={styles.displayBlock}
      onPress={() => {
        navigation.navigate('DateSettings');
        AppEventsLogger.logEvent('press-change-date-range');
      }}
    >
      <View style={styles.display}>
        <Text>{`${moment(startDate).format('MMM DD')}${startYearShowAs} - ${moment(endDate).format('MMM DD')}${endYearShowAs}`}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.iconBlock}
      onPress={() => {
        setPreviousDateRange();
        AppEventsLogger.logEvent('press-previous-date-range-button');
      }}
    >
      <Icon style={styles.icon} name="chevron-left" size={20} color="gray" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.iconBlock}
      onPress={() => {
        setNextDateRange();
        AppEventsLogger.logEvent('press-next-date-range-button');
      }}
    >
      <Icon style={styles.icon} name="chevron-right" size={20} color="gray" />
    </TouchableOpacity>
  </View>);
};

RangePicker.propTypes = {
  startDate: React.PropTypes.object.isRequired,
  endDate: React.PropTypes.object.isRequired,
  setPreviousDateRange: React.PropTypes.func.isRequired,
  setNextDateRange: React.PropTypes.func.isRequired,
  navigation: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  startDate: state.dateRange.startDate,
  endDate: state.dateRange.endDate,
});

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(dateRangeActions, dispatch),
)(RangePicker);
