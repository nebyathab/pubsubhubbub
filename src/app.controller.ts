import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { XmlParsePipe } from './xml-parse-pipe';

@Controller('posts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/youtube')
  async verifySubscription(@Query() query: any): Promise<string> {
    console.log(
      `we have Received verification request from YouTube with query: ${JSON.stringify(query)}`,
    );
    const challenge = query['hub.challenge'];
    if (challenge) {
      return challenge;
    }

    throw new BadRequestException('Missing hub.challenge parameter');
  }

  @Post('/youtube')
  @UsePipes(XmlParsePipe)
  async handleNotification(@Body() body: any): Promise<string> {
    console.log('Received notification from YouTube:', body);

    console.log(`New video uploaded with ID: ${JSON.stringify(body)}`);

    return 'notification received';
  }
}
