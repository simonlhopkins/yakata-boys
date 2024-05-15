import * as Tone from "tone";

class SongManager {
  player: Tone.Player;
  constructor() {
    this.player = new Tone.Player().toDestination();
  }

  async init() {
    await Tone.start();
    await this.player.load("TaterTots.mp3");
    this.player.sync();
    this.player.start(0);
    Tone.getTransport().start();
  }
}

export default SongManager;
