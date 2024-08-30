import { NestFactory } from "@nestjs/core";
import { EmergencyTriageModule } from "./emergencyTriage.module";
import { ConfigService } from "@nestjs/config";

async function App() {
    const app = await NestFactory.create(EmergencyTriageModule);

    const configService = app.get(ConfigService);
    const port = configService.get('PORT')

    await app.listen(port);
}
App();
