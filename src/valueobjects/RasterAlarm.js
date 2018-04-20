import { definitionToRecord } from '../definitions';

export const RasterAlarmDefinition = {
  // Metadata, filled in by http.js
  metadata: 'Metadata',

  // Fields from the API
  url: null,
  uuid: null,
  name: null,
  organisation: 'Organisation',
  active: null,
  intersection: null,
  comparison: null,
  'observation_type': null,
  thresholds: null,
  messages: null,
  'warning_threshold': null,
  'warning_value': null,
  'warning_timestamp': null
};

const RasterAlarmRecord = definitionToRecord(
  'RasterAlarm', RasterAlarmDefinition);

export class RasterAlarm extends RasterAlarmRecord {
  isTimeseriesAlarm() {
    // Useful in case we have a mixed list of alarms
    return false;
  }

  activeWarning() {
    // If a warning is not active right now, all the warning_ fields are null.
    return this.warning_threshold !== null;
  }

  sameIntersection(rasterUrl, geometry) {
    // Return true if the intersection of this raster alarm has the same raster URL
    // and the same geometry. Currently ignores asset intersections.
    if (!this.intersection) return false;

    if (this.intersection.raster !== rasterUrl) return false;

    const thisGeom = this.intersection.geometry;

    if (!thisGeom || !geometry) return false;

    return (geometry.type === thisGeom.type &&
            geometry.coordinates.length === thisGeom.coordinates.length &&
            geometry.coordinates.every(
              function (v, i) { return v === thisGeom.coordinates[i]; }));
  }
}
