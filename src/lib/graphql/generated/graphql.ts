/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: any; output: any; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: any; output: any; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date without time information */
  Date: { input: any; output: any; }
  /** A date and time */
  Datetime: { input: any; output: any; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: any; output: any; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: any; output: any; }
  /** A universally unique identifier */
  UUID: { input: any; output: any; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `bean_likes` collection */
  deleteFrombean_likesCollection: Bean_LikesDeleteResponse;
  /** Deletes zero or more records from the `bean_reviews` collection */
  deleteFrombean_reviewsCollection: Bean_ReviewsDeleteResponse;
  /** Deletes zero or more records from the `bean_tags` collection */
  deleteFrombean_tagsCollection: Bean_TagsDeleteResponse;
  /** Deletes zero or more records from the `bean_varieties` collection */
  deleteFrombean_varietiesCollection: Bean_VarietiesDeleteResponse;
  /** Deletes zero or more records from the `beans` collection */
  deleteFrombeansCollection: BeansDeleteResponse;
  /** Deletes zero or more records from the `dashboard_stats` collection */
  deleteFromdashboard_statsCollection: Dashboard_StatsDeleteResponse;
  /** Deletes zero or more records from the `followers` collection */
  deleteFromfollowersCollection: FollowersDeleteResponse;
  /** Deletes zero or more records from the `homepage_curated_items` collection */
  deleteFromhomepage_curated_itemsCollection: Homepage_Curated_ItemsDeleteResponse;
  /** Deletes zero or more records from the `location_likes` collection */
  deleteFromlocation_likesCollection: Location_LikesDeleteResponse;
  /** Deletes zero or more records from the `location_reviews` collection */
  deleteFromlocation_reviewsCollection: Location_ReviewsDeleteResponse;
  /** Deletes zero or more records from the `locations` collection */
  deleteFromlocationsCollection: LocationsDeleteResponse;
  /** Deletes zero or more records from the `profiles` collection */
  deleteFromprofilesCollection: ProfilesDeleteResponse;
  /** Deletes zero or more records from the `recipe_likes` collection */
  deleteFromrecipe_likesCollection: Recipe_LikesDeleteResponse;
  /** Deletes zero or more records from the `recipes` collection */
  deleteFromrecipesCollection: RecipesDeleteResponse;
  /** Deletes zero or more records from the `roaster_likes` collection */
  deleteFromroaster_likesCollection: Roaster_LikesDeleteResponse;
  /** Deletes zero or more records from the `roasters` collection */
  deleteFromroastersCollection: RoastersDeleteResponse;
  /** Deletes zero or more records from the `tags` collection */
  deleteFromtagsCollection: TagsDeleteResponse;
  /** Deletes zero or more records from the `user_roles` collection */
  deleteFromuser_rolesCollection: User_RolesDeleteResponse;
  /** Deletes zero or more records from the `varieties` collection */
  deleteFromvarietiesCollection: VarietiesDeleteResponse;
  /** Adds one or more `bean_likes` records to the collection */
  insertIntobean_likesCollection?: Maybe<Bean_LikesInsertResponse>;
  /** Adds one or more `bean_reviews` records to the collection */
  insertIntobean_reviewsCollection?: Maybe<Bean_ReviewsInsertResponse>;
  /** Adds one or more `bean_tags` records to the collection */
  insertIntobean_tagsCollection?: Maybe<Bean_TagsInsertResponse>;
  /** Adds one or more `bean_varieties` records to the collection */
  insertIntobean_varietiesCollection?: Maybe<Bean_VarietiesInsertResponse>;
  /** Adds one or more `beans` records to the collection */
  insertIntobeansCollection?: Maybe<BeansInsertResponse>;
  /** Adds one or more `dashboard_stats` records to the collection */
  insertIntodashboard_statsCollection?: Maybe<Dashboard_StatsInsertResponse>;
  /** Adds one or more `followers` records to the collection */
  insertIntofollowersCollection?: Maybe<FollowersInsertResponse>;
  /** Adds one or more `homepage_curated_items` records to the collection */
  insertIntohomepage_curated_itemsCollection?: Maybe<Homepage_Curated_ItemsInsertResponse>;
  /** Adds one or more `location_likes` records to the collection */
  insertIntolocation_likesCollection?: Maybe<Location_LikesInsertResponse>;
  /** Adds one or more `location_reviews` records to the collection */
  insertIntolocation_reviewsCollection?: Maybe<Location_ReviewsInsertResponse>;
  /** Adds one or more `locations` records to the collection */
  insertIntolocationsCollection?: Maybe<LocationsInsertResponse>;
  /** Adds one or more `profiles` records to the collection */
  insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>;
  /** Adds one or more `recipe_likes` records to the collection */
  insertIntorecipe_likesCollection?: Maybe<Recipe_LikesInsertResponse>;
  /** Adds one or more `recipes` records to the collection */
  insertIntorecipesCollection?: Maybe<RecipesInsertResponse>;
  /** Adds one or more `roaster_likes` records to the collection */
  insertIntoroaster_likesCollection?: Maybe<Roaster_LikesInsertResponse>;
  /** Adds one or more `roasters` records to the collection */
  insertIntoroastersCollection?: Maybe<RoastersInsertResponse>;
  /** Adds one or more `tags` records to the collection */
  insertIntotagsCollection?: Maybe<TagsInsertResponse>;
  /** Adds one or more `user_roles` records to the collection */
  insertIntouser_rolesCollection?: Maybe<User_RolesInsertResponse>;
  /** Adds one or more `varieties` records to the collection */
  insertIntovarietiesCollection?: Maybe<VarietiesInsertResponse>;
  update_roaster_bean_count?: Maybe<Scalars['Opaque']['output']>;
  /** Updates zero or more records in the `bean_likes` collection */
  updatebean_likesCollection: Bean_LikesUpdateResponse;
  /** Updates zero or more records in the `bean_reviews` collection */
  updatebean_reviewsCollection: Bean_ReviewsUpdateResponse;
  /** Updates zero or more records in the `bean_tags` collection */
  updatebean_tagsCollection: Bean_TagsUpdateResponse;
  /** Updates zero or more records in the `bean_varieties` collection */
  updatebean_varietiesCollection: Bean_VarietiesUpdateResponse;
  /** Updates zero or more records in the `beans` collection */
  updatebeansCollection: BeansUpdateResponse;
  /** Updates zero or more records in the `dashboard_stats` collection */
  updatedashboard_statsCollection: Dashboard_StatsUpdateResponse;
  /** Updates zero or more records in the `followers` collection */
  updatefollowersCollection: FollowersUpdateResponse;
  /** Updates zero or more records in the `homepage_curated_items` collection */
  updatehomepage_curated_itemsCollection: Homepage_Curated_ItemsUpdateResponse;
  /** Updates zero or more records in the `location_likes` collection */
  updatelocation_likesCollection: Location_LikesUpdateResponse;
  /** Updates zero or more records in the `location_reviews` collection */
  updatelocation_reviewsCollection: Location_ReviewsUpdateResponse;
  /** Updates zero or more records in the `locations` collection */
  updatelocationsCollection: LocationsUpdateResponse;
  /** Updates zero or more records in the `profiles` collection */
  updateprofilesCollection: ProfilesUpdateResponse;
  /** Updates zero or more records in the `recipe_likes` collection */
  updaterecipe_likesCollection: Recipe_LikesUpdateResponse;
  /** Updates zero or more records in the `recipes` collection */
  updaterecipesCollection: RecipesUpdateResponse;
  /** Updates zero or more records in the `roaster_likes` collection */
  updateroaster_likesCollection: Roaster_LikesUpdateResponse;
  /** Updates zero or more records in the `roasters` collection */
  updateroastersCollection: RoastersUpdateResponse;
  /** Updates zero or more records in the `tags` collection */
  updatetagsCollection: TagsUpdateResponse;
  /** Updates zero or more records in the `user_roles` collection */
  updateuser_rolesCollection: User_RolesUpdateResponse;
  /** Updates zero or more records in the `varieties` collection */
  updatevarietiesCollection: VarietiesUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrombean_LikesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Bean_LikesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrombean_ReviewsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Bean_ReviewsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrombean_TagsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Bean_TagsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrombean_VarietiesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Bean_VarietiesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrombeansCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<BeansFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromdashboard_StatsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Dashboard_StatsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromfollowersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FollowersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromhomepage_Curated_ItemsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Homepage_Curated_ItemsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromlocation_LikesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Location_LikesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromlocation_ReviewsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Location_ReviewsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromlocationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<LocationsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProfilesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromrecipe_LikesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Recipe_LikesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromrecipesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RecipesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromroaster_LikesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Roaster_LikesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromroastersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RoastersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromtagsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<TagsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromuser_RolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<User_RolesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromvarietiesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<VarietiesFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntobean_LikesCollectionArgs = {
  objects: Array<Bean_LikesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntobean_ReviewsCollectionArgs = {
  objects: Array<Bean_ReviewsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntobean_TagsCollectionArgs = {
  objects: Array<Bean_TagsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntobean_VarietiesCollectionArgs = {
  objects: Array<Bean_VarietiesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntobeansCollectionArgs = {
  objects: Array<BeansInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntodashboard_StatsCollectionArgs = {
  objects: Array<Dashboard_StatsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntofollowersCollectionArgs = {
  objects: Array<FollowersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntohomepage_Curated_ItemsCollectionArgs = {
  objects: Array<Homepage_Curated_ItemsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntolocation_LikesCollectionArgs = {
  objects: Array<Location_LikesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntolocation_ReviewsCollectionArgs = {
  objects: Array<Location_ReviewsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntolocationsCollectionArgs = {
  objects: Array<LocationsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntorecipe_LikesCollectionArgs = {
  objects: Array<Recipe_LikesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntorecipesCollectionArgs = {
  objects: Array<RecipesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoroaster_LikesCollectionArgs = {
  objects: Array<Roaster_LikesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoroastersCollectionArgs = {
  objects: Array<RoastersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntotagsCollectionArgs = {
  objects: Array<TagsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntouser_RolesCollectionArgs = {
  objects: Array<User_RolesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntovarietiesCollectionArgs = {
  objects: Array<VarietiesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdate_Roaster_Bean_CountArgs = {
  roaster_id: Scalars['UUID']['input'];
};


/** The root type for creating and mutating data */
export type MutationUpdatebean_LikesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Bean_LikesFilter>;
  set: Bean_LikesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatebean_ReviewsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Bean_ReviewsFilter>;
  set: Bean_ReviewsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatebean_TagsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Bean_TagsFilter>;
  set: Bean_TagsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatebean_VarietiesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Bean_VarietiesFilter>;
  set: Bean_VarietiesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatebeansCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<BeansFilter>;
  set: BeansUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatedashboard_StatsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Dashboard_StatsFilter>;
  set: Dashboard_StatsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatefollowersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<FollowersFilter>;
  set: FollowersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatehomepage_Curated_ItemsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Homepage_Curated_ItemsFilter>;
  set: Homepage_Curated_ItemsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatelocation_LikesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Location_LikesFilter>;
  set: Location_LikesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatelocation_ReviewsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Location_ReviewsFilter>;
  set: Location_ReviewsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatelocationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<LocationsFilter>;
  set: LocationsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProfilesFilter>;
  set: ProfilesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdaterecipe_LikesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Recipe_LikesFilter>;
  set: Recipe_LikesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdaterecipesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RecipesFilter>;
  set: RecipesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateroaster_LikesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Roaster_LikesFilter>;
  set: Roaster_LikesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateroastersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RoastersFilter>;
  set: RoastersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatetagsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<TagsFilter>;
  set: TagsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateuser_RolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<User_RolesFilter>;
  set: User_RolesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatevarietiesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<VarietiesFilter>;
  set: VarietiesUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `bean_likes` */
  bean_likesCollection?: Maybe<Bean_LikesConnection>;
  /** A pagable collection of type `bean_reviews` */
  bean_reviewsCollection?: Maybe<Bean_ReviewsConnection>;
  /** A pagable collection of type `bean_tags` */
  bean_tagsCollection?: Maybe<Bean_TagsConnection>;
  /** A pagable collection of type `bean_varieties` */
  bean_varietiesCollection?: Maybe<Bean_VarietiesConnection>;
  /** A pagable collection of type `beans` */
  beansCollection?: Maybe<BeansConnection>;
  /** A pagable collection of type `dashboard_stats` */
  dashboard_statsCollection?: Maybe<Dashboard_StatsConnection>;
  /** A pagable collection of type `followers` */
  followersCollection?: Maybe<FollowersConnection>;
  generate_slug?: Maybe<Scalars['String']['output']>;
  /** A pagable collection of type `homepage_curated_items` */
  homepage_curated_itemsCollection?: Maybe<Homepage_Curated_ItemsConnection>;
  is_username_available?: Maybe<Scalars['Boolean']['output']>;
  /** A pagable collection of type `location_likes` */
  location_likesCollection?: Maybe<Location_LikesConnection>;
  /** A pagable collection of type `location_reviews` */
  location_reviewsCollection?: Maybe<Location_ReviewsConnection>;
  /** A pagable collection of type `locations` */
  locationsCollection?: Maybe<LocationsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `profiles` */
  profilesCollection?: Maybe<ProfilesConnection>;
  /** A pagable collection of type `recipe_likes` */
  recipe_likesCollection?: Maybe<Recipe_LikesConnection>;
  /** A pagable collection of type `recipes` */
  recipesCollection?: Maybe<RecipesConnection>;
  /** A pagable collection of type `roaster_likes` */
  roaster_likesCollection?: Maybe<Roaster_LikesConnection>;
  /** A pagable collection of type `roasters` */
  roastersCollection?: Maybe<RoastersConnection>;
  /** A pagable collection of type `tags` */
  tagsCollection?: Maybe<TagsConnection>;
  /** A pagable collection of type `user_roles` */
  user_rolesCollection?: Maybe<User_RolesConnection>;
  /** A pagable collection of type `varieties` */
  varietiesCollection?: Maybe<VarietiesConnection>;
};


/** The root type for querying data */
export type QueryBean_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_LikesOrderBy>>;
};


/** The root type for querying data */
export type QueryBean_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_ReviewsOrderBy>>;
};


/** The root type for querying data */
export type QueryBean_TagsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_TagsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_TagsOrderBy>>;
};


/** The root type for querying data */
export type QueryBean_VarietiesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_VarietiesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_VarietiesOrderBy>>;
};


/** The root type for querying data */
export type QueryBeansCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<BeansFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BeansOrderBy>>;
};


/** The root type for querying data */
export type QueryDashboard_StatsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Dashboard_StatsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Dashboard_StatsOrderBy>>;
};


/** The root type for querying data */
export type QueryFollowersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FollowersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FollowersOrderBy>>;
};


/** The root type for querying data */
export type QueryGenerate_SlugArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


/** The root type for querying data */
export type QueryHomepage_Curated_ItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Homepage_Curated_ItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Homepage_Curated_ItemsOrderBy>>;
};


/** The root type for querying data */
export type QueryIs_Username_AvailableArgs = {
  desired_username: Scalars['String']['input'];
};


/** The root type for querying data */
export type QueryLocation_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Location_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Location_LikesOrderBy>>;
};


/** The root type for querying data */
export type QueryLocation_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Location_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Location_ReviewsOrderBy>>;
};


/** The root type for querying data */
export type QueryLocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<LocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProfilesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};


/** The root type for querying data */
export type QueryRecipe_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Recipe_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Recipe_LikesOrderBy>>;
};


/** The root type for querying data */
export type QueryRecipesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RecipesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecipesOrderBy>>;
};


/** The root type for querying data */
export type QueryRoaster_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Roaster_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Roaster_LikesOrderBy>>;
};


/** The root type for querying data */
export type QueryRoastersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RoastersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RoastersOrderBy>>;
};


/** The root type for querying data */
export type QueryTagsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<TagsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagsOrderBy>>;
};


/** The root type for querying data */
export type QueryUser_RolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<User_RolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<User_RolesOrderBy>>;
};


/** The root type for querying data */
export type QueryVarietiesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<VarietiesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VarietiesOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type Bean_Likes = Node & {
  __typename?: 'bean_likes';
  bean_id?: Maybe<Scalars['UUID']['output']>;
  beans?: Maybe<Beans>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type Bean_LikesConnection = {
  __typename?: 'bean_likesConnection';
  edges: Array<Bean_LikesEdge>;
  pageInfo: PageInfo;
};

export type Bean_LikesDeleteResponse = {
  __typename?: 'bean_likesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Likes>;
};

export type Bean_LikesEdge = {
  __typename?: 'bean_likesEdge';
  cursor: Scalars['String']['output'];
  node: Bean_Likes;
};

export type Bean_LikesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Bean_LikesFilter>>;
  bean_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Bean_LikesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Bean_LikesFilter>>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Bean_LikesInsertInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Bean_LikesInsertResponse = {
  __typename?: 'bean_likesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Likes>;
};

export type Bean_LikesOrderBy = {
  bean_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Bean_LikesUpdateInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Bean_LikesUpdateResponse = {
  __typename?: 'bean_likesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Likes>;
};

export type Bean_Reviews = Node & {
  __typename?: 'bean_reviews';
  bean_id?: Maybe<Scalars['UUID']['output']>;
  beans?: Maybe<Beans>;
  coffee_type?: Maybe<Coffee_Type>;
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  rating?: Maybe<Scalars['BigFloat']['output']>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type Bean_ReviewsConnection = {
  __typename?: 'bean_reviewsConnection';
  edges: Array<Bean_ReviewsEdge>;
  pageInfo: PageInfo;
};

export type Bean_ReviewsDeleteResponse = {
  __typename?: 'bean_reviewsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Reviews>;
};

export type Bean_ReviewsEdge = {
  __typename?: 'bean_reviewsEdge';
  cursor: Scalars['String']['output'];
  node: Bean_Reviews;
};

export type Bean_ReviewsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Bean_ReviewsFilter>>;
  bean_id?: InputMaybe<UuidFilter>;
  coffee_type?: InputMaybe<Coffee_TypeFilter>;
  content?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Bean_ReviewsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Bean_ReviewsFilter>>;
  rating?: InputMaybe<BigFloatFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Bean_ReviewsInsertInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  coffee_type?: InputMaybe<Coffee_Type>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  rating?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Bean_ReviewsInsertResponse = {
  __typename?: 'bean_reviewsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Reviews>;
};

export type Bean_ReviewsOrderBy = {
  bean_id?: InputMaybe<OrderByDirection>;
  coffee_type?: InputMaybe<OrderByDirection>;
  content?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  rating?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Bean_ReviewsUpdateInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  coffee_type?: InputMaybe<Coffee_Type>;
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  rating?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Bean_ReviewsUpdateResponse = {
  __typename?: 'bean_reviewsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Reviews>;
};

export type Bean_Tags = Node & {
  __typename?: 'bean_tags';
  bean_id?: Maybe<Scalars['UUID']['output']>;
  beans?: Maybe<Beans>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  tag_id?: Maybe<Scalars['UUID']['output']>;
  tags?: Maybe<Tags>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
};

export type Bean_TagsConnection = {
  __typename?: 'bean_tagsConnection';
  edges: Array<Bean_TagsEdge>;
  pageInfo: PageInfo;
};

export type Bean_TagsDeleteResponse = {
  __typename?: 'bean_tagsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Tags>;
};

export type Bean_TagsEdge = {
  __typename?: 'bean_tagsEdge';
  cursor: Scalars['String']['output'];
  node: Bean_Tags;
};

export type Bean_TagsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Bean_TagsFilter>>;
  bean_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Bean_TagsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Bean_TagsFilter>>;
  tag_id?: InputMaybe<UuidFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Bean_TagsInsertInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  tag_id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Bean_TagsInsertResponse = {
  __typename?: 'bean_tagsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Tags>;
};

export type Bean_TagsOrderBy = {
  bean_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  tag_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Bean_TagsUpdateInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  tag_id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Bean_TagsUpdateResponse = {
  __typename?: 'bean_tagsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Tags>;
};

export enum Bean_Type {
  Blend = 'Blend',
  SingleOrigin = 'Single_Origin'
}

/** Boolean expression comparing fields on type "bean_type" */
export type Bean_TypeFilter = {
  eq?: InputMaybe<Bean_Type>;
  in?: InputMaybe<Array<Bean_Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Bean_Type>;
};

export type Bean_Varieties = Node & {
  __typename?: 'bean_varieties';
  bean_id: Scalars['UUID']['output'];
  beans?: Maybe<Beans>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  varieties?: Maybe<Varieties>;
  variety_id: Scalars['UUID']['output'];
};

export type Bean_VarietiesConnection = {
  __typename?: 'bean_varietiesConnection';
  edges: Array<Bean_VarietiesEdge>;
  pageInfo: PageInfo;
};

export type Bean_VarietiesDeleteResponse = {
  __typename?: 'bean_varietiesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Varieties>;
};

export type Bean_VarietiesEdge = {
  __typename?: 'bean_varietiesEdge';
  cursor: Scalars['String']['output'];
  node: Bean_Varieties;
};

export type Bean_VarietiesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Bean_VarietiesFilter>>;
  bean_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Bean_VarietiesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Bean_VarietiesFilter>>;
  variety_id?: InputMaybe<UuidFilter>;
};

export type Bean_VarietiesInsertInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  variety_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Bean_VarietiesInsertResponse = {
  __typename?: 'bean_varietiesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Varieties>;
};

export type Bean_VarietiesOrderBy = {
  bean_id?: InputMaybe<OrderByDirection>;
  variety_id?: InputMaybe<OrderByDirection>;
};

export type Bean_VarietiesUpdateInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  variety_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Bean_VarietiesUpdateResponse = {
  __typename?: 'bean_varietiesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Bean_Varieties>;
};

export type Beans = Node & {
  __typename?: 'beans';
  added_by?: Maybe<Scalars['UUID']['output']>;
  average_rating?: Maybe<Scalars['Float']['output']>;
  bean_likesCollection?: Maybe<Bean_LikesConnection>;
  bean_reviewsCollection?: Maybe<Bean_ReviewsConnection>;
  bean_tagsCollection?: Maybe<Bean_TagsConnection>;
  bean_type?: Maybe<Bean_Type>;
  bean_varietiesCollection?: Maybe<Bean_VarietiesConnection>;
  buy_urls?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  elevation_max?: Maybe<Scalars['Int']['output']>;
  elevation_min?: Maybe<Scalars['Int']['output']>;
  homepage_curated_itemsCollection?: Maybe<Homepage_Curated_ItemsConnection>;
  id: Scalars['UUID']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  is_published: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Scalars['String']['output']>;
  process?: Maybe<Scalars['String']['output']>;
  producer?: Maybe<Scalars['String']['output']>;
  recipesCollection?: Maybe<RecipesConnection>;
  review_count?: Maybe<Scalars['Int']['output']>;
  roast_level?: Maybe<Roast_Level>;
  roast_type?: Maybe<Roast_Type>;
  roaster_id?: Maybe<Scalars['UUID']['output']>;
  roasters?: Maybe<Roasters>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
};


export type BeansBean_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_LikesOrderBy>>;
};


export type BeansBean_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_ReviewsOrderBy>>;
};


export type BeansBean_TagsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_TagsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_TagsOrderBy>>;
};


export type BeansBean_VarietiesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_VarietiesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_VarietiesOrderBy>>;
};


export type BeansHomepage_Curated_ItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Homepage_Curated_ItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Homepage_Curated_ItemsOrderBy>>;
};


