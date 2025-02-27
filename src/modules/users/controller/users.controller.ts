import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User, UserRole } from '../entity/user.entity';
import { JwtAuthGuard } from '../../../middleware/guard/jwt-auth.guard.ts';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { RolesGuard } from '../../../middleware/guard/roles.guard';
import { Roles } from '../../../middleware/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Création utilisateur' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 200,
    description: 'Ok : Données utilisateur créé',
    type: String,
  })
  @ApiResponse({
    status: 201,
    description: 'Created : Données utilisateur créé',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans le serveur' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Ok : Liste des données des utilisateurs',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'Pas de contenu' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans la serveur' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recherche utilisateur par Id' })
  @ApiResponse({
    status: 200,
    description: 'Ok : utilisateurs trouvé',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'Pas de contenu' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans la serveur' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put('role/:id')
  @ApiOperation({ summary: 'Modification Role par Id' })
  @ApiResponse({
    status: 200,
    description: 'Ok : Role modifier',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'Pas de contenu' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans la serveur' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateRole(
    @Param('id') id: string,
    @Body() role: { role: UserRole },
    @Req() req,
  ) {
    return this.usersService.updateRole(id, role, req.user.role);
  }
}
