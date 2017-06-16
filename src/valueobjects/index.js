import { Bootstrap, BootstrapDefinition } from './Bootstrap';
import { Organisation, OrganisationDefinition } from './Organisation';
import { Parcel, ParcelDefinition } from './Parcel';
import { RasterStore, RasterStoreDefinition } from './RasterStore';
import { RasterStoreDetail, RasterStoreDetailDefinition } from './RasterStoreDetail';
import { Timeseries, TimeseriesDefinition } from './Timeseries';
import { WmsInfo, WmsInfoDefinition } from './WmsInfo';

export const valueObjects = {
  Bootstrap: Bootstrap,
  Organisation: Organisation,
  Parcel: Parcel,
  RasterStore: RasterStore,
  RasterStoreDetail: RasterStoreDetail,
  Timeseries: Timeseries,
  WmsInfo: WmsInfo
};

export const valueObjectDefinitions = {
  Bootstrap: BootstrapDefinition,
  Organisation: OrganisationDefinition,
  Parcel: ParcelDefinition,
  RasterStore: RasterStoreDefinition,
  RasterStoreDetail: RasterStoreDetailDefinition,
  Timeseries: TimeseriesDefinition,
  WmsInfo: WmsInfoDefinition
};