export type BeansRecipesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RecipesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecipesOrderBy>>;
};

export type BeansConnection = {
  __typename?: 'beansConnection';
  edges: Array<BeansEdge>;
  pageInfo: PageInfo;
};

export type BeansDeleteResponse = {
  __typename?: 'beansDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Beans>;
};

export type BeansEdge = {
  __typename?: 'beansEdge';
  cursor: Scalars['String']['output'];
  node: Beans;
};

export type BeansFilter = {
  added_by?: InputMaybe<UuidFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<BeansFilter>>;
  average_rating?: InputMaybe<FloatFilter>;
  bean_type?: InputMaybe<Bean_TypeFilter>;
  buy_urls?: InputMaybe<StringListFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  elevation_max?: InputMaybe<IntFilter>;
  elevation_min?: InputMaybe<IntFilter>;
  id?: InputMaybe<UuidFilter>;
  image_url?: InputMaybe<StringFilter>;
  is_published?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<BeansFilter>;
  notes?: InputMaybe<StringFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<BeansFilter>>;
  origin?: InputMaybe<StringFilter>;
  process?: InputMaybe<StringFilter>;
  producer?: InputMaybe<StringFilter>;
  review_count?: InputMaybe<IntFilter>;
  roast_level?: InputMaybe<Roast_LevelFilter>;
  roast_type?: InputMaybe<Roast_TypeFilter>;
  roaster_id?: InputMaybe<UuidFilter>;
  slug?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type BeansInsertInput = {
  added_by?: InputMaybe<Scalars['UUID']['input']>;
  average_rating?: InputMaybe<Scalars['Float']['input']>;
  bean_type?: InputMaybe<Bean_Type>;
  buy_urls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  elevation_max?: InputMaybe<Scalars['Int']['input']>;
  elevation_min?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  process?: InputMaybe<Scalars['String']['input']>;
  producer?: InputMaybe<Scalars['String']['input']>;
  review_count?: InputMaybe<Scalars['Int']['input']>;
  roast_level?: InputMaybe<Roast_Level>;
  roast_type?: InputMaybe<Roast_Type>;
  roaster_id?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type BeansInsertResponse = {
  __typename?: 'beansInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Beans>;
};

export type BeansOrderBy = {
  added_by?: InputMaybe<OrderByDirection>;
  average_rating?: InputMaybe<OrderByDirection>;
  bean_type?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  elevation_max?: InputMaybe<OrderByDirection>;
  elevation_min?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  image_url?: InputMaybe<OrderByDirection>;
  is_published?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  notes?: InputMaybe<OrderByDirection>;
  origin?: InputMaybe<OrderByDirection>;
  process?: InputMaybe<OrderByDirection>;
  producer?: InputMaybe<OrderByDirection>;
  review_count?: InputMaybe<OrderByDirection>;
  roast_level?: InputMaybe<OrderByDirection>;
  roast_type?: InputMaybe<OrderByDirection>;
  roaster_id?: InputMaybe<OrderByDirection>;
  slug?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type BeansUpdateInput = {
  added_by?: InputMaybe<Scalars['UUID']['input']>;
  average_rating?: InputMaybe<Scalars['Float']['input']>;
  bean_type?: InputMaybe<Bean_Type>;
  buy_urls?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  elevation_max?: InputMaybe<Scalars['Int']['input']>;
  elevation_min?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  process?: InputMaybe<Scalars['String']['input']>;
  producer?: InputMaybe<Scalars['String']['input']>;
  review_count?: InputMaybe<Scalars['Int']['input']>;
  roast_level?: InputMaybe<Roast_Level>;
  roast_type?: InputMaybe<Roast_Type>;
  roaster_id?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type BeansUpdateResponse = {
  __typename?: 'beansUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Beans>;
};

export enum Brew_Method {
  AeroPress = 'AeroPress',
  AutoDrip = 'Auto_Drip',
  Automatic = 'Automatic',
  Chemex = 'Chemex',
  ColdBrew = 'Cold_Brew',
  Espresso = 'Espresso',
  FrenchPress = 'French_Press',
  HarioV60 = 'Hario_V60',
  KalitaWave = 'Kalita_Wave',
  MokaPot = 'Moka_Pot',
  Origami = 'Origami',
  Other = 'Other',
  Percolator = 'Percolator',
  PourOver = 'Pour_Over',
  Siphon = 'Siphon'
}

/** Boolean expression comparing fields on type "brew_method" */
export type Brew_MethodFilter = {
  eq?: InputMaybe<Brew_Method>;
  in?: InputMaybe<Array<Brew_Method>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Brew_Method>;
};

export enum Coffee_Type {
  Americano = 'Americano',
  Cappuccino = 'Cappuccino',
  ColdBrew = 'Cold_Brew',
  Cortado = 'Cortado',
  Doppio = 'Doppio',
  Espresso = 'Espresso',
  Filter = 'Filter',
  FlatWhite = 'FlatWhite',
  Latte = 'Latte',
  Lungo = 'Lungo',
  Macchiato = 'Macchiato',
  Mocha = 'Mocha',
  Other = 'Other',
  Ristretto = 'Ristretto'
}

/** Boolean expression comparing fields on type "coffee_type" */
export type Coffee_TypeFilter = {
  eq?: InputMaybe<Coffee_Type>;
  in?: InputMaybe<Array<Coffee_Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Coffee_Type>;
};

export type Dashboard_Stats = Node & {
  __typename?: 'dashboard_stats';
  id?: Maybe<Scalars['UUID']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  total_bean_reviews?: Maybe<Scalars['BigInt']['output']>;
  total_beans?: Maybe<Scalars['BigInt']['output']>;
  total_location_reviews?: Maybe<Scalars['BigInt']['output']>;
  total_locations?: Maybe<Scalars['BigInt']['output']>;
  total_recipes?: Maybe<Scalars['BigInt']['output']>;
  total_roasters?: Maybe<Scalars['BigInt']['output']>;
  total_users?: Maybe<Scalars['BigInt']['output']>;
};

export type Dashboard_StatsConnection = {
  __typename?: 'dashboard_statsConnection';
  edges: Array<Dashboard_StatsEdge>;
  pageInfo: PageInfo;
};

export type Dashboard_StatsDeleteResponse = {
  __typename?: 'dashboard_statsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Dashboard_Stats>;
};

export type Dashboard_StatsEdge = {
  __typename?: 'dashboard_statsEdge';
  cursor: Scalars['String']['output'];
  node: Dashboard_Stats;
};

export type Dashboard_StatsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Dashboard_StatsFilter>>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Dashboard_StatsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Dashboard_StatsFilter>>;
  total_bean_reviews?: InputMaybe<BigIntFilter>;
  total_beans?: InputMaybe<BigIntFilter>;
  total_location_reviews?: InputMaybe<BigIntFilter>;
  total_locations?: InputMaybe<BigIntFilter>;
  total_recipes?: InputMaybe<BigIntFilter>;
  total_roasters?: InputMaybe<BigIntFilter>;
  total_users?: InputMaybe<BigIntFilter>;
};

export type Dashboard_StatsInsertInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  total_bean_reviews?: InputMaybe<Scalars['BigInt']['input']>;
  total_beans?: InputMaybe<Scalars['BigInt']['input']>;
  total_location_reviews?: InputMaybe<Scalars['BigInt']['input']>;
  total_locations?: InputMaybe<Scalars['BigInt']['input']>;
  total_recipes?: InputMaybe<Scalars['BigInt']['input']>;
  total_roasters?: InputMaybe<Scalars['BigInt']['input']>;
  total_users?: InputMaybe<Scalars['BigInt']['input']>;
};

export type Dashboard_StatsInsertResponse = {
  __typename?: 'dashboard_statsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Dashboard_Stats>;
};

export type Dashboard_StatsOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  total_bean_reviews?: InputMaybe<OrderByDirection>;
  total_beans?: InputMaybe<OrderByDirection>;
  total_location_reviews?: InputMaybe<OrderByDirection>;
  total_locations?: InputMaybe<OrderByDirection>;
  total_recipes?: InputMaybe<OrderByDirection>;
  total_roasters?: InputMaybe<OrderByDirection>;
  total_users?: InputMaybe<OrderByDirection>;
};

export type Dashboard_StatsUpdateInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  total_bean_reviews?: InputMaybe<Scalars['BigInt']['input']>;
  total_beans?: InputMaybe<Scalars['BigInt']['input']>;
  total_location_reviews?: InputMaybe<Scalars['BigInt']['input']>;
  total_locations?: InputMaybe<Scalars['BigInt']['input']>;
  total_recipes?: InputMaybe<Scalars['BigInt']['input']>;
  total_roasters?: InputMaybe<Scalars['BigInt']['input']>;
  total_users?: InputMaybe<Scalars['BigInt']['input']>;
};

