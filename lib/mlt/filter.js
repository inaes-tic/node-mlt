var _ = require('underscore')
  , uuid = require('node-uuid')

var Affine = function (params) {
  this._attribs = {
    mlt_service: 'affine',
    id: uuid()
  }

  if (params) {
    if (params.start > 0) {
      this._attribs.in = params.start
    }

    if (params.length !== undefined) {
      this._attribs.out = (params.start || 0) + params.length - 1
    }

    if (params.track !== undefined) {
      this._attribs.track = params.track
    }
  }
}
Affine.prototype = _.extend(Affine.prototype, require('../interfaces/properties.js'), require('../interfaces/xml'))
Affine.prototype._node = 'filter'
Affine.prototype.geometry = function (geometries) {
  if (geometries === undefined) {
    return this._geometries
  }

  this._geometries = geometries
  _.each(
    geometries, 
    function (geometry) {
      var geometries = this._attribs['transition.geometry'] || ''
      geometries += geometry.frame + '=' + geometry.x + '/' + geometry.y + ':'
      geometries += geometry.w + 'x' + geometry.h + ':' + geometry.sat + ';'

      this._attribs['transition.geometry'] = geometries
    },
    this
  )

  this._attribs['transition.geometry'] = this._attribs['transition.geometry'].replace(/;$/, '')
  return this
};
Affine.prototype.id = function () {
  return this._attribs.id
};

var AudioFade = function (params) {
  this._attribs = {
    mlt_service: 'volume',
    id: uuid()
  }
    
  if (params) {
    if (params.start > 0) {
      this._attribs.in = params.start
    }

    if (params.length !== undefined) {
      this._attribs.out = (params.start || 0) + params.length - 1
    }

    if (params.track !== undefined) {
      this._attribs.track = params.track
    }

    if (params.startVol !== undefined) {
      this._attribs.gain = params.startVol
    }

    if (params.endVol != undefined) {
      this._attribs.end = params.endVol
    }
  }
}
AudioFade.prototype = _.extend(AudioFade.prototype, require('../interfaces/properties.js'), require('../interfaces/xml'))
AudioFade.prototype._node = 'filter'
AudioFade.prototype.id = function () {
  return this._attribs.id
};

var Watermark = function (params) {
  this._attribs = {
    mlt_service: 'watermark',
    id: uuid()
  }

  if (params) {
    if (params.resource != undefined) {
      this._attribs.resource = params.resource
    }
  }
}
Watermark.prototype = _.extend(Watermark.prototype, require('../interfaces/properties.js'), require('../interfaces/xml'))
Watermark.prototype._node = 'filter'
Watermark.prototype.id = function () {
  return this._attribs.id
}

var WebVFX = function (params) {
  this._attribs = {
    mlt_service: 'webvfx',
    id: uuid()
  }

  if (params) {
    if (params.resource != undefined) {
      this._attribs.resource = params.resource
      if (params.out != undefined) {
        this._attribs.out = params.out
      }
    }
  }
}
WebVFX.prototype = _.extend(WebVFX.prototype, require('../interfaces/properties.js'), require('../interfaces/xml'))
WebVFX.prototype._node = 'filter'
WebVFX.prototype.id = function () {
  return this._attribs.id
}

var Gamma = function (params) {
  this._attribs = {
    mlt_service: 'gamma',
    id: uuid()
  }

  if (params) {
    if (params.gamma != undefined) {
      this._attribs.gamma = params.gamma
    }
  }
}
Gamma.prototype = _.extend(Gamma.prototype, require('../interfaces/properties.js'), require('../interfaces/xml'))
Gamma.prototype._node = 'filter'
Gamma.prototype.id = function () {
  return this._attribs.id
}

var Mono = function (params) {
  this._attribs = {
    mlt_service: 'mono',
    id: uuid()
  }

}
Mono.prototype = _.extend(Gamma.prototype, require('../interfaces/properties.js'), require('../interfaces/xml'))
Mono.prototype._node = 'filter'
Mono.prototype.id = function () {
  return this._attribs.id
}

var Dynamictext = function (params) {
  this._attribs = {
    mlt_service: 'dynamictext',
    id: uuid()
  }

  if (params) {
    if (params.argument != undefined) 
      this._attribs.argument = params.argument
    if (params.size != undefined) 
      this._attribs.size = params.size
    if (params.bgcolour != undefined) 
      this._attribs.bgcolour = params.bgcolour
    if (params.geometry != undefined) 
      this._attribs.geometry = params.geometry
    if (params.dynamic != undefined) 
      this._attribs.dynamic = params.dynamic
    if (params.read_file != undefined) 
      this._attribs.read_file = params.read_file
    
  }
}
Dynamictext.prototype = _.extend(Gamma.prototype, require('../interfaces/properties.js'), require('../interfaces/xml'))
Dynamictext.prototype._node = 'filter'
Dynamictext.prototype.id = function () {
  return this._attribs.id
}

module.exports = {
  Affine: Affine,
  AudioFade: AudioFade,
  Watermark: Watermark,
  WebVFX: WebVFX,
  Gamma: Gamma,
  Mono: Mono,
  Dynamictext: Dynamictext
}
