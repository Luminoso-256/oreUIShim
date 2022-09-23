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
const FIX_CSS = true;

let _ME_OnBindings = {};
let _ME_Translations = {};

const _ME_AchievementsRewardFacet = {};
const _ME_AchievementsFacet = {
  status: 1,
  data: {
    achievementsUnlocked: 1,
    maxGamerScore: 90,
    hoursPlayed: 100,
    achievements: [
      {
        id: "0",
        name: "Placeholder Achievement",
        description: "Placeholderr!",
        gamerScore: 30,
        progress: 0,
        progressTarget: 0,
        isLocked: false,
        isSecret: false,
        dateUnlocked: Date.now(),
        hasReward: true,
        isRewardOwned: false,
        rewardId: "test",
        rewardName: "Test",
        rewardImage: "/hbui/assets/minecraft-texture-pack-31669.png",
      },
      {
        id: "1",
        name: "Placeholder Achievement",
        description: "Placeholderr!",
        gamerScore: 30,
        progress: 0,
        progressTarget: 0,
        isLocked: true,
        isSecret: false,
        dateUnlocked: 0,
        hasReward: true,
        isRewardOwned: false,
        rewardId: "test",
        rewardName: "Test",
        rewardImage: "/hbui/assets/minecraft-texture-pack-31669.png",
      },
      {
        id: "2",
        name: "Placeholder Achievement",
        description: "Placeholderr!",
        gamerScore: 30,
        progress: 0.5,
        progressTarget: 16,
        isLocked: true,
        isSecret: false,
        dateUnlocked: 0,
        hasReward: true,
        isRewardOwned: false,
        rewardId: "test",
        rewardName: "Test",
        rewardImage: "/hbui/assets/minecraft-texture-pack-31669.png",
      },
    ],
    currentGamerScore: 30,
    maxAchievements: 3,
  },
};

const _ME_CreateNewWorldBetaFacet = {
  isBetaSupported: true,
  openFeedbackPage: function () {
    console.log(`[EngineWrapper/CNWBetaFacet] openFeedbackPage()`);
  },
  optOutOfBeta: function () {
    console.log(`[EngineWrapper/CNWBetaFacet] optOutOfBeta()`);
  }
};
const _ME_UserAccountFacet = {
  isTrialAccount: false,
  isLoggedInWithMicrosoftAccount: true,
  hasPremiumNetworkAccess: true,
  showPremiumNetworkUpsellModal: function () {
    console.log(`[EngineWrapper/UserAccountFacet] showPremiumNetworkUpsellModal()`);
  },
  showMicrosoftAccountLogInScreen: function () {
    console.log(`[EngineWrapper/UserAccountFacet] showMicrosoftAccountLogInScreen()`);
  },
};
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
  applyTemplate: function (a) {
    console.log("[EngineWrapper/CNWFacet] applyTemplate.bind()");
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
      let translation = _ME_Translations[id];
      for (i = 1; i <= params.length; i++) {
        translation = translation?.replaceAll("%" + i + "$s", params[i - 1])
      };

      return translation;
    } else {
      console.warn(
        `[EngineWrapper/LocaleFacet] USE_TRANSLATIONS not set, skipping translate w/ param: ${id}`
      );
      return id;
    }
  },
  formatDate: function (date) {
    return new Date(date).toLocaleDateString();
  },
};

