import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ApiUrls {
    mainUrl = 'http://localhost:8091/';
    // mainUrl = 'http://cargo.srikrishnatravels.in/';

    getCurrentUser = 'api/v1/user/me';
    getAllUsers = 'api/v1/userNames';

    // Cancellations API's
    pendingShipmentsCount = 'api/v1/shipment/count/cancellationPendingShipments';
    getAllPendingShipments = 'api/v1/shipment/get/pendingShipments';
    cancelledShipmentsCount = 'api/v1/shipment/count/cancelled';
    getAllCancelledShipments = 'api/v1/shipment/search/cancelled';

    // Operator Accounts API's
    getAllOperatorAccounts = 'api/v1/operatorAccount/all';
    saveOrUpdateOperatorAccount = 'api/v1/operatorAccount/';
    getOperatorAccount = 'api/v1/operatorAccount/';

    // Cities API's
    getCitiesCount = 'api/v1/cities/count';
    getAllCities = 'api/v1/cities';
    createCity = 'api/v1/city';
    getCity = 'api/v1/city/';
    updateCity = 'api/v1/city/';
    deleteCity = 'api/v1/city/';
    getActiveCityNames = 'api/v1/activeCityNames';

    // Branch Office API's
    branchOfficesCount = 'api/v1/branchOffices/count';
    getAllBranchOffices = 'api/v1/branchOffices';
    saveBranchOffice = 'api/v1/branchOffice';
    updateBranchOffice = 'api/v1/branchOffice/';
    getBranchOffice = 'api/v1/branchOffice/';

}
