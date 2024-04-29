export default async function (payload: any) {
  console.log(
    { payload: payload },
    "ExternalTaskWorker: Set Task to In Progress"
  );

  const response = await fetch(
    `https://cloud.factro.com/api/core/tasks/${payload.taskId ?? ""}/state`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: process.env.FACTRO_API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: "inProcess" }),
    }
  );

  console.log(
    { response: response },
    "ExternalTaskWorker: Sucessfully Set Task to In Progress"
  );

  return {};
}
