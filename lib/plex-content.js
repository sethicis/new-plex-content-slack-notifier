// 
// Plex Communication Module
// 
// @author: Kyle Blagg
// @date: Aug 21, 2015
// 

'use strict';

var plexEntity = require('./plexEntityClass'),
    reqHandler = require('./request-handler');

//
// @param {object} config - contains the particular configurations for the module.
// 
module.export = function (config) {

    return {
        
        //
        // Returns the PLEX content
        // for the server(s) defined
        // in the config.
        // 
        // @return {object}
        // 
        getPlexContent: function () {

        },

        // 
        // Handles getting the PLEX section
        // data for the given types.
        // 
        // @param {array} types
        // 
        // @return {object}
        // 
        getPlexSectionIds: function (types) {

        },

        // 
        // Handles retrieving content from a particular
        // PLEX section ID.
        // 
        // @param {number} secId
        // 
        // @return {object}
        // 
        getPlexSectionContent: function (secId) {

        }
    }
}