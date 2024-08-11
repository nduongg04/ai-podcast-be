import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async create(createUserDto: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
		const createdUser = new this.userModel({
			...createUserDto,
			password: hashedPassword,
		});
		return createdUser.save();
	}

	async findAll() {
		return this.userModel.find({}).exec();
	}

	async findByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
	}
}