export type Dashboard_StatsUpdateResponse = {
  __typename?: 'dashboard_statsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Dashboard_Stats>;
};

export type Followers = Node & {
  __typename?: 'followers';
  created_at?: Maybe<Scalars['Datetime']['output']>;
  follower_id?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type FollowersConnection = {
  __typename?: 'followersConnection';
  edges: Array<FollowersEdge>;
  pageInfo: PageInfo;
};

export type FollowersDeleteResponse = {
  __typename?: 'followersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Followers>;
};

export type FollowersEdge = {
  __typename?: 'followersEdge';
  cursor: Scalars['String']['output'];
  node: Followers;
};

export type FollowersFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<FollowersFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  follower_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<FollowersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<FollowersFilter>>;
  user_id?: InputMaybe<UuidFilter>;
};

export type FollowersInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  follower_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type FollowersInsertResponse = {
  __typename?: 'followersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Followers>;
};

export type FollowersOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  follower_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type FollowersUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  follower_id?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type FollowersUpdateResponse = {
  __typename?: 'followersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Followers>;
};

export type Homepage_Curated_Items = Node & {
  __typename?: 'homepage_curated_items';
  bean_id?: Maybe<Scalars['UUID']['output']>;
  beans?: Maybe<Beans>;
  created_at: Scalars['Datetime']['output'];
  curated_by?: Maybe<Scalars['UUID']['output']>;
  custom_title?: Maybe<Scalars['String']['output']>;
  display_order: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  location_id?: Maybe<Scalars['UUID']['output']>;
  locations?: Maybe<Locations>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  recipe_id?: Maybe<Scalars['UUID']['output']>;
  recipes?: Maybe<Recipes>;
  roaster_id?: Maybe<Scalars['UUID']['output']>;
  roasters?: Maybe<Roasters>;
  section: Scalars['String']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type Homepage_Curated_ItemsConnection = {
  __typename?: 'homepage_curated_itemsConnection';
  edges: Array<Homepage_Curated_ItemsEdge>;
  pageInfo: PageInfo;
};

export type Homepage_Curated_ItemsDeleteResponse = {
  __typename?: 'homepage_curated_itemsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Homepage_Curated_Items>;
};

export type Homepage_Curated_ItemsEdge = {
  __typename?: 'homepage_curated_itemsEdge';
  cursor: Scalars['String']['output'];
  node: Homepage_Curated_Items;
};

export type Homepage_Curated_ItemsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Homepage_Curated_ItemsFilter>>;
  bean_id?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  curated_by?: InputMaybe<UuidFilter>;
  custom_title?: InputMaybe<StringFilter>;
  display_order?: InputMaybe<IntFilter>;
  id?: InputMaybe<UuidFilter>;
  location_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Homepage_Curated_ItemsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Homepage_Curated_ItemsFilter>>;
  published?: InputMaybe<BooleanFilter>;
  recipe_id?: InputMaybe<UuidFilter>;
  roaster_id?: InputMaybe<UuidFilter>;
  section?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Homepage_Curated_ItemsInsertInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  curated_by?: InputMaybe<Scalars['UUID']['input']>;
  custom_title?: InputMaybe<Scalars['String']['input']>;
  display_order?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location_id?: InputMaybe<Scalars['UUID']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  recipe_id?: InputMaybe<Scalars['UUID']['input']>;
  roaster_id?: InputMaybe<Scalars['UUID']['input']>;
  section?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Homepage_Curated_ItemsInsertResponse = {
  __typename?: 'homepage_curated_itemsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Homepage_Curated_Items>;
};

export type Homepage_Curated_ItemsOrderBy = {
  bean_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  curated_by?: InputMaybe<OrderByDirection>;
  custom_title?: InputMaybe<OrderByDirection>;
  display_order?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  location_id?: InputMaybe<OrderByDirection>;
  published?: InputMaybe<OrderByDirection>;
  recipe_id?: InputMaybe<OrderByDirection>;
  roaster_id?: InputMaybe<OrderByDirection>;
  section?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Homepage_Curated_ItemsUpdateInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  curated_by?: InputMaybe<Scalars['UUID']['input']>;
  custom_title?: InputMaybe<Scalars['String']['input']>;
  display_order?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location_id?: InputMaybe<Scalars['UUID']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  recipe_id?: InputMaybe<Scalars['UUID']['input']>;
  roaster_id?: InputMaybe<Scalars['UUID']['input']>;
  section?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Homepage_Curated_ItemsUpdateResponse = {
  __typename?: 'homepage_curated_itemsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Homepage_Curated_Items>;
};

export type Location_Likes = Node & {
  __typename?: 'location_likes';
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  location_id?: Maybe<Scalars['UUID']['output']>;
  locations?: Maybe<Locations>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type Location_LikesConnection = {
  __typename?: 'location_likesConnection';
  edges: Array<Location_LikesEdge>;
  pageInfo: PageInfo;
};

export type Location_LikesDeleteResponse = {
  __typename?: 'location_likesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Location_Likes>;
};

export type Location_LikesEdge = {
  __typename?: 'location_likesEdge';
  cursor: Scalars['String']['output'];
  node: Location_Likes;
};

export type Location_LikesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Location_LikesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  location_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Location_LikesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Location_LikesFilter>>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Location_LikesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location_id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Location_LikesInsertResponse = {
  __typename?: 'location_likesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Location_Likes>;
};

export type Location_LikesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  location_id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Location_LikesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location_id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Location_LikesUpdateResponse = {
  __typename?: 'location_likesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Location_Likes>;
};

export type Location_Reviews = Node & {
  __typename?: 'location_reviews';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  location_id?: Maybe<Scalars['UUID']['output']>;
  locations?: Maybe<Locations>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  rating?: Maybe<Scalars['BigFloat']['output']>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type Location_ReviewsConnection = {
  __typename?: 'location_reviewsConnection';
  edges: Array<Location_ReviewsEdge>;
  pageInfo: PageInfo;
};

export type Location_ReviewsDeleteResponse = {
  __typename?: 'location_reviewsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Location_Reviews>;
};

export type Location_ReviewsEdge = {
  __typename?: 'location_reviewsEdge';
  cursor: Scalars['String']['output'];
  node: Location_Reviews;
};

export type Location_ReviewsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Location_ReviewsFilter>>;
  content?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  location_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Location_ReviewsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Location_ReviewsFilter>>;
  rating?: InputMaybe<BigFloatFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Location_ReviewsInsertInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location_id?: InputMaybe<Scalars['UUID']['input']>;
  rating?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Location_ReviewsInsertResponse = {
  __typename?: 'location_reviewsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Location_Reviews>;
};

export type Location_ReviewsOrderBy = {
  content?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  location_id?: InputMaybe<OrderByDirection>;
  rating?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Location_ReviewsUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  location_id?: InputMaybe<Scalars['UUID']['input']>;
  rating?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Location_ReviewsUpdateResponse = {
  __typename?: 'location_reviewsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Location_Reviews>;
};

export type Locations = Node & {
  __typename?: 'locations';
  address?: Maybe<Scalars['String']['output']>;
  average_rating?: Maybe<Scalars['Float']['output']>;
  claimed_by?: Maybe<Scalars['UUID']['output']>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  homepage_curated_itemsCollection?: Maybe<Homepage_Curated_ItemsConnection>;
  id: Scalars['UUID']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  is_published: Scalars['Boolean']['output'];
  latitude?: Maybe<Scalars['BigFloat']['output']>;
  location_likesCollection?: Maybe<Location_LikesConnection>;
  location_reviewsCollection?: Maybe<Location_ReviewsConnection>;
  longitude?: Maybe<Scalars['BigFloat']['output']>;
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  review_count?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


export type LocationsHomepage_Curated_ItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Homepage_Curated_ItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Homepage_Curated_ItemsOrderBy>>;
};


export type LocationsLocation_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Location_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Location_LikesOrderBy>>;
};


export type LocationsLocation_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Location_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Location_ReviewsOrderBy>>;
};

export type LocationsConnection = {
  __typename?: 'locationsConnection';
  edges: Array<LocationsEdge>;
  pageInfo: PageInfo;
};

export type LocationsDeleteResponse = {
  __typename?: 'locationsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Locations>;
};

export type LocationsEdge = {
  __typename?: 'locationsEdge';
  cursor: Scalars['String']['output'];
  node: Locations;
};

export type LocationsFilter = {
  address?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<LocationsFilter>>;
  average_rating?: InputMaybe<FloatFilter>;
  claimed_by?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  image_url?: InputMaybe<StringFilter>;
  instagram?: InputMaybe<StringFilter>;
  is_published?: InputMaybe<BooleanFilter>;
  latitude?: InputMaybe<BigFloatFilter>;
  longitude?: InputMaybe<BigFloatFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<LocationsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<LocationsFilter>>;
  review_count?: InputMaybe<IntFilter>;
  slug?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type LocationsInsertInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  average_rating?: InputMaybe<Scalars['Float']['input']>;
  claimed_by?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['BigFloat']['input']>;
  longitude?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  review_count?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type LocationsInsertResponse = {
  __typename?: 'locationsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Locations>;
};

export type LocationsOrderBy = {
  address?: InputMaybe<OrderByDirection>;
  average_rating?: InputMaybe<OrderByDirection>;
  claimed_by?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  image_url?: InputMaybe<OrderByDirection>;
  instagram?: InputMaybe<OrderByDirection>;
  is_published?: InputMaybe<OrderByDirection>;
  latitude?: InputMaybe<OrderByDirection>;
  longitude?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  review_count?: InputMaybe<OrderByDirection>;
  slug?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
};

export type LocationsUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  average_rating?: InputMaybe<Scalars['Float']['input']>;
  claimed_by?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  latitude?: InputMaybe<Scalars['BigFloat']['input']>;
  longitude?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  review_count?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type LocationsUpdateResponse = {
  __typename?: 'locationsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Locations>;
};

export type Profiles = Node & {
  __typename?: 'profiles';
  bean_reviewsCollection?: Maybe<Bean_ReviewsConnection>;
  bio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  followersCollection?: Maybe<FollowersConnection>;
  id: Scalars['UUID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  location_reviewsCollection?: Maybe<Location_ReviewsConnection>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profile_image_url?: Maybe<Scalars['String']['output']>;
  recipe_likesCollection?: Maybe<Recipe_LikesConnection>;
  recipesCollection?: Maybe<RecipesConnection>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};


export type ProfilesBean_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_ReviewsOrderBy>>;
};


export type ProfilesFollowersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<FollowersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FollowersOrderBy>>;
};


export type ProfilesLocation_ReviewsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Location_ReviewsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Location_ReviewsOrderBy>>;
};


export type ProfilesRecipe_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Recipe_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Recipe_LikesOrderBy>>;
};


export type ProfilesRecipesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RecipesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RecipesOrderBy>>;
};

