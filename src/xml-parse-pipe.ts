import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class XmlParsePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Invalid XML data');
    }

    try {
      const result = await parseStringPromise(value, { explicitArray: false });
      return result;
    } catch (error) {
      throw new BadRequestException('Error parsing XML');
    }
  }
}
