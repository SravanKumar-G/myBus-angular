import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class ApiUrls {
    mainUrl = 'http://localhost:8091/';
    // mainUrl = 'http://cargo.srikrishnatravels.in/';
    // mainUrl = environment.testPath;


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
    loadBranchNames = 'api/v1/branchOffice/names';

    // Roles API's
    getRolesCount = 'api/v1/roles/count';
    getAllRoles = 'api/v1/roles';
    saveRole = 'api/v1/createRole';
    getRole = 'api/v1/role/';
    updateRole = 'api/v1/role/';
    deleteRole = 'api/v1/role/';

    // Users API's
    getUsers = 'api/v1/users';
    saveUser = 'api/v1/user';
    getUserByUserId = 'api/v1/userId/';
    updateUser = 'api/v1/userEdit/';
    deleteUser = 'api/v1/user/';

    // Amenities API's
    getAmenitiesCount = 'api/v1/amenities/count';
    getAllAmenities = 'api/v1/amenities';
    getAmenityById = 'api/v1/amenity/';
    updateAmenity = 'api/v1/amenity/';
    saveAmenity = 'api/v1/amenity';
    deleteAmenity = 'api/v1/amenity/';

    // Vehicles API's
    getVehiclesCount = 'api/v1/vehicle/count';
    getAllVehicles = 'api/v1/vehicles';
    saveVehicle = 'api/v1/vehicle';
    updateVehicle = 'api/v1/vehicle/';
    getVehicleById = 'api/v1/vehicle/';
    deleteVehicle = 'api/v1/vehicle/';

    // transactions
    search = 'api/v1/transactions/search';
    count = 'api/v1/transactions/count';

    // Payments
    pendingPayments = 'api/v1/payments/pending';
    approvedPayments = 'api/v1/payments/approved';
    countPendingPayments = 'api/v1/payments/count?pending=true';
    countApprovedPayments = 'api/v1/payments/count?pending=false';
    delete = 'api/v1/payment';
    branchOfficeNames = 'api/v1/branchOffice/names';
    savePayment = 'api/v1/payment';
    updatePayment = 'api/v1/payment/';
    searchPayments = 'api/v1/payment/search';
    verifyPayment = 'api/v1/payment/verifyPayment/';
    approveOrReject = 'api/v1/payment/approveOrReject/';
    booking = 'api/v1/serviceReport/booking/';


    // New Cargo Booking API's
    getShipmentTypes = 'api/v1/shipment/types';
    saveNewCargoBooking = 'api/v1/shipment';
    findContactInfoFromPreviousBookings = 'api/v1/shipment/findContactInfo';
    cargoDetailsByLR = 'api/v1/shipment/search/byLR';
    cargoBookingsCount = 'api/v1/shipments/count';
    cargoBookings = 'api/v1/shipments';
    initiateDeliverCargoBooking = 'api/v1/shipment/deliver/';
    cancelCargoBooking = 'api/v1/shipment/cancel/';
    sendSMSForCargoBooking = 'api/v1/shipment/sendSMS/';
    getCargoBooking = 'api/v1/shipment/';
    saveCommentCargoBooking = 'api/v1/shipment/addCommentToBooking/';

    // Suppliers
    getAllSuppliers = 'api/v1/suppliers/';
    getSupplier = 'api/v1/suppliers/';
    updateSupplier = 'api/v1/suppliers/';
    addSupplier = 'api/v1/suppliers/';
    deleteSupplier = 'api/v1/suppliers/';

    // Branch Booking Summary
    branchBookingSummary = 'api/v1/shipment/branchSummary';

    //Cargo Loading Sheet
    getBookingsForLoading = 'api/v1/shipment/search/loading';
    loadToVehicle = 'api/v1/shipment/assignVehicle/';
}