export type ProfilesConnection = {
  __typename?: 'profilesConnection';
  edges: Array<ProfilesEdge>;
  pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
  __typename?: 'profilesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesEdge = {
  __typename?: 'profilesEdge';
  cursor: Scalars['String']['output'];
  node: Profiles;
};

export type ProfilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProfilesFilter>>;
  bio?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  display_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  instagram?: InputMaybe<StringFilter>;
  location?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProfilesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProfilesFilter>>;
  profile_image_url?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
  username?: InputMaybe<StringFilter>;
};

export type ProfilesInsertInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type ProfilesInsertResponse = {
  __typename?: 'profilesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesOrderBy = {
  bio?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  display_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  instagram?: InputMaybe<OrderByDirection>;
  location?: InputMaybe<OrderByDirection>;
  profile_image_url?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type ProfilesUpdateResponse = {
  __typename?: 'profilesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type Recipe_Likes = Node & {
  __typename?: 'recipe_likes';
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  recipe_id: Scalars['UUID']['output'];
  recipes?: Maybe<Recipes>;
  user_id: Scalars['UUID']['output'];
};

export type Recipe_LikesConnection = {
  __typename?: 'recipe_likesConnection';
  edges: Array<Recipe_LikesEdge>;
  pageInfo: PageInfo;
};

export type Recipe_LikesDeleteResponse = {
  __typename?: 'recipe_likesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Recipe_Likes>;
};

export type Recipe_LikesEdge = {
  __typename?: 'recipe_likesEdge';
  cursor: Scalars['String']['output'];
  node: Recipe_Likes;
};

export type Recipe_LikesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Recipe_LikesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Recipe_LikesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Recipe_LikesFilter>>;
  recipe_id?: InputMaybe<UuidFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Recipe_LikesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  recipe_id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Recipe_LikesInsertResponse = {
  __typename?: 'recipe_likesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Recipe_Likes>;
};

export type Recipe_LikesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  recipe_id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Recipe_LikesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  recipe_id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Recipe_LikesUpdateResponse = {
  __typename?: 'recipe_likesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Recipe_Likes>;
};

export type Recipes = Node & {
  __typename?: 'recipes';
  bean_id?: Maybe<Scalars['UUID']['output']>;
  beans?: Maybe<Beans>;
  brew_method?: Maybe<Brew_Method>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  grind_size?: Maybe<Scalars['String']['output']>;
  grind_weight?: Maybe<Scalars['BigFloat']['output']>;
  homepage_curated_itemsCollection?: Maybe<Homepage_Curated_ItemsConnection>;
  id: Scalars['UUID']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  is_public?: Maybe<Scalars['Boolean']['output']>;
  likes_count?: Maybe<Scalars['Int']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles?: Maybe<Profiles>;
  ratio?: Maybe<Scalars['String']['output']>;
  recipe_likesCollection?: Maybe<Recipe_LikesConnection>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['UUID']['output']>;
};


export type RecipesHomepage_Curated_ItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Homepage_Curated_ItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Homepage_Curated_ItemsOrderBy>>;
};


export type RecipesRecipe_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Recipe_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Recipe_LikesOrderBy>>;
};

export type RecipesConnection = {
  __typename?: 'recipesConnection';
  edges: Array<RecipesEdge>;
  pageInfo: PageInfo;
};

export type RecipesDeleteResponse = {
  __typename?: 'recipesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Recipes>;
};

export type RecipesEdge = {
  __typename?: 'recipesEdge';
  cursor: Scalars['String']['output'];
  node: Recipes;
};

export type RecipesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RecipesFilter>>;
  bean_id?: InputMaybe<UuidFilter>;
  brew_method?: InputMaybe<Brew_MethodFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  grind_size?: InputMaybe<StringFilter>;
  grind_weight?: InputMaybe<BigFloatFilter>;
  id?: InputMaybe<UuidFilter>;
  image_url?: InputMaybe<StringFilter>;
  is_public?: InputMaybe<BooleanFilter>;
  likes_count?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<RecipesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<RecipesFilter>>;
  ratio?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type RecipesInsertInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  brew_method?: InputMaybe<Brew_Method>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  grind_size?: InputMaybe<Scalars['String']['input']>;
  grind_weight?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  likes_count?: InputMaybe<Scalars['Int']['input']>;
  ratio?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type RecipesInsertResponse = {
  __typename?: 'recipesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Recipes>;
};

