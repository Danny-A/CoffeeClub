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
  name: string;
};

export interface Bean {
  id: string;
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
  is_published?: boolean;
  reviews?: {
    id: string;
    rating: number;
  }[];
  likes?: {
    id: string;
    user_id: string;
  }[];
}

export type Roaster = {
  id: string;
  name: string;
  city?: string;
  state?: string;
  country?: string;
  url?: string;
  instagram?: string;
  beanCount: number;
  reviewCount?: number;
  created_at: string;
  is_published?: boolean;
  likes: Array<{
    id: string;
    user_id: string;
  }>;
};

export interface CoffeeBar {
  id: string;
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
