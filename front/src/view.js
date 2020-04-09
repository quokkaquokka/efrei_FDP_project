import {inject}  from 'aurelia-framework';
import {Router}  from 'aurelia-router';
import axios from 'axios';
import config from './config';

@inject(Router)
export class View {
	heading = 'search and view data';
	constructor(router) {
	  this.router = router;
	  this.data = null;
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
	  // eslint-disable-next-line indent
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

	activate() {
	  this.getDatas();
	}

	async getDatas() {
	  const response = await axios.get(config.host + '/api/v1/historicdatas');
	  this.data = response.data;
	}

	async searchInfos() {
	  let searchInput = [];
	  if (this.plateId) searchInput.push({ plateId: this.plateId });
	  if (this.registrationState) searchInput.push({ registrationState: this.registrationState });
	  if (this.plateType) searchInput.push({ plateType: this.plateType });
	  if (this.issueDate) searchInput.push({ issueDate: this.issueDate });
	  if (this.violationCode) searchInput.push({ violationCode: this.violationCode });
	  if (this.vehicleBodyType) searchInput.push({ vehicleBodyType: this.vehicleBodyType });
	  if (this.vehicleMake) searchInput.push({ vehicleMake: this.vehicleMake });
	  if (this.violationPrecinct) searchInput.push({ violationPrecinct: this.violationPrecinct });
	  if (this.issuerPrecinct) searchInput.push({ issuerPrecinct: this.issuerPrecinct });
	  if (this.violationCounty) searchInput.push({ violationCounty: this.violationCounty });
	  if (this.streetName) searchInput.push({ streetName: this.streetName });
	  if (this.vehicleColor) searchInput.push({ vehicleColor: this.vehicleColor });
	  if (this.vehicleYear) searchInput.push({ vehicleYear: this.vehicleYear });

	  const response  = await axios.post(config.host + '/api/v1/searchdatas', searchInput);
	  this.data = response.data;
	}
}
