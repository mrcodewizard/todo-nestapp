import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema, User } from '@schemas/user.schema';
import { Model } from 'mongoose';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
   constructor(@InjectModel(User.name) private userModel : Model<User>) {}

   showLogin(): string {
      return "Login page"
   }

   async authenticate(user: any): Promise<User| boolean > {
      try{
         if(!user) return false;
         // select specific user from db
         const { username, password } = user;
         const result = await this.userModel.findOne({   
            $and: [
               { username: username },
               { password: password },
               // Add more conditions as needed
            ]
         });

         if(!result) return false;

         /** create token and send it back to client **/
         const secretKey = "ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5";
         const payload = { data: result.username, exp: Math.floor(Date.now() / 1000) + 3600 };
         const token = JWT.sign(payload, secretKey);

         result.token = token;

         /** return result **/
         return result;
      }
      catch(error) {
         throw new Error('Login failed: ' + error.message);
      }
   }

   async register(user):  Promise<User>{
      try {
         const createUser = new this.userModel(user);
         return await createUser.save();
      } catch(error) {
         throw new Error('Validation failed: ' + error.message);
      }
   }
}
