"use server";

import { Identity } from '@5minds/processcube_engine_sdk';
import jwtDecode from 'jwt-decode';
import { getEngineClient, navigateToUrl, startProcess } from '@5minds/processcube_app_sdk/server';
import { finishUserTaskAndNavigateToUrl } from '../task/[processInstanceId]/create/server-action';
import logger from '@/lib/server-logger';
 
export async function startCreateTaskProcess(): Promise<void> {
  const identity = await getIdentity();

  const prozessInstanze = await startProcess({ processModelId: "createTask_Process" }, identity);
  const prozessInstanzeId = prozessInstanze.processInstanceId
  navigateToUrl(`http://localhost:3000/task/${prozessInstanzeId}/create`);
}

export async function navigateToDetailView(processInstanzeId: string): Promise<void> { 
  navigateToUrl(`http://localhost:3000/task/${processInstanzeId}/showDetails`);
}

export async function getProcessInstanzess() {
  const identity = await getIdentity();
  console.log("----------------------Identity---------------------");
  console.log(identity);
  console.log("---------------------------------------------------");
  const client = getEngineClient();
  
  const instanzes = await client.processInstances.query({ processModelId: "finishTask_Process" }, { identity: identity })
  return instanzes;
}

export async function terminateTask(processInstanzeId: string) {
  const identity = await getIdentity();
  const client = getEngineClient();

  await client.processInstances.terminateProcessInstance(processInstanzeId, identity);
}

export async function deleteTask(processInstanzeId:string) {
  const identity = await getIdentity();
  const client = getEngineClient();

  await client.processInstances.deleteProcessInstances(processInstanzeId, false, identity);
}

export async function getIdentity(): Promise<Identity> {
  const token = await getAccessToken();
  const decodedToken = jwtDecode<Record<string, unknown>>(token);

  const identity = {
    token: token as string,
    userId: decodedToken.sub as string,
  };

  logger.info({ userId: identity.userId }, 'Return Identity for User');

  return identity;
}

export async function getAccessToken(): Promise<string> {
  const response = await fetch(`${process.env.PROCESSCUBE_AUTHORITY_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.PROCESSCUBE_SERVER_CLIENT_ID || '',
      client_secret: process.env.PROCESSCUBE_SERVER_CLIENT_SECRET || '',
      scope: 'upe_admin engine_read engine_write',
    }).toString(),
    cache: 'no-store',
  });

  const responseBody = await response.json();

  return responseBody.access_token;
}
