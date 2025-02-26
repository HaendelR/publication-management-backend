import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { BlogPost } from '../entity/post.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostDto } from '../dto/post.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt-auth.guard.ts';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('add')
  @ApiOperation({ summary: 'Création publication' })
  @ApiBody({ type: PostDto })
  @ApiResponse({
    status: 200,
    description: 'Ok : Données publication créé',
    type: String,
  })
  @ApiResponse({
    status: 201,
    description: 'Created : Données publication créé',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans le serveur' })
  @UseGuards(JwtAuthGuard)
  async create(@Body() post: PostDto, @Req() req) {
    return this.postService.create(post, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des publication' })
  @ApiResponse({
    status: 200,
    description: 'Ok : Liste des données des publications',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'Pas de contenu' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans la serveur' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recherche Publication par Id' })
  @ApiResponse({
    status: 200,
    description: 'Ok : Publication trouvé',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'Pas de contenu' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans la serveur' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.postService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modification Publication par Id' })
  @ApiResponse({
    status: 200,
    description: 'Ok : Publication modifier',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'Pas de contenu' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans la serveur' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() post: BlogPost, @Req() req) {
    console.log(req.user);

    return this.postService.update(id, post, req.user.id, req.user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Suppression Publication' })
  @ApiResponse({
    status: 200,
    description: 'Ok : Publication supprimer',
    type: String,
  })
  @ApiResponse({ status: 204, description: 'Pas de contenu' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 500, description: 'Erreur dans la serveur' })
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string, @Req() req) {
    return this.postService.delete(id, req.user.id, req.user.role);
  }
}
