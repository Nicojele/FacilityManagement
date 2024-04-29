export default async function (payload: any) {
  console.log(
    { payload: payload },
    "ExternalTaskWorker: Create Task in Factro"
  );

  const task = {
    title: payload.description,
    targetParentId: "7789b54a-7cae-466a-a500-933919790310",
  };

  const response = await fetch('https://cloud.factro.com/api/core/tasks', {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Authorization': process.env.FACTRO_API_TOKEN,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
});

  console.log({ response: response }, "ExternalTaskWorker: Created Task in Factro");

  return {};
}