export type RecipesOrderBy = {
  bean_id?: InputMaybe<OrderByDirection>;
  brew_method?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  grind_size?: InputMaybe<OrderByDirection>;
  grind_weight?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  image_url?: InputMaybe<OrderByDirection>;
  is_public?: InputMaybe<OrderByDirection>;
  likes_count?: InputMaybe<OrderByDirection>;
  ratio?: InputMaybe<OrderByDirection>;
  slug?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type RecipesUpdateInput = {
  bean_id?: InputMaybe<Scalars['UUID']['input']>;
  brew_method?: InputMaybe<Brew_Method>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  grind_size?: InputMaybe<Scalars['String']['input']>;
  grind_weight?: InputMaybe<Scalars['BigFloat']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_public?: InputMaybe<Scalars['Boolean']['input']>;
  likes_count?: InputMaybe<Scalars['Int']['input']>;
  ratio?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type RecipesUpdateResponse = {
  __typename?: 'recipesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Recipes>;
};

export enum Roast_Level {
  Dark = 'Dark',
  Light = 'Light',
  Medium = 'Medium'
}

/** Boolean expression comparing fields on type "roast_level" */
export type Roast_LevelFilter = {
  eq?: InputMaybe<Roast_Level>;
  in?: InputMaybe<Array<Roast_Level>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Roast_Level>;
};

export enum Roast_Type {
  Espresso = 'Espresso',
  Filter = 'Filter',
  Omni = 'Omni'
}

/** Boolean expression comparing fields on type "roast_type" */
export type Roast_TypeFilter = {
  eq?: InputMaybe<Roast_Type>;
  in?: InputMaybe<Array<Roast_Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Roast_Type>;
};

export type Roaster_Likes = Node & {
  __typename?: 'roaster_likes';
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  roaster_id?: Maybe<Scalars['UUID']['output']>;
  roasters?: Maybe<Roasters>;
  user_id?: Maybe<Scalars['UUID']['output']>;
};

export type Roaster_LikesConnection = {
  __typename?: 'roaster_likesConnection';
  edges: Array<Roaster_LikesEdge>;
  pageInfo: PageInfo;
};

export type Roaster_LikesDeleteResponse = {
  __typename?: 'roaster_likesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roaster_Likes>;
};

export type Roaster_LikesEdge = {
  __typename?: 'roaster_likesEdge';
  cursor: Scalars['String']['output'];
  node: Roaster_Likes;
};

export type Roaster_LikesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Roaster_LikesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Roaster_LikesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Roaster_LikesFilter>>;
  roaster_id?: InputMaybe<UuidFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type Roaster_LikesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  roaster_id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Roaster_LikesInsertResponse = {
  __typename?: 'roaster_likesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roaster_Likes>;
};

export type Roaster_LikesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  roaster_id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type Roaster_LikesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  roaster_id?: InputMaybe<Scalars['UUID']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Roaster_LikesUpdateResponse = {
  __typename?: 'roaster_likesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roaster_Likes>;
};

export type Roasters = Node & {
  __typename?: 'roasters';
  average_rating?: Maybe<Scalars['Float']['output']>;
  bean_count?: Maybe<Scalars['Int']['output']>;
  beansCollection?: Maybe<BeansConnection>;
  claimed_by?: Maybe<Scalars['UUID']['output']>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  homepage_curated_itemsCollection?: Maybe<Homepage_Curated_ItemsConnection>;
  id: Scalars['UUID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  is_published: Scalars['Boolean']['output'];
  location_city?: Maybe<Scalars['String']['output']>;
  location_country?: Maybe<Scalars['String']['output']>;
  location_state?: Maybe<Scalars['String']['output']>;
  logo_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profile_image_url?: Maybe<Scalars['String']['output']>;
  review_count?: Maybe<Scalars['Int']['output']>;
  roaster_likesCollection?: Maybe<Roaster_LikesConnection>;
  slug?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


export type RoastersBeansCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<BeansFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BeansOrderBy>>;
};


export type RoastersHomepage_Curated_ItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Homepage_Curated_ItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Homepage_Curated_ItemsOrderBy>>;
};


export type RoastersRoaster_LikesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Roaster_LikesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Roaster_LikesOrderBy>>;
};

export type RoastersConnection = {
  __typename?: 'roastersConnection';
  edges: Array<RoastersEdge>;
  pageInfo: PageInfo;
};

export type RoastersDeleteResponse = {
  __typename?: 'roastersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roasters>;
};

export type RoastersEdge = {
  __typename?: 'roastersEdge';
  cursor: Scalars['String']['output'];
  node: Roasters;
};

export type RoastersFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<RoastersFilter>>;
  average_rating?: InputMaybe<FloatFilter>;
  bean_count?: InputMaybe<IntFilter>;
  claimed_by?: InputMaybe<UuidFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  instagram?: InputMaybe<StringFilter>;
  is_published?: InputMaybe<BooleanFilter>;
  location_city?: InputMaybe<StringFilter>;
  location_country?: InputMaybe<StringFilter>;
  location_state?: InputMaybe<StringFilter>;
  logo_url?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<RoastersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<RoastersFilter>>;
  profile_image_url?: InputMaybe<StringFilter>;
  review_count?: InputMaybe<IntFilter>;
  slug?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type RoastersInsertInput = {
  average_rating?: InputMaybe<Scalars['Float']['input']>;
  bean_count?: InputMaybe<Scalars['Int']['input']>;
  claimed_by?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  location_city?: InputMaybe<Scalars['String']['input']>;
  location_country?: InputMaybe<Scalars['String']['input']>;
  location_state?: InputMaybe<Scalars['String']['input']>;
  logo_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  review_count?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type RoastersInsertResponse = {
  __typename?: 'roastersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roasters>;
};

export type RoastersOrderBy = {
  average_rating?: InputMaybe<OrderByDirection>;
  bean_count?: InputMaybe<OrderByDirection>;
  claimed_by?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  instagram?: InputMaybe<OrderByDirection>;
  is_published?: InputMaybe<OrderByDirection>;
  location_city?: InputMaybe<OrderByDirection>;
  location_country?: InputMaybe<OrderByDirection>;
  location_state?: InputMaybe<OrderByDirection>;
  logo_url?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  profile_image_url?: InputMaybe<OrderByDirection>;
  review_count?: InputMaybe<OrderByDirection>;
  slug?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
};

export type RoastersUpdateInput = {
  average_rating?: InputMaybe<Scalars['Float']['input']>;
  bean_count?: InputMaybe<Scalars['Int']['input']>;
  claimed_by?: InputMaybe<Scalars['UUID']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  is_published?: InputMaybe<Scalars['Boolean']['input']>;
  location_city?: InputMaybe<Scalars['String']['input']>;
  location_country?: InputMaybe<Scalars['String']['input']>;
  location_state?: InputMaybe<Scalars['String']['input']>;
  logo_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
  review_count?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type RoastersUpdateResponse = {
  __typename?: 'roastersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Roasters>;
};

export type Tags = Node & {
  __typename?: 'tags';
  bean_tagsCollection?: Maybe<Bean_TagsConnection>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['Datetime']['output']>;
};


export type TagsBean_TagsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_TagsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_TagsOrderBy>>;
};

export type TagsConnection = {
  __typename?: 'tagsConnection';
  edges: Array<TagsEdge>;
  pageInfo: PageInfo;
};

export type TagsDeleteResponse = {
  __typename?: 'tagsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Tags>;
};

export type TagsEdge = {
  __typename?: 'tagsEdge';
  cursor: Scalars['String']['output'];
  node: Tags;
};

export type TagsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<TagsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<TagsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<TagsFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type TagsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type TagsInsertResponse = {
  __typename?: 'tagsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Tags>;
};

export type TagsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type TagsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type TagsUpdateResponse = {
  __typename?: 'tagsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Tags>;
};

export enum User_Role {
  Admin = 'admin',
  LocationOwner = 'location_owner',
  Moderator = 'moderator',
  RoasterOwner = 'roaster_owner'
}

/** Boolean expression comparing fields on type "user_role" */
export type User_RoleFilter = {
  eq?: InputMaybe<User_Role>;
  in?: InputMaybe<Array<User_Role>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<User_Role>;
};

export type User_Roles = Node & {
  __typename?: 'user_roles';
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  role: User_Role;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
  user_id: Scalars['UUID']['output'];
};

export type User_RolesConnection = {
  __typename?: 'user_rolesConnection';
  edges: Array<User_RolesEdge>;
  pageInfo: PageInfo;
};

export type User_RolesDeleteResponse = {
  __typename?: 'user_rolesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User_Roles>;
};

export type User_RolesEdge = {
  __typename?: 'user_rolesEdge';
  cursor: Scalars['String']['output'];
  node: User_Roles;
};

export type User_RolesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<User_RolesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<User_RolesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<User_RolesFilter>>;
  role?: InputMaybe<User_RoleFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  user_id?: InputMaybe<UuidFilter>;
};

export type User_RolesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  role?: InputMaybe<User_Role>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type User_RolesInsertResponse = {
  __typename?: 'user_rolesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User_Roles>;
};

export type User_RolesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  role?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type User_RolesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  role?: InputMaybe<User_Role>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type User_RolesUpdateResponse = {
  __typename?: 'user_rolesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<User_Roles>;
};

export type Varieties = Node & {
  __typename?: 'varieties';
  bean_varietiesCollection?: Maybe<Bean_VarietiesConnection>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
};


export type VarietiesBean_VarietiesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Bean_VarietiesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Bean_VarietiesOrderBy>>;
};

export type VarietiesConnection = {
  __typename?: 'varietiesConnection';
  edges: Array<VarietiesEdge>;
  pageInfo: PageInfo;
};

export type VarietiesDeleteResponse = {
  __typename?: 'varietiesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Varieties>;
};

export type VarietiesEdge = {
  __typename?: 'varietiesEdge';
  cursor: Scalars['String']['output'];
  node: Varieties;
};

export type VarietiesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<VarietiesFilter>>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<VarietiesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<VarietiesFilter>>;
};

export type VarietiesInsertInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type VarietiesInsertResponse = {
  __typename?: 'varietiesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Varieties>;
};

