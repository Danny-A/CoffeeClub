export type CoffeeOrigin = {
  value: string;
  label: string;
  description?: string;
};

export type CoffeeRegion = {
  name: string;
  origins: CoffeeOrigin[];
};

export const COFFEE_REGIONS: CoffeeRegion[] = [
  {
    name: 'Central America',
    origins: [
      {
        value: 'Costa Rica',
        label: 'Costa Rica',
        description: 'Medium body, citrus, nutty',
      },
      {
        value: 'Guatemala',
        label: 'Guatemala',
        description:
          'Can be spicy, smoky, chocolate, earthy or delicate, floral, fruity, sweet',
      },
      {
        value: 'Honduras',
        label: 'Honduras',
        description: 'Crisp, light-bodied, nutty, spicy',
      },
      {
        value: 'Mexico',
        label: 'Mexico',
        description:
          'Light/medium bodied, milk chocolate, bright, lively, fruity',
      },
      {
        value: 'Nicaragua',
        label: 'Nicaragua',
        description: 'Mild acidity, vanilla, hazelnut, chocolate, pear',
      },
      {
        value: 'Panama',
        label: 'Panama',
        description: 'Zesty, lively, spicy, lemongrass, herbal',
      },
      {
        value: 'El Salvador',
        label: 'El Salvador',
        description: 'Similar to Nicaragua - mild, balanced',
      },
    ],
  },
  {
    name: 'South America',
    origins: [
      {
        value: 'Bolivia',
        label: 'Bolivia',
        description:
          'Medium body, caramel, chocolate, can be flowery and fruity',
      },
      {
        value: 'Brazil',
        label: 'Brazil',
        description: 'Medium/full body, low acidity, milk chocolate, fruity',
      },
      {
        value: 'Colombia',
        label: 'Colombia',
        description: 'Medium body, medium acidity, fruity, nutty',
      },
      {
        value: 'Ecuador',
        label: 'Ecuador',
        description: 'Light/medium body, medium acidity, caramel, fruit, nutty',
      },
      {
        value: 'Peru',
        label: 'Peru',
        description:
          'Medium body, medium acidity, spice, nutty, chocolate, earthy',
      },
    ],
  },
  {
    name: 'Africa and Arabia',
    origins: [
      {
        value: 'Burundi',
        label: 'Burundi',
        description: 'Full body, low acidity, grassy, chocolate',
      },
      {
        value: 'Congo',
        label: 'Congo',
        description:
          'Full body, low acidity, intense, chocolate, nutty, tobacco, vanilla, earthy, spicy',
      },
      {
        value: 'Ethiopia',
        label: 'Ethiopia',
        description:
          'Diverse - from full body chocolate, cherry to medium body, flowery, herbal',
      },
      {
        value: 'Kenya',
        label: 'Kenya',
        description: 'Full body, zesty, citrus, floral, herbal',
      },
      {
        value: 'Rwanda',
        label: 'Rwanda',
        description: 'Medium body, chocolate, floral, nutty',
      },
      {
        value: 'Tanzania',
        label: 'Tanzania',
        description: 'Medium body, woody, earthy, spicy',
      },
      {
        value: 'Uganda',
        label: 'Uganda',
        description: 'Full body, chocolate, creamy, vanilla',
      },
      {
        value: 'Yemen',
        label: 'Yemen',
        description: 'Full body, chocolate, winy',
      },
    ],
  },
  {
    name: 'Asia and Pacific',
    origins: [
      {
        value: 'Bali',
        label: 'Bali',
        description:
          'Full body, low acidity, creamy, nutty, chocolate, vanilla, earthy',
      },
      {
        value: 'India',
        label: 'India',
        description: 'Full body, spicy, medium acidity, tropical fruit',
      },
      {
        value: 'Indonesia',
        label: 'Indonesia',
        description: 'Full body, earthy, woody, low acidity',
      },
      {
        value: 'Java',
        label: 'Java',
        description: 'Full body, chocolate, nutty, low acidity, creamy',
      },
      {
        value: 'Papua New Guinea',
        label: 'Papua New Guinea',
        description: 'Full body, medium acidity, fruity, earthy',
      },
      {
        value: 'Sumatra',
        label: 'Sumatra',
        description: 'Full body, intense, earthy, woody, gritty, low acidity',
      },
      {
        value: 'Hawaii',
        label: 'Hawaii',
        description: 'Medium body, low acidity, creamy, vanilla, brown sugar',
      },
    ],
  },
];
