// 
// Plex entity class
// 
// @author: Kyle Blagg
// @date: Aug 21, 2015
// 
// This module contains the PLEX entity class,
// which converts PLEX API response content
// into a more managable and simple object format.
// 

'use strict';

module.export = function () {
    function getPlexJsonProp (key, plexJson, required) {
        var val = null;
        required = typeof(required) !== 'undefined' ? required : true;

        if (plexJson.hasOwnProperty(key)) {
            val = plexJson[key];
        } else if (required) {
            throw 'Could not retrieve plexJson property: ' + key;
        }

        return val;
    }

    return function plexEntity (plexJson) {
        this.key       = getPlexJsonProp('key', plexJson);
        this.type      = getPlexJsonProp('type', plexJson);
        this.title     = getPlexJsonProp('title', plexJson);
        this.summary   = getPlexJsonProp('summary', plexJson);
        this.dateAdded = getPlexJsonProp('addedAt', plexJson);
        this.studio    = getPlexJsonProp('studio', plexJson);
    }
}