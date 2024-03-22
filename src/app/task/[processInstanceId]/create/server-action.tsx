'use server';

import { finishUserTask, navigateToUrl, getEngineClient } from '@5minds/processcube_app_sdk/server';
import { DataModels } from '@5minds/processcube_engine_sdk';
import { z } from 'zod';
import { getAccessToken, getIdentity } from '../../../utils/authorization';
import { navigateHome } from 'src/app/utils/navigation';
import logger from '@/lib/server-logger';

export async function terminateProcessInstance(processInstanceId: string): Promise<void> {
  logger.info({ processInstanceId: processInstanceId }, 'Terminate ProcessInstance');

  const client = getEngineClient();
  const identity = await getIdentity();
  const NextUrl = process.env.NEXTAUTH_URL;

  await client.processInstances.terminateProcessInstance(processInstanceId, identity);

  logger.info({ processInstanceId: processInstanceId }, 'Terminated ProcessInstance');
  logger.info({ NextUrl: NextUrl }, 'Navigate to url');

  navigateToUrl("localhost:3000");
}

type claimProps = {
  id: string;
  name: string;
  type: string;
  value: string | boolean | null;
};

export async function finishUserTaskAndNavigateToUrl(
  currentTask: DataModels.FlowNodeInstances.UserTaskInstance,
  processInstanceId: string,
  flowNodeId: string,
  description: string,
  category: string,
): Promise<void> {
  logger.info(
    { currentTask: currentTask, processInstanceId: processInstanceId, flowNodeId: flowNodeId },
    'Finish UserTask and navigate to url',
  );

  const userTaskResult = {
    description: description,
    category: category,
  };

  const identity = await getIdentity();
  
  const finishedUserTask = await finishUserTask(currentTask.flowNodeInstanceId, userTaskResult, identity);

  logger.info({ finishedUserTask: finishedUserTask }, 'Finished UserTask');

  navigateToUrl("/");
}

export async function createTask(formData: FormData): Promise<any> {
  logger.info({}, 'Create Account in Authority');
  const accessToken = await getAccessToken();
  const validationResponse = validateFormData(formData);

  if (!validationResponse.success) {
    const { errors } = (validationResponse as any).error;

    logger.info({ validationErrors: errors }, 'Invalid Data, return error message');

    return {
      type: 'error',
      message: errors[0].message,
    };
  }

  const response = await fetch(
    `${process.env.PROCESSCUBE_AUTHORITY_URL}/acr/username_password/admin/user/email/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      redirect: 'follow',
      body: JSON.stringify({
        givenName: formData.get('vorname'),
        familyName: formData.get('nachname'),
        company: formData.get('unternehmen'),
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    },
  );

  if (response.ok) {
    return response.json();
  } else if (response.status === 400) {
    const value = await response.json();

    if (value.message.includes('Username does already exist')) {
      const message = 'Es existiert bereits ein Account mit dieser Email-Adresse.';
      logger.info({ errorMessage: message }, 'Invalid Data, return error message');

      return {
        type: 'error',
        message: message,
      };
    }

    logger.info({ errorMessage: value.message }, 'Invalid Data, return error message');

    return {
      type: 'error',
      message: value.message,
    };
  }

  const message = 'Fehler beim Erstellen des Accounts.';
  logger.info({ errorMessage: message }, 'Invalid Data, return error message');

  return {
    type: 'error',
    message: message,
  };
}

function validateFormData(formData: FormData): any {
  logger.info({}, 'validateFormData');
  const schema = z
    .object({
      vorname: z.string(),
      nachname: z.string(),
      email: z.string(),
      unternehmen: z.string(),
      password: z.string(),
      passwordRepeat: z.string(),
    })
    .refine((schema) => schema.password === schema.passwordRepeat, {
      message: 'Passwörter stimmen nicht überein.',
      path: ['passwordRepeat'],
    });

  const validationResponse = schema.safeParse({
    vorname: formData.get('vorname'),
    nachname: formData.get('nachname'),
    unternehmen: formData.get('unternehmen'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordRepeat: formData.get('password-repeat'),
  });

  return validationResponse;
}
