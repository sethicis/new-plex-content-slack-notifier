"use strict";

var path = require('path');

module.exports = {
	description: 'Your plex server\'s description here';
	// CONSTANTS
	PLEX_PORT: 'your plex server\'s port here';
	APP_PORT: 'Port for this app to listen on';
	PLEX_STORE_KEY: 'the-key-to-use-in-your-google-datastore';
  plexMediaServerHosts: {
    'name': 'hostname for your plex server'
  }
	/*
	This is the id of your project in the Google Developers Console.
	*/
	gcloud: {
		projectId: 'your-project-id-here'
	}
};
