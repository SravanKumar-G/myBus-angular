import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiUrls {
  mainUrl = 'http://localhost:8091/';
  // mainUrl = 'http://cargo.srikrishnatravels.in/';

  getCurrentUser = 'api/v1/user/me';

  pendingShipmentsCount = 'api/v1/shipment/count/cancellationPendingShipments';
  getAllPendingShipments = 'api/v1/shipment/get/pendingShipments';
  cancelledShipmentsCount = 'api/v1/shipment/count/cancelled';
  getAllCancelledShipments = 'api/v1/shipment/search/cancelled';

}
