import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction } from "express";
import { Request, Response } from "express";
@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("AuthTokenMiddleware", req);
        const authorizationHeader = req.headers?.authorization;
        if (!authorizationHeader || typeof authorizationHeader !== 'string') {
          throw new UnauthorizedException('Unauthorized');
        }
    
        const tokenParts = authorizationHeader.split(' ');
    
        if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
          throw new UnauthorizedException('Invalid authorization header format');
        }
    
        const token = tokenParts[1];
    
        const user = this.jwtService.verify(token);
        console.log("AuthTokenMiddleware", user);
        // (req as any).user = user.data;
        (req as any).user = user;
        next();
      } catch (e) {
      console.error("call rejected", e.message, e.status, e.body);
      res.status(401).json({ message: "Token is not valid or missing" });
    } 
  }
  }
