import React, { useState } from 'react';
import {
  View,
  Modal,
  AppState,
  StyleSheet,
  type AppStateStatus,
  type ViewStyle,
} from 'react-native';
import { useEffectOnce } from './hooks/useEffectOnce';

export interface PreventBackgroundProps {
  block?: boolean;
  style?: ViewStyle;
  customPreventView?: React.ReactNode;
}

const PreventBackground = (props: PreventBackgroundProps) => {
  const { block = true, style, customPreventView } = props;

  const [appState, setAppState] = useState(AppState.currentState);

  const isAllowPrevent = appState !== 'active' && block;

  useEffectOnce(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);
  });

  return (
    <Modal
      testID="modal"
      animationType="fade"
      transparent={true}
      visible={isAllowPrevent}
    >
      {React.isValidElement(customPreventView) ? (
        customPreventView
      ) : (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: '#999999',
            ...StyleSheet.absoluteFillObject,
            ...style,
          }}
        />
      )}
    </Modal>
  );
};

export default PreventBackground;
