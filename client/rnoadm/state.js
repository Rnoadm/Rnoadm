goog.provide('rnoadm.state');

goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('rnoadm.gfx');
goog.require('rnoadm.gfx.NetworkSprite');
goog.require('rnoadm.gfx.Sprite');
goog.require('rnoadm.net');
goog.require('rnoadm.state.NetworkObject');
goog.require('rnoadm.state.Object');


/**
 * Logger for rnoadm.state
 *
 * @type {goog.debug.Logger}
 * @private
 * @const
 */
rnoadm.state.logger_ = goog.debug.Logger.getLogger('rnoadm.state');


/**
 * @type {Array.<Object.<string, rnoadm.state.Object>>}
 * @private
 * @const
 */
rnoadm.state.objects_ = Array(256 * 256);



rnoadm.net.addHandler('Update', function(updates) {
  updates.forEach(function(update) {
    /**
     * @type {string}
     * @const
     */
    var id = update['I'];
    /**
     * @type {number}
     * @const
     */
    var x = update['X'];
    /**
     * @type {number}
     * @const
     */
    var y = update['Y'];
    /**
     * @type {number|undefined}
     * @const
     */
    var fromX = update['Fx'];
    /**
     * @type {number|undefined}
     * @const
     */
    var fromY = update['Fy'];
    /**
     * @type {boolean|undefined}
     * @const
     */
    var removed = update['R'];
    /**
     * @type {(!rnoadm.state.NetworkObject|undefined)}
     * @const
     */
    var object = update['O'];

    goog.asserts.assert(x >= 0 && x < 256, 'update: x out of range');
    goog.asserts.assert(y >= 0 && y < 256, 'update: y out of range');

    /**
     * @type {number}
     * @const
     */
    var index = x | y << 8;

    if (!rnoadm.state.objects_[index]) {
      rnoadm.state.objects_[index] = {};
    }

    if (removed) {
      goog.asserts.assert(!goog.isDef(fromX) && !goog.isDef(fromY) &&
                          !goog.isDef(object), 'update: contradictory update');
      goog.asserts.assert(id in rnoadm.state.objects_[index],
                          'update: removal of nonexistent object');
      delete rnoadm.state.objects_[index][id];
      rnoadm.gfx.repaint();
      return;
    }

    if (goog.isDef(object)) {
      goog.asserts.assert(!goog.isDef(fromX) && !goog.isDef(fromY),
                          'update: contradictory update');
      if (id in rnoadm.state.objects_[index]) {
        rnoadm.state.objects_[index][id].update(object);
      } else {
        rnoadm.state.objects_[index][id] = new rnoadm.state.Object(x, y, id,
                                                                   object);
      }
      return;
    }

    goog.asserts.assert(goog.isDef(fromX) && goog.isDef(fromY),
                        'update: blank update');
    var fromIndex = fromX | fromY << 8;
    goog.asserts.assert(id in rnoadm.state.objects_[fromIndex],
                        'update: move of nonexistent object');
    rnoadm.state.objects_[index][id] = rnoadm.state.objects_[fromIndex][id];
    delete rnoadm.state.objects_[fromIndex][id];
    rnoadm.state.objects_[index][id].move(x, y);
  });
  rnoadm.gfx.repaint();
});


/**
 * @type {number}
 * @private
 */
rnoadm.state.playerLastMoveX_ = 0;


/**
 * @type {number}
 * @private
 */
rnoadm.state.playerPrevX_ = 127;


/**
 * @type {number}
 * @private
 */
rnoadm.state.playerX_ = 127;


rnoadm.net.addHandler('PlayerX', function(x) {
  if (rnoadm.state.playerX_ == x)
    return;
  rnoadm.state.playerPrevX_ = rnoadm.state.playerX_;
  rnoadm.state.playerX_ = x;
  rnoadm.state.playerLastMoveX_ = Date.now();
  rnoadm.gfx.repaint();
});


/**
 * @type {number}
 * @private
 */
rnoadm.state.playerLastMoveY_ = 0;


/**
 * @type {number}
 * @private
 */
rnoadm.state.playerPrevY_ = 127;


/**
 * @type {number}
 * @private
 */
rnoadm.state.playerY_ = 127;


rnoadm.net.addHandler('PlayerY', function(y) {
  if (rnoadm.state.playerY_ == y)
    return;
  rnoadm.state.playerPrevY_ = rnoadm.state.playerY_;
  rnoadm.state.playerY_ = y;
  rnoadm.state.playerLastMoveY_ = Date.now();
  rnoadm.gfx.repaint();
});


rnoadm.net.onDisconnect.push(function() {
  for (var i = 0; i < rnoadm.state.objects_.length; i++) {
    delete rnoadm.state.objects_[i];
  }
});


/**
 * @type {rnoadm.gfx.Sprite}
 * @private
 * @const
 */
rnoadm.state.grass_ = new rnoadm.gfx.Sprite('grass', '#268f1e', '',
                                            0, 0, 512, 512);


rnoadm.gfx.paintObjects = function(w, h) {
  /** @type {number} */
  var playerX = rnoadm.state.playerX_;
  /** @type {number} */
  var playerY = rnoadm.state.playerY_;

  /** @type {number} */
  var time = Date.now() - rnoadm.state.playerLastMoveX_;
  if (time < 400) {
    playerX = (time * playerX + (400 - time) * rnoadm.state.playerPrevX_) / 400;
    rnoadm.gfx.repaint();
  }
  time = Date.now() - rnoadm.state.playerLastMoveY_;
  if (time < 400) {
    playerY = (time * playerY + (400 - time) * rnoadm.state.playerPrevY_) / 400;
    rnoadm.gfx.repaint();
  }

  var xOffset = w / 2 / rnoadm.gfx.TILE_SIZE - playerX;
  var yOffset = h / 2 / rnoadm.gfx.TILE_SIZE - playerY;
  for (var x = 0; x < 256; x += 512 / rnoadm.gfx.TILE_SIZE) {
    for (var y = 0; y < 256; y += 512 / rnoadm.gfx.TILE_SIZE) {
      rnoadm.state.grass_.paint(xOffset + x + 512 / rnoadm.gfx.TILE_SIZE / 2,
                                yOffset + y + 512 / rnoadm.gfx.TILE_SIZE / 2);
    }
  }
  for (var y = Math.max(0, Math.floor(-h / 2 - yOffset));
       y < Math.min(256, Math.floor(h / 2 - yOffset));
       y++) {
    for (var x = Math.max(0, Math.floor(-w / 2 - xOffset));
         x < Math.min(256, Math.floor(w / 2 - xOffset));
         x++) {
      var objects = rnoadm.state.objects_[x | y << 8];
      if (objects) {
        for (var id in objects) {
          objects[id].paint(xOffset, yOffset);
        }
      }
    }
  }
};

rnoadm.gfx.clickObject = function(x, y, w, h) {
  var xOffset = w / 2 / rnoadm.gfx.TILE_SIZE - rnoadm.state.playerX_;
  var yOffset = h / 2 / rnoadm.gfx.TILE_SIZE - rnoadm.state.playerY_;
  x = Math.floor(x / rnoadm.gfx.TILE_SIZE - xOffset);
  y = Math.ceil(y / rnoadm.gfx.TILE_SIZE - yOffset);
  if (x < 0 || x >= 256 || y < 0 || y >= 256)
    return false;
  rnoadm.net.send({'Walk': {'X': x, 'Y': y}});
  return true;
};

// vim: set tabstop=2 shiftwidth=2 expandtab:
