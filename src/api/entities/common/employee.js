import Pagination from './pagination';
import { Garage } from './../garage';

const Employee = {
  id: true,
  name: { first: true, last: true, middle: true },
  phone: true,
  garageId: true,
  garage: Garage,
  role: true,
  blocked: true,
  createdAt: true,
  updatedAt: true
};

const Employees = { items: Employee, ...Pagination };

export {
  Employee,
  Employees
}