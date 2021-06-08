import Pagination              from './../common/pagination';
import { VehicleManufacturer } from './manufacturer';

const VehicleModel = {
  id: true,
  name: true,
  subbody: true,
  manufacturerId: true,
  manufacturer: VehicleManufacturer
};

const VehicleModels = { items: VehicleModel, ...Pagination };

export {
	VehicleModel,
	VehicleModels
}