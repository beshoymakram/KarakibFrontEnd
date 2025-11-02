class SoundPlayer {
  constructor() {
    this.sounds = {
      success: new Audio('/sounds/success.mp3'),
      error: new Audio('/sounds/error.mp3')
    };

    Object.values(this.sounds).forEach(audio => {
      audio.load();
    });
  }

  play(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => {
        console.log('Sound play failed:', err);
      });
    }
  }
}

export default new SoundPlayer();
