import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { SpeechCreateParams } from 'openai/resources/audio/speech';

@Controller('podcast')
export class PodcastController {
	constructor(private readonly podcastService: PodcastService) {}

	@Get()
	hello() {
		return 'Hello, World!';
	}
	@Post('generate')
	async generate(
		@Body('input') input: string,
		@Body('voice') voice: SpeechCreateParams['voice'],
		@Res() res,
	) {
		try {
			const buffer = await this.podcastService.generateAudioPodcast(
				input,
				voice,
			);
			res.set({
				'Content-Type': 'audio/mpeg',
				'Content-Length': buffer.length,
			});
			res.status(HttpStatus.OK).send(buffer);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}
}
