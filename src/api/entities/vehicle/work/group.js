const VehicleWorkGroup = {
  id: true,
  parentId: true,
  name: true,
  parent: {
    id: true,
    name: true,
    parent: {
      id: true,
      name: true
    }
  },
  createdAt: true,
  updatedAt: true
};

export default VehicleWorkGroup;