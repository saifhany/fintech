import { PartialType } from "@nestjs/swagger";
import { AccountDto } from "./account.dto";

export class createAccount extends PartialType(AccountDto)  {

}