import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseFilters,
} from '@nestjs/common';
import { DuplicateExceptionFilter } from 'exception_filters/email-mongo-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseFilters(DuplicateExceptionFilter)
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string) {
		return id;
	}
}
