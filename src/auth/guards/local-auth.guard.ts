import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Auth guard that uses Passport's 'local' strategy.
 *
 * Used on the login route to validate `email` + `password`.
 * If credentials are valid, Passport attaches the authenticated user to `req.user`;
 * otherwise it throws an Unauthorized error.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}