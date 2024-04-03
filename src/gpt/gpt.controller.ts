import { Body ,Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos';


@Controller('gpt')
export class GptController {
  //indepedation injection
  constructor(private readonly gptService: GptService) {}

  //El controller son para recibir una informacion o sea escuchan la solitud
  //y tambien recibir una respuesta o sea emitir una respuesta

  @Post('orthography-check')
    orthographyCheck(
      @Body() orthographyDto: OrthographyDto,
    ){
       
      return this.gptService.orthographyCheck(orthographyDto);
    }
}
