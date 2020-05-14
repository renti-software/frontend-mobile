import { Ionicons }  from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={'md-arrow-down'}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
