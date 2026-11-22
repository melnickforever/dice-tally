// Marks android.hardware.screen.portrait as optional so Google Play does not
// filter out devices (tablets, desktop, etc.) that lack a portrait screen.
const { withAndroidManifest } = require('expo/config-plugins');

module.exports = function withOptionalPortrait(config) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    const features = manifest['uses-feature'] ?? [];
    const name = 'android.hardware.screen.portrait';
    const existing = features.find((f) => f.$['android:name'] === name);
    if (existing) {
      existing.$['android:required'] = 'false';
    } else {
      features.push({ $: { 'android:name': name, 'android:required': 'false' } });
    }
    manifest['uses-feature'] = features;
    return cfg;
  });
};
