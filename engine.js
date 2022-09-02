/*
engine.js
--------
pretend to be the bedrock engine for oreUI's sake
(C) Luminoso 2022 / MIT Licensed
*/
console.log(
  "OreUIShim Injected. NOTE: This *will* screw with running these same files in game!"
);

const USE_TRANSLATIONS = true; //requires a loc.lang at base of host dir

let _ME_OnBindings = {};
let _ME_Translations = {};

const _ME_AchievementsFacet = {
  status: 1,
  data: {
    achievementsUnlocked: 23,
    maxGamerScore: 100,
    hoursPlayed: 100,
    achievements: [],
    currentGamerScore: 100,
    maxAchievements: 200,
  },
};

const _ME_LocaleFacet = {
  locale: "en_US",
  translate: function (id) {
    if (USE_TRANSLATIONS) {
      return _ME_Translations[id];
    } else {
      console.warn(
        `[EngineWrapper/LocaleFacet] USE_TRANSLATIONS not set, skipping translate: ${id}`
      );
      return id;
    }
  },
  translateWithParameters: function (id, params) {
    if (USE_TRANSLATIONS) {
      return _ME_Translations[id]; //TODO: implememt the parameters part of translateWithParameters
    } else {
      console.warn(
        `[EngineWrapper/LocaleFacet] USE_TRANSLATIONS not set, skipping translate w/ param: ${id}`
      );
      return id;
    }
  },
};

const _ME_SoundFacet = {
  play: function (id) {
    console.log(`[EngineWrapper/SoundFacet] Sound ${id} requested.`);
  },
};

const _ME_AnimationFacet = {
  screenAnimationEnabled: true,
};

const _ME_RouterFacet = {
  engineUITransitionTime: 800,
  history: {
    location: {
      hash: "",
      search: "",
      state: "",
      pathname: "/achievements",
    },
    _ME_previousLocations: [],
    length: 5,
    action: "REPLACE",
    replace: function (path) {
      this._ME_previousLocations.push(this.location.pathname);
      this.action = "REPLACE";
      console.log("[EngineWrapper/RouterFacet] replacing path to " + path);
      this.location.pathname = path;
      _ME_OnBindings[`facet:updated:core.router`](_ME_Facets["core.router"]);
    },
    goBack: function () {
      console.warn("goBack currently doesn't seem to work!");
      console.log("[EngineWrapper/RouterFacet] goingBack.");
      this.location.pathname =
        this._ME_previousLocations[this._ME_previousLocations.length - 2];
    },
    push: function (path) {
      this.action = "PUSH";
      this._ME_previousLocations.push(this.location.pathname);
      console.log("[EngineWrapper/RouterFacet] pushing path to " + path);
      this.location.pathname = path;
      _ME_OnBindings[`facet:updated:core.router`](_ME_Facets["core.router"]);
    },
  },
};

const _ME_ScreenReaderFacet = {
  isChatTextToSpeechEnabled: false,
  isIdle: false,
  isUITextToSpeechEnabled: false,
};

const _ME_InputFacet = {
  currentInputType: 2,
  swapABButtons: false,
  acceptInputFromAllControllers: false,
  gameControllerId: 0,
  swapXYButtons: false,
};

const _ME_SplitScreenFacet = {
  numActivePlayers: 1,
  splitScreenDirection: 0,
  splitScreenPosition: 0,
};

const _ME_FeatureFlagsFacet = {
  flags: [
    "vanilla.enableSeedTemplates",
    "vanilla.enableBehaviorPacksTab",
    "vanilla.enableResourcePacksTab",
    "vanilla.enableResourcePacksRealmsPlusFeatureFlag",
  ],
};

const _ME_SafeZoneFacet = {
  safeAreaX: 1,
  screenPositionX: 0,
  safeAreaY: 1,
  screenPositionY: 0,
};

const _ME_DeviceInfoFacet = {
  pixelsPerMillimeter: 3,
  inputMethods: [0, 1, 2], // Gamepad, Touch, Mouse?
  isLowMemoryDevice: false,
  guiScaleBase: 3,
  platform: 3, //TODO: Figure out platforms
  guiScaleModifier: -1,
};

let _ME_Facets = {
  // == Core Facets == //
  "core.locale": _ME_LocaleFacet,
  "core.deviceInformation": _ME_DeviceInfoFacet,
  "core.safeZone": _ME_SafeZoneFacet,
  "core.featureFlags": _ME_FeatureFlagsFacet,
  "core.splitScreen": _ME_SplitScreenFacet,
  "core.input": _ME_InputFacet,
  "core.screenReader": _ME_ScreenReaderFacet,
  "core.router": _ME_RouterFacet,
  "core.animation": _ME_AnimationFacet,
  "core.sound": _ME_SoundFacet,
  // == Vanilla Facets == //
  "vanilla.achievements": _ME_AchievementsFacet,
};

const TriggerEvent = {
  apply: function (unk, data) {
    console.log(
      `[EngineWrapper/TriggerEvent] apply called. | ${JSON.stringify(data)}`
    );
    if (data[0] == "facet:request") {
      if (_ME_Facets.hasOwnProperty(data[1])) {
        console.log(`[EngineWrapper] Sending Dummy Facet: ${data[1]}`);
        _ME_OnBindings[`facet:updated:${data[1]}`](_ME_Facets[data[1]]);
      } else {
        console.error(`[EngineWrapper] MISSING FACET: ${data[1]}`);
        _ME_OnBindings[`facet:error:${data[1]}`](_ME_Facets[data[1]]);
      }
    } else if (data[0] == "core:exception") {
      console.error(
        `[EngineWrapper] oreUI guest has reported exception: ${data[1]}`
      );
    } else {
      console.warn(
        `[EngineWrapper] OreUI triggered ${data[0]} but we don't handle it!`
      );
    }
  },
};

const engine = {
  on: function (event, callback) {
    console.log(`[EngineWrapper] engine.on called for ${event}`);
  },
  off: function (event, callback) {
    console.log(`[EngineWrapper] engine.off called for ${event}`);
  },
  AddOrRemoveOnHandler: function (id, func, unk) {
    console.log(
      `[EngineWrapper] AddOrRemoveOnHandler w/ ID: ${JSON.stringify(
        id
      )}, Function: ${func}`
    );
    _ME_OnBindings[id] = func;
  },
  RemoveOnHandler: function (id, func, unk) {
    console.log(`[EngineWrapper] RemoveOnHandler for ID ${id}. func: ${func}`);
  },
  AddOrRemoveOffHandler: function (id, func, unk) {
    console.log(
      `[EngineWrapper] AddOrRemoveOffHandler w/ ID: ${JSON.stringify(
        id
      )}, Function: ${func}`
    );
    return true;
  },
  BindingsReady: function () {
    console.log("[EngineWrapper] BindingsReady called");
  },
};

if (USE_TRANSLATIONS) {
  console.log(
    "[EngineWrapper] Actual Translation Support was enabled (USE_TRANSLATIONS). Loading loc.lang file..."
  );
  fetch("/loc.lang")
    .then((response) => response.text())
    .then((locdat) => {
      let lines = locdat.split("\n");
      lines.forEach(function (item, ind) {
        keyval = item.split("=");
        _ME_Translations[keyval[0]] = keyval[1].replace("\r", ""); //oh windows you special snowflake
      });
    })
    .then(() => {
      engine._WindowLoaded = true;
    });
} else {
  engine._WindowLoaded = true;
}

engine.TriggerEvent = TriggerEvent;

window.engine = engine;
