export interface Social {
  name: string;
  href: string;
  icon: string;
}

export const socials: Social[] = [
  { name: 'GitHub', href: 'https://github.com', icon: 'code' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'work' },
  { name: 'Documentation', href: '#', icon: 'menu_book' },
  { name: 'StackOverflow', href: 'https://stackoverflow.com', icon: 'question_answer' },
];
