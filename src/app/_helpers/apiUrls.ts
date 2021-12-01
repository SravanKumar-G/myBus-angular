import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class ApiUrls {
    // mainUrl = 'http://localhost:8091/';
    // mainUrl = 'http://qacargo.srikrishnatravels.in/'
    // mainUrl = 'http://cargo.srikrishnatravels.in/';
    mainUrl = environment.testPath;


    getCurrentUser = 'api/v1/user/me';
    getAllUsers = 'api/v1/userNames';
    getAllStaffList = 'api/v1/staff';

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
    getVehicleOdometerReading = 'api/v1/vehicle/odometerReading/';

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
    getCargoDetailsById = 'api/v1/shipment/';
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

    // Cargo Loading Sheet
    getBookingsForLoading = 'api/v1/shipment/search/loading';
    loadToVehicle = 'api/v1/shipment/assignVehicle/';

    // Unloading Sheet
    getBookingsForUnloading = 'api/v1/shipment/search/unloading';
    unloadVehicle = 'api/v1/shipment/unload';

    // Delivery Sheet API's
    getBookingsForDelivery = 'api/v1/shipment/search/undelivered';
    branchCashBalances = 'api/v1/user/branchCashBalances/';
    countDeliveredBookings = 'api/v1/shipment/countDeliveredBookings';
    deliveredBookings = 'api/v1/shipment/deliveredBookings';

    // Cargo Trip Sheet API's
    searchCargoTripSheet = 'api/v1/cargoTripSheet/search';
    getCargoTripSheet = 'api/v1/cargoTripSheet/get/';
    updateTripSheet = 'api/v1/cargoTripSheet/update';
    closeTripSheet = 'api/v1/cargoTripSheet/closeTripSheet/';
    getTripSheetSummary = 'api/v1/cargoTripSheet/getSummary/';
    approveCancellation = 'api/v1/shipment/approveCancellation';

    // Service Income Reports API's
    getDistinctSource = 'api/v1/serviceReport/getCities';
    searchServiceReport = 'api/v1/serviceReport/incomeReport';
    serviceReportByServiceId = 'api/v1/serviceReport/serviceIncomeReportDaily';

    // Inventories API's
    getAllInventories = 'api/v1/inventory/getAllInventories';
    getInventoriesCount = 'api/v1/inventory/getCount';
    getInventory = 'api/v1/inventory/get/';
    updateInventory = 'api/v1/inventory/updateInventory';
    addInventory = 'api/v1/inventory/addInventory';
    deleteInventory = 'api/v1/inventory/delete/';


    // Tyres API's
    getAllTyres = 'api/v1/tyre/getAll';
    getTyreCount = 'api/v1/tyre/count';
    getTyreById = 'api/v1/tyre/find/';
    updateTyre = 'api/v1/tyre/update/';
    createTyre = 'api/v1/tyre/add';
    getTyreActivityById = 'api/v1/tyreActivity/find/';
    createTyreActivity = 'api/v1/tyreActivity/add';
    updateTyreActivity = 'api/v1/tyreActivity/update/';
    uninstallTyre ='api/v1/tyreActivity/uninstall';
    deletetyre = 'api/v1/tyre/delete/';


    // Jobs API's
    
    getCountForJobs = 'api/v1/jobs/getCount';
    getAllsearchJobs = 'api/v1/jobs/searchJobs';
    getPendingJobs = 'api/v1/jobs/getPendingJobs';
    getCompletedJobs = 'api/v1/jobs/getCompletedJobs';
    getJob ='api/v1/jobs/getAJob/';
    updateJob ='api/v1/jobs/updateJob';
    addJob = 'api/v1/jobs/addJob';
    deleteJob = 'api/v1/jobs/delete/';
}
