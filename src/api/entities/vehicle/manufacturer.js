import Pagination from './../common/pagination';

const VehicleManufacturer = {
  id: true,
  name: true,
  priority: true
};

const VehicleManufacturers = { items: VehicleManufacturer, ...Pagination };

export {
	VehicleManufacturer,
	VehicleManufacturers
}