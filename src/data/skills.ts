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
  { name: 'PHP', level: '90%' },
  { name: 'Laravel', level: '90%' },
  { name: 'PostgreSQL', level: '85%' },
  { name: 'MySQL', level: '80%' },
  { name: 'Go', level: '35%' },
];

export const databases: Database[] = [
  { name: 'PostgreSQL', icon: 'database' },
  { name: 'MySQL', icon: 'database' },
  { name: 'Redis', icon: 'memory' },
];

export const messaging: Messaging[] = [
  { name: 'Redis Queue', icon: 'sync_alt' },
  { name: 'Bucardo', icon: 'mark_email_unread' },
];

export const infrastructure: Infrastructure[] = [
  {
    name: 'Docker',
    description: 'Containerization and orchestration for development and production environments.',
    level: '85%',
  },
  {
    name: 'Linux',
    description: 'Server administration, shell scripting, and system optimization.',
    level: '80%',
  },
  {
    name: 'Cloud & CI/CD',
    description: 'Cloud-native deployments, database replication, and automated workflows.',
    tags: ['AWS', 'Bucardo', 'GitHub Actions'],
  },
];

export const devTools: DevTool[] = [
  { name: 'VSCode', icon: 'code' },
  { name: 'Git', icon: 'commit' },
  { name: 'Docker', icon: 'view_in_ar' },
  { name: 'Linux', icon: 'terminal' },
];
