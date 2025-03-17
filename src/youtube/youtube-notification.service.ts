import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

import * as YouTubeNotifier from 'youtube-notification';

@Injectable()
export class YoutubeNotificationService {
  private readonly notifier: any;
  private readonly baseUrl = 'https://pubsubhubbub-v2c0.onrender.com';
  private readonly channelId = 'UC-f6EhhAi85zAMbrNNF3VTA';
  private readonly logger = new Logger(YoutubeNotificationService.name);

  constructor() {
    this.notifier = new YouTubeNotifier({
      hubCallback: `${this.baseUrl}/youtube/notifications`,
    });

    this.setupListeners();
    this.subscribe();
    
  }

  private setupListeners() {
    this.notifier.on('subscribe', (data) => {
      this.logger.log(`Subscribed to YouTube channel: ${data.channel}`);
    });

    this.notifier.on('notified', (data) => {
      this.logger.log('New Video Notification received');
      this.logger.log(data);
    });
  }

  subscribe() {
    if (this.channelId) {
      this.notifier.subscribe(this.channelId);
      this.logger.log(`Subscribed to channel ID: ${this.channelId}`);
      console.log(`Subscribed to channel ID: ${this.channelId}`);
    } else {
      this.logger.error('CHANNEL_ID not found in environment variables');
    }
  }

  //   getListener() {
  //     return this.notifier.listener();
  //   }
}
