import Metadata from './valueobjects/Metadata';
import { valueObjects, valueObjectDefinitions } from './valueobjects/index';

const processingFunctions = {};

export function processSingleResultResponse(objectType, result, url) {
  const ValueObject = valueObjects[objectType];
  const definition = valueObjectDefinitions[objectType];
  const processedResult = {};

  for (const item in definition) {

    if (definition[item] === null) {
      if (result.hasOwnProperty(item)) {
        // Copy value from 'result':
        processedResult[item] = result[item];
      } else if(result.properties && result.properties.hasOwnProperty(item)) {
        // Copy value from 'result.properties':
        processedResult[item] = result.properties[item];
      } else {
        // Something unexpected happened..
        processedResult[item] = undefined;
      }
    } else if (definition[item] === 'Metadata') {
      if (result[item]) {
        processedResult[item] = result[item];
      } else {
        processedResult[item] = new Metadata({
          'sourceUrl': url,
          'index': null,
          'retrieved': Date.now()
        });
      }
    } else if (definition[item] === 'Organisation') {
      processedResult[item] = processSingleResultResponse(
        'Organisation', result.properties[item]);
    } else if (processingFunctions.hasOwnProperty(definition[item])) {
      // Name of a function, e.g. to process timestamps.
      processedResult[item] = processingFunctions[definition[item]](result[item]);
    } else {
      // It's a sub-object, recurse.
      processedResult[item] = processSingleResultResponse(definition[item], result[item]);
    }
  }

  return new ValueObject(processedResult);
}

export function processMultipleResultsResponse(objectType, json, url) {
  if (!json || !json.results) {
    return [];
  }

  return json.results.map(function (result, idx) {
    result.metadata = new Metadata({
      'sourceUrl': url,
      'index': idx,
      'retrieved': Date.now()
    });

    return processSingleResultResponse(objectType, result);
  });
}

export function processFeatureCollection(objectType, json, url) {
  if (!json || !json.results || json.results.type !== 'FeatureCollection') {
    return [];
  }

  return json.results.features.map(function (feature, idx) {
    const result = feature.properties;

    result.metadata = new Metadata({
      'sourceUrl': url,
      'index': idx,
      'retrieved': Date.now()
    });

    result.geometry = feature.geometry;
    result.id = feature.id;

    return processSingleResultResponse(objectType, result);
  });
}

export function flatten(ob) {
  const toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) === 'object') {
      const flatObject = flatten(ob[i]);

      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
