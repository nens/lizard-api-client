import { AssetTimeseries, AssetTimeseriesDefinition } from './AssetTimeseries';
import { Bootstrap, BootstrapDefinition } from './Bootstrap';
import { LegendData, LegendDataDefinition } from './LegendData';
import { MeasuringStation, MeasuringStationDefinition } from './MeasuringStation';
import { ObservationType, ObservationTypeDefinition } from './ObservationType';
import { Organisation, OrganisationDefinition } from './Organisation';
import { Parcel, ParcelDefinition } from './Parcel';
import { RasterStore, RasterStoreDefinition } from './RasterStore';
import { RasterStoreDetail, RasterStoreDetailDefinition } from './RasterStoreDetail';
import { Timeseries, TimeseriesDefinition } from './Timeseries';
import { WmsInfo, WmsInfoDefinition } from './WmsInfo';

export const valueObjects = {
  AssetTimeseries: AssetTimeseries,
  Bootstrap: Bootstrap,
  LegendData: LegendData,
  MeasuringStation: MeasuringStation,
  ObservationType: ObservationType,
  Organisation: Organisation,
  Parcel: Parcel,
  RasterStore: RasterStore,
  RasterStoreDetail: RasterStoreDetail,
  Timeseries: Timeseries,
  WmsInfo: WmsInfo
};

export const valueObjectDefinitions = {
  AssetTimeseries: AssetTimeseriesDefinition,
  Bootstrap: BootstrapDefinition,
  LegendData: LegendDataDefinition,
  MeasuringStation: MeasuringStationDefinition,
  ObservationType: ObservationTypeDefinition,
  Organisation: OrganisationDefinition,
  Parcel: ParcelDefinition,
  RasterStore: RasterStoreDefinition,
  RasterStoreDetail: RasterStoreDetailDefinition,
  Timeseries: TimeseriesDefinition,
  WmsInfo: WmsInfoDefinition
};
