import * as HeroIcons from '@heroicons/react/24/outline';

type IconName = keyof typeof HeroIcons;

interface HeroIconProps {
  icon: IconName;
  className?: string;
}

export function HeroIcon({ icon, className }: HeroIconProps) {
  const IconComponent = HeroIcons[icon] as React.ComponentType<{
    className?: string;
    'aria-hidden'?: boolean;
  }>;

  if (!IconComponent) {
    console.warn(`HeroIcon: No icon found for name "${icon}"`);
    return null;
  }

  return (
    <IconComponent
      className={className || 'h-6 w-6'}
      aria-hidden="true"
    />
  );
}
