import { 
  Controller,
  Post, 
  Get,
  Put,
  Patch,
  Delete,
  Param,
  UseGuards,
  Req } from '@nestjs/common';

import { TemplatesService } from './templates.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { TemplatesGateway } from '../templates/templates.gateway';

@Controller('templates')
@UseGuards(RolesGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService, 
              private readonly templatesSocket: TemplatesGateway) {
  }
  /* --------------------------------------------------------------------

    Module     : Templates
    Controller : Template Controller

    ---------------------------------------------------------------------

    Description :
    
    Aditional information: All role routes are working with Guards, and Guards 
    are defining the current req.template value.

    Middleware description: 

    Route:
    /api/templates    
   ----------------------------------------------------------------------*/

  /* 
    Route:        GET api/templates
    Roles:        user, admin
    Description:  Get list of templates
  */

  @Get('')
  @Roles('admin')
  async list(@Req() req) {
    const templates = await this.templatesService.list();
    this.templatesSocket.sendTemplatesListFromSocket(templates);
  	return templates;
  }

  /* 
    Route:        Post api/templates
    Roles:        user, admin
    Description:  Create a new Template
  */

  @Post('')
  @Roles('user', 'admin')
  async create(@Req() req) {
    let template = req.body;
    template.creator = req.user._id;
    await this.templatesService.create(template);
    this.templatesSocket.sendCreatedTemplate(template);
    return template;
  }

  /* 
    Route:        GET api/templates/:templateId
    Roles:        template, admin
    Description:  Get template by provided Id.
  */

  @Get(':templateId')
  @Roles('user', 'admin')
  async getTemplateById(@Req() req) {
    let template = req.template;
    return template;
  }

  /* 
    Route:        PUT api/templates/:templateId 
    Roles:        template, admin
    Description:  Get template by provided Id.
  */

  @Put(':templateId')
  @Roles('user', 'admin')
  async updateTemplateById(@Req() req) {
    const template = req.template;
    return await this.templatesService.update(template, req.body);
  }

  /* 
    Route:        DELETE api/templates/:templateId
    Roles:        user, admin
    Description:  Delete template provide by id.
  */

  @Patch(':templateId')
  @Roles('user', 'admin')
  async patchTemplateById(@Req() req) {
    const template = req.template;
    return await this.templatesService.patch(template, req.body);
  }

  /* 
    Route:        DELETE api/templates/:templateId
    Roles:        user, admin
    Description:  Delete template provide by id.
  */

  @Delete(':templateId')
  @Roles('user', 'admin')
  async deleteTemplate(@Req() req) {
    const template = req.template;
    return await this.templatesService.delete(template);
  }
}