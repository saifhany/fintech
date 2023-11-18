import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { infinityPagination } from "src/utils/infinity-pagination";
import { User } from "./entities/user.entity";
import { InfinityPaginationResultType } from "../utils/types/infinity-pagination-result.type";
import { NullableType } from "../utils/types/nullable.type";
import { QueryUserDto } from "./dto/query-user.dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwtAuthGuard";
import { RoleGuard } from "src/auth/guards/role.guard";

@ApiTags("Users")
@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  constructor(private readonly usersService: UsersService) { }




  @Get()
  @Roles(['admin'])
  @UseGuards(JwtAuthGuard,RoleGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Request() request:any,
    @Query() query: QueryUserDto
  ): Promise<InfinityPaginationResultType<User>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.usersService.findManyWithPagination({
        sortOptions: query?.sort,
        firstName: query?.firstName,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit }
    );
  }


  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string): Promise<NullableType<User>> {
    return this.usersService.findOne({ id: +id });
  }



  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number): Promise<void> {
    return this.usersService.softDelete(id);
  }
}
