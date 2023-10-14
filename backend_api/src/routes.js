import AuthController from './auth/auth_controller';
import RouteController from './controller/route_controller';
import VehicleController from './controller/vehicle_controller';
import PassengerController from './controller/passenger_controller';
import InspectorController from './controller/inspector_controller';
import WalletController from './controller/digitalwallet_controller';
import LoanController from './controller/loan_controller';
import ReloadLocationController from './controller/reloadlocation_controller';
import TripController from './controller/trip_controller';

export default function (app) {
  // passenger api endpoints
  app.post('/passenger/create', PassengerController.create);
  app.get('/passenger/get', AuthController.authenticate, PassengerController.getAccount);
  app.put('/passenger/update', AuthController.authenticate, PassengerController.updateAccount);
  app.post('/passenger/login', PassengerController.accountLogin);
  app.delete('/passenger/remove', AuthController.authenticate, PassengerController.deleteAccount);
  app.post('/passenger/pay', AuthController.authenticate, PassengerController.pay);
  app.post('/passenger/dayPass/create', AuthController.authenticate, PassengerController.createDayPass);
  app.post('/passenger/smartCard/create', AuthController.authenticate, PassengerController.createSmartCard);
  app.get('/passenger/smartCard/get', AuthController.authenticate, PassengerController.getSmartCard);
  app.post('/passenger/wallet/recharge', AuthController.authenticate, WalletController.recharge);
  app.post('/passenger/wallet/addLoan', AuthController.authenticate, WalletController.addLoan);
  app.get('/passenger/wallet/getLoanInfo', AuthController.authenticate, LoanController.getLoanForWallet);
  // inspector api endpoints
  app.post("/inspector/create", InspectorController.create);
  app.get("/inspector/get", AuthController.authenticate, InspectorController.getAccount);
  app.put("/inspector/update", AuthController.authenticate, InspectorController.updateAccount);
  app.post("/inspector/login", InspectorController.accountLogin);
  app.delete("/inspector/remove", AuthController.authenticate, InspectorController.deleteAccount);
  app.post("/inspector/increaseTrespasserCount", AuthController.authenticate, InspectorController.increaseTrespasserCount);
  app.post("/inspector/validateCustomer", AuthController.authenticate,InspectorController.validateCustomer);
  // routes api endpoints
  app.post("/route/create", AuthController.authenticate, RouteController.create);
  app.get("/route/all", AuthController.authenticate, RouteController.getAllRoutes);
  app.get("/route/", AuthController.authenticate, RouteController.getRouteById);
  app.put("/route/update", AuthController.authenticate, RouteController.updateRoute);
  // trips api endpoints
  app.post('/trip/create', AuthController.authenticate, TripController.create);
  app.get('/trip/all', TripController.getTrips);
  app.put('/trip/update', AuthController.authenticate, TripController.updateTrip);
  app.delete('/trip/remove', AuthController.authenticate, TripController.deleteTrip);
  // vehicle api endpoints
  app.post('/vehicle/create', AuthController.authenticate, VehicleController.create);
  app.get('/vehicle/all', AuthController.authenticate, VehicleController.getAllVehicles);
  app.get('/vehicle/', AuthController.authenticate, VehicleController.getVehicleById);
  app.put('/vehicle/update', AuthController.authenticate, VehicleController.updateVehicle);
  app.delete('/vehicle/delete', AuthController.authenticate, VehicleController.deleteVehicle);
  app.post('/vehicle/create/bus', AuthController.authenticate, VehicleController.createBus);
  app.post('/vehicle/create/train', AuthController.authenticate, VehicleController.createTrain);
  app.post('/vehicle/create/metro', AuthController.authenticate, VehicleController.createMetro);
  // recharge location endpoints
  app.post('/location/create', AuthController.authenticate, ReloadLocationController.createReloadLocation);
  app.get('/location/all', AuthController.authenticate, ReloadLocationController.getReloadLocations);
  app.put('/location/update', AuthController.authenticate, ReloadLocationController.updateReloadLocations);
  app.delete('/location/delete', AuthController.authenticate, ReloadLocationController.deleteReloadLocation);
}
