import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, pass: string) {
		const user = await this.usersService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException();
		}
		const isMatch = await bcrypt.compare(pass, user.password);
		if (!isMatch) {
			throw new UnauthorizedException();
		}
		const payload = {
			id: user._id,
			name: user.name,
		};
		const { password, ...result } = user.toObject();
		return {
			...result,
			access_token: await this.jwtService.signAsync(payload, {
				secret: process.env.SECRET_KEY,
			}),
		};
	}

	async signUp(createUserDto: CreateUserDto) {
		const createdUser = await this.usersService.create(createUserDto);
		const { password, ...result } = createdUser.toObject();
		return result;
	}
}
