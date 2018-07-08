import React from "react";
import { StyleSheet, Text, View, asset, VrButton, Animated } from "react-360";

const INITIAL_PREVIEW_SIZE = 64;
const SCALED_PREVIEW_SIZE = 200;
const PREVIEW_ANIMATION_DURATION = 150;

export default class Door extends React.Component {
  state = {
    isOverButton: false,
    isOverPreview: false,
    previewSize: new Animated.Value(INITIAL_PREVIEW_SIZE)
  };

  handlePreviewEnter = () => {
    Animated.timing(this.state.previewSize, {
      toValue: SCALED_PREVIEW_SIZE,
      duration: PREVIEW_ANIMATION_DURATION
    }).start();

    this.setState({ isOverPreview: true });
  };

  handlePreviewExit = () => {
    Animated.timing(this.state.previewSize, {
      toValue: INITIAL_PREVIEW_SIZE,
      duration: PREVIEW_ANIMATION_DURATION
    }).start();

    this.setState({ isOverPreview: false });
  };

  handleButtonEnter = () => {
    this.setState({ isOverButton: true });
  };

  handleButtonExit = () => {
    this.setState({ isOverButton: false });
  };

  handleButtonClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const highlightedBoxStyle = {
      backgroundColor: this.state.isOverButton ? "#b36800" : "#ff9500"
    };

    return (
      <View
        style={{
          top: this.props.location.top,
          left: this.props.location.left,
          position: "absolute"
        }}
      >
        <VrButton
          style={[styles.box, highlightedBoxStyle]}
          onEnter={this.handleButtonEnter}
          onExit={this.handleButtonExit}
          onClick={this.handleButtonClick}
        >
          <Text style={{ top: -40 }}>{`${this.props.title}`}</Text>

          <Animated.Image
            source={asset(this.props.preview)}
            onEnter={this.handlePreviewEnter}
            onExit={this.handlePreviewExit}
            style={[
              styles.image,
              {
                width: this.state.previewSize,
                height: this.state.previewSize,
                borderWidth: this.state.isOverPreview ? 1 : 0
              }
            ]}
          />
        </VrButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    top: 55,
    position: "absolute",
    borderRadius: 32,
    borderColor: "rgba(255, 255, 255, 1)"
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    width: 130,
    height: 130
  },
  title: {
    fontSize: 20
  }
});
