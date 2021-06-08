import Pagination       from './../common/pagination';
import { VehicleModel } from './model';

const VehicleModification = {
  id: true,
  name: true,
  enginecode: true,
  dinHp: true,
  fuel: true,
  kw: true,
  litres: true,
  rpm: true,
  startYear: true,
  endYear: true,
  subbody: true,
  modelId: true,
  model: VehicleModel
};

const VehicleModifications = { items: VehicleModification, ...Pagination };

export {
	VehicleModification,
	VehicleModifications
}