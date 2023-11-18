import { ApiProperty } from "@nestjs/swagger";

export class APIDatum {
  @ApiProperty()
  AppID: string;
  @ApiProperty()
  ID: string;
  @ApiProperty()
  ValueInt: string;
  @ApiProperty()
  ValueUInt: string;
  @ApiProperty()
  ValueDouble: string;
}

export class Answer {
  @ApiProperty()
  Login: string;
  @ApiProperty()
  Group: string;
  @ApiProperty()
  CertSerialNumber: string;
  @ApiProperty()
  Rights: string;
  @ApiProperty()
  MQID: string;
  @ApiProperty()
  Registration: string;
  @ApiProperty()
  LastAccess: string;
  @ApiProperty()
  LastPassChange: string;
  @ApiProperty()
  LastIP: string;
  @ApiProperty()
  Name: string;
  @ApiProperty()
  FirstName: string;
  @ApiProperty()
  LastName: string;
  @ApiProperty()
  MiddleName: string;
  @ApiProperty()
  Company: string;
  @ApiProperty()
  Account: string;
  @ApiProperty()
  Country: string;
  @ApiProperty()
  Language: string;
  @ApiProperty()
  ClientID: string;
  @ApiProperty()
  City: string;
  @ApiProperty()
  State: string;
  @ApiProperty()
  ZipCode: string;
  @ApiProperty()
  Address: string;
  @ApiProperty()
  Phone: string;
  @ApiProperty()
  Email: string;
  @ApiProperty()
  ID: string;
  @ApiProperty()
  Status: string;
  @ApiProperty()
  Comment: string;
  @ApiProperty()
  Color: string;
  @ApiProperty()
  PhonePassword: string;
  @ApiProperty()
  Leverage: string;
  @ApiProperty()
  Agent: string;
  @ApiProperty()
  LimitPositions: string;
  @ApiProperty()
  LimitOrders: string;
  @ApiProperty()
  CurrencyDigits: string;
  @ApiProperty()
  Balance: string;
  @ApiProperty()
  Credit: string;
  @ApiProperty()
  InterestRate: string;
  @ApiProperty()
  CommissionDaily: string;
  @ApiProperty()
  CommissionMonthly: string;
  @ApiProperty()
  CommissionAgentDaily: string;
  @ApiProperty()
  CommissionAgentMonthly: string;
  @ApiProperty()
  BalancePrevDay: string;
  @ApiProperty()
  BalancePrevMonth: string;
  @ApiProperty()
  EquityPrevDay: string;
  @ApiProperty()
  EquityPrevMonth: string;
  @ApiProperty()
  TradeAccounts: string;
  @ApiProperty()
  ApiData: APIDatum[];
  @ApiProperty()
  LeadCampaign: string;
  @ApiProperty()
  LeadSource: string;
  @ApiProperty()
  Margin: string;
  @ApiProperty()
  MarginFree: string;
  @ApiProperty()
  MarginLevel: string;
  @ApiProperty()
  MarginLeverage: string;
  @ApiProperty()
  Profit: string;
  @ApiProperty()
  Storage: string;
  @ApiProperty()
  Floating: string;
  @ApiProperty()
  Equity: string;
  @ApiProperty()
  SOActivation: string;
  @ApiProperty()
  SOTime: string;
  @ApiProperty()
  SOLevel: string;
  @ApiProperty()
  SOEquity: string;
  @ApiProperty()
  SOMargin: string;
  @ApiProperty()
  Assets: string;
  @ApiProperty()
  Liabilities: string;
  @ApiProperty()
  BlockedCommission: string;
  @ApiProperty()
  BlockedProfit: string;
  @ApiProperty()
  MarginInitial: string;
  @ApiProperty()
  MarginMaintenance: string;
}

export class Data {
  @ApiProperty()
  retcode: string;
  @ApiProperty()
  answer: Answer;
}

export class AccountBodyDtoResponse {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  data: Data;
}
