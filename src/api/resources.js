import { Vehicle, Vehicles }         from './entities/vehicle';
import { VehicleManufacturer }       from './entities/vehicle/manufacturer';
import { VehicleModel }              from './entities/vehicle/model';
import { VehicleModification }       from './entities/vehicle/modification';

const API_RESOURCES = {
	// VEHICLES
	/* ---------------------------------------------------------------- */
	vehicles: {	fields: Vehicles },
	vehicle: {
		fields: Vehicle,
		mutations: [ 'createVehicle', 'updateVehicle', 'destroyVehicle' ]
	},
	vehicleManufacturers: { fields: VehicleManufacturer },
	vehicleModels: { fields: VehicleModel },
	vehicleModifications: { fields: VehicleModification },
};

export default API_RESOURCES;