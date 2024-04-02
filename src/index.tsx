import React, { useRef, useState, type PropsWithChildren } from 'react';
import {
  View,
  Modal,
  AppState,
  StyleSheet,
  Animated,
  type AppStateStatus,
  type ViewStyle,
  Platform,
} from 'react-native';
import { useEffectOnce } from './hooks/useEffectOnce';

export interface PreventBackgroundProps {
  block?: boolean;
  style?: ViewStyle;
  customPreventView?: React.ReactNode;
}

const Wrapper = ({
  isAllowPrevent,
  children,
}: { isAllowPrevent?: boolean } & PropsWithChildren) => {
  const _fadeAnimationVal = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isAllowPrevent) {
      Animated.timing(_fadeAnimationVal, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(_fadeAnimationVal, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllowPrevent]);

  return Platform.OS === 'android' ? (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...StyleSheet.absoluteFillObject,
        pointerEvents: isAllowPrevent ? 'auto' : 'none',
        backgroundColor: 'transparent',
        opacity: _fadeAnimationVal,
        zIndex: 9999,
      }}
    >
      {children}
    </Animated.View>
  ) : (
    <Modal
      testID="modal"
      animationType="fade"
      transparent
      renderToHardwareTextureAndroid
      visible={isAllowPrevent}
      onRequestClose={() => {}}
      hardwareAccelerated
    >
      {children}
    </Modal>
  );
};

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
    <Wrapper isAllowPrevent={isAllowPrevent}>
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
    </Wrapper>
  );
};

export default PreventBackground;
