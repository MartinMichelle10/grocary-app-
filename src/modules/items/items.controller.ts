import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('items')
@Controller()
export class ItemsController {
  constructor(private svc: ItemsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('items')
  @ApiOperation({ summary: 'Add a grocery item' })
  async create(@Req() req: any, @Body() dto: CreateItemDto) {
    return this.svc.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('items')
  @ApiOperation({ summary: 'List all grocery items for the logged-in user' })
  async findAll(@Req() req: any) {
    return this.svc.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('items/:id')
  @ApiOperation({ summary: 'Update a grocery item' })
  async update(@Req() req: any, @Param('id') id: number, @Body() dto: UpdateItemDto) {
    return this.svc.update(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('items/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a grocery item' })
  async remove(@Req() req: any, @Param('id') id: number) {
    await this.svc.remove(req.user.id, id);
    return;
  }
}
