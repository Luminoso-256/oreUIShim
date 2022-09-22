/*
engine.js
--------
pretend to be the bedrock engine for oreUI's sake
(C) Luminoso 2022 / MIT Licensed
*/

if (navigator.userAgent.match("/cohtml/i")) {
  console.warn(
    "[EngineWrapper] OreUI Shim Injected, but the UI is being loaded in gameface!"
  );
}

const USE_TRANSLATIONS = true; //requires a loc.lang at base of host dir

let _ME_OnBindings = {};
let _ME_Translations = {};

const _ME_AchievementsFacet = {
  status: 1,
  data: {
    achievementsUnlocked: 23,
    maxGamerScore: 100,
    hoursPlayed: 100,
    achievements: [
      {
        id: 0,
        name: "Placeholder Achievement",
        description: "Placeholderr!",
        gamerScore: 30,
        progress: 0,
        progressTarget: 256,
        isLocked: false,
        isSecret: false,
        dateUnlocked: 0,
        hasReward: true,
        rewardName: "some reward name",
        isRewardOwned: false,
      },
    ],
    currentGamerScore: 100,
    maxAchievements: 200,
  },
};

//CNW screen breaks even more without these three but doesn't *yet* call anything from em so...
const _ME_CreateNewWorldBetaFacet = {
  isBetaSupported: true,
  openFeedbackPage: function () {
    console.log(`[EngineWrapper/CNWBetaFacet] openFeedbackPage()`);
  },
  optOutOfBeta: function () {
    console.log(`[EngineWrapper/CNWBetaFacet] optOutOfBeta()`);
  }
};
const _ME_UserAccountFacet = {};
const _ME_BuildSettingsFacet = {
    isDevBuild: true,
};

const _ME_TelemetryFacet = {
  fireEventButtonPressed: function (event) {
    console.log(`[EngineWrapper/VanillaTelem] EventButtonPressed: ${event}`);
  },
};
const _ME_ResourcePacksFacet = {
  texturePacks: {
    activeGlobal: [],
    active: [],
    available: [
      {
        image: "/hbui/assets/minecraft-texture-pack-31669.png",
        name: "Minecraft",
        description: "A test resource pack!",
        id: "7f4bt1a2-43dd-45b1-aa3f-0b3ca2ebd5c8",
        contentId: "7f4bt1a2-43dd-45b1-aa3f-0b3ca2ebd5c8",
        isMarketplaceItem: false,
      }
    ],
    realms: [],
    unowned: [],
  },
  behaviorPacks: {
    active: [],
    available: [
      {
        image: "/hbui/assets/minecraft-texture-pack-31669.png",
        name: "Minecraft",
        description: "A test behavior pack!",
        id: "7f4bt1a2-43dd-45b1-aa3f-0b3ca2ebd5c8",
        contentId: "7f4bt1a2-43dd-45b1-aa3f-0b3ca2ebd5c8",
        isMarketplaceItem: false,
      }
    ],
  },
  status: 0,
  marketplacePackId: "1",
  userOwnsAtLeastOnePack: true,
  prompt: {
    actions: [],
    active: !1,
    body: "",
    handleAction: () => {
      console.log("[EngineWrapper/RPFacet] prompt.handleAction()");
    },
    id: "prompt",
    title: "",
  },
  activate: () => {
    console.log("[EngineWrapper/RPFacet] activate()");
  },
  deactivate: () => {
    console.log("[EngineWrapper/RPFacet] deactivate()");
  },
};
const _ME_VanillaOptionsFacet = {
  renderDistance: 5,
  defaultRenderDistance: 10,
};

