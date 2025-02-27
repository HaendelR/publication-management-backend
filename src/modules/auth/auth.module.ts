import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../middleware/jwt/jwt.strategy';
import { JwtAuthGuard } from '../../middleware/guard/jwt-auth.guard.ts';
import { RolesGuard } from '../../middleware/guard/roles.guard';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
