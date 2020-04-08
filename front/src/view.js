import {PLATFORM} from 'aurelia-pal';
import {inject}  from "aurelia-framework";
import {Router}  from "aurelia-router";
import config from './config';

@inject(Router)
export class View {
	heading = 'search and view data';
	constructor(router) {
        this.router = router;
		this.tableIndex = 3;
		this.summonsNb = null;
		this.plateId = null;
		this.registrationState = null;
		this.plateType = null;
		this.issueDate = null;
		this.violationCode = null;
		this.vehicleBodyType = null;
		this.vehicleMake = null;
		this.issuingAgency = null;
		this.streetCode1 = null;
		this.streetCode2 = null;
		this.streetCode3 = null;
		this.vehicleExpirationDate = null;
		this.violationLocation = null;
		this.violationPrecinct = null;
		this.issuerPrecinct = null;
		this.issuerCode = null;
		this.issuerCommand = null;
		this.issuerSquad = null;
		this.violationTime = null;
		this.timeFirstObserved = null;
		this.violationCounty = null;
		this.violationInFrontOfOrOpposite = null;
		this.houseNumber = null;
		this.streetName = null;
		this.intersectingStreet = null;
		this.dateFirstObserved = null;
		this.lawSection = null;
		this.subDivision = null;
		this.violationLegalCode = null;
		this.daysParkingInEffect = null;
		this.fromHoursInEffect = null;
		this.toHoursInEffect = null;
		this.vehicleColor = null;
		this.unregisteredVehicle = null;
		this.vehicleYear = null;
		this.meterNumber = null;
		this.feetFromCurb = null;
		this.violationPostCode = null;
		this.violationDescription = null;
		this.noStandingOrStoppingViolation = null;
		this.hydrantViolation = null;
		this.doubleParkingViolation = null;
    }
	
	searchInfos(){ // "chercher" button is pressed
		/*var table = document.getElementById("searchTable");
		var row = table.insertRow(this.tableIndex);
		this.tableIndex++;
		var cellSummonsNb = row.insertCell(0);
		var cellPlateId = row.insertCell(1);
		var cellRegistrationState = row.insertCell(2);
		var cellPlateType = row.insertCell(3);
		var cellIssueDate = row.insertCell(4);
		var cellViolationCode = row.insertCell(5);
		var cellVehicleBodyType = row.insertCell(6);
		var cellVehicleMake = row.insertCell(7);
		var cellIssuingAgency = row.insertCell(8);
		var cellStreetCode1 = row.insertCell(9);
		var cellStreetCode2 = row.insertCell(10);
		var cellStreetCode3 = row.insertCell(11);
		var cellVehicleExpirationDate = row.insertCell(12);
		var cellViolationLocation = row.insertCell(13);
		var cellViolationPrecinct = row.insertCell(14);
		var cellIssuerPrecinct = row.insertCell(15);
		var cellIssuerCode = row.insertCell(16);
		var cellIssuerCommand = row.insertCell(17);
		var cellIssuerSquad = row.insertCell(18);
		var cellViolationTime = row.insertCell(19);
		var cellTimeFirstObserved = row.insertCell(20);
		var cellViolationCounty = row.insertCell(21);
		var cellViolationInFrontOfOrOpposite = row.insertCell(22);
		var cellHouseNumber = row.insertCell(23);
		var cellStreetName = row.insertCell(24);
		var cellIntersectingStreet = row.insertCell(25);
		var cellDateFirstObserved = row.insertCell(26);
		var cellLawSection = row.insertCell(27);
		var cellSubDivision = row.insertCell(28);
		var cellViolationLegalCode = row.insertCell(29);
		var cellDaysParkingInEffect = row.insertCell(30);
		var cellFromHoursInEffect = row.insertCell(31);
		var cellToHoursInEffect = row.insertCell(32);
		var cellVehicleColor = row.insertCell(33);
		var cellUnregisteredVehicle = row.insertCell(34);
		var cellVehicleYear = row.insertCell(35);
		var cellMeterNumber = row.insertCell(36);
		var cellFeetFromCurb = row.insertCell(37);
		var cellViolationPostCode = row.insertCell(38);
		var cellViolationDescription = row.insertCell(39);
		var cellNoStandingOrStoppingViolation = row.insertCell(40);
		var cellHydrantViolation = row.insertCell(41);
		var cellDoubleParkingViolation = row.insertCell(42);*/
		
		//SEARCH FUNCTION NEEDS TO BE IMPLEMENTED HERE
		
		//example of cell filling (new line insertion is already implemented): cellExample.innerHTML = "CONTENTOFNEWCELL";
		//sadly, we have to do it for each of 43 cells...
	}
}
