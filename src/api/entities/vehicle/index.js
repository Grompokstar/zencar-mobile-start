import Pagination              from './../common/pagination';
import { File }                from './../common/files';
import User                    from './../common/user';
import { VehicleModification } from './modification';

const Vehicle = {
  id: true,
  vin: true,
  frameNumber: true,
  year: true,
  color: true,
  plate: true,
  mileage: true,
  modification: VehicleModification,
  owner: User,
  clients: User,
  photos: File,
	createdAt: true,
	updatedAt: true 
};

const Vehicles = { items: Vehicle, ...Pagination };

export {
	Vehicle,
	Vehicles
}