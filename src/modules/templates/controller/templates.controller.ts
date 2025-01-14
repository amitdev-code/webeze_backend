import { Controller } from '@nestjs/common';
import { TemplatesService } from '../providers/templates.service';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}
}
