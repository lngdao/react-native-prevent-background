# react-native-prevent-background

[![npm version](https://badge.fury.io/js/react-native-prevent-background.svg)](https://badge.fury.io/js/react-native-prevent-background.svg)
[![build](https://github.com/zouk211/react-native-prevent-background/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/zouk211/react-native-prevent-background/actions/workflows/ci.yml)

Simple library for React Native that prevents displaying the app's current screen while in the background (suitable for apps that contain sensitive information)

<img width="250" src='https://i.ibb.co/H4Nn2Cr/SCR-20240402-muzt.png' />

## Installation

```sh
yarn add react-native-prevent-background
```

#### or

```sh
npm install react-native-prevent-background
```

## Usage

### Available props

| Property            | Type      | Default     | Description                                                                                           |
| ------------------- | --------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `block`             | boolean   | `true`      | Conditions to enable background preview prevention (e.g. useful to enable only when app is incognito) |
| `style`             | ViewStyle | `backgroundColor: '#999999'` | Style for default view (does not work when used with `customPreventView` prop)                        |
| `customPreventView` | ReactNode | `undefined` | Use to replace the default view (useful when you want to change it to suit each purpose)              |

### A simple example

```tsx
// ...
import PreventBackground from 'react-native-prevent-background';

// ...

return (
  <View>
    {/* ... rest */}

    {/* must be listed last for work properly */}
    <PreventBackground />
  </View>
);
```

### Example with `customPreventView`

<img width="250" src='https://i.ibb.co/BgSd1ZD/SCR-20240402-mskk.png' />

```tsx
// ...
import { BlurView } from '@react-native-community/blur';
import PreventBackground from 'react-native-prevent-background';

// ...

const CustomPreventionView = () => {
  return (
    <View>
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.center}>
        <Text style={styles.text}>Sensitive content</Text>
      </View>
    </View>
  );
};

const App = () => {
  // ...

  return (
    <View>
      {/* ... rest */}

      {/* must be listed last for work properly */}
      <PreventBackground />
    </View>
  );
};

// ...
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
