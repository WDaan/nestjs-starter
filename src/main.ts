import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    //validation
    app.useGlobalPipes(new ValidationPipe())

    //docs
    const options = new DocumentBuilder()
        .setTitle('NestJS example')
        .setDescription('An example API using NestJS')
        .setVersion(process.env.npm_package_version)
        .addTag('Items')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)

    await app.listen(3000)
}
bootstrap()
