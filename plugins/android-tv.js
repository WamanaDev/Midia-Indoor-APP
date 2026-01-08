const { withAndroidManifest } = require("@expo/config-plugins");

const androidTvPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;

    // -------------------------------
    // Garante que uses-feature exista
    // -------------------------------
    if (!manifest["uses-feature"]) {
      manifest["uses-feature"] = [];
    }

    // Verifica se Leanback já existe
    const leanbackExists = manifest["uses-feature"].some(
      (feature) => feature.$?.["android:name"] === "android.software.leanback"
    );

    if (!leanbackExists) {
      manifest["uses-feature"].push({
        $: {
          "android:name": "android.software.leanback",
          "android:required": "false",
        },
      });
    }

    // -------------------------------
    // Garante que application exista
    // -------------------------------
    if (!manifest.application) {
      manifest.application = [{}];
    }

    const app = manifest.application[0];

    // Adiciona banner para TV (ignorado em celular/tablet)
    app.$ = app.$ || {};
    app.$["android:banner"] = "@drawable/tv_banner";

    // -------------------------------
    // Garante que activity exista
    // -------------------------------
    if (!app.activity) {
      app.activity = [{}];
    }

    const activity = app.activity[0];

    // -------------------------------
    // Garante array de intent-filter
    // -------------------------------
    if (!activity["intent-filter"]) {
      activity["intent-filter"] = [];
    }

    // Verifica se já existe LEANBACK_LAUNCHER
    const hasLeanbackLauncher = activity["intent-filter"].some((filter) =>
      filter.category?.some(
        (c) =>
          c.$?.["android:name"] === "android.intent.category.LEANBACK_LAUNCHER"
      )
    );

    if (!hasLeanbackLauncher) {
      activity["intent-filter"].push({
        $: {}, // necessário para parser do AndroidManifest
        action: [{ $: { "android:name": "android.intent.action.MAIN" } }],
        category: [
          { $: { "android:name": "android.intent.category.LAUNCHER" } }, // celular/tablet
          {
            $: { "android:name": "android.intent.category.LEANBACK_LAUNCHER" },
          }, // TV
        ],
      });
    }

    return config;
  });
};

module.exports = androidTvPlugin;
