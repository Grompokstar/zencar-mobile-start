import { Vehicle } from "."

import VehicleWorkGroup from './group';

const VehicleWork = {
  id: true,
  name: true,
  action: true,
  group: VehicleWorkGroup,
  createdAt: true,
  updatedAt: true
};

export default VehicleWork;