import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { PUBLIC_ROOT_PATH } from './config';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

    app.useStaticAssets(PUBLIC_ROOT_PATH);
    app.enableCors();
    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle("Todo List API's")
        .setDescription(
            "The Todo List REST API's",
        )
        .setVersion('1.0')
        .setBasePath('api')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('docs', app, document, {
        customCss:
            '.models { display: none !important; } \
            .swagger-ui .opblock-tag { font-size: 16px; } \
            .swagger-ui .opblock-tag { background: rgba(0,0,0,.08); } \
            .swagger-ui .opblock-tag:hover { background-color: grey; color: #fff; } \
            .opblock-summary-delete .opblock-summary-method { padding: 6px 13px !important; }',
    });

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
