import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("wolfy_golf0000", "sprites/wolfy_golf0000.png")
loadSprite("triangle", "sprites/triangle.png")
loadSprite("grass", "sprites/grass.png")
loadSprite("ellipse", "sprites/ellipse.png")
loadSprite("golf_bg0000", "sprites/golf_bg0000.png");

// add a character to screen
//vars
var shakeforce = 5
var wolfyposx = 100
var wolfyposy = 200
var ballv = 100
var ballhg = -100
var ballx = 1500
var bally = 670
var playerpower = 1

let background = add([
  sprite("golf_bg0000"),
  // Make the background centered on the screen
  pos(width() / 2, height() / 2),
  origin("center"),
  // Allow the background to be scaled
  scale(1),
  // Keep the background position fixed even when the camera moves
  fixed()
]);

const wolfy = add([
  sprite("wolfy_golf0000"),
  pos(wolfyposx, wolfyposy),
  area(),
  //body(),
])

const enemy = add([
  sprite("triangle"),
  pos(ballx, bally),
  area(),
  "enemy",

])

const player = add([
  sprite("ellipse"),
  pos(650, 100),
  area(),
  body(),
  solid(),
])

const map = addLevel([
  "                          ",
  "                          ",
  "                          ",
  "  %                       ",
  "                          ",
  "                        &",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                          ",
  "                        ",
  "                                 ",
  "         = = = = = = = = = = = = = =               ",
  "                          ",
  "                                     =             ",
  "                          ",
  "                                       =                            ",
  "                                         = = = = = = = = = = = = = = ",
], {
  // define the size of each block
  width: 32,
  height: 32,
  // define what each symbol means, by a function returning a component list (what will be passed to add())
  "=": () => [
    sprite("grass"),
    area(),
    solid(),
  ],
})

// a simple score counter
const score = add([
  text("Hole in 0"),
  pos(24, 24),
  { value: 0 },
])
const power = add([
  text("Power 0"),
  pos(24, 100),
  { value: power },
])

// with options
player.onClick(() => {
  //ballv += 10
  //ballhg -= 10
  //shakeforce += 1
  player.moveBy(ballv, ballhg);
  score.value += 1
  score.text = "Hole in " + score.value
  shake(shakeforce)
})

player.onCollide("enemy", (enemy) => {
  score.text = "YOU WIN WITH " + score.value + " HOLES!"
})

onClick(() => {
  ballv += 10
  ballhg -= 10
  shakeforce += 1
  playerpower += 1
  power.text = "Power " + playerpower
  addKaboom(mousePos())
  player.move(wolfyposx + ballv, wolfyposy + ballv)
  shake(shakeforce)
})

var FSPEED = -200
var BSPEED = 200

// burp on "b"
//onKeyPress("b", burp)
onKeyDown("w", () => {
  // .jump() is provided by the body() component
  wolfy.move(0, FSPEED)
})
onKeyDown("s", () => {
  // .jump() is provided by the body() component
  wolfy.move(0, BSPEED)
})
onKeyDown("d", () => {
  // .jump() is provided by the body() component
  wolfy.move(BSPEED, 0)
})
onKeyDown("a", () => {
  // .jump() is provided by the body() component
  wolfy.move(FSPEED, 0)
})
onKeyDown("r", () => {
  score.value = 0
  score.text = "Hole in " + score.value
  shakeforce = 5
  ballv = 100
  ballhg = -100
  playerpower = 0
  power.text = "Power " + playerpower
})
onKeyDown("q", () => {
  ballv -= ballv + ballv
})
onKeyDown("e", () => {
  ballv = 100
  ballhg = 100
  shakeforce = 5
  playerpower = 0
  power.text = "Power " + playerpower
})