import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeNotificationController } from './youtube/youtube-notification.controller';
import { YoutubeNotificationService } from './youtube/youtube-notification.service';

@Module({
  imports: [],
  controllers: [AppController, YoutubeNotificationController],
  providers: [AppService, YoutubeNotificationService],
})
export class AppModule {}
