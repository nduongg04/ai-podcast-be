import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { SpeechCreateParams } from 'openai/resources/audio/speech';
const fetch = require('node-fetch');

@Injectable()
export class PodcastService {
	private openai: OpenAI;

	constructor() {
		this.openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});
	}

	async generateAudioPodcast(
		input: string,
		voice: SpeechCreateParams['voice'],
	) {
		const url = 'https://open-ai-text-to-speech1.p.rapidapi.com/';
		const options = {
			method: 'POST',
			headers: {
				'x-rapidapi-key':
					'dd28d0e802mshc3ae255b64bcb8dp168c15jsn39ca237e2673',
				'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
				'Content-Type': 'application/json',
			},
			body: {
				model: 'tts-1',
				input: 'Today is a wonderful day',
				voice: 'alloy',
			},
		};

		try {
			const response = await fetch(url, options);
			const result = await response.text();
			return result;
		} catch (error) {
			console.error(error);
		}
	}
}
