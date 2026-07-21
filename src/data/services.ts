export interface Service {
  name: string;
  description: string;
  icon: string;
  status: 'healthy' | 'degraded' | 'down';
}

export const services: Service[] = [
  {
    name: 'API Gateway',
    description: 'Request routing and authentication',
    icon: 'cloud',
    status: 'healthy',
  },
  {
    name: 'Database Cluster',
    description: 'Primary data store',
    icon: 'database',
    status: 'healthy',
  },
  {
    name: 'Cache Layer',
    description: 'In-memory data caching',
    icon: 'memory',
    status: 'healthy',
  },
  {
    name: 'Task Queue',
    description: 'Background job processing',
    icon: 'queue',
    status: 'healthy',
  },
];
