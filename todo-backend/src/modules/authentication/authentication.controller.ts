import { Controller, Get, Post, Put, Delete, Req, Body, Response } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationInterface } from '@interfaces/authentication.interface';
import { userSchema } from '@validations/user.validation';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get("/login") 
  showLogin(): string {
    return this.authenticationService.showLogin();
  }

  @Post("/login") 
  async submitLogin(@Body() user: AuthenticationInterface, @Response() response: any) {
    try {
      await userSchema.validateAsync(user);
      const result = await this.authenticationService.authenticate(user);

      if(!result) {
        response.status(200).json({
          status: 404,
          msg: "Username or password is incorrect"
        });
      } else {
        response.status(200).json({
          status: 200,
          msg: "User loggedin succesfully",
          user: result
        });
      }
    }
    catch(error) {
      if (error.isJoi) {
        console.error('Validation error:', error.details[0].message);
        response.status(200).json({
          status: 400,
          msg: `Error! ${error.details[0].message}`
        });
      } else {
        console.error('Error:', error.message);
        response.status(200).json({
          status: 400,
          msg: `Error! ${error.message}`
        });
      }
      
    }
  }

  @Post("/register")
  async register(@Body() user: AuthenticationInterface) {
    try {
      await userSchema.validateAsync(user);
      const response = await this.authenticationService.register(user);
      if(!response) {
        return {
          status: 403,
          msg: "Unable to register user"
        };
      } else {
        return {
          status: 200,
          msg: "User registered succesfully",
          user: response
        }
      }
    }
    catch(error) {
      console.error('Validation error:', error.details[0].message);
      return {
       status: 400,
       msg: `Error! ${error.details[0].message}`
      }
    }
  }
}
