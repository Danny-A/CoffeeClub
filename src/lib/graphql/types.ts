import {
  Bean_Status,
  Bean_Type,
  Roast_Level,
  Roast_Type,
} from './generated/graphql';

export type User = {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RoasterOnBean = {
  id: string;
  slug: string;
  name: string;
};

export type Bean = {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  roaster?: RoasterOnBean;
  origin?: string | null;
  process?: string;
  roastLevel?: Roast_Level;
  roastType?: Roast_Type;
  beanType?: Bean_Type;
  elevationMin?: number;
  elevationMax?: number;
  producer?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  averageRating?: number;
  imageUrl?: string;
  buyUrls?: string[];
  reviewCount?: number;
  status: Bean_Status;
  varieties?: {
    id: string;
    name: string;
  }[];
  tags?: {
    id: string;
    name: string;
  }[];
  reviews?: {
    id: string;
    rating: number;
    content?: string;
    coffeeType?: string;
    profile?: {
      id: string;
      username?: string;
      displayName?: string;
      profileImageUrl?: string;
    };
    createdAt?: string;
  }[];
  likes?: {
    id: string;
    userId: string;
  }[];
  isNew?: boolean;
};

export type Beans = {
  beans: Array<{
    id: string;
    slug?: string;
    name: string;
    origin?: string;
    process?: string;
    roastLevel?: Roast_Level;
    roaster?: RoasterOnBean;
    createdAt: string;
    updatedAt: string;
    averageRating: number;
    status: Bean_Status;
    reviewCount: number;
    likes: Array<{
      id: string;
      userId: string;
    }>;
    isNew: boolean;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

export type Roaster = {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  city?: string;
  state?: string;
  country?: string;
  url?: string;
  instagram?: string;
  profileImageUrl?: string;
  logoUrl?: string;
  beanCount?: number;
  reviewCount?: number;
  createdAt?: string;
  isPublished?: boolean;
  likes: Array<{
    id: string;
    userId: string;
  }>;
  beans: Array<{
    id: string;
    slug?: string;
    name: string;
    origin?: string;
    process?: string;
    roastLevel?: Roast_Level;
    averageRating?: number;
    createdAt: string;
    status: Bean_Status;
    likes: Array<{
      id: string;
      userId: string;
    }>;
    reviews: Array<{
      id: string;
      rating: number;
    }>;
  }>;
  claimedBy?: string;
  isNew: boolean;
};

export type RoasterCardType = Omit<Roaster, 'beans'>;

export type Roasters = {
  roasters: {
    id: string;
    slug: string;
    name: string;
    profileImageUrl?: string;
    logoUrl?: string;
    city?: string;
    state?: string;
    country?: string;
    claimedBy?: string;
    createdAt: string;
    isPublished: boolean;
    beanCount: number;
    likes: {
      id: string;
      userId: string;
    }[];
    isNew: boolean;
  }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

export type CoffeeBar = {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  user: User;
  bean: Bean;
  rating: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
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
};
