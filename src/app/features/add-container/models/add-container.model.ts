export interface ContainerData {
  id: string;
  transactionIdentifierCode: string;
  lastFreeDate?: Date;
  goodThroughDate?: Date;
  ediHeader: EDIHeader;
  containerInfo: ContainerInfo;
  feesInfo: FeesInfo;
  vesselInfo: VesselInfo;
  shipmentStatuses: ShipmentStatusInfo[];
  portTerminals: PortTerminalInfo[];
}

export interface EDIHeader {
  sender: string;
  receiver: string;
  transactionDateTime: string;
}

export interface ContainerInfo {
  shipmentStatusCode: string;
  shipmentStatusDesc: string;
  containerNumber: string;
  containerStatusCode: string;
  containerStatusDesc: string;
  containerType: string;
  containerTypeDesc: string;
}

export interface FeesInfo {
  fees?: Fee[];
  totalFees: number;
}

export interface Fee {
  type: string;
  desc: string;
  value: string;
}

export interface VesselInfo {
  code: string;
  name: string;
  weight: string;
  number: string;
}

export interface ShipmentStatusInfo {
  code: string;
  desc: string;
  dateTime: string;
}

export interface PortTerminalInfo {
  portName: string;
  portCode: string;
  portDesc: string;
  terminalName: string;
  countryCode: string;
  stateOrProvinceCode: string;
}