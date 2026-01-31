import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Auth guard that uses Passport's 'jwt' strategy.
 *
 * Used to protect routes that require authentication.
 * Validates the JWT token from the Authorization header;
 * if valid, Passport attaches the authenticated user to `req.user`;
 * otherwise it throws an Unauthorized error.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
