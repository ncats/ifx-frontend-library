export class Agent {
  _idx_key?: string;
  pi_id?: string;
  orc_id?: string;
  fullName?: string;
  contactEmail?: string[];
  firstName?: string;
  lastName?: string;
  affiliations?: Organization[];

  constructor(obj: Partial<Agent> = {}) {
    Object.assign(this, obj);

    if (obj.affiliations) {
      this.affiliations = obj.affiliations.map(
        (data) => new Organization(data),
      );
    }
  }
}

export class Organization {
  ror_id?: string;
  _idx_key?: string;
  name?: string;
  displayName?: string;
  types?: string;
  website?: string;
  locations?: Location[];

  constructor(obj: Partial<Organization> = {}) {
    Object.assign(this, obj);

    if (obj.locations) {
      this.locations = obj.locations.map((data) => new Location(data));
    }
  }
}

export class Location {
  _idx_key?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  countryCode?: string;
  facility?: string;

  constructor(obj: Partial<Location> = {}) {
    Object.assign(this, obj);
  }
}
