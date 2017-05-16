import Metadata from './valueobjects/Metadata';
import { valueObjects, valueObjectDefinitions } from './valueobjects/index';

const processingFunctions = {};

export function processSingleResultResponse(objectType, result, url) {
  console.log('objectType: ', objectType);
  const ValueObject = valueObjects[objectType];
  const definition = valueObjectDefinitions[objectType];

  console.log('ValueObject: ', ValueObject);
  console.log('definition: ', definition);

  const processedResult = {};

  for (const item in definition) {
    if (!definition.hasOwnProperty(item)) {
      continue;
    }

    if (definition[item] === null) {
      // Just copy.
      processedResult[item] = result[item];
    } else if (definition[item] === 'Metadata') {
      if (result[item]) {
        // Already there, use it
        processedResult[item] = result[item];
      } else {
        processedResult[item] = new Metadata({
          'sourceUrl': url,
          'index': null,
          'retrieved': Date.now()
        });
      }
    } else if (processingFunctions.hasOwnProperty(result[item])) {
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
  if (!json || !json['results']) {
    return [];
  }

  return json['results'].map(function (result, idx) {
    result.metadata = new Metadata({
      'sourceUrl': url,
      'index': idx,
      'retrieved': Date.now()
    });

    return processSingleResultResponse(objectType, result);
  });
}
