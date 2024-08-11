import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { jwtConstants } from '../../constants';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret:	`${process.env.SECRET_KEY}`,
			signOptions: {
				expiresIn: '60m',
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