const _ME_CreateNewWorldFacet = {
  isEditorWorld: false,
  isUsingTemplate: false,
  isLockedTemplate: false,
  generalWarningState: 0,
  showedAchievementWarning: false,
  applyTemplate: {
    bind: function (a) {
      console.log("[EngineWrapper/CNWFacet] applyTemplate.bind()");
    },
  },
  createOnRealms: {
    call: function () {
      console.log("[EngineWrapper/CNWFacet] createOnRealms.call()");
    },
    error: null,
  },
  worldCreationData: {
    general: {
      worldName: "Some World",
      difficulty: 0,
      gameMode: 0,
    },
    advanced: {
      useFlatWorld: false,
      simulationDistance: 8,
      startWithMap: false,
      bonusChest: false,
      showCoordinates: false,
      firesSpreads: true,
      tntExplodes: true,
      respawnBlocksExplode: true,
      mobLoot: true,
      naturalRegeneration: true,
      tileDrops: true,
      immediateRespawn: true,
      respawnRadius: "5", // Why would anyone in their right mind make this a STRING?!
      worldSeed: "",
    },
    cheats: {
      cheatsEnabled: false,
    },
    betaFeatures: [
      {
        id: "0",
        title: "Gameplay Experiment",
        description: "Riveting Gameplay Awaits!",
        isEnabled: false,
        category: 0,
      },
      {
        id: "1",
        title: "AddOn Experiment",
        description: "The Holiday Features that never were...",
        isEnabled: false,
        category: 1,
      },
      {
        id: "2",
        title: "Internal Experiment",
        description: "oooOOOoo Seecreet!",
        isEnabled: false,
        category: 2,
      },
    ],
    multiplayer: {
      generalWarningState: 0,
      multiplayerSupported: true,
      playerPermissions: 1,
      multiplayerGame: true,
      playerAccess: 1,
      visibleToLanPlayers: true,
      friendlyFire: true,
      platformPlayerAccess: 1,
      platformPlayerAccessSupported: true,
      platformPlayerAccessEnabled: true,
      platformPlayerInviteAccessSupported: true,
    },
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
    fetch("/hbui/sound_definitions.json")
    .then((response) => response.json())
    .then((sounddat) => {
      if(sounddat[id] && sounddat[id].sounds.length != false) {
        let randomSound = sounddat[id].sounds[Math.floor(Math.random() * sounddat[id].sounds.length)].name;
        new Audio(randomSound).play();
      }
    });
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
      pathname: "/create-new-world",
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
      _ME_OnBindings[`facet:updated:core.router`](_ME_Facets["core.router"]);
      this._ME_previousLocations.pop();
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
    "facet",
    "core.deviceInformation",
    "core.input",
    "core.locale",
    "core.router",
    "core.safeZone",
    "core.screenReader",
    "core.splitScreen",
    "vanilla.achievements",
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
  
const _ME_RealmsStoriesFacet = {
  data: {
    stories: [
      {
        id: 1,
        isNewStoryPost: true,
        body: "Hello!",
        image: "/hbui/assets/world-preview-default-d72bc.jpg",
        author: {
          gamerTag: "SomeoneRandom",
        },
        timePosted: "Idk maybe 2022-01-01",
        totalComments: 1,
        totalLikes: 1,
        comments: [
          {
            body: "How did you get access to this?",
            author: {
              gamerTag: "Mojang",
            },
          }
        ],
      },
    ],
    members: [
      {
        gamerTag: "Mojang",
        isOnline: true,
        role: 2,
        profileStatus: 1,
        recentSessionsStatus: 1,
        recentSessions: [],
      },
      {
        gamerTag: "SomeoneRandom",
        gamerIcon: "/hbui/assets/minecraft-texture-pack-31669.png",
        isOnline: false,
        role: 1,
        profileStatus: 1,
        recentSessionsStatus: 1,
        recentSessions: [],
      },
    ],
  },
};

const _ME_SeedTemplatesFacet = {
  templates: [
    {
      seedValue: "0",
      title: "The Nothing Seed",
      image: "/hbui/assets/world-preview-default-d72bc.jpg",
    }
  ],
};

const _ME_PlayerMessagingServiceFacet = {
  data: {
    messages: [
      {
        id: "0",
        template: "ImageText",
        surface: "LoginAnnouncement",
        additionalProperties: [
          {
            key: "header",
            value: "Test",
          },
          {
            key: "body",
            value: "Test",
          },
        ],
        images: [
          {
            id: "Primary",
            isLoaded: true,
            url: "/hbui/assets/world-preview-default-d72bc.jpg",
          },
        ],
        buttons: [
          {
            id: "Dismiss",
            text: "Test",
            reportClick: function () {
              console.log("[EngineWrapper/PlayerMessagingServiceFacet] reportClick()");
            },
          },
        ],
      },
      {
        id: "1",
        template: "ImageThumbnailCTA",
        surface: "LoginAnnouncement",
        additionalProperties: [
          {
            key: "header",
            value: "Hello World!",
          },
          {
            key: "body",
            value: "This is just a test!",
          },
        ],
        images: [
          {
            id: "Primary",
            isLoaded: true,
            url: "/hbui/assets/world-preview-default-d72bc.jpg",
          },
          {
            id: "Secondary",
            isLoaded: true,
            url: "/hbui/assets/world-preview-default-d72bc.jpg",
          },
        ],
        buttons: [
          {
            id: "CallToAction",
            text: "Hello?",
            reportClick: function () {
              console.log("[EngineWrapper/PlayerMessagingServiceFacet] reportClick()");
            },
          },
        ],
      },
      {
        id: "2",
        template: "HeroImageCTA",
        surface: "LoginAnnouncement",
        additionalProperties: [
          {
            key: "header",
            value: "Hello World!",
          },
          {
            key: "body",
            value: "This is just a test!",
          },
        ],
        images: [
          {
            id: "Primary",
            isLoaded: true,
            url: "/hbui/assets/world-preview-default-d72bc.jpg",
          },
        ],
        buttons: [
          {
            id: "CallToAction",
            text: "Hello?",
            reportClick: function () {
              console.log("[EngineWrapper/PlayerMessagingServiceFacet] reportClick()");
            },
          },
        ],
      },
    ],
  },
  reportClick: function (a) {
    console.log("[EngineWrapper/PlayerMessagingServiceFacet] reportClick.bind()");
  },
  reportDismiss: function (a) {
    console.log("[EngineWrapper/PlayerMessagingServiceFacet] reportClick.bind()");
  },
};

const _ME_SimulationDistanceOptionsFacet = {
  simulationDistanceOptions: [4, 6, 8, 10],
};

const _ME_PlayerReportFacet = {
  reportPlayer: function(whereReport, reason, message, xuid, uuid) {
    console.log("[EngineWrapper/PlayerReportFacet] reportPlayer()");
  }
};

const _ME_MarketplaceSuggestionsFacet = {
  getMorePacks: {
    title: "test",
    pageId: 0,
  }
};

const _ME_PlayerBannedFacet = {
  openBannedInfoPage: function () {
    console.log("[EngineWrapper/PlayerBannedFacet] openBannedInfoPage()");
  },
};

const _ME_DebugSettingsFacet = {
  isBiomeOverrideActive: false,
  flatNether: false,
  dimension: 0,
  allBiomes: [
    {
      label: "plains",
      dimension: 0,
      id: 0,
    },
    {
      label: "birch_forest",
      dimension: 0,
      id: 1,
    },
    {
      label: "jungle",
      dimension: 0,
      id: 2,
    },
    {
      label: "hell",
      dimension: 1,
      id: 0,
    },
    {
      label: "basalt_delta",
      dimension: 1,
      id: 1,
    },
    {
      label: "warped_forest",
      dimension: 1,
      id: 2,
    },
    {
      label: "crimson_forest",
      dimension: 1,
      id: 3,
    },
  ],
  spawnDimensionId: 0,
  spawnBiomeId: 0,
  biomeOverrideId: 0,
  defaultSpawnBiome: 0,
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
  "vanilla.createNewWorld": _ME_CreateNewWorldFacet,
  "vanilla.telemetry": _ME_TelemetryFacet,
  "vanilla.createNewWorldBeta": _ME_CreateNewWorldBetaFacet,
  "vanilla.userAccount": _ME_UserAccountFacet,
  "vanilla.buildSettings": _ME_BuildSettingsFacet,
  "vanilla.debugSettings": _ME_DebugSettingsFacet,
  "vanilla.resourcePacks": _ME_ResourcePacksFacet,
  "vanilla.options": _ME_VanillaOptionsFacet,
  "vanilla.simulationDistanceOptions": _ME_SimulationDistanceOptionsFacet,
  "vanilla.seedTemplates": _ME_SeedTemplatesFacet,
  "vanilla.realmsStories": _ME_RealmsStoriesFacet,
  "vanilla.playermessagingservice": _ME_PlayerMessagingServiceFacet,
  "vanilla.playerReport": _ME_PlayerReportFacet,
  "vanilla.marketplaceSuggestions": _ME_MarketplaceSuggestionsFacet,
  "vanilla.playerBanned": _ME_PlayerBannedFacet,
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
  AddOrRemoveOffHandler: function (id) {
    console.log(
      `[EngineWrapper] AddOrRemoveOffHandler w/ ID: ${JSON.stringify(id)}`
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
