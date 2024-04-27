"use server";

import logger from '@/lib/server-logger';

"FactroApi Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjU0YmY1NTYtZDE0OC00MmM1LWI2ZDQtOGEzZTJlYzA2MGE3IiwiaWF0IjoxNzEzMjQ4MTE2LCJleHAiOjE3NDQ3ODQxMTZ9.ijwFMq7C1-niVjtsuDLEJI1QbFhqp9b7g0KAmSlutkI";

export default async function (payload: {description: string, finished: boolean, processInstanzeId: string}) {
  logger.info({ payload: payload }, 'ExternalTaskWorker: Send welcome mail');
  const task = { titel: "testTask", description: payload.description, startDate: new Date(), endDate: "2024-04-16T08:18:41.645Z", officerId: "0", plannedEffort: 0, remainingEffort: 0, customFields: {}, executorId: "1", isMilestone: false, taskPriority: 10, targetParentId: "2"}
  const stringifytJSon = JSON.stringify({ task });

  const response = await fetch(
    "https://cloud.factro.com/api/core/task",
    {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify({ task }),
    },
  );

  const result = await response.json();

  logger.info({ result: result }, 'ExternalTaskWorker: Created Task in Factro');

  return result;
}
