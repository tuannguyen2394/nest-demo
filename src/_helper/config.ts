/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '../.development.env' });
import * as appInsights from 'applicationinsights';
const instrumentationKey =
  process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ||
  'InstrumentationKey=c08bf7c1-1f40-4c91-87f8-dbdb833afa2a;IngestionEndpoint=https://southeastasia-1.in.applicationinsights.azure.com/';
appInsights
  .setup(instrumentationKey)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
  .start();

export const appInsightClient = appInsights.defaultClient;
