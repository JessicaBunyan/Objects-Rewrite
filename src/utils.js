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

export function calcColour(vals) {
  var r = scaleInt(vals[0]);
  var g = scaleInt(vals[1]);
  var b = scaleInt(vals[2]);

  const str = `#${r}${g}${b}`;
  return str;
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
