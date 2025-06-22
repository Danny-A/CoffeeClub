import { Bean_Status } from './generated/graphql';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type RoasterOnBean = {
  id: string;
  slug?: string;
  name: string;
};

export interface Bean {
  id: string;
  slug?: string;
  name: string;
  roaster?: RoasterOnBean;
  origin?: string | null;
  process?: string;
  roastLevel?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  averageRating?: number;
  reviewCount?: number;
  status: Bean_Status;
  reviews?: {
    id: string;
    rating: number;
  }[];
  likes?: {
    id: string;
    user_id: string;
  }[];
  isNew?: boolean;
}

export type Roaster = {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  city?: string;
  state?: string;
  country?: string;
  location_city?: string;
  location_state?: string;
  location_country?: string;
  url?: string;
  instagram?: string;
  profile_image_url?: string;
  logo_url?: string;
  beanCount?: number;
  reviewCount?: number;
  created_at?: string;
  is_published?: boolean;
  likes: Array<{
    id: string;
    user_id: string;
  }>;
  isNew?: boolean;
};

export interface CoffeeBar {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  user: User;
  bean: Bean;
  rating: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  profilesCollection: {
    totalCount: number;
  };
  beansCollection: {
    totalCount: number;
    edges: Array<{
      node: {
        id: string;
        name: string;
        bean_reviewsCollection: {
          aggregates: {
            average: {
              rating: number;
            };
          };
        };
      };
    }>;
  };
  roastersCollection: {
    totalCount: number;
    edges: Array<{
      node: {
        id: string;
        name: string;
        roaster_reviewsCollection: {
          aggregates: {
            average: {
              rating: number;
            };
          };
        };
      };
    }>;
  };
  locationsCollection: {
    totalCount: number;
    edges: Array<{
      node: {
        id: string;
        name: string;
        location_reviewsCollection: {
          aggregates: {
            average: {
              rating: number;
            };
          };
        };
      };
    }>;
  };
  bean_reviewsCollection: {
    totalCount: number;
  };
  location_reviewsCollection: {
    totalCount: number;
  };
}
