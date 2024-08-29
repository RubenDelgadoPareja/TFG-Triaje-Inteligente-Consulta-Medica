import { NestFactory } from "@nestjs/core";
import { EmergencyTriageModule } from "./emergencyTriage/emergencyTriage.module";

async function App() {
    const app = await NestFactory.create(EmergencyTriageModule);
    app.listen(3000);

}
App();
