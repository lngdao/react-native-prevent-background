import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import PreventBackground from 'react-native-prevent-background';

export default function App() {
  const [isPrevent, setPrevent] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sensitive content</Text>
      <Button
        onPress={() => {
          setPrevent((prev) => !prev);
        }}
        title={`Prevent with condition: ${isPrevent ? 'on' : 'off'}`}
      />

      <PreventBackground block={isPrevent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
