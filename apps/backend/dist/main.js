"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '../.env') });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const allowedOrigins = process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',')
        : ['http://localhost:3001'];
    app.enableCors({ origin: allowedOrigins, credentials: true });
    if (process.env.NODE_ENV !== 'production' ||
        process.env.SWAGGER_ENABLED === 'true') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Cuidabox API')
            .setDescription('API del historial médico de Cuidabox')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('docs', app, document);
    }
    await app.listen(process.env.PORT ?? 3003);
}
void bootstrap();
//# sourceMappingURL=main.js.map