export type VarietiesOrderBy = {
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type VarietiesUpdateInput = {
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type VarietiesUpdateResponse = {
  __typename?: 'varietiesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Varieties>;
};

export type CreateBeanMutationVariables = Exact<{
  input: BeansInsertInput;
}>;


export type CreateBeanMutation = { __typename?: 'Mutation', insertIntobeansCollection?: { __typename?: 'beansInsertResponse', records: Array<{ __typename?: 'beans', id: any, name: string, description?: string | null, image_url?: string | null, roast_type?: Roast_Type | null, process?: string | null, roast_level?: Roast_Level | null, bean_type?: Bean_Type | null, elevation_min?: number | null, elevation_max?: number | null, origin?: string | null, producer?: string | null, notes?: string | null, buy_urls?: Array<string | null> | null, roasters?: { __typename?: 'roasters', id: any } | null }> } | null };

export type CreateBeanReviewMutationVariables = Exact<{
  input: Bean_ReviewsInsertInput;
}>;


export type CreateBeanReviewMutation = { __typename?: 'Mutation', insertIntobean_reviewsCollection?: { __typename?: 'bean_reviewsInsertResponse', records: Array<{ __typename?: 'bean_reviews', id: any, user_id?: any | null, bean_id?: any | null, rating?: any | null, content?: string | null, created_at?: any | null }> } | null };

export type CreateCuratedHomepageItemMutationVariables = Exact<{
  input: Array<Homepage_Curated_ItemsInsertInput> | Homepage_Curated_ItemsInsertInput;
}>;


export type CreateCuratedHomepageItemMutation = { __typename?: 'Mutation', insertIntohomepage_curated_itemsCollection?: { __typename?: 'homepage_curated_itemsInsertResponse', records: Array<{ __typename?: 'homepage_curated_items', id: any, section: string, bean_id?: any | null, recipe_id?: any | null, roaster_id?: any | null, location_id?: any | null, display_order: number, custom_title?: string | null, published: boolean, created_at: any, updated_at: any }> } | null };

export type CreateRecipeMutationVariables = Exact<{
  input: RecipesInsertInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', insertIntorecipesCollection?: { __typename?: 'recipesInsertResponse', records: Array<{ __typename?: 'recipes', id: any, user_id?: any | null, bean_id?: any | null, title?: string | null, description?: string | null, image_url?: string | null, grind_size?: string | null, grind_weight?: any | null, ratio?: string | null, brew_method?: Brew_Method | null, is_public?: boolean | null, likes_count?: number | null, created_at?: any | null }> } | null };

export type CreateRoasterMutationVariables = Exact<{
  input: RoastersInsertInput;
}>;


export type CreateRoasterMutation = { __typename?: 'Mutation', insertIntoroastersCollection?: { __typename?: 'roastersInsertResponse', records: Array<{ __typename?: 'roasters', id: any, name: string, description?: string | null, profile_image_url?: string | null, logo_url?: string | null, location_city?: string | null, location_state?: string | null, location_country?: string | null, url?: string | null, instagram?: string | null, created_at?: any | null }> } | null };

export type DeleteCuratedHomepageItemMutationVariables = Exact<{
  filter: Homepage_Curated_ItemsFilter;
}>;


export type DeleteCuratedHomepageItemMutation = { __typename?: 'Mutation', deleteFromhomepage_curated_itemsCollection: { __typename?: 'homepage_curated_itemsDeleteResponse', affectedCount: number } };

export type LikeBeanMutationVariables = Exact<{
  input: Bean_LikesInsertInput;
}>;


export type LikeBeanMutation = { __typename?: 'Mutation', insertIntobean_likesCollection?: { __typename?: 'bean_likesInsertResponse', records: Array<{ __typename?: 'bean_likes', id: any, bean_id?: any | null, user_id?: any | null, created_at?: any | null }> } | null };

export type UnlikeBeanMutationVariables = Exact<{
  filter: Bean_LikesFilter;
}>;


export type UnlikeBeanMutation = { __typename?: 'Mutation', deleteFrombean_likesCollection: { __typename?: 'bean_likesDeleteResponse', records: Array<{ __typename?: 'bean_likes', id: any }> } };

export type LikeRoasterMutationVariables = Exact<{
  input: Roaster_LikesInsertInput;
}>;


export type LikeRoasterMutation = { __typename?: 'Mutation', insertIntoroaster_likesCollection?: { __typename?: 'roaster_likesInsertResponse', records: Array<{ __typename?: 'roaster_likes', id: any, roaster_id?: any | null, user_id?: any | null, created_at?: any | null }> } | null };

export type UnlikeRoasterMutationVariables = Exact<{
  filter: Roaster_LikesFilter;
}>;


export type UnlikeRoasterMutation = { __typename?: 'Mutation', deleteFromroaster_likesCollection: { __typename?: 'roaster_likesDeleteResponse', records: Array<{ __typename?: 'roaster_likes', id: any }> } };

export type LikeLocationMutationVariables = Exact<{
  input: Location_LikesInsertInput;
}>;


export type LikeLocationMutation = { __typename?: 'Mutation', insertIntolocation_likesCollection?: { __typename?: 'location_likesInsertResponse', records: Array<{ __typename?: 'location_likes', id: any, location_id?: any | null, user_id?: any | null, created_at?: any | null }> } | null };

export type UnlikeLocationMutationVariables = Exact<{
  filter: Location_LikesFilter;
}>;


export type UnlikeLocationMutation = { __typename?: 'Mutation', deleteFromlocation_likesCollection: { __typename?: 'location_likesDeleteResponse', records: Array<{ __typename?: 'location_likes', id: any }> } };

export type LikeRecipeMutationVariables = Exact<{
  input: Recipe_LikesInsertInput;
}>;


export type LikeRecipeMutation = { __typename?: 'Mutation', insertIntorecipe_likesCollection?: { __typename?: 'recipe_likesInsertResponse', records: Array<{ __typename?: 'recipe_likes', id: any, recipe_id: any, user_id: any, created_at?: any | null }> } | null };

export type UnlikeRecipeMutationVariables = Exact<{
  filter: Recipe_LikesFilter;
}>;


export type UnlikeRecipeMutation = { __typename?: 'Mutation', deleteFromrecipe_likesCollection: { __typename?: 'recipe_likesDeleteResponse', records: Array<{ __typename?: 'recipe_likes', id: any }> } };

export type UpdateBeanMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  set: BeansUpdateInput;
}>;


export type UpdateBeanMutation = { __typename?: 'Mutation', updatebeansCollection: { __typename?: 'beansUpdateResponse', affectedCount: number, records: Array<{ __typename?: 'beans', id: any, name: string, description?: string | null, image_url?: string | null, roast_type?: Roast_Type | null, process?: string | null, roast_level?: Roast_Level | null, bean_type?: Bean_Type | null, elevation_min?: number | null, elevation_max?: number | null, origin?: string | null, producer?: string | null, notes?: string | null, buy_urls?: Array<string | null> | null, is_published: boolean, created_at?: any | null, updated_at?: any | null, roasters?: { __typename?: 'roasters', id: any, name: string } | null }> } };

export type UpdateCuratedHomepageItemMutationVariables = Exact<{
  filter: Homepage_Curated_ItemsFilter;
  set: Homepage_Curated_ItemsUpdateInput;
}>;


export type UpdateCuratedHomepageItemMutation = { __typename?: 'Mutation', updatehomepage_curated_itemsCollection: { __typename?: 'homepage_curated_itemsUpdateResponse', records: Array<{ __typename?: 'homepage_curated_items', id: any, section: string, bean_id?: any | null, recipe_id?: any | null, roaster_id?: any | null, location_id?: any | null, display_order: number, custom_title?: string | null, published: boolean, created_at: any, updated_at: any }> } };

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  set: ProfilesUpdateInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateprofilesCollection: { __typename?: 'profilesUpdateResponse', affectedCount: number, records: Array<{ __typename?: 'profiles', id: any, username: string, display_name?: string | null, bio?: string | null, profile_image_url?: string | null, location?: string | null, instagram?: string | null, url?: string | null, updated_at?: any | null }> } };

export type UpdateRecipeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  set: RecipesUpdateInput;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updaterecipesCollection: { __typename?: 'recipesUpdateResponse', records: Array<{ __typename?: 'recipes', id: any, user_id?: any | null, bean_id?: any | null, title?: string | null, description?: string | null, image_url?: string | null, grind_size?: string | null, grind_weight?: any | null, ratio?: string | null, brew_method?: Brew_Method | null, is_public?: boolean | null, likes_count?: number | null, created_at?: any | null }> } };

export type UpdateRoasterMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  set: RoastersUpdateInput;
}>;


export type UpdateRoasterMutation = { __typename?: 'Mutation', updateroastersCollection: { __typename?: 'roastersUpdateResponse', affectedCount: number, records: Array<{ __typename?: 'roasters', id: any, name: string, description?: string | null, profile_image_url?: string | null, logo_url?: string | null, location_city?: string | null, location_state?: string | null, location_country?: string | null, url?: string | null, instagram?: string | null, is_published: boolean, created_at?: any | null, updated_at?: any | null }> } };

export type GetCuratedHomepageItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCuratedHomepageItemsQuery = { __typename?: 'Query', homepage_curated_itemsCollection?: { __typename?: 'homepage_curated_itemsConnection', edges: Array<{ __typename?: 'homepage_curated_itemsEdge', node: { __typename?: 'homepage_curated_items', id: any, nodeId: string, section: string, display_order: number, custom_title?: string | null, published: boolean, created_at: any, updated_at: any, bean_id?: any | null, recipe_id?: any | null, roaster_id?: any | null, location_id?: any | null, beans?: { __typename?: 'beans', id: any, slug?: string | null, name: string, average_rating?: number | null, review_count?: number | null, is_published: boolean, origin?: string | null, roasters?: { __typename?: 'roasters', id: any, name: string } | null } | null, recipes?: { __typename?: 'recipes', id: any, slug?: string | null, title?: string | null, description?: string | null, image_url?: string | null, is_public?: boolean | null, likes_count?: number | null } | null, roasters?: { __typename?: 'roasters', id: any, slug?: string | null, name: string, bean_count?: number | null, is_published: boolean, location_city?: string | null, location_state?: string | null, location_country?: string | null, created_at?: any | null, beanCount?: number | null, roaster_likesCollection?: { __typename?: 'roaster_likesConnection', edges: Array<{ __typename?: 'roaster_likesEdge', node: { __typename?: 'roaster_likes', id: any, user_id?: any | null } }> } | null } | null, locations?: { __typename?: 'locations', id: any, slug?: string | null, name: string } | null } }> } | null };

export type GetRecipeByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'Query', recipesCollection?: { __typename?: 'recipesConnection', edges: Array<{ __typename?: 'recipesEdge', node: { __typename?: 'recipes', id: any, slug?: string | null, user_id?: any | null, bean_id?: any | null, title?: string | null, description?: string | null, image_url?: string | null, grind_size?: string | null, grind_weight?: any | null, ratio?: string | null, brew_method?: Brew_Method | null, is_public?: boolean | null, likes_count?: number | null, created_at?: any | null, profiles?: { __typename?: 'profiles', id: any, username: string, display_name?: string | null } | null, bean?: { __typename?: 'beans', id: any, name: string, roasters?: { __typename?: 'roasters', id: any, name: string } | null } | null, likes?: { __typename?: 'recipe_likesConnection', edges: Array<{ __typename?: 'recipe_likesEdge', node: { __typename?: 'recipe_likes', id: any, user_id: any } }> } | null } }> } | null };

