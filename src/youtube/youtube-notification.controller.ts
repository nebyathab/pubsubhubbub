import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { YoutubeNotificationService } from './youtube-notification.service';

@Controller('youtube/notifications')
export class YoutubeNotificationController {
  private readonly logger = new Logger(YoutubeNotificationController.name);

  constructor(
    private readonly youtubeNotificationService: YoutubeNotificationService,
  ) {}

  @Post()
  async handleNotification(@Req() req: Request): Promise<string> {
    this.logger.log('YouTube Notification received');
    console.log(req.body);

    return 'Notification successfully received';
  }
}
