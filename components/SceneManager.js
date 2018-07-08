import React from "react";
import { StyleSheet, View, Environment, asset } from "react-360";

import SceneTitle from "./SceneTitle";
import Hint from "./Hint";
import Door from "./Door";

export default class SceneManager extends React.Component {
  state = {
    currentSceneId: this.props.initialSceneId
  };

  componentDidMount() {
    this.updateScene({});
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateScene(prevState);
  }

  updateScene = prevState => {
    if (prevState.currentSceneId === this.state.currentSceneId) return;

    const currentScene = this.getCurrentScene();
    Environment.setBackgroundImage(asset(currentScene.image));
  };

  getCurrentScene = () => {
    return this.getSceneById(this.state.currentSceneId);
  };

  getSceneById = sceneId => {
    return this.props.scenes.find(scene => scene.id === sceneId);
  };

  handleDoorClick = sceneToGo => {
    this.setState({ currentSceneId: sceneToGo.id });
  };

  renderHints = (hints = []) => {
    return hints.map((hint, i) => (
      <Hint
        key={i}
        title={hint.title}
        description={hint.description}
        location={hint.location}
      />
    ));
  };

  renderDoors = (doors = []) => {
    return doors.map((door, i) => {
      const sceneToGo = this.getSceneById(door.sceneId);

      return (
        <Door
          key={i}
          onClick={this.handleDoorClick.bind(this, sceneToGo)}
          title={sceneToGo.title}
          preview={sceneToGo.preview}
          location={door.location}
        />
      );
    });
  };

  render() {
    const currentScene = this.getCurrentScene();

    return (
      <View style={{ flex: 1 }}>
        <SceneTitle title={currentScene.title} />
        {this.renderHints(currentScene.hints)}
        {this.renderDoors(currentScene.doors)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 720,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center"
  }
});