const _ME_SoundFacet = {
  play: function (id) {
    console.log(`[EngineWrapper/SoundFacet] Sound ${id} requested.`);
    fetch("/hbui/sound_definitions.json")
      .then((response) => response.json())
      .then((sounddat) => {
        if(sounddat[id] && sounddat[id].sounds.length != false) {
          let randomSound = sounddat[id].sounds[Math.floor(Math.random() * sounddat[id].sounds.length)].name;
          new Audio(randomSound).play();
        }
      });
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

const _ME_InputMethods = {
  GAMEPAD_INPUT_METHOD: 0,
  TOUCH_INPUT_METHOD: 1,
  MOUSE_INPUT_METHOD: 2,
  MOTION_CONTROLLER_INPUT_METHOD: 3,
};

const _ME_InputFacet = {
  currentInputType: _ME_InputMethods.MOUSE_INPUT_METHOD,
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

const _ME_Platforms = {
  IOS: 0,
  GOOGLE: 1,
  AMAZON_HANDHELD: 2,
  UWP: 3,
  XBOX: 4,
  NX_HANDHELD: 5,
  PS4: 6,
  GEARVR: 7,
  WIN32: 8,
  MACOS: 9,
  AMAZON_TV: 10,
  NX_TV: 11,
  xPS5: 12,
};

const _ME_DeviceInfoFacet = {
  pixelsPerMillimeter: 3,
  inputMethods: [_ME_InputMethods.GAMEPAD_INPUT_METHOD, _ME_InputMethods.TOUCH_INPUT_METHOD, _ME_InputMethods.MOUSE_INPUT_METHOD],
  isLowMemoryDevice: false,
  guiScaleBase: 4,
  platform: _ME_Platforms.PS5,
  guiScaleModifier: -2,
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

const _ME_SocialFacet = {};
const _ME_UserFacet = {};

const _ME_CustomScalingFacet = {
  scalingModeOverride: 0,
  fixedGuiScaleModifier: 0,
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
  "core.customScaling": _ME_CustomScalingFacet,
  "core.animation": _ME_AnimationFacet,
  "core.sound": _ME_SoundFacet,
  "core.social": _ME_SocialFacet,
  "core.user": _ME_UserFacet,
  // == Vanilla Facets == //
  "vanilla.achievements": _ME_AchievementsFacet,
  "vanilla.achievementsReward": _ME_AchievementsRewardFacet,
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

if(FIX_CSS) {
  console.log(
    "[EngineWrapper] Enabling The CSS Fixer."
  );
    
  setInterval(() => {
    for(const element of document.getElementsByClassName("Rheyt")) { element.style.width = "auto"; };
    for(const element of document.getElementsByClassName("_3bnXm")) { element.style.width = "auto"; };
    if(document.getElementsByClassName("_3UIvq").length > 0) { for(const element of document.getElementsByClassName("_7j0o7")) { element.style.maxWidth = "64.8rem"; }; }
    else if(document.getElementsByClassName("_48RQp").length > 0) { for(const element of document.getElementsByClassName("_7j0o7")) { element.style.maxWidth = "55.6rem"; }; }
    else if(_ME_RouterFacet.history.location.pathname?.startsWith("/announcement-modal/")) { document.getElementsByClassName("e_3qS _3d-u6 _2mAPi _NB-N")[0].getElementsByTagName("div")[0].style.aspectRatio = "16/9"; for(const element of document.getElementsByClassName("_7j0o7")) { element.style.maxWidth = "55.6rem"; }; }
    for(const element of document.getElementsByClassName("_1BxDM -T44q _2XqUR")) { element.style.height = "fit-content"; element.style.overflowY = "auto"; };
    for(const element of document.getElementsByClassName("wchNY _2XqUR _3xGVP")) { element.style.overflowY = "auto"; };
    for(const element of document.getElementsByClassName("_1bsyx")) { element.style.width = "100%"; };
    for(const element of document.getElementsByClassName("_2D-VK")) { element.style.flexWrap = "unset"; };
    for(const element of document.getElementsByClassName("_324PO")) { element.style.height = "2.6rem"; };
    for(const element of document.getElementsByClassName("LHyA2 QfYQK")) { element.style.minHeight = "2.8rem"; };
    for(const element of document.getElementsByClassName("_1QHCp _2JFdt")) { element.style.overflow = "hidden"; };
    for(const element of document.getElementsByClassName("_3Dx4x")) { element.style.width = "6.9rem"; };
    for(const element of document.getElementsByClassName("_3ofBV")) { element.style.width = "auto"; };
    for(const element of document.getElementsByClassName("Nwl3_")) { element.style.width = "auto"; };
    for(const element of document.getElementsByClassName("_1BYUv")) { element.style.width = "auto"; };
    for(const element of document.getElementsByClassName("_14je7")) { element.style.width = "auto"; element.style.height = "6.4rem"; };
    for(const element of document.getElementsByClassName("HrxNO")) { element.style.width = "auto"; };
    for(const element of document.getElementsByClassName("OK99e")) { element.style.width = "auto"; };
    for(const element of document.getElementsByClassName("_33upF")) { element.style.overflowY = "auto"; };
    for(const element of document.getElementsByClassName("KNGjB")) { element.style.minHeight = "100%"; element.style.height = "fit-content"; };
    for(const element of document.getElementsByClassName("_1q1my")) { element.style.overflowY = "hidden"; };
  });
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
        _ME_Translations[keyval[0]] = keyval[1]?.replace("\r", ""); //oh windows you special snowflake
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
