import { createFakeUsersHealthActor, createFakeUsersIndustrial, createFakeUsersResearcher } from "@fixtures/user";
import { associations } from "@models/associations";

async function main() {
  console.log('Importing data...');
  associations();
  await createFakeUsersHealthActor(15);
  await createFakeUsersResearcher(15);
  await createFakeUsersIndustrial(15);
  console.log('✅  Importing done!');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
