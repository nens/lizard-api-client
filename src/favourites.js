// Handle turning a JSON favourite from the backend into a
// Immutable.js Record based class.  Because the format of a favourite
// changes now and then, these are versioned. Client code can request
// a certain version, higher ones are better. Old favourites without
// version must always be at least translated to version 1.

import { Record } from 'immutable';

export const CURRENT_FAVOURITE_VERSION = 1;

const FavouriteV1Record = Record({
    VERSION: 1,
    box: 'point', // Current selection method
    language: 'en', // Current language
    layers: [], // ???
    layergroups: {  // Slugs of currently visible layergroups, the ones in 'active' are active.
	all: [],    // Don't store things like timeIsSyncing or gettingData in a favourite.
	active: []
    },
    view: {
	lat: null,
	lng: null,
	zoom: null
    },
    context: 'map', // If a client gets a value it doesn't use, it should assume its own default.
    temporal: {
	start: null, // int timestamp
	end: null, // int timestamp
	at: null, // int timestamp,
	relative: false
    },
    baselayer: 'neutral', // If a client gets a value it doesn't use, assume its own default.

    // Selected in the omnibox
    assets: [],
    geometries: [],
    // Timeseries (connected to assets, or by combining assets/geometries with active rasters),
    // to show on the dashboard.
    selections: [],
    
    annotations: {
	present: false, // No idea if we actually need to store this or if it's computed.
	active: false
    }
});

export class FavouriteV1 extends FavouriteV1Record {
};

export function getFavourite(favourite, version) {
    // Translate an object returned by the API to a Favourite of the right version.
    var favouriteVersion = favourite.VERSION || 0;

    if (favouriteVersion < version) {
	if (favouriteVersion === 0) {
	    favourite = migrate0to1(favourite);
	    favouriteVersion = 1;
	}
    }

    if (version === 1) {
	return new FavouriteV1(favourite);
    }
}

function migrate0to1(favourite) {
    // Old favourites have no versioning and there is great variety in the fields
    // that are present. 
    // We ignore all unexpected properties of 'favourite' and include only
    // the data we want, if present.

    // Also, they may have a 'timeseries' property, while new favourites have 'selections'.
    // Those can be translated.
    
    var v1favourite = {VERSION: 1};

    if (favourite.box) {
	v1favourite.box = favourite.box;
    }
    if (favourite.language) {
	v1favourite.language = favourite.language;
    }
    if (favourite.baselayer) {
	v1favourite.baselayer = favourite.baselayer;
    }
    if (favourite.context) {
	v1favourite.context = favourite.context;
    }
    
    if (favourite.layers && favourite.layers.length) {
	v1favourite.layers = favourite.layers.map((layer) => {
	    return {
		name: layer.name,
		type: layer.type,
		uuid: layer.type || '',
		opacity: (layer.opacity || 0),
		active: layer.active || false,
		scenario: layer.scenario || null,
		vectorized: layer.vectorized || false
	    };
	});
    }

    if (favourite.layergroups && favourite.layergroups.all && favourite.layergroups.all.length) {
	v1favourite.layergroups.all = favourite.layergroups.all;
	v1favourite.layergroups.active = favourite.layergroups.active;
    }

    if (favourite.spatial.view) {
	v1favourite.view = favourite.spatial.view;
    }

    if (favourite.temporal) {
	v1favourite.temporal = {
	    start: favourite.start,
	    end: favourite.end,
	    at: favourite.at,
	    relative: favourite.relative || false
	};
    }

    if (favourite.selected && favourite.selected.length) {
	v1favourite.selected.assets = favourite.selected.assets || [];
	v1favourite.selected.geometries = favourite.selected.geometries || [];
	v1favourite.selected.timeseries = favourite.selected.timeseries || [];
    }
    
    return v1favourite;
}
