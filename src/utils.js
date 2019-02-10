export function randInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

var VAR_ID_COUNT = 0;
export function newVarId() {
  VAR_ID_COUNT++;
  return VAR_ID_COUNT;
}

function scaleInt(num) {
  return Math.floor((num / 10) * 255).toString(16); //tostring(16) turns it to hexadecimal
}

/**
 *
 * @param {array of 3 values (1-9) representing r, g and b}
 * returns a hex colour string
 */
export function calcColour(vals) {
  var r = scaleInt(vals[0]);
  var g = scaleInt(vals[1]);
  var b = scaleInt(vals[2]);

  const str = `#${r}${g}${b}`;
  return str;
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

export function isColourPurple(colour) {
  var result = hexToRgb(colour);
  var blueGreenDiff = result.b - result.g;
  var redGreenDiff = result.r - result.g;
  if (
    (result.r + result.b) / 2 > 100 && // red and blue avg. over 100
    result.g <= result.r &&
    result.g <= result.b &&
    (blueGreenDiff > 19 || redGreenDiff > 19)
  ) {
    return true;
  }
  return false;
}

export function /**
 * returns an array of all scenes to be rendered, ignoring those which return null
 *  */
combineRenders(...renderers) {
  var scenes = [];

  renderers.forEach(renderFunc => {
    var scene = renderFunc();
    if (scene) {
      scenes.push(scene);
    }
  });

  return scenes;
}
