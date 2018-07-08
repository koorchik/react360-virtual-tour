import React from "react";
import { StyleSheet, Text, Animated } from "react-360";

const ANIMATION_DURATION = 150;

export default class SceneTitle extends React.Component {
  state = {
    rotateX: new Animated.Value(0)
  };

  handleTitleEnter = () => {
    Animated.sequence([
      Animated.timing(this.state.rotateX, {
        toValue: -20,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.state.rotateX, {
        toValue: 20,
        duration: ANIMATION_DURATION
      }),
      Animated.spring(this.state.rotateX, {
        toValue: 0
      })
    ]).start();
  };

  render() {
    return (
      <Animated.View
        style={[styles.box, { transform: [{ rotateZ: this.state.rotateX }] }]}
        onEnter={this.handleTitleEnter}
      >
        <Text style={styles.title}>{`You are at "${this.props.title}"`}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    padding: 20,
    left: 4680 / 2,
    top: 500,
    backgroundColor: "#1eaaf7",
    borderColor: "#639dda",
    borderWidth: 2,
    borderRadius: 10,
    opacity: 0.8
  },
  title: {
    fontSize: 30
  }
});
