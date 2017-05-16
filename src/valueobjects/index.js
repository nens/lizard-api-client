import { Organisation, OrganisationDefinition } from './Organisation';
import { RasterStore, RasterStoreDefinition } from './RasterStore';
import { RasterStoreDetail, RasterStoreDetailDefinition } from './RasterStoreDetail';
import { WmsInfo, WmsInfoDefinition } from './WmsInfo';

export const valueObjects = {
  'Organisation': Organisation,
  'RasterStore': RasterStore,
  'RasterStoreDetail': RasterStoreDetail,
  'WmsInfo': WmsInfo
};

export const valueObjectDefinitions = {
  'Organisation': OrganisationDefinition,
  'RasterStore': RasterStoreDefinition,
  'RasterStoreDetail': RasterStoreDetailDefinition,
  'WmsInfo': WmsInfoDefinition
};
