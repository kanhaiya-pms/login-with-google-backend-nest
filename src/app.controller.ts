import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OAuth2Client } from 'google-auth-library';

@Controller('app')
export class AppController {
  private readonly client: OAuth2Client;

  constructor(private readonly appService: AppService) {
    this.client = new OAuth2Client();
  }

  private async verify(token: string): Promise<any> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: "515549476502-gi26gf9aqe6ahn5c5dnm7s6o1trn5u2l.apps.googleusercontent.com", 
    });

    const payload = ticket.getPayload();
    console.log('data------',payload)
    
    return payload
  }

  @Post('/decode')
  async decodeToken(@Body() body: { token: any }): Promise<any> {
    const payload = await this.verify(body.token).catch(console.error);
    return payload ? payload : "error";
  }
}
