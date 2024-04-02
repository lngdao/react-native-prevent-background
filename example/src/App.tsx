import * as React from 'react';

import { StyleSheet, View, Text, Pressable } from 'react-native';
import PreventBackground from 'react-native-prevent-background';

export default function App() {
  const [isPrevent, setPrevent] = React.useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sensitive content</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          setPrevent((prev) => !prev);
        }}
      >
        <Text
          style={styles.btn_text}
        >{`Prevent with condition: ${isPrevent ? 'on' : 'off'}`}</Text>
      </Pressable>
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'orange',
  },
  btn_text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
