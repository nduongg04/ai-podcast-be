import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({
		required: [true, 'Name is required'],
	})
	name: string;

	@Prop({
		required: [true, 'Email is required'],
		unique: true,
	})
	email: string;

	@Prop({
		required: [true, 'Password is required'],
	})
	password: string;

	@Prop({
		default: ""
	})
	imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
