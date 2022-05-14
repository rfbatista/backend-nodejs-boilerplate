import 'reflect-metadata';
import './infrastructure/module-alias';
import 'module-alias/register';
import {startup} from '@di/startup'

try {
  startup();
} catch (error) {
  console.error(error);
  if (process.env.NODE_ENV === 'production') {
    process.kill(process.pid, 'SIGTERM');
  }
}
