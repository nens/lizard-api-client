import { LizardApiClient } from './lizard-api-client';

let lizard = new LizardApiClient();

lizard.rasters({'name': 'Landgebruik'}).then(
  (rasters) => rasters.forEach(
    (raster) => console.log(JSON.stringify(raster, null, 4))));

lizard.raster('10415ccb-ec31-4d43-bdb3-db597061527b').then(
  (raster) => {
    console.log("" + raster);
    raster.getData().then((data) => console.log(data)).catch((error) => console.log(error));
    raster.getTimesteps().then((timesteps) => console.log(timesteps));
  })
