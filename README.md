# OreUIShim
A small shim JS file to experiment with oreUI in the browser.

## How to use

Prerequisite: `engine.js` has a const `USE_TRANSLATION`. By default, this is set to `true`, and requires a lang file named `loc.lang`. To avoid copyright issues, this file is not mirrored here. To get an equivalent, simply go to the `oreui` RP in your game files (`data/resource_packs/oreui/texts`), find the file for the language you want, remove any blank lines, and paste it in as `loc.lang`. Alternatively, just set `USE_TRANSLATION` to false and prepare to see *way* too many very-long translation keys.

Firstly, ensure you have the correct file structure: The files should look something like this:
   - **note:** `oreui_dist` here simply refers to whatever folder you have containing your oreUI files. it doesn't need to be called `oreui_dist`. Bedrock calls it just `dist`, for example.

```
oreui_dist
│   engine.js (from this repository)
│   loc.lang (from your game install)
│
└───hbui
│   │   <subfolders>
│   │   index.html
│   │   <other files>
```

Next, patch the **html files** that are in charge of the routes you want to use. For example, if you want to mess with `/achievements`, you'll be patching `hbui/index.html`.
To do this, replace:

```js
<script type="text/javascript" src="/path/to/index-HASH.js"></script>
```

with

```js
<script type="text/javascript" src="/engine.js"></script>
<script type="text/javascript" src="/path/to/index-HASH.js"></script>
```

**ensure that engine.js is loaded FIRST**

Finally, start a webserver at the base directory (in our example, `oreui_dist`):

```bash
python -m http.server 8000
```