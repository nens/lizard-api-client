import { Organisation, OrganisationDefinition } from './Organisation';
import { RasterStore, RasterStoreDefinition } from './RasterStore';
import { RasterStoreDetail, RasterStoreDetailDefinition } from './RasterStoreDetail';
import { WmsInfo, WmsInfoDefinition } from './WmsInfo';
import { Timeseries, TimeseriesDefinition } from './Timeseries';

export const valueObjects = {
  'Organisation': Organisation,
  'RasterStore': RasterStore,
  'RasterStoreDetail': RasterStoreDetail,
  'WmsInfo': WmsInfo,
  'Timeseries': Timeseries
};

export const valueObjectDefinitions = {
  'Organisation': OrganisationDefinition,
  'RasterStore': RasterStoreDefinition,
  'RasterStoreDetail': RasterStoreDetailDefinition,
  'WmsInfo': WmsInfoDefinition,
  'Timeseries': TimeseriesDefinition
};
