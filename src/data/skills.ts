export interface Language {
  name: string;
  level: string;
}

export interface Database {
  name: string;
  icon: string;
}

export interface Messaging {
  name: string;
  icon: string;
}

export interface Infrastructure {
  name: string;
  description: string;
  tags?: string[];
  level?: string;
}

export interface DevTool {
  name: string;
  icon: string;
}

export const languages: Language[] = [
  { name: 'Go', level: '90%' },
  { name: 'Python', level: '85%' },
  { name: 'SQL', level: '95%' },
  { name: 'C++', level: '60%' },
];

export const databases: Database[] = [
  { name: 'PostgreSQL', icon: 'database' },
  { name: 'Redis', icon: 'memory' },
];

export const messaging: Messaging[] = [
  { name: 'Kafka', icon: 'sync_alt' },
  { name: 'RabbitMQ', icon: 'mark_email_unread' },
];

export const infrastructure: Infrastructure[] = [
  {
    name: 'AWS',
    description: 'Core services deployment and management.',
    tags: ['EC2', 'S3', 'RDS'],
  },
  {
    name: 'Kubernetes',
    description: 'Container orchestration and cluster administration.',
    level: '80%',
  },
  {
    name: 'Terraform',
    description: 'Infrastructure as Code (IaC) provisioning.',
    level: '75%',
  },
];

export const devTools: DevTool[] = [
  { name: 'Neovim', icon: 'code' },
  { name: 'Git', icon: 'commit' },
  { name: 'Docker', icon: 'view_in_ar' },
  { name: 'Tmux', icon: 'terminal' },
];