export type GetRecipesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type GetRecipesQuery = { __typename?: 'Query', recipesCollection?: { __typename?: 'recipesConnection', edges: Array<{ __typename?: 'recipesEdge', node: { __typename?: 'recipes', id: any, slug?: string | null, user_id?: any | null, bean_id?: any | null, title?: string | null, description?: string | null, image_url?: string | null, grind_size?: string | null, grind_weight?: any | null, ratio?: string | null, brew_method?: Brew_Method | null, is_public?: boolean | null, likes_count?: number | null, created_at?: any | null, profiles?: { __typename?: 'profiles', id: any, username: string, display_name?: string | null } | null, likes?: { __typename?: 'recipe_likesConnection', edges: Array<{ __typename?: 'recipe_likesEdge', node: { __typename?: 'recipe_likes', id: any, user_id: any } }> } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetAllRoastersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllRoastersQuery = { __typename?: 'Query', roastersCollection?: { __typename?: 'roastersConnection', edges: Array<{ __typename?: 'roastersEdge', node: { __typename?: 'roasters', id: any, name: string } }> } | null };

export type GetBeanQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
  filter?: InputMaybe<BeansFilter>;
}>;


export type GetBeanQuery = { __typename?: 'Query', beansCollection?: { __typename?: 'beansConnection', edges: Array<{ __typename?: 'beansEdge', node: { __typename?: 'beans', id: any, slug?: string | null, name: string, description?: string | null, image_url?: string | null, roast_type?: Roast_Type | null, process?: string | null, roast_level?: Roast_Level | null, bean_type?: Bean_Type | null, elevation_min?: number | null, elevation_max?: number | null, origin?: string | null, producer?: string | null, notes?: string | null, buy_urls?: Array<string | null> | null, is_published: boolean, average_rating?: number | null, review_count?: number | null, created_at?: any | null, roasters?: { __typename?: 'roasters', id: any, slug?: string | null, name: string } | null, bean_varietiesCollection?: { __typename?: 'bean_varietiesConnection', edges: Array<{ __typename?: 'bean_varietiesEdge', node: { __typename?: 'bean_varieties', varieties?: { __typename?: 'varieties', id: any, name: string } | null } }> } | null, bean_tagsCollection?: { __typename?: 'bean_tagsConnection', edges: Array<{ __typename?: 'bean_tagsEdge', node: { __typename?: 'bean_tags', tags?: { __typename?: 'tags', id: any, name: string } | null } }> } | null, bean_reviewsCollection?: { __typename?: 'bean_reviewsConnection', edges: Array<{ __typename?: 'bean_reviewsEdge', node: { __typename?: 'bean_reviews', id: any, rating?: any | null, content?: string | null, coffee_type?: Coffee_Type | null, created_at?: any | null, profiles?: { __typename?: 'profiles', id: any, username: string, display_name?: string | null, profile_image_url?: string | null } | null } }> } | null } }> } | null };

export type GetBeanOptionsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type GetBeanOptionsQuery = { __typename?: 'Query', beansCollection?: { __typename?: 'beansConnection', edges: Array<{ __typename?: 'beansEdge', node: { __typename?: 'beans', id: any, name: string, roasters?: { __typename?: 'roasters', id: any, name: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetBeansQueryVariables = Exact<{
  filter?: InputMaybe<BeansFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<BeansOrderBy> | BeansOrderBy>;
}>;


export type GetBeansQuery = { __typename?: 'Query', beansCollection?: { __typename?: 'beansConnection', edges: Array<{ __typename?: 'beansEdge', cursor: string, node: { __typename?: 'beans', id: any, slug?: string | null, name: string, image_url?: string | null, roast_type?: Roast_Type | null, process?: string | null, roast_level?: Roast_Level | null, origin?: string | null, created_at?: any | null, average_rating?: number | null, review_count?: number | null, is_published: boolean, roasters?: { __typename?: 'roasters', id: any, name: string } | null, bean_tagsCollection?: { __typename?: 'bean_tagsConnection', edges: Array<{ __typename?: 'bean_tagsEdge', node: { __typename?: 'bean_tags', tags?: { __typename?: 'tags', id: any, name: string } | null } }> } | null, bean_likesCollection?: { __typename?: 'bean_likesConnection', edges: Array<{ __typename?: 'bean_likesEdge', node: { __typename?: 'bean_likes', id: any, user_id?: any | null } }> } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetDashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardStatsQuery = { __typename?: 'Query', dashboard_statsCollection?: { __typename?: 'dashboard_statsConnection', edges: Array<{ __typename?: 'dashboard_statsEdge', node: { __typename?: 'dashboard_stats', id?: any | null, total_users?: any | null, total_beans?: any | null, total_roasters?: any | null, total_locations?: any | null, total_bean_reviews?: any | null, total_recipes?: any | null, total_location_reviews?: any | null } }> } | null, roastersCollection?: { __typename?: 'roastersConnection', edges: Array<{ __typename?: 'roastersEdge', node: { __typename?: 'roasters', id: any, name: string, average_rating?: number | null, review_count?: number | null, bean_count?: number | null } }> } | null, beansCollection?: { __typename?: 'beansConnection', edges: Array<{ __typename?: 'beansEdge', node: { __typename?: 'beans', id: any, name: string, average_rating?: number | null, review_count?: number | null } }> } | null, locationsCollection?: { __typename?: 'locationsConnection', edges: Array<{ __typename?: 'locationsEdge', node: { __typename?: 'locations', id: any, name: string, average_rating?: number | null, review_count?: number | null } }> } | null };

export type GetLocationsQueryVariables = Exact<{
  filter?: InputMaybe<LocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type GetLocationsQuery = { __typename?: 'Query', locationsCollection?: { __typename?: 'locationsConnection', edges: Array<{ __typename?: 'locationsEdge', node: { __typename?: 'locations', id: any, slug?: string | null, name: string, description?: string | null, image_url?: string | null, address?: string | null, latitude?: any | null, longitude?: any | null, url?: string | null, instagram?: string | null, claimed_by?: any | null, created_at?: any | null, is_published: boolean, location_likesCollection?: { __typename?: 'location_likesConnection', edges: Array<{ __typename?: 'location_likesEdge', node: { __typename?: 'location_likes', id: any, user_id?: any | null } }> } | null, location_reviewsCollection?: { __typename?: 'location_reviewsConnection', edges: Array<{ __typename?: 'location_reviewsEdge', node: { __typename?: 'location_reviews', id: any, rating?: any | null } }> } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetProfileQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', profilesCollection?: { __typename?: 'profilesConnection', edges: Array<{ __typename?: 'profilesEdge', node: { __typename?: 'profiles', id: any, username: string, display_name?: string | null, bio?: string | null, profile_image_url?: string | null, location?: string | null, instagram?: string | null, url?: string | null, created_at?: any | null } }> } | null };

export type GetRoasterQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
  filter?: InputMaybe<RoastersFilter>;
}>;


export type GetRoasterQuery = { __typename?: 'Query', roastersCollection?: { __typename?: 'roastersConnection', edges: Array<{ __typename?: 'roastersEdge', node: { __typename?: 'roasters', id: any, name: string, slug?: string | null, description?: string | null, profile_image_url?: string | null, logo_url?: string | null, location_city?: string | null, location_state?: string | null, location_country?: string | null, url?: string | null, instagram?: string | null, claimed_by?: any | null, is_published: boolean, created_at?: any | null, roaster_likesCollection?: { __typename?: 'roaster_likesConnection', edges: Array<{ __typename?: 'roaster_likesEdge', node: { __typename?: 'roaster_likes', id: any, user_id?: any | null } }> } | null, beansCollection?: { __typename?: 'beansConnection', edges: Array<{ __typename?: 'beansEdge', node: { __typename?: 'beans', id: any, slug?: string | null, name: string, description?: string | null, origin?: string | null, process?: string | null, roast_level?: Roast_Level | null, average_rating?: number | null, created_at?: any | null, bean_likesCollection?: { __typename?: 'bean_likesConnection', edges: Array<{ __typename?: 'bean_likesEdge', node: { __typename?: 'bean_likes', id: any, user_id?: any | null } }> } | null, bean_reviewsCollection?: { __typename?: 'bean_reviewsConnection', edges: Array<{ __typename?: 'bean_reviewsEdge', node: { __typename?: 'bean_reviews', id: any, rating?: any | null } }> } | null } }> } | null } }> } | null };

export type GetRoastersQueryVariables = Exact<{
  filter?: InputMaybe<RoastersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<RoastersOrderBy> | RoastersOrderBy>;
}>;


export type GetRoastersQuery = { __typename?: 'Query', roastersCollection?: { __typename?: 'roastersConnection', edges: Array<{ __typename?: 'roastersEdge', node: { __typename?: 'roasters', id: any, slug?: string | null, name: string, profile_image_url?: string | null, logo_url?: string | null, location_city?: string | null, location_state?: string | null, location_country?: string | null, claimed_by?: any | null, created_at?: any | null, is_published: boolean, bean_count?: number | null, roaster_likesCollection?: { __typename?: 'roaster_likesConnection', edges: Array<{ __typename?: 'roaster_likesEdge', node: { __typename?: 'roaster_likes', id: any, user_id?: any | null } }> } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetUserLikesQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type GetUserLikesQuery = { __typename?: 'Query', bean_likesCollection?: { __typename?: 'bean_likesConnection', edges: Array<{ __typename?: 'bean_likesEdge', node: { __typename?: 'bean_likes', id: any, created_at?: any | null, beans?: { __typename?: 'beans', id: any, slug?: string | null, name: string, roaster_id?: any | null, process?: string | null, image_url?: string | null, roasters?: { __typename?: 'roasters', name: string } | null } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null, roaster_likesCollection?: { __typename?: 'roaster_likesConnection', edges: Array<{ __typename?: 'roaster_likesEdge', node: { __typename?: 'roaster_likes', id: any, created_at?: any | null, roasters?: { __typename?: 'roasters', id: any, slug?: string | null, name: string, profile_image_url?: string | null, location_city?: string | null, location_state?: string | null } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null, location_likesCollection?: { __typename?: 'location_likesConnection', edges: Array<{ __typename?: 'location_likesEdge', node: { __typename?: 'location_likes', id: any, created_at?: any | null, locations?: { __typename?: 'locations', id: any, slug?: string | null, name: string, image_url?: string | null, address?: string | null, latitude?: any | null, longitude?: any | null } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null, recipe_likesCollection?: { __typename?: 'recipe_likesConnection', edges: Array<{ __typename?: 'recipe_likesEdge', node: { __typename?: 'recipe_likes', id: any, created_at?: any | null, recipes?: { __typename?: 'recipes', id: any, slug?: string | null, title?: string | null, image_url?: string | null, created_at?: any | null } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CreateBeanDocument = new TypedDocumentString(`
    mutation CreateBean($input: beansInsertInput!) {
  insertIntobeansCollection(objects: [$input]) {
    records {
      id
      name
      description
      image_url
      roast_type
      process
      roast_level
      bean_type
      elevation_min
      elevation_max
      origin
      producer
      notes
      buy_urls
      roasters {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateBeanMutation, CreateBeanMutationVariables>;
export const CreateBeanReviewDocument = new TypedDocumentString(`
    mutation CreateBeanReview($input: bean_reviewsInsertInput!) {
  insertIntobean_reviewsCollection(objects: [$input]) {
    records {
      id
      user_id
      bean_id
      rating
      content
      created_at
    }
  }
}
    `) as unknown as TypedDocumentString<CreateBeanReviewMutation, CreateBeanReviewMutationVariables>;
export const CreateCuratedHomepageItemDocument = new TypedDocumentString(`
    mutation CreateCuratedHomepageItem($input: [homepage_curated_itemsInsertInput!]!) {
  insertIntohomepage_curated_itemsCollection(objects: $input) {
    records {
      id
      section
      bean_id
      recipe_id
      roaster_id
      location_id
      display_order
      custom_title
      published
      created_at
      updated_at
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCuratedHomepageItemMutation, CreateCuratedHomepageItemMutationVariables>;
export const CreateRecipeDocument = new TypedDocumentString(`
    mutation CreateRecipe($input: recipesInsertInput!) {
  insertIntorecipesCollection(objects: [$input]) {
    records {
      id
      user_id
      bean_id
      title
      description
      image_url
      grind_size
      grind_weight
      ratio
      brew_method
      is_public
      likes_count
      created_at
    }
  }
}
    `) as unknown as TypedDocumentString<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const CreateRoasterDocument = new TypedDocumentString(`
    mutation CreateRoaster($input: roastersInsertInput!) {
  insertIntoroastersCollection(objects: [$input]) {
    records {
      id
      name
      description
      profile_image_url
      logo_url
      location_city
      location_state
      location_country
      url
      instagram
      created_at
    }
  }
}
    `) as unknown as TypedDocumentString<CreateRoasterMutation, CreateRoasterMutationVariables>;
export const DeleteCuratedHomepageItemDocument = new TypedDocumentString(`
    mutation DeleteCuratedHomepageItem($filter: homepage_curated_itemsFilter!) {
  deleteFromhomepage_curated_itemsCollection(filter: $filter) {
    affectedCount
  }
}
    `) as unknown as TypedDocumentString<DeleteCuratedHomepageItemMutation, DeleteCuratedHomepageItemMutationVariables>;
export const LikeBeanDocument = new TypedDocumentString(`
    mutation LikeBean($input: bean_likesInsertInput!) {
  insertIntobean_likesCollection(objects: [$input]) {
    records {
      id
      bean_id
      user_id
      created_at
    }
  }
}
    `) as unknown as TypedDocumentString<LikeBeanMutation, LikeBeanMutationVariables>;
export const UnlikeBeanDocument = new TypedDocumentString(`
    mutation UnlikeBean($filter: bean_likesFilter!) {
  deleteFrombean_likesCollection(filter: $filter) {
    records {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UnlikeBeanMutation, UnlikeBeanMutationVariables>;
export const LikeRoasterDocument = new TypedDocumentString(`
    mutation LikeRoaster($input: roaster_likesInsertInput!) {
  insertIntoroaster_likesCollection(objects: [$input]) {
    records {
      id
      roaster_id
      user_id
      created_at
    }
  }
}
    `) as unknown as TypedDocumentString<LikeRoasterMutation, LikeRoasterMutationVariables>;
export const UnlikeRoasterDocument = new TypedDocumentString(`
    mutation UnlikeRoaster($filter: roaster_likesFilter!) {
  deleteFromroaster_likesCollection(filter: $filter) {
    records {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UnlikeRoasterMutation, UnlikeRoasterMutationVariables>;
export const LikeLocationDocument = new TypedDocumentString(`
    mutation LikeLocation($input: location_likesInsertInput!) {
  insertIntolocation_likesCollection(objects: [$input]) {
    records {
      id
      location_id
      user_id
      created_at
    }
  }
}
    `) as unknown as TypedDocumentString<LikeLocationMutation, LikeLocationMutationVariables>;
export const UnlikeLocationDocument = new TypedDocumentString(`
    mutation UnlikeLocation($filter: location_likesFilter!) {
  deleteFromlocation_likesCollection(filter: $filter) {
    records {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UnlikeLocationMutation, UnlikeLocationMutationVariables>;
export const LikeRecipeDocument = new TypedDocumentString(`
    mutation LikeRecipe($input: recipe_likesInsertInput!) {
  insertIntorecipe_likesCollection(objects: [$input]) {
    records {
      id
      recipe_id
      user_id
      created_at
    }
  }
}
    `) as unknown as TypedDocumentString<LikeRecipeMutation, LikeRecipeMutationVariables>;
export const UnlikeRecipeDocument = new TypedDocumentString(`
    mutation UnlikeRecipe($filter: recipe_likesFilter!) {
  deleteFromrecipe_likesCollection(filter: $filter) {
    records {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UnlikeRecipeMutation, UnlikeRecipeMutationVariables>;
export const UpdateBeanDocument = new TypedDocumentString(`
    mutation UpdateBean($id: UUID!, $set: beansUpdateInput!) {
  updatebeansCollection(filter: {id: {eq: $id}}, set: $set) {
    affectedCount
    records {
      id
      name
      description
      image_url
      roast_type
      process
      roast_level
      bean_type
      elevation_min
      elevation_max
      origin
      producer
      notes
      buy_urls
      is_published
      created_at
      updated_at
      roasters {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateBeanMutation, UpdateBeanMutationVariables>;
export const UpdateCuratedHomepageItemDocument = new TypedDocumentString(`
    mutation UpdateCuratedHomepageItem($filter: homepage_curated_itemsFilter!, $set: homepage_curated_itemsUpdateInput!) {
  updatehomepage_curated_itemsCollection(filter: $filter, set: $set) {
    records {
      id
      section
      bean_id
      recipe_id
      roaster_id
      location_id
      display_order
      custom_title
      published
      created_at
      updated_at
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateCuratedHomepageItemMutation, UpdateCuratedHomepageItemMutationVariables>;
export const UpdateProfileDocument = new TypedDocumentString(`
    mutation UpdateProfile($id: UUID!, $set: profilesUpdateInput!) {
  updateprofilesCollection(filter: {id: {eq: $id}}, set: $set) {
    affectedCount
    records {
      id
      username
      display_name
      bio
      profile_image_url
      location
      instagram
      url
      updated_at
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateRecipeDocument = new TypedDocumentString(`
    mutation UpdateRecipe($id: UUID!, $set: recipesUpdateInput!) {
  updaterecipesCollection(filter: {id: {eq: $id}}, set: $set) {
    records {
      id
      user_id
      bean_id
      title
      description
      image_url
      grind_size
      grind_weight
      ratio
      brew_method
      is_public
      likes_count
      created_at
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const UpdateRoasterDocument = new TypedDocumentString(`
    mutation UpdateRoaster($id: UUID!, $set: roastersUpdateInput!) {
  updateroastersCollection(filter: {id: {eq: $id}}, set: $set) {
    affectedCount
    records {
      id
      name
      description
      profile_image_url
      logo_url
      location_city
      location_state
      location_country
      url
      instagram
      is_published
      created_at
      updated_at
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateRoasterMutation, UpdateRoasterMutationVariables>;
export const GetCuratedHomepageItemsDocument = new TypedDocumentString(`
    query GetCuratedHomepageItems {
  homepage_curated_itemsCollection(orderBy: {display_order: AscNullsLast}) {
    edges {
      node {
        id
        nodeId
        section
        display_order
        custom_title
        published
        created_at
        updated_at
        bean_id
        recipe_id
        roaster_id
        location_id
        beans {
          id
          slug
          name
          average_rating
          review_count
          is_published
          origin
          roasters {
            id
            name
          }
        }
        recipes {
          id
          slug
          title
          description
          image_url
          is_public
          likes_count
        }
        roasters {
          id
          slug
          name
          bean_count
          is_published
          location_city
          location_state
          location_country
          created_at
          beanCount: bean_count
          roaster_likesCollection {
            edges {
              node {
                id
                user_id
              }
            }
          }
        }
        locations {
          id
          slug
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetCuratedHomepageItemsQuery, GetCuratedHomepageItemsQueryVariables>;
export const GetRecipeByIdDocument = new TypedDocumentString(`
    query GetRecipeById($id: UUID!) {
  recipesCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        id
        slug
        user_id
        profiles {
          id
          username
          display_name
        }
        bean_id
        title
        description
        image_url
        grind_size
        grind_weight
        ratio
        brew_method
        is_public
        likes_count
        created_at
        bean: beans {
          id
          name
          roasters {
            id
            name
          }
        }
        likes: recipe_likesCollection {
          edges {
            node {
              id
              user_id
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>;
export const GetRecipesDocument = new TypedDocumentString(`
    query GetRecipes($first: Int, $after: Cursor) {
  recipesCollection(first: $first, after: $after, filter: {is_public: {eq: true}}) {
    edges {
      node {
        id
        slug
        user_id
        profiles {
          id
          username
          display_name
        }
        bean_id
        title
        description
        image_url
        grind_size
        grind_weight
        ratio
        brew_method
        is_public
        likes_count
        created_at
        likes: recipe_likesCollection {
          edges {
            node {
              id
              user_id
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `) as unknown as TypedDocumentString<GetRecipesQuery, GetRecipesQueryVariables>;
export const GetAllRoastersDocument = new TypedDocumentString(`
    query GetAllRoasters($first: Int) {
  roastersCollection(
    first: $first
    orderBy: [{name: AscNullsLast}]
    filter: {is_published: {eq: true}}
  ) {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetAllRoastersQuery, GetAllRoastersQueryVariables>;
export const GetBeanDocument = new TypedDocumentString(`
    query GetBean($id: UUID!, $filter: beansFilter) {
  beansCollection(filter: $filter) {
    edges {
      node {
        id
        slug
        name
        description
        image_url
        roast_type
        process
        roast_level
        bean_type
        elevation_min
        elevation_max
        origin
        producer
        notes
        buy_urls
        is_published
        average_rating
        review_count
        roasters {
          id
          slug
          name
        }
        bean_varietiesCollection {
          edges {
            node {
              varieties {
                id
                name
              }
            }
          }
        }
        bean_tagsCollection {
          edges {
            node {
              tags {
                id
                name
              }
            }
          }
        }
        bean_reviewsCollection {
          edges {
            node {
              id
              rating
              content
              coffee_type
              profiles {
                id
                username
                display_name
                profile_image_url
              }
              created_at
            }
          }
        }
        created_at
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetBeanQuery, GetBeanQueryVariables>;
export const GetBeanOptionsDocument = new TypedDocumentString(`
    query GetBeanOptions($search: String, $first: Int, $after: Cursor) {
  beansCollection(
    first: $first
    after: $after
    filter: {name: {ilike: $search}}
    orderBy: [{roaster_id: AscNullsLast}, {name: AscNullsLast}]
  ) {
    edges {
      node {
        id
        name
        roasters {
          id
          name
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `) as unknown as TypedDocumentString<GetBeanOptionsQuery, GetBeanOptionsQueryVariables>;
export const GetBeansDocument = new TypedDocumentString(`
    query GetBeans($filter: beansFilter, $first: Int, $after: Cursor, $orderBy: [beansOrderBy!]) {
  beansCollection(
    first: $first
    after: $after
    filter: $filter
    orderBy: $orderBy
  ) {
    edges {
      cursor
      node {
        id
        slug
        name
        image_url
        roast_type
        process
        roast_level
        origin
        created_at
        average_rating
        review_count
        is_published
        roasters {
          id
          name
        }
        bean_tagsCollection {
          edges {
            node {
              tags {
                id
                name
              }
            }
          }
        }
        bean_likesCollection {
          edges {
            node {
              id
              user_id
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `) as unknown as TypedDocumentString<GetBeansQuery, GetBeansQueryVariables>;
export const GetDashboardStatsDocument = new TypedDocumentString(`
    query GetDashboardStats {
  dashboard_statsCollection {
    edges {
      node {
        id
        total_users
        total_beans
        total_roasters
        total_locations
        total_bean_reviews
        total_recipes
        total_location_reviews
      }
    }
  }
  roastersCollection(first: 10, orderBy: [{average_rating: DescNullsLast}]) {
    edges {
      node {
        id
        name
        average_rating
        review_count
        bean_count
      }
    }
  }
  beansCollection(first: 10, orderBy: [{average_rating: DescNullsLast}]) {
    edges {
      node {
        id
        name
        average_rating
        review_count
      }
    }
  }
  locationsCollection(first: 10, orderBy: [{average_rating: DescNullsLast}]) {
    edges {
      node {
        id
        name
        average_rating
        review_count
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetDashboardStatsQuery, GetDashboardStatsQueryVariables>;
export const GetLocationsDocument = new TypedDocumentString(`
    query GetLocations($filter: locationsFilter, $first: Int, $after: Cursor) {
  locationsCollection(filter: $filter, first: $first, after: $after) {
    edges {
      node {
        id
        slug
        name
        description
        image_url
        address
        latitude
        longitude
        url
        instagram
        claimed_by
        created_at
        is_published
        location_likesCollection {
          edges {
            node {
              id
              user_id
            }
          }
        }
        location_reviewsCollection {
          edges {
            node {
              id
              rating
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `) as unknown as TypedDocumentString<GetLocationsQuery, GetLocationsQueryVariables>;
export const GetProfileDocument = new TypedDocumentString(`
    query GetProfile($id: UUID!) {
  profilesCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        id
        username
        display_name
        bio
        profile_image_url
        location
        instagram
        url
        created_at
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProfileQuery, GetProfileQueryVariables>;
export const GetRoasterDocument = new TypedDocumentString(`
    query GetRoaster($id: UUID!, $filter: roastersFilter) {
  roastersCollection(filter: $filter) {
    edges {
      node {
        id
        name
        slug
        description
        profile_image_url
        logo_url
        location_city
        location_state
        location_country
        url
        instagram
        claimed_by
        is_published
        roaster_likesCollection {
          edges {
            node {
              id
              user_id
            }
          }
        }
        beansCollection {
          edges {
            node {
              id
              slug
              name
              description
              origin
              process
              roast_level
              average_rating
              created_at
              bean_likesCollection {
                edges {
                  node {
                    id
                    user_id
                  }
                }
              }
              bean_reviewsCollection {
                edges {
                  node {
                    id
                    rating
                  }
                }
              }
            }
          }
        }
        created_at
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetRoasterQuery, GetRoasterQueryVariables>;
export const GetRoastersDocument = new TypedDocumentString(`
    query GetRoasters($filter: roastersFilter, $first: Int, $after: Cursor, $orderBy: [roastersOrderBy!]) {
  roastersCollection(
    filter: $filter
    first: $first
    after: $after
    orderBy: $orderBy
  ) {
    edges {
      node {
        id
        slug
        name
        profile_image_url
        logo_url
        location_city
        location_state
        location_country
        claimed_by
        created_at
        is_published
        bean_count
        roaster_likesCollection {
          edges {
            node {
              id
              user_id
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `) as unknown as TypedDocumentString<GetRoastersQuery, GetRoastersQueryVariables>;
export const GetUserLikesDocument = new TypedDocumentString(`
    query GetUserLikes($userId: UUID!, $first: Int, $after: Cursor) {
  bean_likesCollection(
    filter: {user_id: {eq: $userId}}
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        created_at
        beans {
          id
          slug
          name
          roaster_id
          process
          image_url
          roasters {
            name
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  roaster_likesCollection(
    filter: {user_id: {eq: $userId}}
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        created_at
        roasters {
          id
          slug
          name
          profile_image_url
          location_city
          location_state
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  location_likesCollection(
    filter: {user_id: {eq: $userId}}
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        created_at
        locations {
          id
          slug
          name
          image_url
          address
          latitude
          longitude
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  recipe_likesCollection(
    filter: {user_id: {eq: $userId}}
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        created_at
        recipes {
          id
          slug
          title
          image_url
          created_at
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `) as unknown as TypedDocumentString<GetUserLikesQuery, GetUserLikesQueryVariables>;