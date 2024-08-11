import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseFilters,
	UseGuards,
} from '@nestjs/common';
import { DuplicateExceptionFilter } from 'exception_filters/email-mongo-exception.filter';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request as Req } from 'express';
import { UserDocument } from 'src/users/schema/user.schema';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	signIn(@Body() signInDto: { email: string; password: string }) {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}

	@Post('register')
	@UseFilters(DuplicateExceptionFilter)
	signUp(@Body() signUpDto: CreateUserDto) {
		return this.authService.signUp(signUpDto);
	}

	@Get('test')
	@UseGuards(AuthGuard)
	test(@Request() req: Req & { user: UserDocument }) {
		return req.user;
	}
}
