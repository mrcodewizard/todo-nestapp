import { Controller, Get, Post, Put, Delete, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { TodoService } from './todo.service';
import { TodoInterface } from '@interfaces/todo.interface';
import { todoSchema } from '@validations/todo.validation';
import * as JWT from "jsonwebtoken";


@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post("/create") 
  async createTodo(@Body() todo: TodoInterface, @Req() request: Request, @Res() response: Response ) {
    try {
      const token = String(request.headers["token"]);
      
      if(!token) {
        response.status(200).json({
          status: 400,
          msg: "unauthorize access"
        }); 
      }

      await todoSchema.validateAsync(todo);
      const result = await this.todoService.createTodo(todo,token);

      if(!result) {
        response.status(200).json({
          status: 403,
          msg: "Unable to create todo item"
        });
      } else {
        response.status(200).json({
          status: 200,
          msg: "Todo Item created succesfully",
          user: result
        })
      }
    }
    catch(error) {
      console.error('Validation error:', error.message);
      response.status(200).json({
       status: 400,
       msg: `Error! ${error.message}`
      })
    }
  }
}
