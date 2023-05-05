import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
};

export type CategoriesConnection = {
  __typename?: 'CategoriesConnection';
  edges: Array<CategoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Category = {
  __typename?: 'Category';
  childCategories: Array<Category>;
  childCategoriesAggregate?: Maybe<CategoryCategoryChildCategoriesAggregationSelection>;
  childCategoriesConnection: CategoryChildCategoriesConnection;
  description?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  parentCategory?: Maybe<Category>;
  parentCategoryAggregate?: Maybe<CategoryCategoryParentCategoryAggregationSelection>;
  parentCategoryConnection: CategoryParentCategoryConnection;
  species: Array<PlantSpecies>;
  speciesAggregate?: Maybe<CategoryPlantSpeciesSpeciesAggregationSelection>;
  speciesConnection: CategorySpeciesConnection;
};


export type CategoryChildCategoriesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<CategoryOptions>;
  where?: InputMaybe<CategoryWhere>;
};


export type CategoryChildCategoriesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<CategoryWhere>;
};


export type CategoryChildCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<CategoryChildCategoriesConnectionSort>>;
  where?: InputMaybe<CategoryChildCategoriesConnectionWhere>;
};


export type CategoryParentCategoryArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<CategoryOptions>;
  where?: InputMaybe<CategoryWhere>;
};


export type CategoryParentCategoryAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<CategoryWhere>;
};


export type CategoryParentCategoryConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<CategoryParentCategoryConnectionSort>>;
  where?: InputMaybe<CategoryParentCategoryConnectionWhere>;
};


export type CategorySpeciesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<PlantSpeciesOptions>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type CategorySpeciesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type CategorySpeciesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<CategorySpeciesConnectionSort>>;
  where?: InputMaybe<CategorySpeciesConnectionWhere>;
};

export type CategoryAggregateSelection = {
  __typename?: 'CategoryAggregateSelection';
  count: Scalars['Int'];
  description: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type CategoryCategoryChildCategoriesAggregationSelection = {
  __typename?: 'CategoryCategoryChildCategoriesAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<CategoryCategoryChildCategoriesNodeAggregateSelection>;
};

export type CategoryCategoryChildCategoriesNodeAggregateSelection = {
  __typename?: 'CategoryCategoryChildCategoriesNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type CategoryCategoryParentCategoryAggregationSelection = {
  __typename?: 'CategoryCategoryParentCategoryAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<CategoryCategoryParentCategoryNodeAggregateSelection>;
};

export type CategoryCategoryParentCategoryNodeAggregateSelection = {
  __typename?: 'CategoryCategoryParentCategoryNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type CategoryChildCategoriesAggregateInput = {
  AND?: InputMaybe<Array<CategoryChildCategoriesAggregateInput>>;
  OR?: InputMaybe<Array<CategoryChildCategoriesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<CategoryChildCategoriesNodeAggregationWhereInput>;
};

export type CategoryChildCategoriesConnectFieldInput = {
  connect?: InputMaybe<Array<CategoryConnectInput>>;
  where?: InputMaybe<CategoryConnectWhere>;
};

export type CategoryChildCategoriesConnection = {
  __typename?: 'CategoryChildCategoriesConnection';
  edges: Array<CategoryChildCategoriesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CategoryChildCategoriesConnectionSort = {
  node?: InputMaybe<CategorySort>;
};

export type CategoryChildCategoriesConnectionWhere = {
  AND?: InputMaybe<Array<CategoryChildCategoriesConnectionWhere>>;
  OR?: InputMaybe<Array<CategoryChildCategoriesConnectionWhere>>;
  node?: InputMaybe<CategoryWhere>;
  node_NOT?: InputMaybe<CategoryWhere>;
};

export type CategoryChildCategoriesCreateFieldInput = {
  node: CategoryCreateInput;
};

export type CategoryChildCategoriesDeleteFieldInput = {
  delete?: InputMaybe<CategoryDeleteInput>;
  where?: InputMaybe<CategoryChildCategoriesConnectionWhere>;
};

export type CategoryChildCategoriesDisconnectFieldInput = {
  disconnect?: InputMaybe<CategoryDisconnectInput>;
  where?: InputMaybe<CategoryChildCategoriesConnectionWhere>;
};

export type CategoryChildCategoriesFieldInput = {
  connect?: InputMaybe<Array<CategoryChildCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<CategoryChildCategoriesCreateFieldInput>>;
};

export type CategoryChildCategoriesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CategoryChildCategoriesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CategoryChildCategoriesNodeAggregationWhereInput>>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  description_EQUAL?: InputMaybe<Scalars['String']>;
  description_GT?: InputMaybe<Scalars['Int']>;
  description_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  description_LT?: InputMaybe<Scalars['Int']>;
  description_LTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type CategoryChildCategoriesRelationship = {
  __typename?: 'CategoryChildCategoriesRelationship';
  cursor: Scalars['String'];
  node: Category;
};

export type CategoryChildCategoriesUpdateConnectionInput = {
  node?: InputMaybe<CategoryUpdateInput>;
};

export type CategoryChildCategoriesUpdateFieldInput = {
  connect?: InputMaybe<Array<CategoryChildCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<CategoryChildCategoriesCreateFieldInput>>;
  delete?: InputMaybe<Array<CategoryChildCategoriesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CategoryChildCategoriesDisconnectFieldInput>>;
  update?: InputMaybe<CategoryChildCategoriesUpdateConnectionInput>;
  where?: InputMaybe<CategoryChildCategoriesConnectionWhere>;
};

export type CategoryConnectInput = {
  childCategories?: InputMaybe<Array<CategoryChildCategoriesConnectFieldInput>>;
  parentCategory?: InputMaybe<CategoryParentCategoryConnectFieldInput>;
  species?: InputMaybe<Array<CategorySpeciesConnectFieldInput>>;
};

export type CategoryConnectWhere = {
  node: CategoryWhere;
};

export type CategoryCreateInput = {
  childCategories?: InputMaybe<CategoryChildCategoriesFieldInput>;
  description?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  parentCategory?: InputMaybe<CategoryParentCategoryFieldInput>;
  species?: InputMaybe<CategorySpeciesFieldInput>;
};

export type CategoryDeleteInput = {
  childCategories?: InputMaybe<Array<CategoryChildCategoriesDeleteFieldInput>>;
  parentCategory?: InputMaybe<CategoryParentCategoryDeleteFieldInput>;
  species?: InputMaybe<Array<CategorySpeciesDeleteFieldInput>>;
};

export type CategoryDisconnectInput = {
  childCategories?: InputMaybe<Array<CategoryChildCategoriesDisconnectFieldInput>>;
  parentCategory?: InputMaybe<CategoryParentCategoryDisconnectFieldInput>;
  species?: InputMaybe<Array<CategorySpeciesDisconnectFieldInput>>;
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  cursor: Scalars['String'];
  node: Category;
};

export type CategoryOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more CategorySort objects to sort Categories by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CategorySort>>;
};

export type CategoryParentCategoryAggregateInput = {
  AND?: InputMaybe<Array<CategoryParentCategoryAggregateInput>>;
  OR?: InputMaybe<Array<CategoryParentCategoryAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<CategoryParentCategoryNodeAggregationWhereInput>;
};

export type CategoryParentCategoryConnectFieldInput = {
  connect?: InputMaybe<CategoryConnectInput>;
  where?: InputMaybe<CategoryConnectWhere>;
};

export type CategoryParentCategoryConnection = {
  __typename?: 'CategoryParentCategoryConnection';
  edges: Array<CategoryParentCategoryRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CategoryParentCategoryConnectionSort = {
  node?: InputMaybe<CategorySort>;
};

export type CategoryParentCategoryConnectionWhere = {
  AND?: InputMaybe<Array<CategoryParentCategoryConnectionWhere>>;
  OR?: InputMaybe<Array<CategoryParentCategoryConnectionWhere>>;
  node?: InputMaybe<CategoryWhere>;
  node_NOT?: InputMaybe<CategoryWhere>;
};

export type CategoryParentCategoryCreateFieldInput = {
  node: CategoryCreateInput;
};

export type CategoryParentCategoryDeleteFieldInput = {
  delete?: InputMaybe<CategoryDeleteInput>;
  where?: InputMaybe<CategoryParentCategoryConnectionWhere>;
};

export type CategoryParentCategoryDisconnectFieldInput = {
  disconnect?: InputMaybe<CategoryDisconnectInput>;
  where?: InputMaybe<CategoryParentCategoryConnectionWhere>;
};

export type CategoryParentCategoryFieldInput = {
  connect?: InputMaybe<CategoryParentCategoryConnectFieldInput>;
  create?: InputMaybe<CategoryParentCategoryCreateFieldInput>;
};

export type CategoryParentCategoryNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CategoryParentCategoryNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CategoryParentCategoryNodeAggregationWhereInput>>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  description_EQUAL?: InputMaybe<Scalars['String']>;
  description_GT?: InputMaybe<Scalars['Int']>;
  description_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  description_LT?: InputMaybe<Scalars['Int']>;
  description_LTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type CategoryParentCategoryRelationship = {
  __typename?: 'CategoryParentCategoryRelationship';
  cursor: Scalars['String'];
  node: Category;
};

export type CategoryParentCategoryUpdateConnectionInput = {
  node?: InputMaybe<CategoryUpdateInput>;
};

export type CategoryParentCategoryUpdateFieldInput = {
  connect?: InputMaybe<CategoryParentCategoryConnectFieldInput>;
  create?: InputMaybe<CategoryParentCategoryCreateFieldInput>;
  delete?: InputMaybe<CategoryParentCategoryDeleteFieldInput>;
  disconnect?: InputMaybe<CategoryParentCategoryDisconnectFieldInput>;
  update?: InputMaybe<CategoryParentCategoryUpdateConnectionInput>;
  where?: InputMaybe<CategoryParentCategoryConnectionWhere>;
};

export type CategoryPlantSpeciesSpeciesAggregationSelection = {
  __typename?: 'CategoryPlantSpeciesSpeciesAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<CategoryPlantSpeciesSpeciesNodeAggregateSelection>;
};

export type CategoryPlantSpeciesSpeciesNodeAggregateSelection = {
  __typename?: 'CategoryPlantSpeciesSpeciesNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  icon: StringAggregateSelectionNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type CategoryRelationInput = {
  childCategories?: InputMaybe<Array<CategoryChildCategoriesCreateFieldInput>>;
  parentCategory?: InputMaybe<CategoryParentCategoryCreateFieldInput>;
  species?: InputMaybe<Array<CategorySpeciesCreateFieldInput>>;
};

/** Fields to sort Categories by. The order in which sorts are applied is not guaranteed when specifying many fields in one CategorySort object. */
export type CategorySort = {
  description?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
};

export type CategorySpeciesAggregateInput = {
  AND?: InputMaybe<Array<CategorySpeciesAggregateInput>>;
  OR?: InputMaybe<Array<CategorySpeciesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<CategorySpeciesNodeAggregationWhereInput>;
};

export type CategorySpeciesConnectFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesConnectInput>>;
  where?: InputMaybe<PlantSpeciesConnectWhere>;
};

export type CategorySpeciesConnection = {
  __typename?: 'CategorySpeciesConnection';
  edges: Array<CategorySpeciesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CategorySpeciesConnectionSort = {
  node?: InputMaybe<PlantSpeciesSort>;
};

export type CategorySpeciesConnectionWhere = {
  AND?: InputMaybe<Array<CategorySpeciesConnectionWhere>>;
  OR?: InputMaybe<Array<CategorySpeciesConnectionWhere>>;
  node?: InputMaybe<PlantSpeciesWhere>;
  node_NOT?: InputMaybe<PlantSpeciesWhere>;
};

export type CategorySpeciesCreateFieldInput = {
  node: PlantSpeciesCreateInput;
};

export type CategorySpeciesDeleteFieldInput = {
  delete?: InputMaybe<PlantSpeciesDeleteInput>;
  where?: InputMaybe<CategorySpeciesConnectionWhere>;
};

export type CategorySpeciesDisconnectFieldInput = {
  disconnect?: InputMaybe<PlantSpeciesDisconnectInput>;
  where?: InputMaybe<CategorySpeciesConnectionWhere>;
};

export type CategorySpeciesFieldInput = {
  connect?: InputMaybe<Array<CategorySpeciesConnectFieldInput>>;
  create?: InputMaybe<Array<CategorySpeciesCreateFieldInput>>;
};

export type CategorySpeciesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CategorySpeciesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CategorySpeciesNodeAggregationWhereInput>>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  description_EQUAL?: InputMaybe<Scalars['String']>;
  description_GT?: InputMaybe<Scalars['Int']>;
  description_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  description_LT?: InputMaybe<Scalars['Int']>;
  description_LTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  icon_EQUAL?: InputMaybe<Scalars['String']>;
  icon_GT?: InputMaybe<Scalars['Int']>;
  icon_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_LT?: InputMaybe<Scalars['Int']>;
  icon_LTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type CategorySpeciesRelationship = {
  __typename?: 'CategorySpeciesRelationship';
  cursor: Scalars['String'];
  node: PlantSpecies;
};

export type CategorySpeciesUpdateConnectionInput = {
  node?: InputMaybe<PlantSpeciesUpdateInput>;
};

export type CategorySpeciesUpdateFieldInput = {
  connect?: InputMaybe<Array<CategorySpeciesConnectFieldInput>>;
  create?: InputMaybe<Array<CategorySpeciesCreateFieldInput>>;
  delete?: InputMaybe<Array<CategorySpeciesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CategorySpeciesDisconnectFieldInput>>;
  update?: InputMaybe<CategorySpeciesUpdateConnectionInput>;
  where?: InputMaybe<CategorySpeciesConnectionWhere>;
};

export type CategoryUpdateInput = {
  childCategories?: InputMaybe<Array<CategoryChildCategoriesUpdateFieldInput>>;
  description?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  parentCategory?: InputMaybe<CategoryParentCategoryUpdateFieldInput>;
  species?: InputMaybe<Array<CategorySpeciesUpdateFieldInput>>;
};

export type CategoryWhere = {
  AND?: InputMaybe<Array<CategoryWhere>>;
  OR?: InputMaybe<Array<CategoryWhere>>;
  childCategoriesAggregate?: InputMaybe<CategoryChildCategoriesAggregateInput>;
  childCategoriesConnection_ALL?: InputMaybe<CategoryChildCategoriesConnectionWhere>;
  childCategoriesConnection_NONE?: InputMaybe<CategoryChildCategoriesConnectionWhere>;
  childCategoriesConnection_SINGLE?: InputMaybe<CategoryChildCategoriesConnectionWhere>;
  childCategoriesConnection_SOME?: InputMaybe<CategoryChildCategoriesConnectionWhere>;
  /** Return Categories where all of the related Categories match this filter */
  childCategories_ALL?: InputMaybe<CategoryWhere>;
  /** Return Categories where none of the related Categories match this filter */
  childCategories_NONE?: InputMaybe<CategoryWhere>;
  /** Return Categories where one of the related Categories match this filter */
  childCategories_SINGLE?: InputMaybe<CategoryWhere>;
  /** Return Categories where some of the related Categories match this filter */
  childCategories_SOME?: InputMaybe<CategoryWhere>;
  description?: InputMaybe<Scalars['String']>;
  description_CONTAINS?: InputMaybe<Scalars['String']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_NOT?: InputMaybe<Scalars['String']>;
  description_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  description_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  description_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  parentCategory?: InputMaybe<CategoryWhere>;
  parentCategoryAggregate?: InputMaybe<CategoryParentCategoryAggregateInput>;
  parentCategoryConnection?: InputMaybe<CategoryParentCategoryConnectionWhere>;
  parentCategoryConnection_NOT?: InputMaybe<CategoryParentCategoryConnectionWhere>;
  parentCategory_NOT?: InputMaybe<CategoryWhere>;
  speciesAggregate?: InputMaybe<CategorySpeciesAggregateInput>;
  speciesConnection_ALL?: InputMaybe<CategorySpeciesConnectionWhere>;
  speciesConnection_NONE?: InputMaybe<CategorySpeciesConnectionWhere>;
  speciesConnection_SINGLE?: InputMaybe<CategorySpeciesConnectionWhere>;
  speciesConnection_SOME?: InputMaybe<CategorySpeciesConnectionWhere>;
  /** Return Categories where all of the related PlantSpecies match this filter */
  species_ALL?: InputMaybe<PlantSpeciesWhere>;
  /** Return Categories where none of the related PlantSpecies match this filter */
  species_NONE?: InputMaybe<PlantSpeciesWhere>;
  /** Return Categories where one of the related PlantSpecies match this filter */
  species_SINGLE?: InputMaybe<PlantSpeciesWhere>;
  /** Return Categories where some of the related PlantSpecies match this filter */
  species_SOME?: InputMaybe<PlantSpeciesWhere>;
};

export type ChangeRequest = {
  __typename?: 'ChangeRequest';
  _id: Scalars['ID'];
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  requested_by: Array<User>;
  requested_byAggregate?: Maybe<ChangeRequestUserRequested_ByAggregationSelection>;
  requested_byConnection: ChangeRequestRequested_ByConnection;
  requested_for: Array<WateringTask>;
  requested_forAggregate?: Maybe<ChangeRequestWateringTaskRequested_ForAggregationSelection>;
  requested_forConnection: ChangeRequestRequested_ForConnection;
  requested_new_task: Array<WateringTask>;
  requested_new_taskAggregate?: Maybe<ChangeRequestWateringTaskRequested_New_TaskAggregationSelection>;
  requested_new_taskConnection: ChangeRequestRequested_New_TaskConnection;
  requested_to: Array<User>;
  requested_toAggregate?: Maybe<ChangeRequestUserRequested_ToAggregationSelection>;
  requested_toConnection: ChangeRequestRequested_ToConnection;
  type: Scalars['String'];
};


export type ChangeRequestRequested_ByArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type ChangeRequestRequested_ByAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserWhere>;
};


export type ChangeRequestRequested_ByConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ChangeRequestRequested_ByConnectionSort>>;
  where?: InputMaybe<ChangeRequestRequested_ByConnectionWhere>;
};


export type ChangeRequestRequested_ForArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<WateringTaskOptions>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type ChangeRequestRequested_ForAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type ChangeRequestRequested_ForConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ChangeRequestRequested_ForConnectionSort>>;
  where?: InputMaybe<ChangeRequestRequested_ForConnectionWhere>;
};


export type ChangeRequestRequested_New_TaskArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<WateringTaskOptions>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type ChangeRequestRequested_New_TaskAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type ChangeRequestRequested_New_TaskConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ChangeRequestRequested_New_TaskConnectionSort>>;
  where?: InputMaybe<ChangeRequestRequested_New_TaskConnectionWhere>;
};


export type ChangeRequestRequested_ToArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type ChangeRequestRequested_ToAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserWhere>;
};


export type ChangeRequestRequested_ToConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ChangeRequestRequested_ToConnectionSort>>;
  where?: InputMaybe<ChangeRequestRequested_ToConnectionWhere>;
};

export type ChangeRequestAggregateSelection = {
  __typename?: 'ChangeRequestAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  count: Scalars['Int'];
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type ChangeRequestConnectInput = {
  requested_by?: InputMaybe<Array<ChangeRequestRequested_ByConnectFieldInput>>;
  requested_for?: InputMaybe<Array<ChangeRequestRequested_ForConnectFieldInput>>;
  requested_new_task?: InputMaybe<Array<ChangeRequestRequested_New_TaskConnectFieldInput>>;
  requested_to?: InputMaybe<Array<ChangeRequestRequested_ToConnectFieldInput>>;
};

export type ChangeRequestConnectWhere = {
  node: ChangeRequestWhere;
};

export type ChangeRequestCreateInput = {
  _id: Scalars['ID'];
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  requested_by?: InputMaybe<ChangeRequestRequested_ByFieldInput>;
  requested_for?: InputMaybe<ChangeRequestRequested_ForFieldInput>;
  requested_new_task?: InputMaybe<ChangeRequestRequested_New_TaskFieldInput>;
  requested_to?: InputMaybe<ChangeRequestRequested_ToFieldInput>;
  type: Scalars['String'];
};

export type ChangeRequestDeleteInput = {
  requested_by?: InputMaybe<Array<ChangeRequestRequested_ByDeleteFieldInput>>;
  requested_for?: InputMaybe<Array<ChangeRequestRequested_ForDeleteFieldInput>>;
  requested_new_task?: InputMaybe<Array<ChangeRequestRequested_New_TaskDeleteFieldInput>>;
  requested_to?: InputMaybe<Array<ChangeRequestRequested_ToDeleteFieldInput>>;
};

export type ChangeRequestDisconnectInput = {
  requested_by?: InputMaybe<Array<ChangeRequestRequested_ByDisconnectFieldInput>>;
  requested_for?: InputMaybe<Array<ChangeRequestRequested_ForDisconnectFieldInput>>;
  requested_new_task?: InputMaybe<Array<ChangeRequestRequested_New_TaskDisconnectFieldInput>>;
  requested_to?: InputMaybe<Array<ChangeRequestRequested_ToDisconnectFieldInput>>;
};

export type ChangeRequestEdge = {
  __typename?: 'ChangeRequestEdge';
  cursor: Scalars['String'];
  node: ChangeRequest;
};

export type ChangeRequestOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more ChangeRequestSort objects to sort ChangeRequests by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ChangeRequestSort>>;
};

export type ChangeRequestRelationInput = {
  requested_by?: InputMaybe<Array<ChangeRequestRequested_ByCreateFieldInput>>;
  requested_for?: InputMaybe<Array<ChangeRequestRequested_ForCreateFieldInput>>;
  requested_new_task?: InputMaybe<Array<ChangeRequestRequested_New_TaskCreateFieldInput>>;
  requested_to?: InputMaybe<Array<ChangeRequestRequested_ToCreateFieldInput>>;
};

export type ChangeRequestRequested_ByAggregateInput = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ByAggregateInput>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ByAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<ChangeRequestRequested_ByNodeAggregationWhereInput>;
};

export type ChangeRequestRequested_ByConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>;
  where?: InputMaybe<UserConnectWhere>;
};

export type ChangeRequestRequested_ByConnection = {
  __typename?: 'ChangeRequestRequested_byConnection';
  edges: Array<ChangeRequestRequested_ByRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ChangeRequestRequested_ByConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type ChangeRequestRequested_ByConnectionWhere = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ByConnectionWhere>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ByConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
};

export type ChangeRequestRequested_ByCreateFieldInput = {
  node: UserCreateInput;
};

export type ChangeRequestRequested_ByDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<ChangeRequestRequested_ByConnectionWhere>;
};

export type ChangeRequestRequested_ByDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<ChangeRequestRequested_ByConnectionWhere>;
};

export type ChangeRequestRequested_ByFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestRequested_ByConnectFieldInput>>;
  create?: InputMaybe<Array<ChangeRequestRequested_ByCreateFieldInput>>;
};

export type ChangeRequestRequested_ByNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ByNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ByNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  id_EQUAL?: InputMaybe<Scalars['String']>;
  id_GT?: InputMaybe<Scalars['Int']>;
  id_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  id_LT?: InputMaybe<Scalars['Int']>;
  id_LTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type ChangeRequestRequested_ByRelationship = {
  __typename?: 'ChangeRequestRequested_byRelationship';
  cursor: Scalars['String'];
  node: User;
};

export type ChangeRequestRequested_ByUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type ChangeRequestRequested_ByUpdateFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestRequested_ByConnectFieldInput>>;
  create?: InputMaybe<Array<ChangeRequestRequested_ByCreateFieldInput>>;
  delete?: InputMaybe<Array<ChangeRequestRequested_ByDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ChangeRequestRequested_ByDisconnectFieldInput>>;
  update?: InputMaybe<ChangeRequestRequested_ByUpdateConnectionInput>;
  where?: InputMaybe<ChangeRequestRequested_ByConnectionWhere>;
};

export type ChangeRequestRequested_ForAggregateInput = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ForAggregateInput>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ForAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<ChangeRequestRequested_ForNodeAggregationWhereInput>;
};

export type ChangeRequestRequested_ForConnectFieldInput = {
  connect?: InputMaybe<Array<WateringTaskConnectInput>>;
  where?: InputMaybe<WateringTaskConnectWhere>;
};

export type ChangeRequestRequested_ForConnection = {
  __typename?: 'ChangeRequestRequested_forConnection';
  edges: Array<ChangeRequestRequested_ForRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ChangeRequestRequested_ForConnectionSort = {
  node?: InputMaybe<WateringTaskSort>;
};

export type ChangeRequestRequested_ForConnectionWhere = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ForConnectionWhere>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ForConnectionWhere>>;
  node?: InputMaybe<WateringTaskWhere>;
  node_NOT?: InputMaybe<WateringTaskWhere>;
};

export type ChangeRequestRequested_ForCreateFieldInput = {
  node: WateringTaskCreateInput;
};

export type ChangeRequestRequested_ForDeleteFieldInput = {
  delete?: InputMaybe<WateringTaskDeleteInput>;
  where?: InputMaybe<ChangeRequestRequested_ForConnectionWhere>;
};

export type ChangeRequestRequested_ForDisconnectFieldInput = {
  disconnect?: InputMaybe<WateringTaskDisconnectInput>;
  where?: InputMaybe<ChangeRequestRequested_ForConnectionWhere>;
};

export type ChangeRequestRequested_ForFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestRequested_ForConnectFieldInput>>;
  create?: InputMaybe<Array<ChangeRequestRequested_ForCreateFieldInput>>;
};

export type ChangeRequestRequested_ForNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ForNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ForNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type ChangeRequestRequested_ForRelationship = {
  __typename?: 'ChangeRequestRequested_forRelationship';
  cursor: Scalars['String'];
  node: WateringTask;
};

export type ChangeRequestRequested_ForUpdateConnectionInput = {
  node?: InputMaybe<WateringTaskUpdateInput>;
};

export type ChangeRequestRequested_ForUpdateFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestRequested_ForConnectFieldInput>>;
  create?: InputMaybe<Array<ChangeRequestRequested_ForCreateFieldInput>>;
  delete?: InputMaybe<Array<ChangeRequestRequested_ForDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ChangeRequestRequested_ForDisconnectFieldInput>>;
  update?: InputMaybe<ChangeRequestRequested_ForUpdateConnectionInput>;
  where?: InputMaybe<ChangeRequestRequested_ForConnectionWhere>;
};

export type ChangeRequestRequested_New_TaskAggregateInput = {
  AND?: InputMaybe<Array<ChangeRequestRequested_New_TaskAggregateInput>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_New_TaskAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<ChangeRequestRequested_New_TaskNodeAggregationWhereInput>;
};

export type ChangeRequestRequested_New_TaskConnectFieldInput = {
  connect?: InputMaybe<Array<WateringTaskConnectInput>>;
  where?: InputMaybe<WateringTaskConnectWhere>;
};

export type ChangeRequestRequested_New_TaskConnection = {
  __typename?: 'ChangeRequestRequested_new_taskConnection';
  edges: Array<ChangeRequestRequested_New_TaskRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ChangeRequestRequested_New_TaskConnectionSort = {
  node?: InputMaybe<WateringTaskSort>;
};

export type ChangeRequestRequested_New_TaskConnectionWhere = {
  AND?: InputMaybe<Array<ChangeRequestRequested_New_TaskConnectionWhere>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_New_TaskConnectionWhere>>;
  node?: InputMaybe<WateringTaskWhere>;
  node_NOT?: InputMaybe<WateringTaskWhere>;
};

export type ChangeRequestRequested_New_TaskCreateFieldInput = {
  node: WateringTaskCreateInput;
};

export type ChangeRequestRequested_New_TaskDeleteFieldInput = {
  delete?: InputMaybe<WateringTaskDeleteInput>;
  where?: InputMaybe<ChangeRequestRequested_New_TaskConnectionWhere>;
};

export type ChangeRequestRequested_New_TaskDisconnectFieldInput = {
  disconnect?: InputMaybe<WateringTaskDisconnectInput>;
  where?: InputMaybe<ChangeRequestRequested_New_TaskConnectionWhere>;
};

export type ChangeRequestRequested_New_TaskFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestRequested_New_TaskConnectFieldInput>>;
  create?: InputMaybe<Array<ChangeRequestRequested_New_TaskCreateFieldInput>>;
};

export type ChangeRequestRequested_New_TaskNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ChangeRequestRequested_New_TaskNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_New_TaskNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type ChangeRequestRequested_New_TaskRelationship = {
  __typename?: 'ChangeRequestRequested_new_taskRelationship';
  cursor: Scalars['String'];
  node: WateringTask;
};

export type ChangeRequestRequested_New_TaskUpdateConnectionInput = {
  node?: InputMaybe<WateringTaskUpdateInput>;
};

export type ChangeRequestRequested_New_TaskUpdateFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestRequested_New_TaskConnectFieldInput>>;
  create?: InputMaybe<Array<ChangeRequestRequested_New_TaskCreateFieldInput>>;
  delete?: InputMaybe<Array<ChangeRequestRequested_New_TaskDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ChangeRequestRequested_New_TaskDisconnectFieldInput>>;
  update?: InputMaybe<ChangeRequestRequested_New_TaskUpdateConnectionInput>;
  where?: InputMaybe<ChangeRequestRequested_New_TaskConnectionWhere>;
};

export type ChangeRequestRequested_ToAggregateInput = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ToAggregateInput>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ToAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<ChangeRequestRequested_ToNodeAggregationWhereInput>;
};

export type ChangeRequestRequested_ToConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>;
  where?: InputMaybe<UserConnectWhere>;
};

export type ChangeRequestRequested_ToConnection = {
  __typename?: 'ChangeRequestRequested_toConnection';
  edges: Array<ChangeRequestRequested_ToRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ChangeRequestRequested_ToConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type ChangeRequestRequested_ToConnectionWhere = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ToConnectionWhere>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ToConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
};

export type ChangeRequestRequested_ToCreateFieldInput = {
  node: UserCreateInput;
};

export type ChangeRequestRequested_ToDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<ChangeRequestRequested_ToConnectionWhere>;
};

export type ChangeRequestRequested_ToDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<ChangeRequestRequested_ToConnectionWhere>;
};

export type ChangeRequestRequested_ToFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestRequested_ToConnectFieldInput>>;
  create?: InputMaybe<Array<ChangeRequestRequested_ToCreateFieldInput>>;
};

export type ChangeRequestRequested_ToNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ChangeRequestRequested_ToNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ChangeRequestRequested_ToNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  id_EQUAL?: InputMaybe<Scalars['String']>;
  id_GT?: InputMaybe<Scalars['Int']>;
  id_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  id_LT?: InputMaybe<Scalars['Int']>;
  id_LTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type ChangeRequestRequested_ToRelationship = {
  __typename?: 'ChangeRequestRequested_toRelationship';
  cursor: Scalars['String'];
  node: User;
};

export type ChangeRequestRequested_ToUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type ChangeRequestRequested_ToUpdateFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestRequested_ToConnectFieldInput>>;
  create?: InputMaybe<Array<ChangeRequestRequested_ToCreateFieldInput>>;
  delete?: InputMaybe<Array<ChangeRequestRequested_ToDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ChangeRequestRequested_ToDisconnectFieldInput>>;
  update?: InputMaybe<ChangeRequestRequested_ToUpdateConnectionInput>;
  where?: InputMaybe<ChangeRequestRequested_ToConnectionWhere>;
};

/** Fields to sort ChangeRequests by. The order in which sorts are applied is not guaranteed when specifying many fields in one ChangeRequestSort object. */
export type ChangeRequestSort = {
  _id?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
  neo4jImportId?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type ChangeRequestUpdateInput = {
  _id?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  neo4jImportId?: InputMaybe<Scalars['String']>;
  requested_by?: InputMaybe<Array<ChangeRequestRequested_ByUpdateFieldInput>>;
  requested_for?: InputMaybe<Array<ChangeRequestRequested_ForUpdateFieldInput>>;
  requested_new_task?: InputMaybe<Array<ChangeRequestRequested_New_TaskUpdateFieldInput>>;
  requested_to?: InputMaybe<Array<ChangeRequestRequested_ToUpdateFieldInput>>;
  type?: InputMaybe<Scalars['String']>;
};

export type ChangeRequestUserRequested_ByAggregationSelection = {
  __typename?: 'ChangeRequestUserRequested_byAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<ChangeRequestUserRequested_ByNodeAggregateSelection>;
};

export type ChangeRequestUserRequested_ByNodeAggregateSelection = {
  __typename?: 'ChangeRequestUserRequested_byNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  id: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type ChangeRequestUserRequested_ToAggregationSelection = {
  __typename?: 'ChangeRequestUserRequested_toAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<ChangeRequestUserRequested_ToNodeAggregateSelection>;
};

export type ChangeRequestUserRequested_ToNodeAggregateSelection = {
  __typename?: 'ChangeRequestUserRequested_toNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  id: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type ChangeRequestWateringTaskRequested_ForAggregationSelection = {
  __typename?: 'ChangeRequestWateringTaskRequested_forAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<ChangeRequestWateringTaskRequested_ForNodeAggregateSelection>;
};

export type ChangeRequestWateringTaskRequested_ForNodeAggregateSelection = {
  __typename?: 'ChangeRequestWateringTaskRequested_forNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type ChangeRequestWateringTaskRequested_New_TaskAggregationSelection = {
  __typename?: 'ChangeRequestWateringTaskRequested_new_taskAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<ChangeRequestWateringTaskRequested_New_TaskNodeAggregateSelection>;
};

export type ChangeRequestWateringTaskRequested_New_TaskNodeAggregateSelection = {
  __typename?: 'ChangeRequestWateringTaskRequested_new_taskNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type ChangeRequestWhere = {
  AND?: InputMaybe<Array<ChangeRequestWhere>>;
  OR?: InputMaybe<Array<ChangeRequestWhere>>;
  _id?: InputMaybe<Scalars['ID']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT?: InputMaybe<Scalars['ID']>;
  _id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId?: InputMaybe<Scalars['String']>;
  neo4jImportId_CONTAINS?: InputMaybe<Scalars['String']>;
  neo4jImportId_ENDS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_IN?: InputMaybe<Array<Scalars['String']>>;
  neo4jImportId_NOT?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  neo4jImportId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_STARTS_WITH?: InputMaybe<Scalars['String']>;
  requested_byAggregate?: InputMaybe<ChangeRequestRequested_ByAggregateInput>;
  requested_byConnection_ALL?: InputMaybe<ChangeRequestRequested_ByConnectionWhere>;
  requested_byConnection_NONE?: InputMaybe<ChangeRequestRequested_ByConnectionWhere>;
  requested_byConnection_SINGLE?: InputMaybe<ChangeRequestRequested_ByConnectionWhere>;
  requested_byConnection_SOME?: InputMaybe<ChangeRequestRequested_ByConnectionWhere>;
  /** Return ChangeRequests where all of the related Users match this filter */
  requested_by_ALL?: InputMaybe<UserWhere>;
  /** Return ChangeRequests where none of the related Users match this filter */
  requested_by_NONE?: InputMaybe<UserWhere>;
  /** Return ChangeRequests where one of the related Users match this filter */
  requested_by_SINGLE?: InputMaybe<UserWhere>;
  /** Return ChangeRequests where some of the related Users match this filter */
  requested_by_SOME?: InputMaybe<UserWhere>;
  requested_forAggregate?: InputMaybe<ChangeRequestRequested_ForAggregateInput>;
  requested_forConnection_ALL?: InputMaybe<ChangeRequestRequested_ForConnectionWhere>;
  requested_forConnection_NONE?: InputMaybe<ChangeRequestRequested_ForConnectionWhere>;
  requested_forConnection_SINGLE?: InputMaybe<ChangeRequestRequested_ForConnectionWhere>;
  requested_forConnection_SOME?: InputMaybe<ChangeRequestRequested_ForConnectionWhere>;
  /** Return ChangeRequests where all of the related WateringTasks match this filter */
  requested_for_ALL?: InputMaybe<WateringTaskWhere>;
  /** Return ChangeRequests where none of the related WateringTasks match this filter */
  requested_for_NONE?: InputMaybe<WateringTaskWhere>;
  /** Return ChangeRequests where one of the related WateringTasks match this filter */
  requested_for_SINGLE?: InputMaybe<WateringTaskWhere>;
  /** Return ChangeRequests where some of the related WateringTasks match this filter */
  requested_for_SOME?: InputMaybe<WateringTaskWhere>;
  requested_new_taskAggregate?: InputMaybe<ChangeRequestRequested_New_TaskAggregateInput>;
  requested_new_taskConnection_ALL?: InputMaybe<ChangeRequestRequested_New_TaskConnectionWhere>;
  requested_new_taskConnection_NONE?: InputMaybe<ChangeRequestRequested_New_TaskConnectionWhere>;
  requested_new_taskConnection_SINGLE?: InputMaybe<ChangeRequestRequested_New_TaskConnectionWhere>;
  requested_new_taskConnection_SOME?: InputMaybe<ChangeRequestRequested_New_TaskConnectionWhere>;
  /** Return ChangeRequests where all of the related WateringTasks match this filter */
  requested_new_task_ALL?: InputMaybe<WateringTaskWhere>;
  /** Return ChangeRequests where none of the related WateringTasks match this filter */
  requested_new_task_NONE?: InputMaybe<WateringTaskWhere>;
  /** Return ChangeRequests where one of the related WateringTasks match this filter */
  requested_new_task_SINGLE?: InputMaybe<WateringTaskWhere>;
  /** Return ChangeRequests where some of the related WateringTasks match this filter */
  requested_new_task_SOME?: InputMaybe<WateringTaskWhere>;
  requested_toAggregate?: InputMaybe<ChangeRequestRequested_ToAggregateInput>;
  requested_toConnection_ALL?: InputMaybe<ChangeRequestRequested_ToConnectionWhere>;
  requested_toConnection_NONE?: InputMaybe<ChangeRequestRequested_ToConnectionWhere>;
  requested_toConnection_SINGLE?: InputMaybe<ChangeRequestRequested_ToConnectionWhere>;
  requested_toConnection_SOME?: InputMaybe<ChangeRequestRequested_ToConnectionWhere>;
  /** Return ChangeRequests where all of the related Users match this filter */
  requested_to_ALL?: InputMaybe<UserWhere>;
  /** Return ChangeRequests where none of the related Users match this filter */
  requested_to_NONE?: InputMaybe<UserWhere>;
  /** Return ChangeRequests where one of the related Users match this filter */
  requested_to_SINGLE?: InputMaybe<UserWhere>;
  /** Return ChangeRequests where some of the related Users match this filter */
  requested_to_SOME?: InputMaybe<UserWhere>;
  type?: InputMaybe<Scalars['String']>;
  type_CONTAINS?: InputMaybe<Scalars['String']>;
  type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_IN?: InputMaybe<Array<Scalars['String']>>;
  type_NOT?: InputMaybe<Scalars['String']>;
  type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type ChangeRequestsConnection = {
  __typename?: 'ChangeRequestsConnection';
  edges: Array<ChangeRequestEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Container = {
  __typename?: 'Container';
  containerType: Scalars['String'];
  storageLocation: Array<GardenFeature>;
  storageLocationAggregate?: Maybe<ContainerGardenFeatureStorageLocationAggregationSelection>;
  storageLocationConnection: ContainerStorageLocationConnection;
};


export type ContainerStorageLocationArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenFeatureOptions>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type ContainerStorageLocationAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type ContainerStorageLocationConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<ContainerStorageLocationConnectionSort>>;
  where?: InputMaybe<ContainerStorageLocationConnectionWhere>;
};

export type ContainerAggregateSelection = {
  __typename?: 'ContainerAggregateSelection';
  containerType: StringAggregateSelectionNonNullable;
  count: Scalars['Int'];
};

export type ContainerConnectInput = {
  storageLocation?: InputMaybe<Array<ContainerStorageLocationConnectFieldInput>>;
};

export type ContainerConnectOrCreateInput = {
  storageLocation?: InputMaybe<Array<ContainerStorageLocationConnectOrCreateFieldInput>>;
};

export type ContainerConnectWhere = {
  node: ContainerWhere;
};

export type ContainerCreateInput = {
  containerType: Scalars['String'];
  storageLocation?: InputMaybe<ContainerStorageLocationFieldInput>;
};

export type ContainerDeleteInput = {
  storageLocation?: InputMaybe<Array<ContainerStorageLocationDeleteFieldInput>>;
};

export type ContainerDisconnectInput = {
  storageLocation?: InputMaybe<Array<ContainerStorageLocationDisconnectFieldInput>>;
};

export type ContainerEdge = {
  __typename?: 'ContainerEdge';
  cursor: Scalars['String'];
  node: Container;
};

export type ContainerGardenFeatureStorageLocationAggregationSelection = {
  __typename?: 'ContainerGardenFeatureStorageLocationAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<ContainerGardenFeatureStorageLocationNodeAggregateSelection>;
};

export type ContainerGardenFeatureStorageLocationNodeAggregateSelection = {
  __typename?: 'ContainerGardenFeatureStorageLocationNodeAggregateSelection';
  featureId: IdAggregateSelectionNonNullable;
  featureType: StringAggregateSelectionNonNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type ContainerOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more ContainerSort objects to sort Containers by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ContainerSort>>;
};

export type ContainerRelationInput = {
  storageLocation?: InputMaybe<Array<ContainerStorageLocationCreateFieldInput>>;
};

/** Fields to sort Containers by. The order in which sorts are applied is not guaranteed when specifying many fields in one ContainerSort object. */
export type ContainerSort = {
  containerType?: InputMaybe<SortDirection>;
};

export type ContainerStorageLocationAggregateInput = {
  AND?: InputMaybe<Array<ContainerStorageLocationAggregateInput>>;
  OR?: InputMaybe<Array<ContainerStorageLocationAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<ContainerStorageLocationNodeAggregationWhereInput>;
};

export type ContainerStorageLocationConnectFieldInput = {
  connect?: InputMaybe<Array<GardenFeatureConnectInput>>;
  where?: InputMaybe<GardenFeatureConnectWhere>;
};

export type ContainerStorageLocationConnectOrCreateFieldInput = {
  onCreate: ContainerStorageLocationConnectOrCreateFieldInputOnCreate;
  where: GardenFeatureConnectOrCreateWhere;
};

export type ContainerStorageLocationConnectOrCreateFieldInputOnCreate = {
  node: GardenFeatureOnCreateInput;
};

export type ContainerStorageLocationConnection = {
  __typename?: 'ContainerStorageLocationConnection';
  edges: Array<ContainerStorageLocationRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ContainerStorageLocationConnectionSort = {
  node?: InputMaybe<GardenFeatureSort>;
};

export type ContainerStorageLocationConnectionWhere = {
  AND?: InputMaybe<Array<ContainerStorageLocationConnectionWhere>>;
  OR?: InputMaybe<Array<ContainerStorageLocationConnectionWhere>>;
  node?: InputMaybe<GardenFeatureWhere>;
  node_NOT?: InputMaybe<GardenFeatureWhere>;
};

export type ContainerStorageLocationCreateFieldInput = {
  node: GardenFeatureCreateInput;
};

export type ContainerStorageLocationDeleteFieldInput = {
  delete?: InputMaybe<GardenFeatureDeleteInput>;
  where?: InputMaybe<ContainerStorageLocationConnectionWhere>;
};

export type ContainerStorageLocationDisconnectFieldInput = {
  disconnect?: InputMaybe<GardenFeatureDisconnectInput>;
  where?: InputMaybe<ContainerStorageLocationConnectionWhere>;
};

export type ContainerStorageLocationFieldInput = {
  connect?: InputMaybe<Array<ContainerStorageLocationConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<ContainerStorageLocationConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<ContainerStorageLocationCreateFieldInput>>;
};

export type ContainerStorageLocationNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ContainerStorageLocationNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<ContainerStorageLocationNodeAggregationWhereInput>>;
  featureId_EQUAL?: InputMaybe<Scalars['ID']>;
  featureType_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  featureType_EQUAL?: InputMaybe<Scalars['String']>;
  featureType_GT?: InputMaybe<Scalars['Int']>;
  featureType_GTE?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  featureType_LT?: InputMaybe<Scalars['Int']>;
  featureType_LTE?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type ContainerStorageLocationRelationship = {
  __typename?: 'ContainerStorageLocationRelationship';
  cursor: Scalars['String'];
  node: GardenFeature;
};

export type ContainerStorageLocationUpdateConnectionInput = {
  node?: InputMaybe<GardenFeatureUpdateInput>;
};

export type ContainerStorageLocationUpdateFieldInput = {
  connect?: InputMaybe<Array<ContainerStorageLocationConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<ContainerStorageLocationConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<ContainerStorageLocationCreateFieldInput>>;
  delete?: InputMaybe<Array<ContainerStorageLocationDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ContainerStorageLocationDisconnectFieldInput>>;
  update?: InputMaybe<ContainerStorageLocationUpdateConnectionInput>;
  where?: InputMaybe<ContainerStorageLocationConnectionWhere>;
};

export type ContainerUpdateInput = {
  containerType?: InputMaybe<Scalars['String']>;
  storageLocation?: InputMaybe<Array<ContainerStorageLocationUpdateFieldInput>>;
};

export type ContainerWhere = {
  AND?: InputMaybe<Array<ContainerWhere>>;
  OR?: InputMaybe<Array<ContainerWhere>>;
  containerType?: InputMaybe<Scalars['String']>;
  containerType_CONTAINS?: InputMaybe<Scalars['String']>;
  containerType_ENDS_WITH?: InputMaybe<Scalars['String']>;
  containerType_IN?: InputMaybe<Array<Scalars['String']>>;
  containerType_NOT?: InputMaybe<Scalars['String']>;
  containerType_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  containerType_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  containerType_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  containerType_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  containerType_STARTS_WITH?: InputMaybe<Scalars['String']>;
  storageLocationAggregate?: InputMaybe<ContainerStorageLocationAggregateInput>;
  storageLocationConnection_ALL?: InputMaybe<ContainerStorageLocationConnectionWhere>;
  storageLocationConnection_NONE?: InputMaybe<ContainerStorageLocationConnectionWhere>;
  storageLocationConnection_SINGLE?: InputMaybe<ContainerStorageLocationConnectionWhere>;
  storageLocationConnection_SOME?: InputMaybe<ContainerStorageLocationConnectionWhere>;
  /** Return Containers where all of the related GardenFeatures match this filter */
  storageLocation_ALL?: InputMaybe<GardenFeatureWhere>;
  /** Return Containers where none of the related GardenFeatures match this filter */
  storageLocation_NONE?: InputMaybe<GardenFeatureWhere>;
  /** Return Containers where one of the related GardenFeatures match this filter */
  storageLocation_SINGLE?: InputMaybe<GardenFeatureWhere>;
  /** Return Containers where some of the related GardenFeatures match this filter */
  storageLocation_SOME?: InputMaybe<GardenFeatureWhere>;
};

export type ContainersConnection = {
  __typename?: 'ContainersConnection';
  edges: Array<ContainerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CreateCategoriesMutationResponse = {
  __typename?: 'CreateCategoriesMutationResponse';
  categories: Array<Category>;
  info: CreateInfo;
};

export type CreateChangeRequestsMutationResponse = {
  __typename?: 'CreateChangeRequestsMutationResponse';
  changeRequests: Array<ChangeRequest>;
  info: CreateInfo;
};

export type CreateContainersMutationResponse = {
  __typename?: 'CreateContainersMutationResponse';
  containers: Array<Container>;
  info: CreateInfo;
};

export type CreateGardenFeaturesMutationResponse = {
  __typename?: 'CreateGardenFeaturesMutationResponse';
  gardenFeatures: Array<GardenFeature>;
  info: CreateInfo;
};

export type CreateGardenLayersMutationResponse = {
  __typename?: 'CreateGardenLayersMutationResponse';
  gardenLayers: Array<GardenLayer>;
  info: CreateInfo;
};

export type CreateGardenSettingsMutationResponse = {
  __typename?: 'CreateGardenSettingsMutationResponse';
  gardenSettings: Array<GardenSettings>;
  info: CreateInfo;
};

export type CreateGardensMutationResponse = {
  __typename?: 'CreateGardensMutationResponse';
  gardens: Array<Garden>;
  info: CreateInfo;
};

export type CreateInfo = {
  __typename?: 'CreateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
};

export type CreateLogEventsMutationResponse = {
  __typename?: 'CreateLogEventsMutationResponse';
  info: CreateInfo;
  logEvents: Array<LogEvent>;
};

export type CreateMarkerShapesMutationResponse = {
  __typename?: 'CreateMarkerShapesMutationResponse';
  info: CreateInfo;
  markerShapes: Array<MarkerShape>;
};

export type CreatePlantSpeciesMutationResponse = {
  __typename?: 'CreatePlantSpeciesMutationResponse';
  info: CreateInfo;
  plantSpecies: Array<PlantSpecies>;
};

export type CreatePlantVarietiesMutationResponse = {
  __typename?: 'CreatePlantVarietiesMutationResponse';
  info: CreateInfo;
  plantVarieties: Array<PlantVariety>;
};

export type CreatePolygonShapesMutationResponse = {
  __typename?: 'CreatePolygonShapesMutationResponse';
  info: CreateInfo;
  polygonShapes: Array<PolygonShape>;
};

export type CreateSeedsMutationResponse = {
  __typename?: 'CreateSeedsMutationResponse';
  info: CreateInfo;
  seeds: Array<Seed>;
};

export type CreateUserSettingsMutationResponse = {
  __typename?: 'CreateUserSettingsMutationResponse';
  info: CreateInfo;
  userSettings: Array<UserSettings>;
};

export type CreateUsersMutationResponse = {
  __typename?: 'CreateUsersMutationResponse';
  info: CreateInfo;
  users: Array<User>;
};

export type CreateWateringPeriodsMutationResponse = {
  __typename?: 'CreateWateringPeriodsMutationResponse';
  info: CreateInfo;
  wateringPeriods: Array<WateringPeriod>;
};

export type CreateWateringTasksMutationResponse = {
  __typename?: 'CreateWateringTasksMutationResponse';
  info: CreateInfo;
  wateringTasks: Array<WateringTask>;
};

export type CropRotation = {
  weight?: Maybe<Scalars['Int']>;
};

export type CropRotationCreateInput = {
  weight?: InputMaybe<Scalars['Int']>;
};

export type CropRotationSort = {
  weight?: InputMaybe<SortDirection>;
};

export type CropRotationUpdateInput = {
  weight?: InputMaybe<Scalars['Int']>;
  weight_DECREMENT?: InputMaybe<Scalars['Int']>;
  weight_INCREMENT?: InputMaybe<Scalars['Int']>;
};

export type CropRotationWhere = {
  AND?: InputMaybe<Array<CropRotationWhere>>;
  OR?: InputMaybe<Array<CropRotationWhere>>;
  weight?: InputMaybe<Scalars['Int']>;
  weight_GT?: InputMaybe<Scalars['Int']>;
  weight_GTE?: InputMaybe<Scalars['Int']>;
  weight_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  weight_LT?: InputMaybe<Scalars['Int']>;
  weight_LTE?: InputMaybe<Scalars['Int']>;
  weight_NOT?: InputMaybe<Scalars['Int']>;
  weight_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesDeleted: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type Garden = {
  __typename?: 'Garden';
  _id: Scalars['ID'];
  gardenId: Scalars['ID'];
  label: Scalars['String'];
  settings?: Maybe<GardenSettings>;
  settingsAggregate?: Maybe<GardenGardenSettingsSettingsAggregationSelection>;
  settingsConnection: GardenSettingsConnection;
};


export type GardenSettingsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenSettingsOptions>;
  where?: InputMaybe<GardenSettingsWhere>;
};


export type GardenSettingsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenSettingsWhere>;
};


export type GardenSettingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GardenSettingsConnectionSort>>;
  where?: InputMaybe<GardenSettingsConnectionWhere>;
};

export type GardenAggregateSelection = {
  __typename?: 'GardenAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  count: Scalars['Int'];
  gardenId: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
};

export type GardenConnectInput = {
  settings?: InputMaybe<GardenSettingsConnectFieldInput>;
};

export type GardenConnectWhere = {
  node: GardenWhere;
};

export type GardenCreateInput = {
  _id: Scalars['ID'];
  gardenId: Scalars['ID'];
  label: Scalars['String'];
  settings?: InputMaybe<GardenSettingsFieldInput>;
};

export type GardenDeleteInput = {
  settings?: InputMaybe<GardenSettingsDeleteFieldInput>;
};

export type GardenDisconnectInput = {
  settings?: InputMaybe<GardenSettingsDisconnectFieldInput>;
};

export type GardenEdge = {
  __typename?: 'GardenEdge';
  cursor: Scalars['String'];
  node: Garden;
};

export type GardenFeature = {
  __typename?: 'GardenFeature';
  contains: Array<Container>;
  containsAggregate?: Maybe<GardenFeatureContainerContainsAggregationSelection>;
  containsConnection: GardenFeatureContainsConnection;
  featureId: Scalars['ID'];
  featureType: Scalars['String'];
  infoText?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  plants: Array<Maybe<Scalars['String']>>;
  shape: Array<GeoShape>;
  shapeConnection: GardenFeatureShapeConnection;
};


export type GardenFeatureContainsArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ContainerOptions>;
  where?: InputMaybe<ContainerWhere>;
};


export type GardenFeatureContainsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ContainerWhere>;
};


export type GardenFeatureContainsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GardenFeatureContainsConnectionSort>>;
  where?: InputMaybe<GardenFeatureContainsConnectionWhere>;
};


export type GardenFeatureShapeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GeoShapeOptions>;
  where?: InputMaybe<GeoShapeWhere>;
};


export type GardenFeatureShapeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GardenFeatureShapeConnectionSort>>;
  where?: InputMaybe<GardenFeatureShapeConnectionWhere>;
};

export type GardenFeatureAggregateSelection = {
  __typename?: 'GardenFeatureAggregateSelection';
  count: Scalars['Int'];
  featureId: IdAggregateSelectionNonNullable;
  featureType: StringAggregateSelectionNonNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type GardenFeatureConnectInput = {
  contains?: InputMaybe<Array<GardenFeatureContainsConnectFieldInput>>;
  shape?: InputMaybe<Array<GardenFeatureShapeConnectFieldInput>>;
};

export type GardenFeatureConnectOrCreateWhere = {
  node: GardenFeatureUniqueWhere;
};

export type GardenFeatureConnectWhere = {
  node: GardenFeatureWhere;
};

export type GardenFeatureContainerContainsAggregationSelection = {
  __typename?: 'GardenFeatureContainerContainsAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<GardenFeatureContainerContainsNodeAggregateSelection>;
};

export type GardenFeatureContainerContainsNodeAggregateSelection = {
  __typename?: 'GardenFeatureContainerContainsNodeAggregateSelection';
  containerType: StringAggregateSelectionNonNullable;
};

export type GardenFeatureContainsAggregateInput = {
  AND?: InputMaybe<Array<GardenFeatureContainsAggregateInput>>;
  OR?: InputMaybe<Array<GardenFeatureContainsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<GardenFeatureContainsNodeAggregationWhereInput>;
};

export type GardenFeatureContainsConnectFieldInput = {
  connect?: InputMaybe<Array<ContainerConnectInput>>;
  where?: InputMaybe<ContainerConnectWhere>;
};

export type GardenFeatureContainsConnection = {
  __typename?: 'GardenFeatureContainsConnection';
  edges: Array<GardenFeatureContainsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GardenFeatureContainsConnectionSort = {
  node?: InputMaybe<ContainerSort>;
};

export type GardenFeatureContainsConnectionWhere = {
  AND?: InputMaybe<Array<GardenFeatureContainsConnectionWhere>>;
  OR?: InputMaybe<Array<GardenFeatureContainsConnectionWhere>>;
  node?: InputMaybe<ContainerWhere>;
  node_NOT?: InputMaybe<ContainerWhere>;
};

export type GardenFeatureContainsCreateFieldInput = {
  node: ContainerCreateInput;
};

export type GardenFeatureContainsDeleteFieldInput = {
  delete?: InputMaybe<ContainerDeleteInput>;
  where?: InputMaybe<GardenFeatureContainsConnectionWhere>;
};

export type GardenFeatureContainsDisconnectFieldInput = {
  disconnect?: InputMaybe<ContainerDisconnectInput>;
  where?: InputMaybe<GardenFeatureContainsConnectionWhere>;
};

export type GardenFeatureContainsFieldInput = {
  connect?: InputMaybe<Array<GardenFeatureContainsConnectFieldInput>>;
  create?: InputMaybe<Array<GardenFeatureContainsCreateFieldInput>>;
};

export type GardenFeatureContainsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<GardenFeatureContainsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<GardenFeatureContainsNodeAggregationWhereInput>>;
  containerType_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  containerType_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  containerType_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  containerType_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  containerType_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  containerType_EQUAL?: InputMaybe<Scalars['String']>;
  containerType_GT?: InputMaybe<Scalars['Int']>;
  containerType_GTE?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  containerType_LT?: InputMaybe<Scalars['Int']>;
  containerType_LTE?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type GardenFeatureContainsRelationship = {
  __typename?: 'GardenFeatureContainsRelationship';
  cursor: Scalars['String'];
  node: Container;
};

export type GardenFeatureContainsUpdateConnectionInput = {
  node?: InputMaybe<ContainerUpdateInput>;
};

export type GardenFeatureContainsUpdateFieldInput = {
  connect?: InputMaybe<Array<GardenFeatureContainsConnectFieldInput>>;
  create?: InputMaybe<Array<GardenFeatureContainsCreateFieldInput>>;
  delete?: InputMaybe<Array<GardenFeatureContainsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<GardenFeatureContainsDisconnectFieldInput>>;
  update?: InputMaybe<GardenFeatureContainsUpdateConnectionInput>;
  where?: InputMaybe<GardenFeatureContainsConnectionWhere>;
};

export type GardenFeatureCreateInput = {
  contains?: InputMaybe<GardenFeatureContainsFieldInput>;
  featureType: Scalars['String'];
  infoText?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  plants: Array<InputMaybe<Scalars['String']>>;
  shape?: InputMaybe<GardenFeatureShapeFieldInput>;
};

export type GardenFeatureDeleteInput = {
  contains?: InputMaybe<Array<GardenFeatureContainsDeleteFieldInput>>;
  shape?: InputMaybe<Array<GardenFeatureShapeDeleteFieldInput>>;
};

export type GardenFeatureDisconnectInput = {
  contains?: InputMaybe<Array<GardenFeatureContainsDisconnectFieldInput>>;
  shape?: InputMaybe<Array<GardenFeatureShapeDisconnectFieldInput>>;
};

export type GardenFeatureEdge = {
  __typename?: 'GardenFeatureEdge';
  cursor: Scalars['String'];
  node: GardenFeature;
};

export type GardenFeatureOnCreateInput = {
  featureType: Scalars['String'];
  infoText?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  plants: Array<InputMaybe<Scalars['String']>>;
};

export type GardenFeatureOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GardenFeatureSort objects to sort GardenFeatures by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GardenFeatureSort>>;
};

export type GardenFeatureRelationInput = {
  contains?: InputMaybe<Array<GardenFeatureContainsCreateFieldInput>>;
  shape?: InputMaybe<Array<GardenFeatureShapeCreateFieldInput>>;
};

export type GardenFeatureShapeConnectFieldInput = {
  connect?: InputMaybe<GeoShapeConnectInput>;
  where?: InputMaybe<GeoShapeConnectWhere>;
};

export type GardenFeatureShapeConnection = {
  __typename?: 'GardenFeatureShapeConnection';
  edges: Array<GardenFeatureShapeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GardenFeatureShapeConnectionSort = {
  node?: InputMaybe<GeoShapeSort>;
};

export type GardenFeatureShapeConnectionWhere = {
  AND?: InputMaybe<Array<GardenFeatureShapeConnectionWhere>>;
  OR?: InputMaybe<Array<GardenFeatureShapeConnectionWhere>>;
  node?: InputMaybe<GeoShapeWhere>;
  node_NOT?: InputMaybe<GeoShapeWhere>;
};

export type GardenFeatureShapeCreateFieldInput = {
  node: GeoShapeCreateInput;
};

export type GardenFeatureShapeDeleteFieldInput = {
  delete?: InputMaybe<GeoShapeDeleteInput>;
  where?: InputMaybe<GardenFeatureShapeConnectionWhere>;
};

export type GardenFeatureShapeDisconnectFieldInput = {
  disconnect?: InputMaybe<GeoShapeDisconnectInput>;
  where?: InputMaybe<GardenFeatureShapeConnectionWhere>;
};

export type GardenFeatureShapeFieldInput = {
  connect?: InputMaybe<Array<GardenFeatureShapeConnectFieldInput>>;
  create?: InputMaybe<Array<GardenFeatureShapeCreateFieldInput>>;
};

export type GardenFeatureShapeRelationship = {
  __typename?: 'GardenFeatureShapeRelationship';
  cursor: Scalars['String'];
  node: GeoShape;
};

export type GardenFeatureShapeUpdateConnectionInput = {
  node?: InputMaybe<GeoShapeUpdateInput>;
};

export type GardenFeatureShapeUpdateFieldInput = {
  connect?: InputMaybe<Array<GardenFeatureShapeConnectFieldInput>>;
  create?: InputMaybe<Array<GardenFeatureShapeCreateFieldInput>>;
  delete?: InputMaybe<Array<GardenFeatureShapeDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<GardenFeatureShapeDisconnectFieldInput>>;
  update?: InputMaybe<GardenFeatureShapeUpdateConnectionInput>;
  where?: InputMaybe<GardenFeatureShapeConnectionWhere>;
};

/** Fields to sort GardenFeatures by. The order in which sorts are applied is not guaranteed when specifying many fields in one GardenFeatureSort object. */
export type GardenFeatureSort = {
  featureId?: InputMaybe<SortDirection>;
  featureType?: InputMaybe<SortDirection>;
  infoText?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
};

export type GardenFeatureUniqueWhere = {
  featureId?: InputMaybe<Scalars['ID']>;
};

export type GardenFeatureUpdateInput = {
  contains?: InputMaybe<Array<GardenFeatureContainsUpdateFieldInput>>;
  featureType?: InputMaybe<Scalars['String']>;
  infoText?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  plants?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  plants_POP?: InputMaybe<Scalars['Int']>;
  plants_PUSH?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shape?: InputMaybe<Array<GardenFeatureShapeUpdateFieldInput>>;
};

export type GardenFeatureWhere = {
  AND?: InputMaybe<Array<GardenFeatureWhere>>;
  OR?: InputMaybe<Array<GardenFeatureWhere>>;
  containsAggregate?: InputMaybe<GardenFeatureContainsAggregateInput>;
  containsConnection_ALL?: InputMaybe<GardenFeatureContainsConnectionWhere>;
  containsConnection_NONE?: InputMaybe<GardenFeatureContainsConnectionWhere>;
  containsConnection_SINGLE?: InputMaybe<GardenFeatureContainsConnectionWhere>;
  containsConnection_SOME?: InputMaybe<GardenFeatureContainsConnectionWhere>;
  /** Return GardenFeatures where all of the related Containers match this filter */
  contains_ALL?: InputMaybe<ContainerWhere>;
  /** Return GardenFeatures where none of the related Containers match this filter */
  contains_NONE?: InputMaybe<ContainerWhere>;
  /** Return GardenFeatures where one of the related Containers match this filter */
  contains_SINGLE?: InputMaybe<ContainerWhere>;
  /** Return GardenFeatures where some of the related Containers match this filter */
  contains_SOME?: InputMaybe<ContainerWhere>;
  featureId?: InputMaybe<Scalars['ID']>;
  featureId_CONTAINS?: InputMaybe<Scalars['ID']>;
  featureId_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  featureId_IN?: InputMaybe<Array<Scalars['ID']>>;
  featureId_NOT?: InputMaybe<Scalars['ID']>;
  featureId_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  featureId_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  featureId_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  featureId_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  featureId_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  featureType?: InputMaybe<Scalars['String']>;
  featureType_CONTAINS?: InputMaybe<Scalars['String']>;
  featureType_ENDS_WITH?: InputMaybe<Scalars['String']>;
  featureType_IN?: InputMaybe<Array<Scalars['String']>>;
  featureType_NOT?: InputMaybe<Scalars['String']>;
  featureType_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  featureType_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  featureType_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  featureType_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  featureType_STARTS_WITH?: InputMaybe<Scalars['String']>;
  infoText?: InputMaybe<Scalars['String']>;
  infoText_CONTAINS?: InputMaybe<Scalars['String']>;
  infoText_ENDS_WITH?: InputMaybe<Scalars['String']>;
  infoText_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  infoText_NOT?: InputMaybe<Scalars['String']>;
  infoText_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  infoText_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  infoText_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  infoText_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  infoText_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  plants?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  plants_INCLUDES?: InputMaybe<Scalars['String']>;
  plants_NOT?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  plants_NOT_INCLUDES?: InputMaybe<Scalars['String']>;
  shapeConnection_ALL?: InputMaybe<GardenFeatureShapeConnectionWhere>;
  shapeConnection_NONE?: InputMaybe<GardenFeatureShapeConnectionWhere>;
  shapeConnection_SINGLE?: InputMaybe<GardenFeatureShapeConnectionWhere>;
  shapeConnection_SOME?: InputMaybe<GardenFeatureShapeConnectionWhere>;
};

export type GardenFeaturesConnection = {
  __typename?: 'GardenFeaturesConnection';
  edges: Array<GardenFeatureEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GardenGardenSettingsSettingsAggregationSelection = {
  __typename?: 'GardenGardenSettingsSettingsAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<GardenGardenSettingsSettingsNodeAggregateSelection>;
};

export type GardenGardenSettingsSettingsNodeAggregateSelection = {
  __typename?: 'GardenGardenSettingsSettingsNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  homepageUrl: StringAggregateSelectionNullable;
  infoPageMarkdown: StringAggregateSelectionNullable;
  logoUrl: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNullable;
  shortDescription: StringAggregateSelectionNullable;
};

export type GardenLayer = {
  __typename?: 'GardenLayer';
  at?: Maybe<Garden>;
  atAggregate?: Maybe<GardenLayerGardenAtAggregationSelection>;
  atConnection: GardenLayerAtConnection;
  date?: Maybe<Scalars['Date']>;
  has_shape: Array<GeoShape>;
  has_shapeConnection: GardenLayerHas_ShapeConnection;
  layerId: Scalars['ID'];
  name: Scalars['String'];
};


export type GardenLayerAtArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenOptions>;
  where?: InputMaybe<GardenWhere>;
};


export type GardenLayerAtAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenWhere>;
};


export type GardenLayerAtConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GardenLayerAtConnectionSort>>;
  where?: InputMaybe<GardenLayerAtConnectionWhere>;
};


export type GardenLayerHas_ShapeArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GeoShapeOptions>;
  where?: InputMaybe<GeoShapeWhere>;
};


export type GardenLayerHas_ShapeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GardenLayerHas_ShapeConnectionSort>>;
  where?: InputMaybe<GardenLayerHas_ShapeConnectionWhere>;
};

export type GardenLayerAggregateSelection = {
  __typename?: 'GardenLayerAggregateSelection';
  count: Scalars['Int'];
  layerId: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type GardenLayerAtAggregateInput = {
  AND?: InputMaybe<Array<GardenLayerAtAggregateInput>>;
  OR?: InputMaybe<Array<GardenLayerAtAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<GardenLayerAtNodeAggregationWhereInput>;
};

export type GardenLayerAtConnectFieldInput = {
  connect?: InputMaybe<GardenConnectInput>;
  where?: InputMaybe<GardenConnectWhere>;
};

export type GardenLayerAtConnection = {
  __typename?: 'GardenLayerAtConnection';
  edges: Array<GardenLayerAtRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GardenLayerAtConnectionSort = {
  node?: InputMaybe<GardenSort>;
};

export type GardenLayerAtConnectionWhere = {
  AND?: InputMaybe<Array<GardenLayerAtConnectionWhere>>;
  OR?: InputMaybe<Array<GardenLayerAtConnectionWhere>>;
  node?: InputMaybe<GardenWhere>;
  node_NOT?: InputMaybe<GardenWhere>;
};

export type GardenLayerAtCreateFieldInput = {
  node: GardenCreateInput;
};

export type GardenLayerAtDeleteFieldInput = {
  delete?: InputMaybe<GardenDeleteInput>;
  where?: InputMaybe<GardenLayerAtConnectionWhere>;
};

export type GardenLayerAtDisconnectFieldInput = {
  disconnect?: InputMaybe<GardenDisconnectInput>;
  where?: InputMaybe<GardenLayerAtConnectionWhere>;
};

export type GardenLayerAtFieldInput = {
  connect?: InputMaybe<GardenLayerAtConnectFieldInput>;
  create?: InputMaybe<GardenLayerAtCreateFieldInput>;
};

export type GardenLayerAtNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<GardenLayerAtNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<GardenLayerAtNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  gardenId_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type GardenLayerAtRelationship = {
  __typename?: 'GardenLayerAtRelationship';
  cursor: Scalars['String'];
  node: Garden;
};

export type GardenLayerAtUpdateConnectionInput = {
  node?: InputMaybe<GardenUpdateInput>;
};

export type GardenLayerAtUpdateFieldInput = {
  connect?: InputMaybe<GardenLayerAtConnectFieldInput>;
  create?: InputMaybe<GardenLayerAtCreateFieldInput>;
  delete?: InputMaybe<GardenLayerAtDeleteFieldInput>;
  disconnect?: InputMaybe<GardenLayerAtDisconnectFieldInput>;
  update?: InputMaybe<GardenLayerAtUpdateConnectionInput>;
  where?: InputMaybe<GardenLayerAtConnectionWhere>;
};

export type GardenLayerConnectInput = {
  at?: InputMaybe<GardenLayerAtConnectFieldInput>;
  has_shape?: InputMaybe<Array<GardenLayerHas_ShapeConnectFieldInput>>;
};

export type GardenLayerConnectOrCreateWhere = {
  node: GardenLayerUniqueWhere;
};

export type GardenLayerConnectWhere = {
  node: GardenLayerWhere;
};

export type GardenLayerCreateInput = {
  at?: InputMaybe<GardenLayerAtFieldInput>;
  date?: InputMaybe<Scalars['Date']>;
  has_shape?: InputMaybe<GardenLayerHas_ShapeFieldInput>;
  name: Scalars['String'];
};

export type GardenLayerDeleteInput = {
  at?: InputMaybe<GardenLayerAtDeleteFieldInput>;
  has_shape?: InputMaybe<Array<GardenLayerHas_ShapeDeleteFieldInput>>;
};

export type GardenLayerDisconnectInput = {
  at?: InputMaybe<GardenLayerAtDisconnectFieldInput>;
  has_shape?: InputMaybe<Array<GardenLayerHas_ShapeDisconnectFieldInput>>;
};

export type GardenLayerEdge = {
  __typename?: 'GardenLayerEdge';
  cursor: Scalars['String'];
  node: GardenLayer;
};

export type GardenLayerGardenAtAggregationSelection = {
  __typename?: 'GardenLayerGardenAtAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<GardenLayerGardenAtNodeAggregateSelection>;
};

export type GardenLayerGardenAtNodeAggregateSelection = {
  __typename?: 'GardenLayerGardenAtNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  gardenId: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
};

export type GardenLayerHas_ShapeConnectFieldInput = {
  connect?: InputMaybe<GeoShapeConnectInput>;
  where?: InputMaybe<GeoShapeConnectWhere>;
};

export type GardenLayerHas_ShapeConnection = {
  __typename?: 'GardenLayerHas_shapeConnection';
  edges: Array<GardenLayerHas_ShapeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GardenLayerHas_ShapeConnectionSort = {
  node?: InputMaybe<GeoShapeSort>;
};

export type GardenLayerHas_ShapeConnectionWhere = {
  AND?: InputMaybe<Array<GardenLayerHas_ShapeConnectionWhere>>;
  OR?: InputMaybe<Array<GardenLayerHas_ShapeConnectionWhere>>;
  node?: InputMaybe<GeoShapeWhere>;
  node_NOT?: InputMaybe<GeoShapeWhere>;
};

export type GardenLayerHas_ShapeCreateFieldInput = {
  node: GeoShapeCreateInput;
};

export type GardenLayerHas_ShapeDeleteFieldInput = {
  delete?: InputMaybe<GeoShapeDeleteInput>;
  where?: InputMaybe<GardenLayerHas_ShapeConnectionWhere>;
};

export type GardenLayerHas_ShapeDisconnectFieldInput = {
  disconnect?: InputMaybe<GeoShapeDisconnectInput>;
  where?: InputMaybe<GardenLayerHas_ShapeConnectionWhere>;
};

export type GardenLayerHas_ShapeFieldInput = {
  connect?: InputMaybe<Array<GardenLayerHas_ShapeConnectFieldInput>>;
  create?: InputMaybe<Array<GardenLayerHas_ShapeCreateFieldInput>>;
};

export type GardenLayerHas_ShapeRelationship = {
  __typename?: 'GardenLayerHas_shapeRelationship';
  cursor: Scalars['String'];
  node: GeoShape;
};

export type GardenLayerHas_ShapeUpdateConnectionInput = {
  node?: InputMaybe<GeoShapeUpdateInput>;
};

export type GardenLayerHas_ShapeUpdateFieldInput = {
  connect?: InputMaybe<Array<GardenLayerHas_ShapeConnectFieldInput>>;
  create?: InputMaybe<Array<GardenLayerHas_ShapeCreateFieldInput>>;
  delete?: InputMaybe<Array<GardenLayerHas_ShapeDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<GardenLayerHas_ShapeDisconnectFieldInput>>;
  update?: InputMaybe<GardenLayerHas_ShapeUpdateConnectionInput>;
  where?: InputMaybe<GardenLayerHas_ShapeConnectionWhere>;
};

export type GardenLayerOnCreateInput = {
  date?: InputMaybe<Scalars['Date']>;
  name: Scalars['String'];
};

export type GardenLayerOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GardenLayerSort objects to sort GardenLayers by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GardenLayerSort>>;
};

export type GardenLayerRelationInput = {
  at?: InputMaybe<GardenLayerAtCreateFieldInput>;
  has_shape?: InputMaybe<Array<GardenLayerHas_ShapeCreateFieldInput>>;
};

/** Fields to sort GardenLayers by. The order in which sorts are applied is not guaranteed when specifying many fields in one GardenLayerSort object. */
export type GardenLayerSort = {
  date?: InputMaybe<SortDirection>;
  layerId?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type GardenLayerUniqueWhere = {
  layerId?: InputMaybe<Scalars['ID']>;
};

export type GardenLayerUpdateInput = {
  at?: InputMaybe<GardenLayerAtUpdateFieldInput>;
  date?: InputMaybe<Scalars['Date']>;
  has_shape?: InputMaybe<Array<GardenLayerHas_ShapeUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']>;
};

export type GardenLayerWhere = {
  AND?: InputMaybe<Array<GardenLayerWhere>>;
  OR?: InputMaybe<Array<GardenLayerWhere>>;
  at?: InputMaybe<GardenWhere>;
  atAggregate?: InputMaybe<GardenLayerAtAggregateInput>;
  atConnection?: InputMaybe<GardenLayerAtConnectionWhere>;
  atConnection_NOT?: InputMaybe<GardenLayerAtConnectionWhere>;
  at_NOT?: InputMaybe<GardenWhere>;
  date?: InputMaybe<Scalars['Date']>;
  date_GT?: InputMaybe<Scalars['Date']>;
  date_GTE?: InputMaybe<Scalars['Date']>;
  date_IN?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  date_LT?: InputMaybe<Scalars['Date']>;
  date_LTE?: InputMaybe<Scalars['Date']>;
  date_NOT?: InputMaybe<Scalars['Date']>;
  date_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  has_shapeConnection_ALL?: InputMaybe<GardenLayerHas_ShapeConnectionWhere>;
  has_shapeConnection_NONE?: InputMaybe<GardenLayerHas_ShapeConnectionWhere>;
  has_shapeConnection_SINGLE?: InputMaybe<GardenLayerHas_ShapeConnectionWhere>;
  has_shapeConnection_SOME?: InputMaybe<GardenLayerHas_ShapeConnectionWhere>;
  layerId?: InputMaybe<Scalars['ID']>;
  layerId_CONTAINS?: InputMaybe<Scalars['ID']>;
  layerId_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  layerId_IN?: InputMaybe<Array<Scalars['ID']>>;
  layerId_NOT?: InputMaybe<Scalars['ID']>;
  layerId_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  layerId_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  layerId_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  layerId_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  layerId_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT?: InputMaybe<Scalars['String']>;
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type GardenLayersConnection = {
  __typename?: 'GardenLayersConnection';
  edges: Array<GardenLayerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GardenOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GardenSort objects to sort Gardens by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GardenSort>>;
};

export type GardenRelationInput = {
  settings?: InputMaybe<GardenSettingsCreateFieldInput>;
};

export type GardenSettings = {
  __typename?: 'GardenSettings';
  _id: Scalars['ID'];
  garden: Garden;
  gardenAggregate?: Maybe<GardenSettingsGardenGardenAggregationSelection>;
  gardenConnection: GardenSettingsGardenConnection;
  homepageUrl?: Maybe<Scalars['String']>;
  infoPageMarkdown?: Maybe<Scalars['String']>;
  location?: Maybe<Point>;
  logoUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['String']>;
};


export type GardenSettingsGardenArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenOptions>;
  where?: InputMaybe<GardenWhere>;
};


export type GardenSettingsGardenAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenWhere>;
};


export type GardenSettingsGardenConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GardenSettingsGardenConnectionSort>>;
  where?: InputMaybe<GardenSettingsGardenConnectionWhere>;
};

export type GardenSettingsAggregateInput = {
  AND?: InputMaybe<Array<GardenSettingsAggregateInput>>;
  OR?: InputMaybe<Array<GardenSettingsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<GardenSettingsNodeAggregationWhereInput>;
};

export type GardenSettingsAggregateSelection = {
  __typename?: 'GardenSettingsAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  count: Scalars['Int'];
  homepageUrl: StringAggregateSelectionNullable;
  infoPageMarkdown: StringAggregateSelectionNullable;
  logoUrl: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNullable;
  shortDescription: StringAggregateSelectionNullable;
};

export type GardenSettingsConnectFieldInput = {
  connect?: InputMaybe<GardenSettingsConnectInput>;
  where?: InputMaybe<GardenSettingsConnectWhere>;
};

export type GardenSettingsConnectInput = {
  garden?: InputMaybe<GardenSettingsGardenConnectFieldInput>;
};

export type GardenSettingsConnectWhere = {
  node: GardenSettingsWhere;
};

export type GardenSettingsConnection = {
  __typename?: 'GardenSettingsConnection';
  edges: Array<GardenSettingsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GardenSettingsConnectionSort = {
  node?: InputMaybe<GardenSettingsSort>;
};

export type GardenSettingsConnectionWhere = {
  AND?: InputMaybe<Array<GardenSettingsConnectionWhere>>;
  OR?: InputMaybe<Array<GardenSettingsConnectionWhere>>;
  node?: InputMaybe<GardenSettingsWhere>;
  node_NOT?: InputMaybe<GardenSettingsWhere>;
};

export type GardenSettingsCreateFieldInput = {
  node: GardenSettingsCreateInput;
};

export type GardenSettingsCreateInput = {
  _id: Scalars['ID'];
  garden?: InputMaybe<GardenSettingsGardenFieldInput>;
  homepageUrl?: InputMaybe<Scalars['String']>;
  infoPageMarkdown?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<PointInput>;
  logoUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  shortDescription?: InputMaybe<Scalars['String']>;
};

export type GardenSettingsDeleteFieldInput = {
  delete?: InputMaybe<GardenSettingsDeleteInput>;
  where?: InputMaybe<GardenSettingsConnectionWhere>;
};

export type GardenSettingsDeleteInput = {
  garden?: InputMaybe<GardenSettingsGardenDeleteFieldInput>;
};

export type GardenSettingsDisconnectFieldInput = {
  disconnect?: InputMaybe<GardenSettingsDisconnectInput>;
  where?: InputMaybe<GardenSettingsConnectionWhere>;
};

export type GardenSettingsDisconnectInput = {
  garden?: InputMaybe<GardenSettingsGardenDisconnectFieldInput>;
};

export type GardenSettingsEdge = {
  __typename?: 'GardenSettingsEdge';
  cursor: Scalars['String'];
  node: GardenSettings;
};

export type GardenSettingsFieldInput = {
  connect?: InputMaybe<GardenSettingsConnectFieldInput>;
  create?: InputMaybe<GardenSettingsCreateFieldInput>;
};

export type GardenSettingsGardenAggregateInput = {
  AND?: InputMaybe<Array<GardenSettingsGardenAggregateInput>>;
  OR?: InputMaybe<Array<GardenSettingsGardenAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<GardenSettingsGardenNodeAggregationWhereInput>;
};

export type GardenSettingsGardenConnectFieldInput = {
  connect?: InputMaybe<GardenConnectInput>;
  where?: InputMaybe<GardenConnectWhere>;
};

export type GardenSettingsGardenConnection = {
  __typename?: 'GardenSettingsGardenConnection';
  edges: Array<GardenSettingsGardenRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GardenSettingsGardenConnectionSort = {
  node?: InputMaybe<GardenSort>;
};

export type GardenSettingsGardenConnectionWhere = {
  AND?: InputMaybe<Array<GardenSettingsGardenConnectionWhere>>;
  OR?: InputMaybe<Array<GardenSettingsGardenConnectionWhere>>;
  node?: InputMaybe<GardenWhere>;
  node_NOT?: InputMaybe<GardenWhere>;
};

export type GardenSettingsGardenCreateFieldInput = {
  node: GardenCreateInput;
};

export type GardenSettingsGardenDeleteFieldInput = {
  delete?: InputMaybe<GardenDeleteInput>;
  where?: InputMaybe<GardenSettingsGardenConnectionWhere>;
};

export type GardenSettingsGardenDisconnectFieldInput = {
  disconnect?: InputMaybe<GardenDisconnectInput>;
  where?: InputMaybe<GardenSettingsGardenConnectionWhere>;
};

export type GardenSettingsGardenFieldInput = {
  connect?: InputMaybe<GardenSettingsGardenConnectFieldInput>;
  create?: InputMaybe<GardenSettingsGardenCreateFieldInput>;
};

export type GardenSettingsGardenGardenAggregationSelection = {
  __typename?: 'GardenSettingsGardenGardenAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<GardenSettingsGardenGardenNodeAggregateSelection>;
};

export type GardenSettingsGardenGardenNodeAggregateSelection = {
  __typename?: 'GardenSettingsGardenGardenNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  gardenId: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
};

export type GardenSettingsGardenNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<GardenSettingsGardenNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<GardenSettingsGardenNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  gardenId_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type GardenSettingsGardenRelationship = {
  __typename?: 'GardenSettingsGardenRelationship';
  cursor: Scalars['String'];
  node: Garden;
};

export type GardenSettingsGardenUpdateConnectionInput = {
  node?: InputMaybe<GardenUpdateInput>;
};

export type GardenSettingsGardenUpdateFieldInput = {
  connect?: InputMaybe<GardenSettingsGardenConnectFieldInput>;
  create?: InputMaybe<GardenSettingsGardenCreateFieldInput>;
  delete?: InputMaybe<GardenSettingsGardenDeleteFieldInput>;
  disconnect?: InputMaybe<GardenSettingsGardenDisconnectFieldInput>;
  update?: InputMaybe<GardenSettingsGardenUpdateConnectionInput>;
  where?: InputMaybe<GardenSettingsGardenConnectionWhere>;
};

export type GardenSettingsInput = {
  gardenId: Scalars['ID'];
  homepageUrl?: InputMaybe<Scalars['String']>;
  infoPageMarkdown?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<PointInput>;
  logoUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  shortDescription?: InputMaybe<Scalars['String']>;
};

export type GardenSettingsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<GardenSettingsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<GardenSettingsNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  homepageUrl_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  homepageUrl_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  homepageUrl_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  homepageUrl_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  homepageUrl_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  homepageUrl_EQUAL?: InputMaybe<Scalars['String']>;
  homepageUrl_GT?: InputMaybe<Scalars['Int']>;
  homepageUrl_GTE?: InputMaybe<Scalars['Int']>;
  homepageUrl_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  homepageUrl_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  homepageUrl_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  homepageUrl_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  homepageUrl_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  homepageUrl_LT?: InputMaybe<Scalars['Int']>;
  homepageUrl_LTE?: InputMaybe<Scalars['Int']>;
  homepageUrl_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  homepageUrl_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  homepageUrl_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  homepageUrl_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  homepageUrl_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoPageMarkdown_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoPageMarkdown_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoPageMarkdown_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoPageMarkdown_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoPageMarkdown_EQUAL?: InputMaybe<Scalars['String']>;
  infoPageMarkdown_GT?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_GTE?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_LT?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_LTE?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoPageMarkdown_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  logoUrl_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  logoUrl_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  logoUrl_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  logoUrl_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  logoUrl_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  logoUrl_EQUAL?: InputMaybe<Scalars['String']>;
  logoUrl_GT?: InputMaybe<Scalars['Int']>;
  logoUrl_GTE?: InputMaybe<Scalars['Int']>;
  logoUrl_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  logoUrl_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  logoUrl_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  logoUrl_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  logoUrl_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  logoUrl_LT?: InputMaybe<Scalars['Int']>;
  logoUrl_LTE?: InputMaybe<Scalars['Int']>;
  logoUrl_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  logoUrl_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  logoUrl_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  logoUrl_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  logoUrl_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  name_EQUAL?: InputMaybe<Scalars['String']>;
  name_GT?: InputMaybe<Scalars['Int']>;
  name_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  name_LT?: InputMaybe<Scalars['Int']>;
  name_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  shortDescription_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  shortDescription_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  shortDescription_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  shortDescription_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  shortDescription_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  shortDescription_EQUAL?: InputMaybe<Scalars['String']>;
  shortDescription_GT?: InputMaybe<Scalars['Int']>;
  shortDescription_GTE?: InputMaybe<Scalars['Int']>;
  shortDescription_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  shortDescription_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  shortDescription_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  shortDescription_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  shortDescription_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  shortDescription_LT?: InputMaybe<Scalars['Int']>;
  shortDescription_LTE?: InputMaybe<Scalars['Int']>;
  shortDescription_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  shortDescription_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  shortDescription_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  shortDescription_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  shortDescription_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type GardenSettingsOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GardenSettingsSort objects to sort GardenSettings by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<GardenSettingsSort>>;
};

export type GardenSettingsRelationInput = {
  garden?: InputMaybe<GardenSettingsGardenCreateFieldInput>;
};

export type GardenSettingsRelationship = {
  __typename?: 'GardenSettingsRelationship';
  cursor: Scalars['String'];
  node: GardenSettings;
};

/** Fields to sort GardenSettings by. The order in which sorts are applied is not guaranteed when specifying many fields in one GardenSettingsSort object. */
export type GardenSettingsSort = {
  _id?: InputMaybe<SortDirection>;
  homepageUrl?: InputMaybe<SortDirection>;
  infoPageMarkdown?: InputMaybe<SortDirection>;
  location?: InputMaybe<SortDirection>;
  logoUrl?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  shortDescription?: InputMaybe<SortDirection>;
};

export type GardenSettingsUpdateConnectionInput = {
  node?: InputMaybe<GardenSettingsUpdateInput>;
};

export type GardenSettingsUpdateFieldInput = {
  connect?: InputMaybe<GardenSettingsConnectFieldInput>;
  create?: InputMaybe<GardenSettingsCreateFieldInput>;
  delete?: InputMaybe<GardenSettingsDeleteFieldInput>;
  disconnect?: InputMaybe<GardenSettingsDisconnectFieldInput>;
  update?: InputMaybe<GardenSettingsUpdateConnectionInput>;
  where?: InputMaybe<GardenSettingsConnectionWhere>;
};

export type GardenSettingsUpdateInput = {
  _id?: InputMaybe<Scalars['ID']>;
  garden?: InputMaybe<GardenSettingsGardenUpdateFieldInput>;
  homepageUrl?: InputMaybe<Scalars['String']>;
  infoPageMarkdown?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<PointInput>;
  logoUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  shortDescription?: InputMaybe<Scalars['String']>;
};

export type GardenSettingsWhere = {
  AND?: InputMaybe<Array<GardenSettingsWhere>>;
  OR?: InputMaybe<Array<GardenSettingsWhere>>;
  _id?: InputMaybe<Scalars['ID']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT?: InputMaybe<Scalars['ID']>;
  _id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  garden?: InputMaybe<GardenWhere>;
  gardenAggregate?: InputMaybe<GardenSettingsGardenAggregateInput>;
  gardenConnection?: InputMaybe<GardenSettingsGardenConnectionWhere>;
  gardenConnection_NOT?: InputMaybe<GardenSettingsGardenConnectionWhere>;
  garden_NOT?: InputMaybe<GardenWhere>;
  homepageUrl?: InputMaybe<Scalars['String']>;
  homepageUrl_CONTAINS?: InputMaybe<Scalars['String']>;
  homepageUrl_ENDS_WITH?: InputMaybe<Scalars['String']>;
  homepageUrl_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  homepageUrl_NOT?: InputMaybe<Scalars['String']>;
  homepageUrl_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  homepageUrl_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  homepageUrl_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  homepageUrl_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  homepageUrl_STARTS_WITH?: InputMaybe<Scalars['String']>;
  infoPageMarkdown?: InputMaybe<Scalars['String']>;
  infoPageMarkdown_CONTAINS?: InputMaybe<Scalars['String']>;
  infoPageMarkdown_ENDS_WITH?: InputMaybe<Scalars['String']>;
  infoPageMarkdown_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  infoPageMarkdown_NOT?: InputMaybe<Scalars['String']>;
  infoPageMarkdown_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  infoPageMarkdown_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  infoPageMarkdown_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  infoPageMarkdown_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  infoPageMarkdown_STARTS_WITH?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<PointInput>;
  location_DISTANCE?: InputMaybe<PointDistance>;
  location_GT?: InputMaybe<PointDistance>;
  location_GTE?: InputMaybe<PointDistance>;
  location_IN?: InputMaybe<Array<InputMaybe<PointInput>>>;
  location_LT?: InputMaybe<PointDistance>;
  location_LTE?: InputMaybe<PointDistance>;
  location_NOT?: InputMaybe<PointInput>;
  location_NOT_IN?: InputMaybe<Array<InputMaybe<PointInput>>>;
  logoUrl?: InputMaybe<Scalars['String']>;
  logoUrl_CONTAINS?: InputMaybe<Scalars['String']>;
  logoUrl_ENDS_WITH?: InputMaybe<Scalars['String']>;
  logoUrl_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  logoUrl_NOT?: InputMaybe<Scalars['String']>;
  logoUrl_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  logoUrl_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  logoUrl_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  logoUrl_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  logoUrl_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_NOT?: InputMaybe<Scalars['String']>;
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
  shortDescription?: InputMaybe<Scalars['String']>;
  shortDescription_CONTAINS?: InputMaybe<Scalars['String']>;
  shortDescription_ENDS_WITH?: InputMaybe<Scalars['String']>;
  shortDescription_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shortDescription_NOT?: InputMaybe<Scalars['String']>;
  shortDescription_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  shortDescription_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  shortDescription_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shortDescription_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  shortDescription_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

/** Fields to sort Gardens by. The order in which sorts are applied is not guaranteed when specifying many fields in one GardenSort object. */
export type GardenSort = {
  _id?: InputMaybe<SortDirection>;
  gardenId?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
};

export type GardenUpdateInput = {
  _id?: InputMaybe<Scalars['ID']>;
  gardenId?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<GardenSettingsUpdateFieldInput>;
};

export type GardenWhere = {
  AND?: InputMaybe<Array<GardenWhere>>;
  OR?: InputMaybe<Array<GardenWhere>>;
  _id?: InputMaybe<Scalars['ID']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT?: InputMaybe<Scalars['ID']>;
  _id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  gardenId?: InputMaybe<Scalars['ID']>;
  gardenId_CONTAINS?: InputMaybe<Scalars['ID']>;
  gardenId_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  gardenId_IN?: InputMaybe<Array<Scalars['ID']>>;
  gardenId_NOT?: InputMaybe<Scalars['ID']>;
  gardenId_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  gardenId_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  gardenId_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  gardenId_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  gardenId_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<GardenSettingsWhere>;
  settingsAggregate?: InputMaybe<GardenSettingsAggregateInput>;
  settingsConnection?: InputMaybe<GardenSettingsConnectionWhere>;
  settingsConnection_NOT?: InputMaybe<GardenSettingsConnectionWhere>;
  settings_NOT?: InputMaybe<GardenSettingsWhere>;
};

export type GardensConnection = {
  __typename?: 'GardensConnection';
  edges: Array<GardenEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GeoShape = {
  belongs_to: Array<GardenLayer>;
  belongs_toConnection: GeoShapeBelongs_ToConnection;
  feature?: Maybe<GardenFeature>;
  featureConnection: GeoShapeFeatureConnection;
  points: Array<Maybe<Point>>;
  shapeId: Scalars['ID'];
};


export type GeoShapeBelongs_ToArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenLayerOptions>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type GeoShapeBelongs_ToConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GeoShapeBelongs_ToConnectionSort>>;
  where?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
};


export type GeoShapeFeatureArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenFeatureOptions>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type GeoShapeFeatureConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GeoShapeFeatureConnectionSort>>;
  where?: InputMaybe<GeoShapeFeatureConnectionWhere>;
};

export type GeoShapeBelongs_ToAggregateInput = {
  AND?: InputMaybe<Array<GeoShapeBelongs_ToAggregateInput>>;
  OR?: InputMaybe<Array<GeoShapeBelongs_ToAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<GeoShapeBelongs_ToNodeAggregationWhereInput>;
};

export type GeoShapeBelongs_ToConnectFieldInput = {
  connect?: InputMaybe<Array<GardenLayerConnectInput>>;
  where?: InputMaybe<GardenLayerConnectWhere>;
};

export type GeoShapeBelongs_ToConnectOrCreateFieldInput = {
  onCreate: GeoShapeBelongs_ToConnectOrCreateFieldInputOnCreate;
  where: GardenLayerConnectOrCreateWhere;
};

export type GeoShapeBelongs_ToConnectOrCreateFieldInputOnCreate = {
  node: GardenLayerOnCreateInput;
};

export type GeoShapeBelongs_ToConnection = {
  __typename?: 'GeoShapeBelongs_toConnection';
  edges: Array<GeoShapeBelongs_ToRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GeoShapeBelongs_ToConnectionSort = {
  node?: InputMaybe<GardenLayerSort>;
};

export type GeoShapeBelongs_ToConnectionWhere = {
  AND?: InputMaybe<Array<GeoShapeBelongs_ToConnectionWhere>>;
  OR?: InputMaybe<Array<GeoShapeBelongs_ToConnectionWhere>>;
  node?: InputMaybe<GardenLayerWhere>;
  node_NOT?: InputMaybe<GardenLayerWhere>;
};

export type GeoShapeBelongs_ToCreateFieldInput = {
  node: GardenLayerCreateInput;
};

export type GeoShapeBelongs_ToDeleteFieldInput = {
  delete?: InputMaybe<GardenLayerDeleteInput>;
  where?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
};

export type GeoShapeBelongs_ToDisconnectFieldInput = {
  disconnect?: InputMaybe<GardenLayerDisconnectInput>;
  where?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
};

export type GeoShapeBelongs_ToFieldInput = {
  connect?: InputMaybe<Array<GeoShapeBelongs_ToConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<GeoShapeBelongs_ToConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<GeoShapeBelongs_ToCreateFieldInput>>;
};

export type GeoShapeBelongs_ToNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<GeoShapeBelongs_ToNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<GeoShapeBelongs_ToNodeAggregationWhereInput>>;
  layerId_EQUAL?: InputMaybe<Scalars['ID']>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  name_EQUAL?: InputMaybe<Scalars['String']>;
  name_GT?: InputMaybe<Scalars['Int']>;
  name_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  name_LT?: InputMaybe<Scalars['Int']>;
  name_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type GeoShapeBelongs_ToRelationship = {
  __typename?: 'GeoShapeBelongs_toRelationship';
  cursor: Scalars['String'];
  node: GardenLayer;
};

export type GeoShapeBelongs_ToUpdateConnectionInput = {
  node?: InputMaybe<GardenLayerUpdateInput>;
};

export type GeoShapeBelongs_ToUpdateFieldInput = {
  connect?: InputMaybe<Array<GeoShapeBelongs_ToConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<GeoShapeBelongs_ToConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<GeoShapeBelongs_ToCreateFieldInput>>;
  delete?: InputMaybe<Array<GeoShapeBelongs_ToDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<GeoShapeBelongs_ToDisconnectFieldInput>>;
  update?: InputMaybe<GeoShapeBelongs_ToUpdateConnectionInput>;
  where?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
};

export type GeoShapeConnectInput = {
  _on?: InputMaybe<GeoShapeImplementationsConnectInput>;
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToConnectFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureConnectFieldInput>;
};

export type GeoShapeConnectWhere = {
  node: GeoShapeWhere;
};

export type GeoShapeCreateInput = {
  MarkerShape?: InputMaybe<MarkerShapeCreateInput>;
  PolygonShape?: InputMaybe<PolygonShapeCreateInput>;
};

export type GeoShapeDeleteInput = {
  _on?: InputMaybe<GeoShapeImplementationsDeleteInput>;
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToDeleteFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureDeleteFieldInput>;
};

export type GeoShapeDisconnectInput = {
  _on?: InputMaybe<GeoShapeImplementationsDisconnectInput>;
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToDisconnectFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureDisconnectFieldInput>;
};

export type GeoShapeFeatureAggregateInput = {
  AND?: InputMaybe<Array<GeoShapeFeatureAggregateInput>>;
  OR?: InputMaybe<Array<GeoShapeFeatureAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<GeoShapeFeatureNodeAggregationWhereInput>;
};

export type GeoShapeFeatureConnectFieldInput = {
  connect?: InputMaybe<GardenFeatureConnectInput>;
  where?: InputMaybe<GardenFeatureConnectWhere>;
};

export type GeoShapeFeatureConnectOrCreateFieldInput = {
  onCreate: GeoShapeFeatureConnectOrCreateFieldInputOnCreate;
  where: GardenFeatureConnectOrCreateWhere;
};

export type GeoShapeFeatureConnectOrCreateFieldInputOnCreate = {
  node: GardenFeatureOnCreateInput;
};

export type GeoShapeFeatureConnection = {
  __typename?: 'GeoShapeFeatureConnection';
  edges: Array<GeoShapeFeatureRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type GeoShapeFeatureConnectionSort = {
  node?: InputMaybe<GardenFeatureSort>;
};

export type GeoShapeFeatureConnectionWhere = {
  AND?: InputMaybe<Array<GeoShapeFeatureConnectionWhere>>;
  OR?: InputMaybe<Array<GeoShapeFeatureConnectionWhere>>;
  node?: InputMaybe<GardenFeatureWhere>;
  node_NOT?: InputMaybe<GardenFeatureWhere>;
};

export type GeoShapeFeatureCreateFieldInput = {
  node: GardenFeatureCreateInput;
};

export type GeoShapeFeatureDeleteFieldInput = {
  delete?: InputMaybe<GardenFeatureDeleteInput>;
  where?: InputMaybe<GeoShapeFeatureConnectionWhere>;
};

export type GeoShapeFeatureDisconnectFieldInput = {
  disconnect?: InputMaybe<GardenFeatureDisconnectInput>;
  where?: InputMaybe<GeoShapeFeatureConnectionWhere>;
};

export type GeoShapeFeatureFieldInput = {
  connect?: InputMaybe<GeoShapeFeatureConnectFieldInput>;
  connectOrCreate?: InputMaybe<GeoShapeFeatureConnectOrCreateFieldInput>;
  create?: InputMaybe<GeoShapeFeatureCreateFieldInput>;
};

export type GeoShapeFeatureNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<GeoShapeFeatureNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<GeoShapeFeatureNodeAggregationWhereInput>>;
  featureId_EQUAL?: InputMaybe<Scalars['ID']>;
  featureType_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  featureType_EQUAL?: InputMaybe<Scalars['String']>;
  featureType_GT?: InputMaybe<Scalars['Int']>;
  featureType_GTE?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  featureType_LT?: InputMaybe<Scalars['Int']>;
  featureType_LTE?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type GeoShapeFeatureRelationship = {
  __typename?: 'GeoShapeFeatureRelationship';
  cursor: Scalars['String'];
  node: GardenFeature;
};

export type GeoShapeFeatureUpdateConnectionInput = {
  node?: InputMaybe<GardenFeatureUpdateInput>;
};

export type GeoShapeFeatureUpdateFieldInput = {
  connect?: InputMaybe<GeoShapeFeatureConnectFieldInput>;
  connectOrCreate?: InputMaybe<GeoShapeFeatureConnectOrCreateFieldInput>;
  create?: InputMaybe<GeoShapeFeatureCreateFieldInput>;
  delete?: InputMaybe<GeoShapeFeatureDeleteFieldInput>;
  disconnect?: InputMaybe<GeoShapeFeatureDisconnectFieldInput>;
  update?: InputMaybe<GeoShapeFeatureUpdateConnectionInput>;
  where?: InputMaybe<GeoShapeFeatureConnectionWhere>;
};

export type GeoShapeImplementationsConnectInput = {
  MarkerShape?: InputMaybe<Array<MarkerShapeConnectInput>>;
  PolygonShape?: InputMaybe<Array<PolygonShapeConnectInput>>;
};

export type GeoShapeImplementationsDeleteInput = {
  MarkerShape?: InputMaybe<Array<MarkerShapeDeleteInput>>;
  PolygonShape?: InputMaybe<Array<PolygonShapeDeleteInput>>;
};

export type GeoShapeImplementationsDisconnectInput = {
  MarkerShape?: InputMaybe<Array<MarkerShapeDisconnectInput>>;
  PolygonShape?: InputMaybe<Array<PolygonShapeDisconnectInput>>;
};

export type GeoShapeImplementationsUpdateInput = {
  MarkerShape?: InputMaybe<MarkerShapeUpdateInput>;
  PolygonShape?: InputMaybe<PolygonShapeUpdateInput>;
};

export type GeoShapeImplementationsWhere = {
  MarkerShape?: InputMaybe<MarkerShapeWhere>;
  PolygonShape?: InputMaybe<PolygonShapeWhere>;
};

export type GeoShapeOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more GeoShapeSort objects to sort GeoShapes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<InputMaybe<GeoShapeSort>>>;
};

/** Fields to sort GeoShapes by. The order in which sorts are applied is not guaranteed when specifying many fields in one GeoShapeSort object. */
export type GeoShapeSort = {
  shapeId?: InputMaybe<SortDirection>;
};

export type GeoShapeUpdateInput = {
  _on?: InputMaybe<GeoShapeImplementationsUpdateInput>;
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToUpdateFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureUpdateFieldInput>;
  points?: InputMaybe<Array<InputMaybe<PointInput>>>;
};

export type GeoShapeWhere = {
  _on?: InputMaybe<GeoShapeImplementationsWhere>;
  belongs_toAggregate?: InputMaybe<GeoShapeBelongs_ToAggregateInput>;
  belongs_toConnection_ALL?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_NONE?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_SINGLE?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_SOME?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  /** Return GeoShapes where all of the related GardenLayers match this filter */
  belongs_to_ALL?: InputMaybe<GardenLayerWhere>;
  /** Return GeoShapes where none of the related GardenLayers match this filter */
  belongs_to_NONE?: InputMaybe<GardenLayerWhere>;
  /** Return GeoShapes where one of the related GardenLayers match this filter */
  belongs_to_SINGLE?: InputMaybe<GardenLayerWhere>;
  /** Return GeoShapes where some of the related GardenLayers match this filter */
  belongs_to_SOME?: InputMaybe<GardenLayerWhere>;
  feature?: InputMaybe<GardenFeatureWhere>;
  featureAggregate?: InputMaybe<GeoShapeFeatureAggregateInput>;
  featureConnection?: InputMaybe<GeoShapeFeatureConnectionWhere>;
  featureConnection_NOT?: InputMaybe<GeoShapeFeatureConnectionWhere>;
  feature_NOT?: InputMaybe<GardenFeatureWhere>;
  points?: InputMaybe<Array<InputMaybe<PointInput>>>;
  points_INCLUDES?: InputMaybe<PointInput>;
  points_NOT?: InputMaybe<Array<InputMaybe<PointInput>>>;
  points_NOT_INCLUDES?: InputMaybe<PointInput>;
  shapeId?: InputMaybe<Scalars['ID']>;
  shapeId_CONTAINS?: InputMaybe<Scalars['ID']>;
  shapeId_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_IN?: InputMaybe<Array<Scalars['ID']>>;
  shapeId_NOT?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  shapeId_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_STARTS_WITH?: InputMaybe<Scalars['ID']>;
};

export type IdAggregateSelectionNonNullable = {
  __typename?: 'IDAggregateSelectionNonNullable';
  longest: Scalars['ID'];
  shortest: Scalars['ID'];
};

export type IntAggregateSelectionNullable = {
  __typename?: 'IntAggregateSelectionNullable';
  average?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  sum?: Maybe<Scalars['Int']>;
};

export type LogEvent = {
  __typename?: 'LogEvent';
  _id: Scalars['ID'];
  date: Scalars['String'];
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  refers_to: Array<WateringTask>;
  refers_toAggregate?: Maybe<LogEventWateringTaskRefers_ToAggregationSelection>;
  refers_toConnection: LogEventRefers_ToConnection;
  triggered_by: Array<User>;
  triggered_byAggregate?: Maybe<LogEventUserTriggered_ByAggregationSelection>;
  triggered_byConnection: LogEventTriggered_ByConnection;
  type: Scalars['String'];
};


export type LogEventRefers_ToArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<WateringTaskOptions>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type LogEventRefers_ToAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type LogEventRefers_ToConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<LogEventRefers_ToConnectionSort>>;
  where?: InputMaybe<LogEventRefers_ToConnectionWhere>;
};


export type LogEventTriggered_ByArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type LogEventTriggered_ByAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserWhere>;
};


export type LogEventTriggered_ByConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<LogEventTriggered_ByConnectionSort>>;
  where?: InputMaybe<LogEventTriggered_ByConnectionWhere>;
};

export type LogEventAggregateSelection = {
  __typename?: 'LogEventAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  count: Scalars['Int'];
  date: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type LogEventConnectInput = {
  refers_to?: InputMaybe<Array<LogEventRefers_ToConnectFieldInput>>;
  triggered_by?: InputMaybe<Array<LogEventTriggered_ByConnectFieldInput>>;
};

export type LogEventConnectWhere = {
  node: LogEventWhere;
};

export type LogEventCreateInput = {
  _id: Scalars['ID'];
  date: Scalars['String'];
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  refers_to?: InputMaybe<LogEventRefers_ToFieldInput>;
  triggered_by?: InputMaybe<LogEventTriggered_ByFieldInput>;
  type: Scalars['String'];
};

export type LogEventDeleteInput = {
  refers_to?: InputMaybe<Array<LogEventRefers_ToDeleteFieldInput>>;
  triggered_by?: InputMaybe<Array<LogEventTriggered_ByDeleteFieldInput>>;
};

export type LogEventDisconnectInput = {
  refers_to?: InputMaybe<Array<LogEventRefers_ToDisconnectFieldInput>>;
  triggered_by?: InputMaybe<Array<LogEventTriggered_ByDisconnectFieldInput>>;
};

export type LogEventEdge = {
  __typename?: 'LogEventEdge';
  cursor: Scalars['String'];
  node: LogEvent;
};

export type LogEventOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more LogEventSort objects to sort LogEvents by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<LogEventSort>>;
};

export type LogEventRefers_ToAggregateInput = {
  AND?: InputMaybe<Array<LogEventRefers_ToAggregateInput>>;
  OR?: InputMaybe<Array<LogEventRefers_ToAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<LogEventRefers_ToNodeAggregationWhereInput>;
};

export type LogEventRefers_ToConnectFieldInput = {
  connect?: InputMaybe<Array<WateringTaskConnectInput>>;
  where?: InputMaybe<WateringTaskConnectWhere>;
};

export type LogEventRefers_ToConnection = {
  __typename?: 'LogEventRefers_toConnection';
  edges: Array<LogEventRefers_ToRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LogEventRefers_ToConnectionSort = {
  node?: InputMaybe<WateringTaskSort>;
};

export type LogEventRefers_ToConnectionWhere = {
  AND?: InputMaybe<Array<LogEventRefers_ToConnectionWhere>>;
  OR?: InputMaybe<Array<LogEventRefers_ToConnectionWhere>>;
  node?: InputMaybe<WateringTaskWhere>;
  node_NOT?: InputMaybe<WateringTaskWhere>;
};

export type LogEventRefers_ToCreateFieldInput = {
  node: WateringTaskCreateInput;
};

export type LogEventRefers_ToDeleteFieldInput = {
  delete?: InputMaybe<WateringTaskDeleteInput>;
  where?: InputMaybe<LogEventRefers_ToConnectionWhere>;
};

export type LogEventRefers_ToDisconnectFieldInput = {
  disconnect?: InputMaybe<WateringTaskDisconnectInput>;
  where?: InputMaybe<LogEventRefers_ToConnectionWhere>;
};

export type LogEventRefers_ToFieldInput = {
  connect?: InputMaybe<Array<LogEventRefers_ToConnectFieldInput>>;
  create?: InputMaybe<Array<LogEventRefers_ToCreateFieldInput>>;
};

export type LogEventRefers_ToNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LogEventRefers_ToNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<LogEventRefers_ToNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type LogEventRefers_ToRelationship = {
  __typename?: 'LogEventRefers_toRelationship';
  cursor: Scalars['String'];
  node: WateringTask;
};

export type LogEventRefers_ToUpdateConnectionInput = {
  node?: InputMaybe<WateringTaskUpdateInput>;
};

export type LogEventRefers_ToUpdateFieldInput = {
  connect?: InputMaybe<Array<LogEventRefers_ToConnectFieldInput>>;
  create?: InputMaybe<Array<LogEventRefers_ToCreateFieldInput>>;
  delete?: InputMaybe<Array<LogEventRefers_ToDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<LogEventRefers_ToDisconnectFieldInput>>;
  update?: InputMaybe<LogEventRefers_ToUpdateConnectionInput>;
  where?: InputMaybe<LogEventRefers_ToConnectionWhere>;
};

export type LogEventRelationInput = {
  refers_to?: InputMaybe<Array<LogEventRefers_ToCreateFieldInput>>;
  triggered_by?: InputMaybe<Array<LogEventTriggered_ByCreateFieldInput>>;
};

/** Fields to sort LogEvents by. The order in which sorts are applied is not guaranteed when specifying many fields in one LogEventSort object. */
export type LogEventSort = {
  _id?: InputMaybe<SortDirection>;
  date?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
  neo4jImportId?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type LogEventTriggered_ByAggregateInput = {
  AND?: InputMaybe<Array<LogEventTriggered_ByAggregateInput>>;
  OR?: InputMaybe<Array<LogEventTriggered_ByAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<LogEventTriggered_ByNodeAggregationWhereInput>;
};

export type LogEventTriggered_ByConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>;
  where?: InputMaybe<UserConnectWhere>;
};

export type LogEventTriggered_ByConnection = {
  __typename?: 'LogEventTriggered_byConnection';
  edges: Array<LogEventTriggered_ByRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LogEventTriggered_ByConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type LogEventTriggered_ByConnectionWhere = {
  AND?: InputMaybe<Array<LogEventTriggered_ByConnectionWhere>>;
  OR?: InputMaybe<Array<LogEventTriggered_ByConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
};

export type LogEventTriggered_ByCreateFieldInput = {
  node: UserCreateInput;
};

export type LogEventTriggered_ByDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<LogEventTriggered_ByConnectionWhere>;
};

export type LogEventTriggered_ByDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<LogEventTriggered_ByConnectionWhere>;
};

export type LogEventTriggered_ByFieldInput = {
  connect?: InputMaybe<Array<LogEventTriggered_ByConnectFieldInput>>;
  create?: InputMaybe<Array<LogEventTriggered_ByCreateFieldInput>>;
};

export type LogEventTriggered_ByNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LogEventTriggered_ByNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<LogEventTriggered_ByNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  id_EQUAL?: InputMaybe<Scalars['String']>;
  id_GT?: InputMaybe<Scalars['Int']>;
  id_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  id_LT?: InputMaybe<Scalars['Int']>;
  id_LTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type LogEventTriggered_ByRelationship = {
  __typename?: 'LogEventTriggered_byRelationship';
  cursor: Scalars['String'];
  node: User;
};

export type LogEventTriggered_ByUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type LogEventTriggered_ByUpdateFieldInput = {
  connect?: InputMaybe<Array<LogEventTriggered_ByConnectFieldInput>>;
  create?: InputMaybe<Array<LogEventTriggered_ByCreateFieldInput>>;
  delete?: InputMaybe<Array<LogEventTriggered_ByDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<LogEventTriggered_ByDisconnectFieldInput>>;
  update?: InputMaybe<LogEventTriggered_ByUpdateConnectionInput>;
  where?: InputMaybe<LogEventTriggered_ByConnectionWhere>;
};

export type LogEventUpdateInput = {
  _id?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  neo4jImportId?: InputMaybe<Scalars['String']>;
  refers_to?: InputMaybe<Array<LogEventRefers_ToUpdateFieldInput>>;
  triggered_by?: InputMaybe<Array<LogEventTriggered_ByUpdateFieldInput>>;
  type?: InputMaybe<Scalars['String']>;
};

export type LogEventUserTriggered_ByAggregationSelection = {
  __typename?: 'LogEventUserTriggered_byAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<LogEventUserTriggered_ByNodeAggregateSelection>;
};

export type LogEventUserTriggered_ByNodeAggregateSelection = {
  __typename?: 'LogEventUserTriggered_byNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  id: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type LogEventWateringTaskRefers_ToAggregationSelection = {
  __typename?: 'LogEventWateringTaskRefers_toAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<LogEventWateringTaskRefers_ToNodeAggregateSelection>;
};

export type LogEventWateringTaskRefers_ToNodeAggregateSelection = {
  __typename?: 'LogEventWateringTaskRefers_toNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type LogEventWhere = {
  AND?: InputMaybe<Array<LogEventWhere>>;
  OR?: InputMaybe<Array<LogEventWhere>>;
  _id?: InputMaybe<Scalars['ID']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT?: InputMaybe<Scalars['ID']>;
  _id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  date?: InputMaybe<Scalars['String']>;
  date_CONTAINS?: InputMaybe<Scalars['String']>;
  date_ENDS_WITH?: InputMaybe<Scalars['String']>;
  date_IN?: InputMaybe<Array<Scalars['String']>>;
  date_NOT?: InputMaybe<Scalars['String']>;
  date_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  date_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  date_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  date_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  date_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId?: InputMaybe<Scalars['String']>;
  neo4jImportId_CONTAINS?: InputMaybe<Scalars['String']>;
  neo4jImportId_ENDS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_IN?: InputMaybe<Array<Scalars['String']>>;
  neo4jImportId_NOT?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  neo4jImportId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_STARTS_WITH?: InputMaybe<Scalars['String']>;
  refers_toAggregate?: InputMaybe<LogEventRefers_ToAggregateInput>;
  refers_toConnection_ALL?: InputMaybe<LogEventRefers_ToConnectionWhere>;
  refers_toConnection_NONE?: InputMaybe<LogEventRefers_ToConnectionWhere>;
  refers_toConnection_SINGLE?: InputMaybe<LogEventRefers_ToConnectionWhere>;
  refers_toConnection_SOME?: InputMaybe<LogEventRefers_ToConnectionWhere>;
  /** Return LogEvents where all of the related WateringTasks match this filter */
  refers_to_ALL?: InputMaybe<WateringTaskWhere>;
  /** Return LogEvents where none of the related WateringTasks match this filter */
  refers_to_NONE?: InputMaybe<WateringTaskWhere>;
  /** Return LogEvents where one of the related WateringTasks match this filter */
  refers_to_SINGLE?: InputMaybe<WateringTaskWhere>;
  /** Return LogEvents where some of the related WateringTasks match this filter */
  refers_to_SOME?: InputMaybe<WateringTaskWhere>;
  triggered_byAggregate?: InputMaybe<LogEventTriggered_ByAggregateInput>;
  triggered_byConnection_ALL?: InputMaybe<LogEventTriggered_ByConnectionWhere>;
  triggered_byConnection_NONE?: InputMaybe<LogEventTriggered_ByConnectionWhere>;
  triggered_byConnection_SINGLE?: InputMaybe<LogEventTriggered_ByConnectionWhere>;
  triggered_byConnection_SOME?: InputMaybe<LogEventTriggered_ByConnectionWhere>;
  /** Return LogEvents where all of the related Users match this filter */
  triggered_by_ALL?: InputMaybe<UserWhere>;
  /** Return LogEvents where none of the related Users match this filter */
  triggered_by_NONE?: InputMaybe<UserWhere>;
  /** Return LogEvents where one of the related Users match this filter */
  triggered_by_SINGLE?: InputMaybe<UserWhere>;
  /** Return LogEvents where some of the related Users match this filter */
  triggered_by_SOME?: InputMaybe<UserWhere>;
  type?: InputMaybe<Scalars['String']>;
  type_CONTAINS?: InputMaybe<Scalars['String']>;
  type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_IN?: InputMaybe<Array<Scalars['String']>>;
  type_NOT?: InputMaybe<Scalars['String']>;
  type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type LogEventsConnection = {
  __typename?: 'LogEventsConnection';
  edges: Array<LogEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MarkerShape = GeoShape & {
  __typename?: 'MarkerShape';
  belongs_to: Array<GardenLayer>;
  belongs_toAggregate?: Maybe<MarkerShapeGardenLayerBelongs_ToAggregationSelection>;
  belongs_toConnection: GeoShapeBelongs_ToConnection;
  feature?: Maybe<GardenFeature>;
  featureAggregate?: Maybe<MarkerShapeGardenFeatureFeatureAggregationSelection>;
  featureConnection: GeoShapeFeatureConnection;
  icon: Scalars['String'];
  point: Point;
  points: Array<Maybe<Point>>;
  shapeId: Scalars['ID'];
};


export type MarkerShapeBelongs_ToArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenLayerOptions>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type MarkerShapeBelongs_ToAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type MarkerShapeBelongs_ToConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GeoShapeBelongs_ToConnectionSort>>;
  where?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
};


export type MarkerShapeFeatureArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenFeatureOptions>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type MarkerShapeFeatureAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type MarkerShapeFeatureConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GeoShapeFeatureConnectionSort>>;
  where?: InputMaybe<GeoShapeFeatureConnectionWhere>;
};

export type MarkerShapeAggregateSelection = {
  __typename?: 'MarkerShapeAggregateSelection';
  count: Scalars['Int'];
  icon: StringAggregateSelectionNonNullable;
  shapeId: IdAggregateSelectionNonNullable;
};

export type MarkerShapeBelongs_ToAggregateInput = {
  AND?: InputMaybe<Array<MarkerShapeBelongs_ToAggregateInput>>;
  OR?: InputMaybe<Array<MarkerShapeBelongs_ToAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<MarkerShapeBelongs_ToNodeAggregationWhereInput>;
};

export type MarkerShapeBelongs_ToNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MarkerShapeBelongs_ToNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<MarkerShapeBelongs_ToNodeAggregationWhereInput>>;
  layerId_EQUAL?: InputMaybe<Scalars['ID']>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  name_EQUAL?: InputMaybe<Scalars['String']>;
  name_GT?: InputMaybe<Scalars['Int']>;
  name_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  name_LT?: InputMaybe<Scalars['Int']>;
  name_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type MarkerShapeConnectInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToConnectFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureConnectFieldInput>;
};

export type MarkerShapeConnectOrCreateInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToConnectOrCreateFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureConnectOrCreateFieldInput>;
};

export type MarkerShapeCreateInput = {
  belongs_to?: InputMaybe<GeoShapeBelongs_ToFieldInput>;
  feature?: InputMaybe<GeoShapeFeatureFieldInput>;
  icon: Scalars['String'];
  point: PointInput;
  points: Array<InputMaybe<PointInput>>;
};

export type MarkerShapeDeleteInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToDeleteFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureDeleteFieldInput>;
};

export type MarkerShapeDisconnectInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToDisconnectFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureDisconnectFieldInput>;
};

export type MarkerShapeEdge = {
  __typename?: 'MarkerShapeEdge';
  cursor: Scalars['String'];
  node: MarkerShape;
};

export type MarkerShapeFeatureAggregateInput = {
  AND?: InputMaybe<Array<MarkerShapeFeatureAggregateInput>>;
  OR?: InputMaybe<Array<MarkerShapeFeatureAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<MarkerShapeFeatureNodeAggregationWhereInput>;
};

export type MarkerShapeFeatureNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MarkerShapeFeatureNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<MarkerShapeFeatureNodeAggregationWhereInput>>;
  featureId_EQUAL?: InputMaybe<Scalars['ID']>;
  featureType_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  featureType_EQUAL?: InputMaybe<Scalars['String']>;
  featureType_GT?: InputMaybe<Scalars['Int']>;
  featureType_GTE?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  featureType_LT?: InputMaybe<Scalars['Int']>;
  featureType_LTE?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type MarkerShapeGardenFeatureFeatureAggregationSelection = {
  __typename?: 'MarkerShapeGardenFeatureFeatureAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<MarkerShapeGardenFeatureFeatureNodeAggregateSelection>;
};

export type MarkerShapeGardenFeatureFeatureNodeAggregateSelection = {
  __typename?: 'MarkerShapeGardenFeatureFeatureNodeAggregateSelection';
  featureId: IdAggregateSelectionNonNullable;
  featureType: StringAggregateSelectionNonNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type MarkerShapeGardenLayerBelongs_ToAggregationSelection = {
  __typename?: 'MarkerShapeGardenLayerBelongs_toAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<MarkerShapeGardenLayerBelongs_ToNodeAggregateSelection>;
};

export type MarkerShapeGardenLayerBelongs_ToNodeAggregateSelection = {
  __typename?: 'MarkerShapeGardenLayerBelongs_toNodeAggregateSelection';
  layerId: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type MarkerShapeOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more MarkerShapeSort objects to sort MarkerShapes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<MarkerShapeSort>>;
};

export type MarkerShapeRelationInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToCreateFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureCreateFieldInput>;
};

/** Fields to sort MarkerShapes by. The order in which sorts are applied is not guaranteed when specifying many fields in one MarkerShapeSort object. */
export type MarkerShapeSort = {
  icon?: InputMaybe<SortDirection>;
  point?: InputMaybe<SortDirection>;
  shapeId?: InputMaybe<SortDirection>;
};

export type MarkerShapeUpdateInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToUpdateFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureUpdateFieldInput>;
  icon?: InputMaybe<Scalars['String']>;
  point?: InputMaybe<PointInput>;
  points?: InputMaybe<Array<InputMaybe<PointInput>>>;
  points_POP?: InputMaybe<Scalars['Int']>;
  points_PUSH?: InputMaybe<Array<InputMaybe<PointInput>>>;
};

export type MarkerShapeWhere = {
  AND?: InputMaybe<Array<MarkerShapeWhere>>;
  OR?: InputMaybe<Array<MarkerShapeWhere>>;
  belongs_toAggregate?: InputMaybe<MarkerShapeBelongs_ToAggregateInput>;
  belongs_toConnection_ALL?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_NONE?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_SINGLE?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_SOME?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  /** Return MarkerShapes where all of the related GardenLayers match this filter */
  belongs_to_ALL?: InputMaybe<GardenLayerWhere>;
  /** Return MarkerShapes where none of the related GardenLayers match this filter */
  belongs_to_NONE?: InputMaybe<GardenLayerWhere>;
  /** Return MarkerShapes where one of the related GardenLayers match this filter */
  belongs_to_SINGLE?: InputMaybe<GardenLayerWhere>;
  /** Return MarkerShapes where some of the related GardenLayers match this filter */
  belongs_to_SOME?: InputMaybe<GardenLayerWhere>;
  feature?: InputMaybe<GardenFeatureWhere>;
  featureAggregate?: InputMaybe<MarkerShapeFeatureAggregateInput>;
  featureConnection?: InputMaybe<GeoShapeFeatureConnectionWhere>;
  featureConnection_NOT?: InputMaybe<GeoShapeFeatureConnectionWhere>;
  feature_NOT?: InputMaybe<GardenFeatureWhere>;
  icon?: InputMaybe<Scalars['String']>;
  icon_CONTAINS?: InputMaybe<Scalars['String']>;
  icon_ENDS_WITH?: InputMaybe<Scalars['String']>;
  icon_IN?: InputMaybe<Array<Scalars['String']>>;
  icon_NOT?: InputMaybe<Scalars['String']>;
  icon_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  icon_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  icon_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  icon_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  icon_STARTS_WITH?: InputMaybe<Scalars['String']>;
  point?: InputMaybe<PointInput>;
  point_DISTANCE?: InputMaybe<PointDistance>;
  point_GT?: InputMaybe<PointDistance>;
  point_GTE?: InputMaybe<PointDistance>;
  point_IN?: InputMaybe<Array<PointInput>>;
  point_LT?: InputMaybe<PointDistance>;
  point_LTE?: InputMaybe<PointDistance>;
  point_NOT?: InputMaybe<PointInput>;
  point_NOT_IN?: InputMaybe<Array<PointInput>>;
  points?: InputMaybe<Array<InputMaybe<PointInput>>>;
  points_INCLUDES?: InputMaybe<PointInput>;
  points_NOT?: InputMaybe<Array<InputMaybe<PointInput>>>;
  points_NOT_INCLUDES?: InputMaybe<PointInput>;
  shapeId?: InputMaybe<Scalars['ID']>;
  shapeId_CONTAINS?: InputMaybe<Scalars['ID']>;
  shapeId_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_IN?: InputMaybe<Array<Scalars['ID']>>;
  shapeId_NOT?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  shapeId_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_STARTS_WITH?: InputMaybe<Scalars['ID']>;
};

export type MarkerShapesConnection = {
  __typename?: 'MarkerShapesConnection';
  edges: Array<MarkerShapeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAssignment?: Maybe<Scalars['Boolean']>;
  createCategories: CreateCategoriesMutationResponse;
  createChangeRequests: CreateChangeRequestsMutationResponse;
  createContainers: CreateContainersMutationResponse;
  createGardenFeatures: CreateGardenFeaturesMutationResponse;
  createGardenLayers: CreateGardenLayersMutationResponse;
  createGardenSettings: CreateGardenSettingsMutationResponse;
  createGardens: CreateGardensMutationResponse;
  createLogEvents: CreateLogEventsMutationResponse;
  createMarkerShapes: CreateMarkerShapesMutationResponse;
  createPlantSpecies: CreatePlantSpeciesMutationResponse;
  createPlantVarieties: CreatePlantVarietiesMutationResponse;
  createPolygonShapes: CreatePolygonShapesMutationResponse;
  createSeeds: CreateSeedsMutationResponse;
  createUserSettings: CreateUserSettingsMutationResponse;
  createUsers: CreateUsersMutationResponse;
  createWateringPeriods: CreateWateringPeriodsMutationResponse;
  createWateringTasks: CreateWateringTasksMutationResponse;
  deleteCategories: DeleteInfo;
  deleteChangeRequests: DeleteInfo;
  deleteContainers: DeleteInfo;
  deleteGardenFeatures: DeleteInfo;
  deleteGardenLayers: DeleteInfo;
  deleteGardenSettings: DeleteInfo;
  deleteGardens: DeleteInfo;
  deleteLogEvents: DeleteInfo;
  deleteMarkerShapes: DeleteInfo;
  deletePlantSpecies: DeleteInfo;
  deletePlantVarieties: DeleteInfo;
  deletePolygonShapes: DeleteInfo;
  deleteSeeds: DeleteInfo;
  deleteUserSettings: DeleteInfo;
  deleteUsers: DeleteInfo;
  deleteWateringPeriods: DeleteInfo;
  deleteWateringTasks: DeleteInfo;
  mergeGardenSettings?: Maybe<Scalars['JSON']>;
  ownMergeUserSettings?: Maybe<UserSettings>;
  planWateringPeriods?: Maybe<Scalars['JSON']>;
  publishToAll?: Maybe<Scalars['Boolean']>;
  pushSubscribe?: Maybe<Scalars['Boolean']>;
  removeAssignment?: Maybe<Scalars['Boolean']>;
  seedAvailabilitiesFromTests?: Maybe<Scalars['Boolean']>;
  seedNeo4jFromJSON?: Maybe<Scalars['Boolean']>;
  sendWelcomeMail?: Maybe<Scalars['Boolean']>;
  setUserAvailability?: Maybe<Scalars['Boolean']>;
  updateCategories: UpdateCategoriesMutationResponse;
  updateChangeRequests: UpdateChangeRequestsMutationResponse;
  updateContainers: UpdateContainersMutationResponse;
  updateGardenFeatures: UpdateGardenFeaturesMutationResponse;
  updateGardenLayers: UpdateGardenLayersMutationResponse;
  updateGardenSettings: UpdateGardenSettingsMutationResponse;
  updateGardens: UpdateGardensMutationResponse;
  updateLogEvents: UpdateLogEventsMutationResponse;
  updateMarkerShapes: UpdateMarkerShapesMutationResponse;
  updatePlantSpecies: UpdatePlantSpeciesMutationResponse;
  updatePlantVarieties: UpdatePlantVarietiesMutationResponse;
  updatePolygonShapes: UpdatePolygonShapesMutationResponse;
  updateSeeds: UpdateSeedsMutationResponse;
  updateUserSettings: UpdateUserSettingsMutationResponse;
  updateUsers: UpdateUsersMutationResponse;
  updateWateringPeriods: UpdateWateringPeriodsMutationResponse;
  updateWateringTasks: UpdateWateringTasksMutationResponse;
};


export type MutationAddAssignmentArgs = {
  date: Scalars['Date'];
  gardenId: Scalars['ID'];
};


export type MutationCreateCategoriesArgs = {
  input: Array<CategoryCreateInput>;
};


export type MutationCreateChangeRequestsArgs = {
  input: Array<ChangeRequestCreateInput>;
};


export type MutationCreateContainersArgs = {
  input: Array<ContainerCreateInput>;
};


export type MutationCreateGardenFeaturesArgs = {
  input: Array<GardenFeatureCreateInput>;
};


export type MutationCreateGardenLayersArgs = {
  input: Array<GardenLayerCreateInput>;
};


export type MutationCreateGardenSettingsArgs = {
  input: Array<GardenSettingsCreateInput>;
};


export type MutationCreateGardensArgs = {
  input: Array<GardenCreateInput>;
};


export type MutationCreateLogEventsArgs = {
  input: Array<LogEventCreateInput>;
};


export type MutationCreateMarkerShapesArgs = {
  input: Array<MarkerShapeCreateInput>;
};


export type MutationCreatePlantSpeciesArgs = {
  input: Array<PlantSpeciesCreateInput>;
};


export type MutationCreatePlantVarietiesArgs = {
  input: Array<PlantVarietyCreateInput>;
};


export type MutationCreatePolygonShapesArgs = {
  input: Array<PolygonShapeCreateInput>;
};


export type MutationCreateSeedsArgs = {
  input: Array<SeedCreateInput>;
};


export type MutationCreateUserSettingsArgs = {
  input: Array<UserSettingsCreateInput>;
};


export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};


export type MutationCreateWateringPeriodsArgs = {
  input: Array<WateringPeriodCreateInput>;
};


export type MutationCreateWateringTasksArgs = {
  input: Array<WateringTaskCreateInput>;
};


export type MutationDeleteCategoriesArgs = {
  delete?: InputMaybe<CategoryDeleteInput>;
  where?: InputMaybe<CategoryWhere>;
};


export type MutationDeleteChangeRequestsArgs = {
  delete?: InputMaybe<ChangeRequestDeleteInput>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type MutationDeleteContainersArgs = {
  delete?: InputMaybe<ContainerDeleteInput>;
  where?: InputMaybe<ContainerWhere>;
};


export type MutationDeleteGardenFeaturesArgs = {
  delete?: InputMaybe<GardenFeatureDeleteInput>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type MutationDeleteGardenLayersArgs = {
  delete?: InputMaybe<GardenLayerDeleteInput>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type MutationDeleteGardenSettingsArgs = {
  delete?: InputMaybe<GardenSettingsDeleteInput>;
  where?: InputMaybe<GardenSettingsWhere>;
};


export type MutationDeleteGardensArgs = {
  delete?: InputMaybe<GardenDeleteInput>;
  where?: InputMaybe<GardenWhere>;
};


export type MutationDeleteLogEventsArgs = {
  delete?: InputMaybe<LogEventDeleteInput>;
  where?: InputMaybe<LogEventWhere>;
};


export type MutationDeleteMarkerShapesArgs = {
  delete?: InputMaybe<MarkerShapeDeleteInput>;
  where?: InputMaybe<MarkerShapeWhere>;
};


export type MutationDeletePlantSpeciesArgs = {
  delete?: InputMaybe<PlantSpeciesDeleteInput>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type MutationDeletePlantVarietiesArgs = {
  delete?: InputMaybe<PlantVarietyDeleteInput>;
  where?: InputMaybe<PlantVarietyWhere>;
};


export type MutationDeletePolygonShapesArgs = {
  delete?: InputMaybe<PolygonShapeDeleteInput>;
  where?: InputMaybe<PolygonShapeWhere>;
};


export type MutationDeleteSeedsArgs = {
  delete?: InputMaybe<SeedDeleteInput>;
  where?: InputMaybe<SeedWhere>;
};


export type MutationDeleteUserSettingsArgs = {
  where?: InputMaybe<UserSettingsWhere>;
};


export type MutationDeleteUsersArgs = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<UserWhere>;
};


export type MutationDeleteWateringPeriodsArgs = {
  delete?: InputMaybe<WateringPeriodDeleteInput>;
  where?: InputMaybe<WateringPeriodWhere>;
};


export type MutationDeleteWateringTasksArgs = {
  delete?: InputMaybe<WateringTaskDeleteInput>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type MutationMergeGardenSettingsArgs = {
  settings?: InputMaybe<GardenSettingsInput>;
};


export type MutationOwnMergeUserSettingsArgs = {
  settings?: InputMaybe<UserSettingsInput>;
};


export type MutationPlanWateringPeriodsArgs = {
  gardenId: Scalars['ID'];
  period_length?: InputMaybe<Scalars['Int']>;
  periods_predefined?: InputMaybe<Scalars['Int']>;
  planning_ahead?: InputMaybe<Scalars['Int']>;
};


export type MutationPublishToAllArgs = {
  message?: InputMaybe<PushMessageInput>;
};


export type MutationPushSubscribeArgs = {
  subscription?: InputMaybe<PushSubscriptionInput>;
};


export type MutationRemoveAssignmentArgs = {
  date: Scalars['Date'];
  gardenId: Scalars['ID'];
};


export type MutationSetUserAvailabilityArgs = {
  dates: Array<Scalars['Date']>;
  from?: InputMaybe<Scalars['Date']>;
  gardenId: Scalars['ID'];
  till?: InputMaybe<Scalars['Date']>;
};


export type MutationUpdateCategoriesArgs = {
  connect?: InputMaybe<CategoryConnectInput>;
  create?: InputMaybe<CategoryRelationInput>;
  delete?: InputMaybe<CategoryDeleteInput>;
  disconnect?: InputMaybe<CategoryDisconnectInput>;
  update?: InputMaybe<CategoryUpdateInput>;
  where?: InputMaybe<CategoryWhere>;
};


export type MutationUpdateChangeRequestsArgs = {
  connect?: InputMaybe<ChangeRequestConnectInput>;
  create?: InputMaybe<ChangeRequestRelationInput>;
  delete?: InputMaybe<ChangeRequestDeleteInput>;
  disconnect?: InputMaybe<ChangeRequestDisconnectInput>;
  update?: InputMaybe<ChangeRequestUpdateInput>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type MutationUpdateContainersArgs = {
  connect?: InputMaybe<ContainerConnectInput>;
  connectOrCreate?: InputMaybe<ContainerConnectOrCreateInput>;
  create?: InputMaybe<ContainerRelationInput>;
  delete?: InputMaybe<ContainerDeleteInput>;
  disconnect?: InputMaybe<ContainerDisconnectInput>;
  update?: InputMaybe<ContainerUpdateInput>;
  where?: InputMaybe<ContainerWhere>;
};


export type MutationUpdateGardenFeaturesArgs = {
  connect?: InputMaybe<GardenFeatureConnectInput>;
  create?: InputMaybe<GardenFeatureRelationInput>;
  delete?: InputMaybe<GardenFeatureDeleteInput>;
  disconnect?: InputMaybe<GardenFeatureDisconnectInput>;
  update?: InputMaybe<GardenFeatureUpdateInput>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type MutationUpdateGardenLayersArgs = {
  connect?: InputMaybe<GardenLayerConnectInput>;
  create?: InputMaybe<GardenLayerRelationInput>;
  delete?: InputMaybe<GardenLayerDeleteInput>;
  disconnect?: InputMaybe<GardenLayerDisconnectInput>;
  update?: InputMaybe<GardenLayerUpdateInput>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type MutationUpdateGardenSettingsArgs = {
  connect?: InputMaybe<GardenSettingsConnectInput>;
  create?: InputMaybe<GardenSettingsRelationInput>;
  delete?: InputMaybe<GardenSettingsDeleteInput>;
  disconnect?: InputMaybe<GardenSettingsDisconnectInput>;
  update?: InputMaybe<GardenSettingsUpdateInput>;
  where?: InputMaybe<GardenSettingsWhere>;
};


export type MutationUpdateGardensArgs = {
  connect?: InputMaybe<GardenConnectInput>;
  create?: InputMaybe<GardenRelationInput>;
  delete?: InputMaybe<GardenDeleteInput>;
  disconnect?: InputMaybe<GardenDisconnectInput>;
  update?: InputMaybe<GardenUpdateInput>;
  where?: InputMaybe<GardenWhere>;
};


export type MutationUpdateLogEventsArgs = {
  connect?: InputMaybe<LogEventConnectInput>;
  create?: InputMaybe<LogEventRelationInput>;
  delete?: InputMaybe<LogEventDeleteInput>;
  disconnect?: InputMaybe<LogEventDisconnectInput>;
  update?: InputMaybe<LogEventUpdateInput>;
  where?: InputMaybe<LogEventWhere>;
};


export type MutationUpdateMarkerShapesArgs = {
  connect?: InputMaybe<MarkerShapeConnectInput>;
  connectOrCreate?: InputMaybe<MarkerShapeConnectOrCreateInput>;
  create?: InputMaybe<MarkerShapeRelationInput>;
  delete?: InputMaybe<MarkerShapeDeleteInput>;
  disconnect?: InputMaybe<MarkerShapeDisconnectInput>;
  update?: InputMaybe<MarkerShapeUpdateInput>;
  where?: InputMaybe<MarkerShapeWhere>;
};


export type MutationUpdatePlantSpeciesArgs = {
  connect?: InputMaybe<PlantSpeciesConnectInput>;
  create?: InputMaybe<PlantSpeciesRelationInput>;
  delete?: InputMaybe<PlantSpeciesDeleteInput>;
  disconnect?: InputMaybe<PlantSpeciesDisconnectInput>;
  update?: InputMaybe<PlantSpeciesUpdateInput>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type MutationUpdatePlantVarietiesArgs = {
  connect?: InputMaybe<PlantVarietyConnectInput>;
  create?: InputMaybe<PlantVarietyRelationInput>;
  delete?: InputMaybe<PlantVarietyDeleteInput>;
  disconnect?: InputMaybe<PlantVarietyDisconnectInput>;
  update?: InputMaybe<PlantVarietyUpdateInput>;
  where?: InputMaybe<PlantVarietyWhere>;
};


export type MutationUpdatePolygonShapesArgs = {
  connect?: InputMaybe<PolygonShapeConnectInput>;
  connectOrCreate?: InputMaybe<PolygonShapeConnectOrCreateInput>;
  create?: InputMaybe<PolygonShapeRelationInput>;
  delete?: InputMaybe<PolygonShapeDeleteInput>;
  disconnect?: InputMaybe<PolygonShapeDisconnectInput>;
  update?: InputMaybe<PolygonShapeUpdateInput>;
  where?: InputMaybe<PolygonShapeWhere>;
};


export type MutationUpdateSeedsArgs = {
  connect?: InputMaybe<SeedConnectInput>;
  create?: InputMaybe<SeedRelationInput>;
  delete?: InputMaybe<SeedDeleteInput>;
  disconnect?: InputMaybe<SeedDisconnectInput>;
  update?: InputMaybe<SeedUpdateInput>;
  where?: InputMaybe<SeedWhere>;
};


export type MutationUpdateUserSettingsArgs = {
  update?: InputMaybe<UserSettingsUpdateInput>;
  where?: InputMaybe<UserSettingsWhere>;
};


export type MutationUpdateUsersArgs = {
  connect?: InputMaybe<UserConnectInput>;
  create?: InputMaybe<UserRelationInput>;
  delete?: InputMaybe<UserDeleteInput>;
  disconnect?: InputMaybe<UserDisconnectInput>;
  update?: InputMaybe<UserUpdateInput>;
  where?: InputMaybe<UserWhere>;
};


export type MutationUpdateWateringPeriodsArgs = {
  connect?: InputMaybe<WateringPeriodConnectInput>;
  create?: InputMaybe<WateringPeriodRelationInput>;
  delete?: InputMaybe<WateringPeriodDeleteInput>;
  disconnect?: InputMaybe<WateringPeriodDisconnectInput>;
  update?: InputMaybe<WateringPeriodUpdateInput>;
  where?: InputMaybe<WateringPeriodWhere>;
};


export type MutationUpdateWateringTasksArgs = {
  connect?: InputMaybe<WateringTaskConnectInput>;
  create?: InputMaybe<WateringTaskRelationInput>;
  delete?: InputMaybe<WateringTaskDeleteInput>;
  disconnect?: InputMaybe<WateringTaskDisconnectInput>;
  update?: InputMaybe<WateringTaskUpdateInput>;
  where?: InputMaybe<WateringTaskWhere>;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PlantSpecies = {
  __typename?: 'PlantSpecies';
  categories: Array<Category>;
  categoriesAggregate?: Maybe<PlantSpeciesCategoryCategoriesAggregationSelection>;
  categoriesConnection: PlantSpeciesCategoriesConnection;
  cropRotationFactor: Array<PlantSpecies>;
  cropRotationFactorAggregate?: Maybe<PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection>;
  cropRotationFactorConnection: PlantSpeciesCropRotationFactorConnection;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  infoText?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  positiveNeighborhood: Array<PlantSpecies>;
  positiveNeighborhoodAggregate?: Maybe<PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection>;
  positiveNeighborhoodConnection: PlantSpeciesPositiveNeighborhoodConnection;
  varieties: Array<PlantVariety>;
  varietiesAggregate?: Maybe<PlantSpeciesPlantVarietyVarietiesAggregationSelection>;
  varietiesConnection: PlantSpeciesVarietiesConnection;
};


export type PlantSpeciesCategoriesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<CategoryOptions>;
  where?: InputMaybe<CategoryWhere>;
};


export type PlantSpeciesCategoriesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<CategoryWhere>;
};


export type PlantSpeciesCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<PlantSpeciesCategoriesConnectionSort>>;
  where?: InputMaybe<PlantSpeciesCategoriesConnectionWhere>;
};


export type PlantSpeciesCropRotationFactorArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<PlantSpeciesOptions>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type PlantSpeciesCropRotationFactorAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type PlantSpeciesCropRotationFactorConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<PlantSpeciesCropRotationFactorConnectionSort>>;
  where?: InputMaybe<PlantSpeciesCropRotationFactorConnectionWhere>;
};


export type PlantSpeciesPositiveNeighborhoodArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<PlantSpeciesOptions>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type PlantSpeciesPositiveNeighborhoodAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type PlantSpeciesPositiveNeighborhoodConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodConnectionSort>>;
  where?: InputMaybe<PlantSpeciesPositiveNeighborhoodConnectionWhere>;
};


export type PlantSpeciesVarietiesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<PlantVarietyOptions>;
  where?: InputMaybe<PlantVarietyWhere>;
};


export type PlantSpeciesVarietiesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<PlantVarietyWhere>;
};


export type PlantSpeciesVarietiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<PlantSpeciesVarietiesConnectionSort>>;
  where?: InputMaybe<PlantSpeciesVarietiesConnectionWhere>;
};

export type PlantSpeciesAggregateSelection = {
  __typename?: 'PlantSpeciesAggregateSelection';
  count: Scalars['Int'];
  description: StringAggregateSelectionNullable;
  icon: StringAggregateSelectionNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type PlantSpeciesCategoriesAggregateInput = {
  AND?: InputMaybe<Array<PlantSpeciesCategoriesAggregateInput>>;
  OR?: InputMaybe<Array<PlantSpeciesCategoriesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<PlantSpeciesCategoriesNodeAggregationWhereInput>;
};

export type PlantSpeciesCategoriesConnectFieldInput = {
  connect?: InputMaybe<Array<CategoryConnectInput>>;
  where?: InputMaybe<CategoryConnectWhere>;
};

export type PlantSpeciesCategoriesConnection = {
  __typename?: 'PlantSpeciesCategoriesConnection';
  edges: Array<PlantSpeciesCategoriesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PlantSpeciesCategoriesConnectionSort = {
  node?: InputMaybe<CategorySort>;
};

export type PlantSpeciesCategoriesConnectionWhere = {
  AND?: InputMaybe<Array<PlantSpeciesCategoriesConnectionWhere>>;
  OR?: InputMaybe<Array<PlantSpeciesCategoriesConnectionWhere>>;
  node?: InputMaybe<CategoryWhere>;
  node_NOT?: InputMaybe<CategoryWhere>;
};

export type PlantSpeciesCategoriesCreateFieldInput = {
  node: CategoryCreateInput;
};

export type PlantSpeciesCategoriesDeleteFieldInput = {
  delete?: InputMaybe<CategoryDeleteInput>;
  where?: InputMaybe<PlantSpeciesCategoriesConnectionWhere>;
};

export type PlantSpeciesCategoriesDisconnectFieldInput = {
  disconnect?: InputMaybe<CategoryDisconnectInput>;
  where?: InputMaybe<PlantSpeciesCategoriesConnectionWhere>;
};

export type PlantSpeciesCategoriesFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<PlantSpeciesCategoriesCreateFieldInput>>;
};

export type PlantSpeciesCategoriesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PlantSpeciesCategoriesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PlantSpeciesCategoriesNodeAggregationWhereInput>>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  description_EQUAL?: InputMaybe<Scalars['String']>;
  description_GT?: InputMaybe<Scalars['Int']>;
  description_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  description_LT?: InputMaybe<Scalars['Int']>;
  description_LTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type PlantSpeciesCategoriesRelationship = {
  __typename?: 'PlantSpeciesCategoriesRelationship';
  cursor: Scalars['String'];
  node: Category;
};

export type PlantSpeciesCategoriesUpdateConnectionInput = {
  node?: InputMaybe<CategoryUpdateInput>;
};

export type PlantSpeciesCategoriesUpdateFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<PlantSpeciesCategoriesCreateFieldInput>>;
  delete?: InputMaybe<Array<PlantSpeciesCategoriesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<PlantSpeciesCategoriesDisconnectFieldInput>>;
  update?: InputMaybe<PlantSpeciesCategoriesUpdateConnectionInput>;
  where?: InputMaybe<PlantSpeciesCategoriesConnectionWhere>;
};

export type PlantSpeciesCategoryCategoriesAggregationSelection = {
  __typename?: 'PlantSpeciesCategoryCategoriesAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<PlantSpeciesCategoryCategoriesNodeAggregateSelection>;
};

export type PlantSpeciesCategoryCategoriesNodeAggregateSelection = {
  __typename?: 'PlantSpeciesCategoryCategoriesNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type PlantSpeciesConnectInput = {
  categories?: InputMaybe<Array<PlantSpeciesCategoriesConnectFieldInput>>;
  cropRotationFactor?: InputMaybe<Array<PlantSpeciesCropRotationFactorConnectFieldInput>>;
  positiveNeighborhood?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodConnectFieldInput>>;
  varieties?: InputMaybe<Array<PlantSpeciesVarietiesConnectFieldInput>>;
};

export type PlantSpeciesConnectWhere = {
  node: PlantSpeciesWhere;
};

export type PlantSpeciesConnection = {
  __typename?: 'PlantSpeciesConnection';
  edges: Array<PlantSpeciesEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PlantSpeciesCreateInput = {
  categories?: InputMaybe<PlantSpeciesCategoriesFieldInput>;
  cropRotationFactor?: InputMaybe<PlantSpeciesCropRotationFactorFieldInput>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  infoText?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  positiveNeighborhood?: InputMaybe<PlantSpeciesPositiveNeighborhoodFieldInput>;
  varieties?: InputMaybe<PlantSpeciesVarietiesFieldInput>;
};

export type PlantSpeciesCropRotationFactorAggregateInput = {
  AND?: InputMaybe<Array<PlantSpeciesCropRotationFactorAggregateInput>>;
  OR?: InputMaybe<Array<PlantSpeciesCropRotationFactorAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  edge?: InputMaybe<PlantSpeciesCropRotationFactorEdgeAggregationWhereInput>;
  node?: InputMaybe<PlantSpeciesCropRotationFactorNodeAggregationWhereInput>;
};

export type PlantSpeciesCropRotationFactorConnectFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesConnectInput>>;
  edge?: InputMaybe<CropRotationCreateInput>;
  where?: InputMaybe<PlantSpeciesConnectWhere>;
};

export type PlantSpeciesCropRotationFactorConnection = {
  __typename?: 'PlantSpeciesCropRotationFactorConnection';
  edges: Array<PlantSpeciesCropRotationFactorRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PlantSpeciesCropRotationFactorConnectionSort = {
  edge?: InputMaybe<CropRotationSort>;
  node?: InputMaybe<PlantSpeciesSort>;
};

export type PlantSpeciesCropRotationFactorConnectionWhere = {
  AND?: InputMaybe<Array<PlantSpeciesCropRotationFactorConnectionWhere>>;
  OR?: InputMaybe<Array<PlantSpeciesCropRotationFactorConnectionWhere>>;
  edge?: InputMaybe<CropRotationWhere>;
  edge_NOT?: InputMaybe<CropRotationWhere>;
  node?: InputMaybe<PlantSpeciesWhere>;
  node_NOT?: InputMaybe<PlantSpeciesWhere>;
};

export type PlantSpeciesCropRotationFactorCreateFieldInput = {
  edge?: InputMaybe<CropRotationCreateInput>;
  node: PlantSpeciesCreateInput;
};

export type PlantSpeciesCropRotationFactorDeleteFieldInput = {
  delete?: InputMaybe<PlantSpeciesDeleteInput>;
  where?: InputMaybe<PlantSpeciesCropRotationFactorConnectionWhere>;
};

export type PlantSpeciesCropRotationFactorDisconnectFieldInput = {
  disconnect?: InputMaybe<PlantSpeciesDisconnectInput>;
  where?: InputMaybe<PlantSpeciesCropRotationFactorConnectionWhere>;
};

export type PlantSpeciesCropRotationFactorEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<PlantSpeciesCropRotationFactorEdgeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PlantSpeciesCropRotationFactorEdgeAggregationWhereInput>>;
  weight_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  weight_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  weight_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  weight_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  weight_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  weight_EQUAL?: InputMaybe<Scalars['Int']>;
  weight_GT?: InputMaybe<Scalars['Int']>;
  weight_GTE?: InputMaybe<Scalars['Int']>;
  weight_LT?: InputMaybe<Scalars['Int']>;
  weight_LTE?: InputMaybe<Scalars['Int']>;
  weight_MAX_EQUAL?: InputMaybe<Scalars['Int']>;
  weight_MAX_GT?: InputMaybe<Scalars['Int']>;
  weight_MAX_GTE?: InputMaybe<Scalars['Int']>;
  weight_MAX_LT?: InputMaybe<Scalars['Int']>;
  weight_MAX_LTE?: InputMaybe<Scalars['Int']>;
  weight_MIN_EQUAL?: InputMaybe<Scalars['Int']>;
  weight_MIN_GT?: InputMaybe<Scalars['Int']>;
  weight_MIN_GTE?: InputMaybe<Scalars['Int']>;
  weight_MIN_LT?: InputMaybe<Scalars['Int']>;
  weight_MIN_LTE?: InputMaybe<Scalars['Int']>;
  weight_SUM_EQUAL?: InputMaybe<Scalars['Int']>;
  weight_SUM_GT?: InputMaybe<Scalars['Int']>;
  weight_SUM_GTE?: InputMaybe<Scalars['Int']>;
  weight_SUM_LT?: InputMaybe<Scalars['Int']>;
  weight_SUM_LTE?: InputMaybe<Scalars['Int']>;
};

export type PlantSpeciesCropRotationFactorFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesCropRotationFactorConnectFieldInput>>;
  create?: InputMaybe<Array<PlantSpeciesCropRotationFactorCreateFieldInput>>;
};

export type PlantSpeciesCropRotationFactorNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PlantSpeciesCropRotationFactorNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PlantSpeciesCropRotationFactorNodeAggregationWhereInput>>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  description_EQUAL?: InputMaybe<Scalars['String']>;
  description_GT?: InputMaybe<Scalars['Int']>;
  description_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  description_LT?: InputMaybe<Scalars['Int']>;
  description_LTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  icon_EQUAL?: InputMaybe<Scalars['String']>;
  icon_GT?: InputMaybe<Scalars['Int']>;
  icon_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_LT?: InputMaybe<Scalars['Int']>;
  icon_LTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type PlantSpeciesCropRotationFactorRelationship = CropRotation & {
  __typename?: 'PlantSpeciesCropRotationFactorRelationship';
  cursor: Scalars['String'];
  node: PlantSpecies;
  weight?: Maybe<Scalars['Int']>;
};

export type PlantSpeciesCropRotationFactorUpdateConnectionInput = {
  edge?: InputMaybe<CropRotationUpdateInput>;
  node?: InputMaybe<PlantSpeciesUpdateInput>;
};

export type PlantSpeciesCropRotationFactorUpdateFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesCropRotationFactorConnectFieldInput>>;
  create?: InputMaybe<Array<PlantSpeciesCropRotationFactorCreateFieldInput>>;
  delete?: InputMaybe<Array<PlantSpeciesCropRotationFactorDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<PlantSpeciesCropRotationFactorDisconnectFieldInput>>;
  update?: InputMaybe<PlantSpeciesCropRotationFactorUpdateConnectionInput>;
  where?: InputMaybe<PlantSpeciesCropRotationFactorConnectionWhere>;
};

export type PlantSpeciesDeleteInput = {
  categories?: InputMaybe<Array<PlantSpeciesCategoriesDeleteFieldInput>>;
  cropRotationFactor?: InputMaybe<Array<PlantSpeciesCropRotationFactorDeleteFieldInput>>;
  positiveNeighborhood?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodDeleteFieldInput>>;
  varieties?: InputMaybe<Array<PlantSpeciesVarietiesDeleteFieldInput>>;
};

export type PlantSpeciesDisconnectInput = {
  categories?: InputMaybe<Array<PlantSpeciesCategoriesDisconnectFieldInput>>;
  cropRotationFactor?: InputMaybe<Array<PlantSpeciesCropRotationFactorDisconnectFieldInput>>;
  positiveNeighborhood?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodDisconnectFieldInput>>;
  varieties?: InputMaybe<Array<PlantSpeciesVarietiesDisconnectFieldInput>>;
};

export type PlantSpeciesEdge = {
  __typename?: 'PlantSpeciesEdge';
  cursor: Scalars['String'];
  node: PlantSpecies;
};

export type PlantSpeciesOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more PlantSpeciesSort objects to sort PlantSpecies by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PlantSpeciesSort>>;
};

export type PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection = {
  __typename?: 'PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection';
  count: Scalars['Int'];
  edge?: Maybe<PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection>;
  node?: Maybe<PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection>;
};

export type PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection = {
  __typename?: 'PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection';
  weight: IntAggregateSelectionNullable;
};

export type PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection = {
  __typename?: 'PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  icon: StringAggregateSelectionNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection = {
  __typename?: 'PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection';
  count: Scalars['Int'];
  edge?: Maybe<PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection>;
  node?: Maybe<PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection>;
};

export type PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection = {
  __typename?: 'PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection';
  weight: IntAggregateSelectionNullable;
};

export type PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection = {
  __typename?: 'PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  icon: StringAggregateSelectionNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type PlantSpeciesPlantVarietyVarietiesAggregationSelection = {
  __typename?: 'PlantSpeciesPlantVarietyVarietiesAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection>;
};

export type PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection = {
  __typename?: 'PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  icon: StringAggregateSelectionNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type PlantSpeciesPositiveNeighborhoodAggregateInput = {
  AND?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodAggregateInput>>;
  OR?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  edge?: InputMaybe<PlantSpeciesPositiveNeighborhoodEdgeAggregationWhereInput>;
  node?: InputMaybe<PlantSpeciesPositiveNeighborhoodNodeAggregationWhereInput>;
};

export type PlantSpeciesPositiveNeighborhoodConnectFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesConnectInput>>;
  edge?: InputMaybe<PositiveNeighborhoodCreateInput>;
  where?: InputMaybe<PlantSpeciesConnectWhere>;
};

export type PlantSpeciesPositiveNeighborhoodConnection = {
  __typename?: 'PlantSpeciesPositiveNeighborhoodConnection';
  edges: Array<PlantSpeciesPositiveNeighborhoodRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PlantSpeciesPositiveNeighborhoodConnectionSort = {
  edge?: InputMaybe<PositiveNeighborhoodSort>;
  node?: InputMaybe<PlantSpeciesSort>;
};

export type PlantSpeciesPositiveNeighborhoodConnectionWhere = {
  AND?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodConnectionWhere>>;
  OR?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodConnectionWhere>>;
  edge?: InputMaybe<PositiveNeighborhoodWhere>;
  edge_NOT?: InputMaybe<PositiveNeighborhoodWhere>;
  node?: InputMaybe<PlantSpeciesWhere>;
  node_NOT?: InputMaybe<PlantSpeciesWhere>;
};

export type PlantSpeciesPositiveNeighborhoodCreateFieldInput = {
  edge?: InputMaybe<PositiveNeighborhoodCreateInput>;
  node: PlantSpeciesCreateInput;
};

export type PlantSpeciesPositiveNeighborhoodDeleteFieldInput = {
  delete?: InputMaybe<PlantSpeciesDeleteInput>;
  where?: InputMaybe<PlantSpeciesPositiveNeighborhoodConnectionWhere>;
};

export type PlantSpeciesPositiveNeighborhoodDisconnectFieldInput = {
  disconnect?: InputMaybe<PlantSpeciesDisconnectInput>;
  where?: InputMaybe<PlantSpeciesPositiveNeighborhoodConnectionWhere>;
};

export type PlantSpeciesPositiveNeighborhoodEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodEdgeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodEdgeAggregationWhereInput>>;
  weight_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  weight_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  weight_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  weight_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  weight_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  weight_EQUAL?: InputMaybe<Scalars['Int']>;
  weight_GT?: InputMaybe<Scalars['Int']>;
  weight_GTE?: InputMaybe<Scalars['Int']>;
  weight_LT?: InputMaybe<Scalars['Int']>;
  weight_LTE?: InputMaybe<Scalars['Int']>;
  weight_MAX_EQUAL?: InputMaybe<Scalars['Int']>;
  weight_MAX_GT?: InputMaybe<Scalars['Int']>;
  weight_MAX_GTE?: InputMaybe<Scalars['Int']>;
  weight_MAX_LT?: InputMaybe<Scalars['Int']>;
  weight_MAX_LTE?: InputMaybe<Scalars['Int']>;
  weight_MIN_EQUAL?: InputMaybe<Scalars['Int']>;
  weight_MIN_GT?: InputMaybe<Scalars['Int']>;
  weight_MIN_GTE?: InputMaybe<Scalars['Int']>;
  weight_MIN_LT?: InputMaybe<Scalars['Int']>;
  weight_MIN_LTE?: InputMaybe<Scalars['Int']>;
  weight_SUM_EQUAL?: InputMaybe<Scalars['Int']>;
  weight_SUM_GT?: InputMaybe<Scalars['Int']>;
  weight_SUM_GTE?: InputMaybe<Scalars['Int']>;
  weight_SUM_LT?: InputMaybe<Scalars['Int']>;
  weight_SUM_LTE?: InputMaybe<Scalars['Int']>;
};

export type PlantSpeciesPositiveNeighborhoodFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodConnectFieldInput>>;
  create?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodCreateFieldInput>>;
};

export type PlantSpeciesPositiveNeighborhoodNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodNodeAggregationWhereInput>>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  description_EQUAL?: InputMaybe<Scalars['String']>;
  description_GT?: InputMaybe<Scalars['Int']>;
  description_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  description_LT?: InputMaybe<Scalars['Int']>;
  description_LTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  icon_EQUAL?: InputMaybe<Scalars['String']>;
  icon_GT?: InputMaybe<Scalars['Int']>;
  icon_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_LT?: InputMaybe<Scalars['Int']>;
  icon_LTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type PlantSpeciesPositiveNeighborhoodRelationship = PositiveNeighborhood & {
  __typename?: 'PlantSpeciesPositiveNeighborhoodRelationship';
  cursor: Scalars['String'];
  node: PlantSpecies;
  weight?: Maybe<Scalars['Int']>;
};

export type PlantSpeciesPositiveNeighborhoodUpdateConnectionInput = {
  edge?: InputMaybe<PositiveNeighborhoodUpdateInput>;
  node?: InputMaybe<PlantSpeciesUpdateInput>;
};

export type PlantSpeciesPositiveNeighborhoodUpdateFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodConnectFieldInput>>;
  create?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodCreateFieldInput>>;
  delete?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodDisconnectFieldInput>>;
  update?: InputMaybe<PlantSpeciesPositiveNeighborhoodUpdateConnectionInput>;
  where?: InputMaybe<PlantSpeciesPositiveNeighborhoodConnectionWhere>;
};

export type PlantSpeciesRelationInput = {
  categories?: InputMaybe<Array<PlantSpeciesCategoriesCreateFieldInput>>;
  cropRotationFactor?: InputMaybe<Array<PlantSpeciesCropRotationFactorCreateFieldInput>>;
  positiveNeighborhood?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodCreateFieldInput>>;
  varieties?: InputMaybe<Array<PlantSpeciesVarietiesCreateFieldInput>>;
};

/** Fields to sort PlantSpecies by. The order in which sorts are applied is not guaranteed when specifying many fields in one PlantSpeciesSort object. */
export type PlantSpeciesSort = {
  description?: InputMaybe<SortDirection>;
  icon?: InputMaybe<SortDirection>;
  infoText?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
};

export type PlantSpeciesUpdateInput = {
  categories?: InputMaybe<Array<PlantSpeciesCategoriesUpdateFieldInput>>;
  cropRotationFactor?: InputMaybe<Array<PlantSpeciesCropRotationFactorUpdateFieldInput>>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  infoText?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  positiveNeighborhood?: InputMaybe<Array<PlantSpeciesPositiveNeighborhoodUpdateFieldInput>>;
  varieties?: InputMaybe<Array<PlantSpeciesVarietiesUpdateFieldInput>>;
};

export type PlantSpeciesVarietiesAggregateInput = {
  AND?: InputMaybe<Array<PlantSpeciesVarietiesAggregateInput>>;
  OR?: InputMaybe<Array<PlantSpeciesVarietiesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<PlantSpeciesVarietiesNodeAggregationWhereInput>;
};

export type PlantSpeciesVarietiesConnectFieldInput = {
  connect?: InputMaybe<Array<PlantVarietyConnectInput>>;
  where?: InputMaybe<PlantVarietyConnectWhere>;
};

export type PlantSpeciesVarietiesConnection = {
  __typename?: 'PlantSpeciesVarietiesConnection';
  edges: Array<PlantSpeciesVarietiesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PlantSpeciesVarietiesConnectionSort = {
  node?: InputMaybe<PlantVarietySort>;
};

export type PlantSpeciesVarietiesConnectionWhere = {
  AND?: InputMaybe<Array<PlantSpeciesVarietiesConnectionWhere>>;
  OR?: InputMaybe<Array<PlantSpeciesVarietiesConnectionWhere>>;
  node?: InputMaybe<PlantVarietyWhere>;
  node_NOT?: InputMaybe<PlantVarietyWhere>;
};

export type PlantSpeciesVarietiesCreateFieldInput = {
  node: PlantVarietyCreateInput;
};

export type PlantSpeciesVarietiesDeleteFieldInput = {
  delete?: InputMaybe<PlantVarietyDeleteInput>;
  where?: InputMaybe<PlantSpeciesVarietiesConnectionWhere>;
};

export type PlantSpeciesVarietiesDisconnectFieldInput = {
  disconnect?: InputMaybe<PlantVarietyDisconnectInput>;
  where?: InputMaybe<PlantSpeciesVarietiesConnectionWhere>;
};

export type PlantSpeciesVarietiesFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesVarietiesConnectFieldInput>>;
  create?: InputMaybe<Array<PlantSpeciesVarietiesCreateFieldInput>>;
};

export type PlantSpeciesVarietiesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PlantSpeciesVarietiesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PlantSpeciesVarietiesNodeAggregationWhereInput>>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  description_EQUAL?: InputMaybe<Scalars['String']>;
  description_GT?: InputMaybe<Scalars['Int']>;
  description_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  description_LT?: InputMaybe<Scalars['Int']>;
  description_LTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  icon_EQUAL?: InputMaybe<Scalars['String']>;
  icon_GT?: InputMaybe<Scalars['Int']>;
  icon_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_LT?: InputMaybe<Scalars['Int']>;
  icon_LTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type PlantSpeciesVarietiesRelationship = {
  __typename?: 'PlantSpeciesVarietiesRelationship';
  cursor: Scalars['String'];
  node: PlantVariety;
};

export type PlantSpeciesVarietiesUpdateConnectionInput = {
  node?: InputMaybe<PlantVarietyUpdateInput>;
};

export type PlantSpeciesVarietiesUpdateFieldInput = {
  connect?: InputMaybe<Array<PlantSpeciesVarietiesConnectFieldInput>>;
  create?: InputMaybe<Array<PlantSpeciesVarietiesCreateFieldInput>>;
  delete?: InputMaybe<Array<PlantSpeciesVarietiesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<PlantSpeciesVarietiesDisconnectFieldInput>>;
  update?: InputMaybe<PlantSpeciesVarietiesUpdateConnectionInput>;
  where?: InputMaybe<PlantSpeciesVarietiesConnectionWhere>;
};

export type PlantSpeciesWhere = {
  AND?: InputMaybe<Array<PlantSpeciesWhere>>;
  OR?: InputMaybe<Array<PlantSpeciesWhere>>;
  categoriesAggregate?: InputMaybe<PlantSpeciesCategoriesAggregateInput>;
  categoriesConnection_ALL?: InputMaybe<PlantSpeciesCategoriesConnectionWhere>;
  categoriesConnection_NONE?: InputMaybe<PlantSpeciesCategoriesConnectionWhere>;
  categoriesConnection_SINGLE?: InputMaybe<PlantSpeciesCategoriesConnectionWhere>;
  categoriesConnection_SOME?: InputMaybe<PlantSpeciesCategoriesConnectionWhere>;
  /** Return PlantSpecies where all of the related Categories match this filter */
  categories_ALL?: InputMaybe<CategoryWhere>;
  /** Return PlantSpecies where none of the related Categories match this filter */
  categories_NONE?: InputMaybe<CategoryWhere>;
  /** Return PlantSpecies where one of the related Categories match this filter */
  categories_SINGLE?: InputMaybe<CategoryWhere>;
  /** Return PlantSpecies where some of the related Categories match this filter */
  categories_SOME?: InputMaybe<CategoryWhere>;
  cropRotationFactorAggregate?: InputMaybe<PlantSpeciesCropRotationFactorAggregateInput>;
  cropRotationFactorConnection_ALL?: InputMaybe<PlantSpeciesCropRotationFactorConnectionWhere>;
  cropRotationFactorConnection_NONE?: InputMaybe<PlantSpeciesCropRotationFactorConnectionWhere>;
  cropRotationFactorConnection_SINGLE?: InputMaybe<PlantSpeciesCropRotationFactorConnectionWhere>;
  cropRotationFactorConnection_SOME?: InputMaybe<PlantSpeciesCropRotationFactorConnectionWhere>;
  /** Return PlantSpecies where all of the related PlantSpecies match this filter */
  cropRotationFactor_ALL?: InputMaybe<PlantSpeciesWhere>;
  /** Return PlantSpecies where none of the related PlantSpecies match this filter */
  cropRotationFactor_NONE?: InputMaybe<PlantSpeciesWhere>;
  /** Return PlantSpecies where one of the related PlantSpecies match this filter */
  cropRotationFactor_SINGLE?: InputMaybe<PlantSpeciesWhere>;
  /** Return PlantSpecies where some of the related PlantSpecies match this filter */
  cropRotationFactor_SOME?: InputMaybe<PlantSpeciesWhere>;
  description?: InputMaybe<Scalars['String']>;
  description_CONTAINS?: InputMaybe<Scalars['String']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_NOT?: InputMaybe<Scalars['String']>;
  description_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  description_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  description_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  icon_CONTAINS?: InputMaybe<Scalars['String']>;
  icon_ENDS_WITH?: InputMaybe<Scalars['String']>;
  icon_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_NOT?: InputMaybe<Scalars['String']>;
  icon_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  icon_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  icon_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  icon_STARTS_WITH?: InputMaybe<Scalars['String']>;
  infoText?: InputMaybe<Scalars['String']>;
  infoText_CONTAINS?: InputMaybe<Scalars['String']>;
  infoText_ENDS_WITH?: InputMaybe<Scalars['String']>;
  infoText_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  infoText_NOT?: InputMaybe<Scalars['String']>;
  infoText_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  infoText_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  infoText_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  infoText_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  infoText_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  positiveNeighborhoodAggregate?: InputMaybe<PlantSpeciesPositiveNeighborhoodAggregateInput>;
  positiveNeighborhoodConnection_ALL?: InputMaybe<PlantSpeciesPositiveNeighborhoodConnectionWhere>;
  positiveNeighborhoodConnection_NONE?: InputMaybe<PlantSpeciesPositiveNeighborhoodConnectionWhere>;
  positiveNeighborhoodConnection_SINGLE?: InputMaybe<PlantSpeciesPositiveNeighborhoodConnectionWhere>;
  positiveNeighborhoodConnection_SOME?: InputMaybe<PlantSpeciesPositiveNeighborhoodConnectionWhere>;
  /** Return PlantSpecies where all of the related PlantSpecies match this filter */
  positiveNeighborhood_ALL?: InputMaybe<PlantSpeciesWhere>;
  /** Return PlantSpecies where none of the related PlantSpecies match this filter */
  positiveNeighborhood_NONE?: InputMaybe<PlantSpeciesWhere>;
  /** Return PlantSpecies where one of the related PlantSpecies match this filter */
  positiveNeighborhood_SINGLE?: InputMaybe<PlantSpeciesWhere>;
  /** Return PlantSpecies where some of the related PlantSpecies match this filter */
  positiveNeighborhood_SOME?: InputMaybe<PlantSpeciesWhere>;
  varietiesAggregate?: InputMaybe<PlantSpeciesVarietiesAggregateInput>;
  varietiesConnection_ALL?: InputMaybe<PlantSpeciesVarietiesConnectionWhere>;
  varietiesConnection_NONE?: InputMaybe<PlantSpeciesVarietiesConnectionWhere>;
  varietiesConnection_SINGLE?: InputMaybe<PlantSpeciesVarietiesConnectionWhere>;
  varietiesConnection_SOME?: InputMaybe<PlantSpeciesVarietiesConnectionWhere>;
  /** Return PlantSpecies where all of the related PlantVarieties match this filter */
  varieties_ALL?: InputMaybe<PlantVarietyWhere>;
  /** Return PlantSpecies where none of the related PlantVarieties match this filter */
  varieties_NONE?: InputMaybe<PlantVarietyWhere>;
  /** Return PlantSpecies where one of the related PlantVarieties match this filter */
  varieties_SINGLE?: InputMaybe<PlantVarietyWhere>;
  /** Return PlantSpecies where some of the related PlantVarieties match this filter */
  varieties_SOME?: InputMaybe<PlantVarietyWhere>;
};

export type PlantVarietiesConnection = {
  __typename?: 'PlantVarietiesConnection';
  edges: Array<PlantVarietyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PlantVariety = {
  __typename?: 'PlantVariety';
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  infoText?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  species: PlantSpecies;
  speciesAggregate?: Maybe<PlantVarietyPlantSpeciesSpeciesAggregationSelection>;
  speciesConnection: PlantVarietySpeciesConnection;
};


export type PlantVarietySpeciesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<PlantSpeciesOptions>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type PlantVarietySpeciesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type PlantVarietySpeciesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<PlantVarietySpeciesConnectionSort>>;
  where?: InputMaybe<PlantVarietySpeciesConnectionWhere>;
};

export type PlantVarietyAggregateSelection = {
  __typename?: 'PlantVarietyAggregateSelection';
  count: Scalars['Int'];
  description: StringAggregateSelectionNullable;
  icon: StringAggregateSelectionNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type PlantVarietyConnectInput = {
  species?: InputMaybe<PlantVarietySpeciesConnectFieldInput>;
};

export type PlantVarietyConnectWhere = {
  node: PlantVarietyWhere;
};

export type PlantVarietyCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  infoText?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  species?: InputMaybe<PlantVarietySpeciesFieldInput>;
};

export type PlantVarietyDeleteInput = {
  species?: InputMaybe<PlantVarietySpeciesDeleteFieldInput>;
};

export type PlantVarietyDisconnectInput = {
  species?: InputMaybe<PlantVarietySpeciesDisconnectFieldInput>;
};

export type PlantVarietyEdge = {
  __typename?: 'PlantVarietyEdge';
  cursor: Scalars['String'];
  node: PlantVariety;
};

export type PlantVarietyOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more PlantVarietySort objects to sort PlantVarieties by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PlantVarietySort>>;
};

export type PlantVarietyPlantSpeciesSpeciesAggregationSelection = {
  __typename?: 'PlantVarietyPlantSpeciesSpeciesAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection>;
};

export type PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection = {
  __typename?: 'PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  icon: StringAggregateSelectionNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type PlantVarietyRelationInput = {
  species?: InputMaybe<PlantVarietySpeciesCreateFieldInput>;
};

/** Fields to sort PlantVarieties by. The order in which sorts are applied is not guaranteed when specifying many fields in one PlantVarietySort object. */
export type PlantVarietySort = {
  description?: InputMaybe<SortDirection>;
  icon?: InputMaybe<SortDirection>;
  infoText?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
};

export type PlantVarietySpeciesAggregateInput = {
  AND?: InputMaybe<Array<PlantVarietySpeciesAggregateInput>>;
  OR?: InputMaybe<Array<PlantVarietySpeciesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<PlantVarietySpeciesNodeAggregationWhereInput>;
};

export type PlantVarietySpeciesConnectFieldInput = {
  connect?: InputMaybe<PlantSpeciesConnectInput>;
  where?: InputMaybe<PlantSpeciesConnectWhere>;
};

export type PlantVarietySpeciesConnection = {
  __typename?: 'PlantVarietySpeciesConnection';
  edges: Array<PlantVarietySpeciesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PlantVarietySpeciesConnectionSort = {
  node?: InputMaybe<PlantSpeciesSort>;
};

export type PlantVarietySpeciesConnectionWhere = {
  AND?: InputMaybe<Array<PlantVarietySpeciesConnectionWhere>>;
  OR?: InputMaybe<Array<PlantVarietySpeciesConnectionWhere>>;
  node?: InputMaybe<PlantSpeciesWhere>;
  node_NOT?: InputMaybe<PlantSpeciesWhere>;
};

export type PlantVarietySpeciesCreateFieldInput = {
  node: PlantSpeciesCreateInput;
};

export type PlantVarietySpeciesDeleteFieldInput = {
  delete?: InputMaybe<PlantSpeciesDeleteInput>;
  where?: InputMaybe<PlantVarietySpeciesConnectionWhere>;
};

export type PlantVarietySpeciesDisconnectFieldInput = {
  disconnect?: InputMaybe<PlantSpeciesDisconnectInput>;
  where?: InputMaybe<PlantVarietySpeciesConnectionWhere>;
};

export type PlantVarietySpeciesFieldInput = {
  connect?: InputMaybe<PlantVarietySpeciesConnectFieldInput>;
  create?: InputMaybe<PlantVarietySpeciesCreateFieldInput>;
};

export type PlantVarietySpeciesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PlantVarietySpeciesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PlantVarietySpeciesNodeAggregationWhereInput>>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  description_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  description_EQUAL?: InputMaybe<Scalars['String']>;
  description_GT?: InputMaybe<Scalars['Int']>;
  description_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  description_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  description_LT?: InputMaybe<Scalars['Int']>;
  description_LTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  description_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  icon_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  icon_EQUAL?: InputMaybe<Scalars['String']>;
  icon_GT?: InputMaybe<Scalars['Int']>;
  icon_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  icon_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  icon_LT?: InputMaybe<Scalars['Int']>;
  icon_LTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  icon_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type PlantVarietySpeciesRelationship = {
  __typename?: 'PlantVarietySpeciesRelationship';
  cursor: Scalars['String'];
  node: PlantSpecies;
};

export type PlantVarietySpeciesUpdateConnectionInput = {
  node?: InputMaybe<PlantSpeciesUpdateInput>;
};

export type PlantVarietySpeciesUpdateFieldInput = {
  connect?: InputMaybe<PlantVarietySpeciesConnectFieldInput>;
  create?: InputMaybe<PlantVarietySpeciesCreateFieldInput>;
  delete?: InputMaybe<PlantVarietySpeciesDeleteFieldInput>;
  disconnect?: InputMaybe<PlantVarietySpeciesDisconnectFieldInput>;
  update?: InputMaybe<PlantVarietySpeciesUpdateConnectionInput>;
  where?: InputMaybe<PlantVarietySpeciesConnectionWhere>;
};

export type PlantVarietyUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  infoText?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  species?: InputMaybe<PlantVarietySpeciesUpdateFieldInput>;
};

export type PlantVarietyWhere = {
  AND?: InputMaybe<Array<PlantVarietyWhere>>;
  OR?: InputMaybe<Array<PlantVarietyWhere>>;
  description?: InputMaybe<Scalars['String']>;
  description_CONTAINS?: InputMaybe<Scalars['String']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_NOT?: InputMaybe<Scalars['String']>;
  description_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  description_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  description_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  icon_CONTAINS?: InputMaybe<Scalars['String']>;
  icon_ENDS_WITH?: InputMaybe<Scalars['String']>;
  icon_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_NOT?: InputMaybe<Scalars['String']>;
  icon_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  icon_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  icon_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  icon_STARTS_WITH?: InputMaybe<Scalars['String']>;
  infoText?: InputMaybe<Scalars['String']>;
  infoText_CONTAINS?: InputMaybe<Scalars['String']>;
  infoText_ENDS_WITH?: InputMaybe<Scalars['String']>;
  infoText_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  infoText_NOT?: InputMaybe<Scalars['String']>;
  infoText_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  infoText_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  infoText_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  infoText_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  infoText_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  species?: InputMaybe<PlantSpeciesWhere>;
  speciesAggregate?: InputMaybe<PlantVarietySpeciesAggregateInput>;
  speciesConnection?: InputMaybe<PlantVarietySpeciesConnectionWhere>;
  speciesConnection_NOT?: InputMaybe<PlantVarietySpeciesConnectionWhere>;
  species_NOT?: InputMaybe<PlantSpeciesWhere>;
};

export type Point = {
  __typename?: 'Point';
  crs: Scalars['String'];
  height?: Maybe<Scalars['Float']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  srid: Scalars['Int'];
};

export type PointDistance = {
  /** The distance in metres to be used when comparing two points */
  distance: Scalars['Float'];
  point: PointInput;
};

export type PointInput = {
  height?: InputMaybe<Scalars['Float']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type PolygonShape = GeoShape & {
  __typename?: 'PolygonShape';
  belongs_to: Array<GardenLayer>;
  belongs_toAggregate?: Maybe<PolygonShapeGardenLayerBelongs_ToAggregationSelection>;
  belongs_toConnection: GeoShapeBelongs_ToConnection;
  feature?: Maybe<GardenFeature>;
  featureAggregate?: Maybe<PolygonShapeGardenFeatureFeatureAggregationSelection>;
  featureConnection: GeoShapeFeatureConnection;
  points: Array<Maybe<Point>>;
  shapeId: Scalars['ID'];
  startPoint?: Maybe<Point>;
};


export type PolygonShapeBelongs_ToArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenLayerOptions>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type PolygonShapeBelongs_ToAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type PolygonShapeBelongs_ToConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GeoShapeBelongs_ToConnectionSort>>;
  where?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
};


export type PolygonShapeFeatureArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenFeatureOptions>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type PolygonShapeFeatureAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type PolygonShapeFeatureConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<GeoShapeFeatureConnectionSort>>;
  where?: InputMaybe<GeoShapeFeatureConnectionWhere>;
};

export type PolygonShapeAggregateSelection = {
  __typename?: 'PolygonShapeAggregateSelection';
  count: Scalars['Int'];
  shapeId: IdAggregateSelectionNonNullable;
};

export type PolygonShapeBelongs_ToAggregateInput = {
  AND?: InputMaybe<Array<PolygonShapeBelongs_ToAggregateInput>>;
  OR?: InputMaybe<Array<PolygonShapeBelongs_ToAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<PolygonShapeBelongs_ToNodeAggregationWhereInput>;
};

export type PolygonShapeBelongs_ToNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PolygonShapeBelongs_ToNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PolygonShapeBelongs_ToNodeAggregationWhereInput>>;
  layerId_EQUAL?: InputMaybe<Scalars['ID']>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  name_EQUAL?: InputMaybe<Scalars['String']>;
  name_GT?: InputMaybe<Scalars['Int']>;
  name_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  name_LT?: InputMaybe<Scalars['Int']>;
  name_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type PolygonShapeConnectInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToConnectFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureConnectFieldInput>;
};

export type PolygonShapeConnectOrCreateInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToConnectOrCreateFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureConnectOrCreateFieldInput>;
};

export type PolygonShapeCreateInput = {
  belongs_to?: InputMaybe<GeoShapeBelongs_ToFieldInput>;
  feature?: InputMaybe<GeoShapeFeatureFieldInput>;
  points: Array<InputMaybe<PointInput>>;
  startPoint?: InputMaybe<PointInput>;
};

export type PolygonShapeDeleteInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToDeleteFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureDeleteFieldInput>;
};

export type PolygonShapeDisconnectInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToDisconnectFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureDisconnectFieldInput>;
};

export type PolygonShapeEdge = {
  __typename?: 'PolygonShapeEdge';
  cursor: Scalars['String'];
  node: PolygonShape;
};

export type PolygonShapeFeatureAggregateInput = {
  AND?: InputMaybe<Array<PolygonShapeFeatureAggregateInput>>;
  OR?: InputMaybe<Array<PolygonShapeFeatureAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<PolygonShapeFeatureNodeAggregationWhereInput>;
};

export type PolygonShapeFeatureNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PolygonShapeFeatureNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<PolygonShapeFeatureNodeAggregationWhereInput>>;
  featureId_EQUAL?: InputMaybe<Scalars['ID']>;
  featureType_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  featureType_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  featureType_EQUAL?: InputMaybe<Scalars['String']>;
  featureType_GT?: InputMaybe<Scalars['Int']>;
  featureType_GTE?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  featureType_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  featureType_LT?: InputMaybe<Scalars['Int']>;
  featureType_LTE?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  featureType_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  infoText_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  infoText_EQUAL?: InputMaybe<Scalars['String']>;
  infoText_GT?: InputMaybe<Scalars['Int']>;
  infoText_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  infoText_LT?: InputMaybe<Scalars['Int']>;
  infoText_LTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  infoText_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type PolygonShapeGardenFeatureFeatureAggregationSelection = {
  __typename?: 'PolygonShapeGardenFeatureFeatureAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<PolygonShapeGardenFeatureFeatureNodeAggregateSelection>;
};

export type PolygonShapeGardenFeatureFeatureNodeAggregateSelection = {
  __typename?: 'PolygonShapeGardenFeatureFeatureNodeAggregateSelection';
  featureId: IdAggregateSelectionNonNullable;
  featureType: StringAggregateSelectionNonNullable;
  infoText: StringAggregateSelectionNullable;
  label: StringAggregateSelectionNonNullable;
};

export type PolygonShapeGardenLayerBelongs_ToAggregationSelection = {
  __typename?: 'PolygonShapeGardenLayerBelongs_toAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<PolygonShapeGardenLayerBelongs_ToNodeAggregateSelection>;
};

export type PolygonShapeGardenLayerBelongs_ToNodeAggregateSelection = {
  __typename?: 'PolygonShapeGardenLayerBelongs_toNodeAggregateSelection';
  layerId: IdAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type PolygonShapeOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more PolygonShapeSort objects to sort PolygonShapes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PolygonShapeSort>>;
};

export type PolygonShapeRelationInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToCreateFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureCreateFieldInput>;
};

/** Fields to sort PolygonShapes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PolygonShapeSort object. */
export type PolygonShapeSort = {
  shapeId?: InputMaybe<SortDirection>;
  startPoint?: InputMaybe<SortDirection>;
};

export type PolygonShapeUpdateInput = {
  belongs_to?: InputMaybe<Array<GeoShapeBelongs_ToUpdateFieldInput>>;
  feature?: InputMaybe<GeoShapeFeatureUpdateFieldInput>;
  points?: InputMaybe<Array<InputMaybe<PointInput>>>;
  points_POP?: InputMaybe<Scalars['Int']>;
  points_PUSH?: InputMaybe<Array<InputMaybe<PointInput>>>;
  startPoint?: InputMaybe<PointInput>;
};

export type PolygonShapeWhere = {
  AND?: InputMaybe<Array<PolygonShapeWhere>>;
  OR?: InputMaybe<Array<PolygonShapeWhere>>;
  belongs_toAggregate?: InputMaybe<PolygonShapeBelongs_ToAggregateInput>;
  belongs_toConnection_ALL?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_NONE?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_SINGLE?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  belongs_toConnection_SOME?: InputMaybe<GeoShapeBelongs_ToConnectionWhere>;
  /** Return PolygonShapes where all of the related GardenLayers match this filter */
  belongs_to_ALL?: InputMaybe<GardenLayerWhere>;
  /** Return PolygonShapes where none of the related GardenLayers match this filter */
  belongs_to_NONE?: InputMaybe<GardenLayerWhere>;
  /** Return PolygonShapes where one of the related GardenLayers match this filter */
  belongs_to_SINGLE?: InputMaybe<GardenLayerWhere>;
  /** Return PolygonShapes where some of the related GardenLayers match this filter */
  belongs_to_SOME?: InputMaybe<GardenLayerWhere>;
  feature?: InputMaybe<GardenFeatureWhere>;
  featureAggregate?: InputMaybe<PolygonShapeFeatureAggregateInput>;
  featureConnection?: InputMaybe<GeoShapeFeatureConnectionWhere>;
  featureConnection_NOT?: InputMaybe<GeoShapeFeatureConnectionWhere>;
  feature_NOT?: InputMaybe<GardenFeatureWhere>;
  points?: InputMaybe<Array<InputMaybe<PointInput>>>;
  points_INCLUDES?: InputMaybe<PointInput>;
  points_NOT?: InputMaybe<Array<InputMaybe<PointInput>>>;
  points_NOT_INCLUDES?: InputMaybe<PointInput>;
  shapeId?: InputMaybe<Scalars['ID']>;
  shapeId_CONTAINS?: InputMaybe<Scalars['ID']>;
  shapeId_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_IN?: InputMaybe<Array<Scalars['ID']>>;
  shapeId_NOT?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  shapeId_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  shapeId_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  startPoint?: InputMaybe<PointInput>;
  startPoint_DISTANCE?: InputMaybe<PointDistance>;
  startPoint_GT?: InputMaybe<PointDistance>;
  startPoint_GTE?: InputMaybe<PointDistance>;
  startPoint_IN?: InputMaybe<Array<InputMaybe<PointInput>>>;
  startPoint_LT?: InputMaybe<PointDistance>;
  startPoint_LTE?: InputMaybe<PointDistance>;
  startPoint_NOT?: InputMaybe<PointInput>;
  startPoint_NOT_IN?: InputMaybe<Array<InputMaybe<PointInput>>>;
};

export type PolygonShapesConnection = {
  __typename?: 'PolygonShapesConnection';
  edges: Array<PolygonShapeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PositiveNeighborhood = {
  weight?: Maybe<Scalars['Int']>;
};

export type PositiveNeighborhoodCreateInput = {
  weight?: InputMaybe<Scalars['Int']>;
};

export type PositiveNeighborhoodSort = {
  weight?: InputMaybe<SortDirection>;
};

export type PositiveNeighborhoodUpdateInput = {
  weight?: InputMaybe<Scalars['Int']>;
  weight_DECREMENT?: InputMaybe<Scalars['Int']>;
  weight_INCREMENT?: InputMaybe<Scalars['Int']>;
};

export type PositiveNeighborhoodWhere = {
  AND?: InputMaybe<Array<PositiveNeighborhoodWhere>>;
  OR?: InputMaybe<Array<PositiveNeighborhoodWhere>>;
  weight?: InputMaybe<Scalars['Int']>;
  weight_GT?: InputMaybe<Scalars['Int']>;
  weight_GTE?: InputMaybe<Scalars['Int']>;
  weight_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  weight_LT?: InputMaybe<Scalars['Int']>;
  weight_LTE?: InputMaybe<Scalars['Int']>;
  weight_NOT?: InputMaybe<Scalars['Int']>;
  weight_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type PushKeyInput = {
  auth: Scalars['String'];
  p256dh: Scalars['String'];
};

export type PushMessageInput = {
  message?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PushSubscriptionInput = {
  endpoint: Scalars['String'];
  expirationTime?: InputMaybe<Scalars['Int']>;
  keys: PushKeyInput;
};

export type Query = {
  __typename?: 'Query';
  assignableWateringPeriod: Array<WateringPeriod>;
  categories: Array<Category>;
  categoriesAggregate: CategoryAggregateSelection;
  categoriesConnection: CategoriesConnection;
  changeRequests: Array<ChangeRequest>;
  changeRequestsAggregate: ChangeRequestAggregateSelection;
  changeRequestsConnection: ChangeRequestsConnection;
  containers: Array<Container>;
  containersAggregate: ContainerAggregateSelection;
  containersConnection: ContainersConnection;
  gardenFeatures: Array<GardenFeature>;
  gardenFeaturesAggregate: GardenFeatureAggregateSelection;
  gardenFeaturesConnection: GardenFeaturesConnection;
  gardenLayers: Array<GardenLayer>;
  gardenLayersAggregate: GardenLayerAggregateSelection;
  gardenLayersConnection: GardenLayersConnection;
  gardenSettings: Array<GardenSettings>;
  gardenSettingsAggregate: GardenSettingsAggregateSelection;
  gardenSettingsConnection: GardenSettingsConnection;
  gardens: Array<Garden>;
  gardensAggregate: GardenAggregateSelection;
  gardensConnection: GardensConnection;
  logEvents: Array<LogEvent>;
  logEventsAggregate: LogEventAggregateSelection;
  logEventsConnection: LogEventsConnection;
  markerShapes: Array<MarkerShape>;
  markerShapesAggregate: MarkerShapeAggregateSelection;
  markerShapesConnection: MarkerShapesConnection;
  plantSpecies: Array<PlantSpecies>;
  plantSpeciesAggregate: PlantSpeciesAggregateSelection;
  plantSpeciesConnection: PlantSpeciesConnection;
  plantVarieties: Array<PlantVariety>;
  plantVarietiesAggregate: PlantVarietyAggregateSelection;
  plantVarietiesConnection: PlantVarietiesConnection;
  polygonShapes: Array<PolygonShape>;
  polygonShapesAggregate: PolygonShapeAggregateSelection;
  polygonShapesConnection: PolygonShapesConnection;
  seeds: Array<Seed>;
  seedsAggregate: SeedAggregateSelection;
  seedsConnection: SeedsConnection;
  userSettings: Array<UserSettings>;
  userSettingsAggregate: UserSettingsAggregateSelection;
  userSettingsConnection: UserSettingsConnection;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
  wateringPeriods: Array<WateringPeriod>;
  wateringPeriodsAggregate: WateringPeriodAggregateSelection;
  wateringPeriodsConnection: WateringPeriodsConnection;
  wateringTasks: Array<WateringTask>;
  wateringTasksAggregate: WateringTaskAggregateSelection;
  wateringTasksConnection: WateringTasksConnection;
};


export type QueryAssignableWateringPeriodArgs = {
  gardenId: Scalars['ID'];
};


export type QueryCategoriesArgs = {
  options?: InputMaybe<CategoryOptions>;
  where?: InputMaybe<CategoryWhere>;
};


export type QueryCategoriesAggregateArgs = {
  where?: InputMaybe<CategoryWhere>;
};


export type QueryCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<CategorySort>>>;
  where?: InputMaybe<CategoryWhere>;
};


export type QueryChangeRequestsArgs = {
  options?: InputMaybe<ChangeRequestOptions>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type QueryChangeRequestsAggregateArgs = {
  where?: InputMaybe<ChangeRequestWhere>;
};


export type QueryChangeRequestsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<ChangeRequestSort>>>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type QueryContainersArgs = {
  options?: InputMaybe<ContainerOptions>;
  where?: InputMaybe<ContainerWhere>;
};


export type QueryContainersAggregateArgs = {
  where?: InputMaybe<ContainerWhere>;
};


export type QueryContainersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<ContainerSort>>>;
  where?: InputMaybe<ContainerWhere>;
};


export type QueryGardenFeaturesArgs = {
  options?: InputMaybe<GardenFeatureOptions>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type QueryGardenFeaturesAggregateArgs = {
  where?: InputMaybe<GardenFeatureWhere>;
};


export type QueryGardenFeaturesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GardenFeatureSort>>>;
  where?: InputMaybe<GardenFeatureWhere>;
};


export type QueryGardenLayersArgs = {
  options?: InputMaybe<GardenLayerOptions>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type QueryGardenLayersAggregateArgs = {
  where?: InputMaybe<GardenLayerWhere>;
};


export type QueryGardenLayersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GardenLayerSort>>>;
  where?: InputMaybe<GardenLayerWhere>;
};


export type QueryGardenSettingsArgs = {
  options?: InputMaybe<GardenSettingsOptions>;
  where?: InputMaybe<GardenSettingsWhere>;
};


export type QueryGardenSettingsAggregateArgs = {
  where?: InputMaybe<GardenSettingsWhere>;
};


export type QueryGardenSettingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GardenSettingsSort>>>;
  where?: InputMaybe<GardenSettingsWhere>;
};


export type QueryGardensArgs = {
  options?: InputMaybe<GardenOptions>;
  where?: InputMaybe<GardenWhere>;
};


export type QueryGardensAggregateArgs = {
  where?: InputMaybe<GardenWhere>;
};


export type QueryGardensConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<GardenSort>>>;
  where?: InputMaybe<GardenWhere>;
};


export type QueryLogEventsArgs = {
  options?: InputMaybe<LogEventOptions>;
  where?: InputMaybe<LogEventWhere>;
};


export type QueryLogEventsAggregateArgs = {
  where?: InputMaybe<LogEventWhere>;
};


export type QueryLogEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<LogEventSort>>>;
  where?: InputMaybe<LogEventWhere>;
};


export type QueryMarkerShapesArgs = {
  options?: InputMaybe<MarkerShapeOptions>;
  where?: InputMaybe<MarkerShapeWhere>;
};


export type QueryMarkerShapesAggregateArgs = {
  where?: InputMaybe<MarkerShapeWhere>;
};


export type QueryMarkerShapesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<MarkerShapeSort>>>;
  where?: InputMaybe<MarkerShapeWhere>;
};


export type QueryPlantSpeciesArgs = {
  options?: InputMaybe<PlantSpeciesOptions>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type QueryPlantSpeciesAggregateArgs = {
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type QueryPlantSpeciesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<PlantSpeciesSort>>>;
  where?: InputMaybe<PlantSpeciesWhere>;
};


export type QueryPlantVarietiesArgs = {
  options?: InputMaybe<PlantVarietyOptions>;
  where?: InputMaybe<PlantVarietyWhere>;
};


export type QueryPlantVarietiesAggregateArgs = {
  where?: InputMaybe<PlantVarietyWhere>;
};


export type QueryPlantVarietiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<PlantVarietySort>>>;
  where?: InputMaybe<PlantVarietyWhere>;
};


export type QueryPolygonShapesArgs = {
  options?: InputMaybe<PolygonShapeOptions>;
  where?: InputMaybe<PolygonShapeWhere>;
};


export type QueryPolygonShapesAggregateArgs = {
  where?: InputMaybe<PolygonShapeWhere>;
};


export type QueryPolygonShapesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<PolygonShapeSort>>>;
  where?: InputMaybe<PolygonShapeWhere>;
};


export type QuerySeedsArgs = {
  options?: InputMaybe<SeedOptions>;
  where?: InputMaybe<SeedWhere>;
};


export type QuerySeedsAggregateArgs = {
  where?: InputMaybe<SeedWhere>;
};


export type QuerySeedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<SeedSort>>>;
  where?: InputMaybe<SeedWhere>;
};


export type QueryUserSettingsArgs = {
  options?: InputMaybe<UserSettingsOptions>;
  where?: InputMaybe<UserSettingsWhere>;
};


export type QueryUserSettingsAggregateArgs = {
  where?: InputMaybe<UserSettingsWhere>;
};


export type QueryUserSettingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<UserSettingsSort>>>;
  where?: InputMaybe<UserSettingsWhere>;
};


export type QueryUsersArgs = {
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  where?: InputMaybe<UserWhere>;
};


export type QueryWateringPeriodsArgs = {
  options?: InputMaybe<WateringPeriodOptions>;
  where?: InputMaybe<WateringPeriodWhere>;
};


export type QueryWateringPeriodsAggregateArgs = {
  where?: InputMaybe<WateringPeriodWhere>;
};


export type QueryWateringPeriodsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<WateringPeriodSort>>>;
  where?: InputMaybe<WateringPeriodWhere>;
};


export type QueryWateringTasksArgs = {
  options?: InputMaybe<WateringTaskOptions>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type QueryWateringTasksAggregateArgs = {
  where?: InputMaybe<WateringTaskWhere>;
};


export type QueryWateringTasksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<WateringTaskSort>>>;
  where?: InputMaybe<WateringTaskWhere>;
};

export type Seed = {
  __typename?: 'Seed';
  amount?: Maybe<Scalars['Int']>;
  containedIn?: Maybe<Container>;
  containedInAggregate?: Maybe<SeedContainerContainedInAggregationSelection>;
  containedInConnection: SeedContainedInConnection;
  unit?: Maybe<Scalars['String']>;
  variety: PlantVariety;
};


export type SeedContainedInArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ContainerOptions>;
  where?: InputMaybe<ContainerWhere>;
};


export type SeedContainedInAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ContainerWhere>;
};


export type SeedContainedInConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<SeedContainedInConnectionSort>>;
  where?: InputMaybe<SeedContainedInConnectionWhere>;
};

export type SeedAggregateSelection = {
  __typename?: 'SeedAggregateSelection';
  amount: IntAggregateSelectionNullable;
  count: Scalars['Int'];
  unit: StringAggregateSelectionNullable;
};

export type SeedConnectInput = {
  containedIn?: InputMaybe<SeedContainedInConnectFieldInput>;
};

export type SeedContainedInAggregateInput = {
  AND?: InputMaybe<Array<SeedContainedInAggregateInput>>;
  OR?: InputMaybe<Array<SeedContainedInAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<SeedContainedInNodeAggregationWhereInput>;
};

export type SeedContainedInConnectFieldInput = {
  connect?: InputMaybe<ContainerConnectInput>;
  where?: InputMaybe<ContainerConnectWhere>;
};

export type SeedContainedInConnection = {
  __typename?: 'SeedContainedInConnection';
  edges: Array<SeedContainedInRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SeedContainedInConnectionSort = {
  node?: InputMaybe<ContainerSort>;
};

export type SeedContainedInConnectionWhere = {
  AND?: InputMaybe<Array<SeedContainedInConnectionWhere>>;
  OR?: InputMaybe<Array<SeedContainedInConnectionWhere>>;
  node?: InputMaybe<ContainerWhere>;
  node_NOT?: InputMaybe<ContainerWhere>;
};

export type SeedContainedInCreateFieldInput = {
  node: ContainerCreateInput;
};

export type SeedContainedInDeleteFieldInput = {
  delete?: InputMaybe<ContainerDeleteInput>;
  where?: InputMaybe<SeedContainedInConnectionWhere>;
};

export type SeedContainedInDisconnectFieldInput = {
  disconnect?: InputMaybe<ContainerDisconnectInput>;
  where?: InputMaybe<SeedContainedInConnectionWhere>;
};

export type SeedContainedInFieldInput = {
  connect?: InputMaybe<SeedContainedInConnectFieldInput>;
  create?: InputMaybe<SeedContainedInCreateFieldInput>;
};

export type SeedContainedInNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SeedContainedInNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<SeedContainedInNodeAggregationWhereInput>>;
  containerType_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  containerType_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  containerType_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  containerType_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  containerType_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  containerType_EQUAL?: InputMaybe<Scalars['String']>;
  containerType_GT?: InputMaybe<Scalars['Int']>;
  containerType_GTE?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  containerType_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  containerType_LT?: InputMaybe<Scalars['Int']>;
  containerType_LTE?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  containerType_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type SeedContainedInRelationship = {
  __typename?: 'SeedContainedInRelationship';
  cursor: Scalars['String'];
  node: Container;
};

export type SeedContainedInUpdateConnectionInput = {
  node?: InputMaybe<ContainerUpdateInput>;
};

export type SeedContainedInUpdateFieldInput = {
  connect?: InputMaybe<SeedContainedInConnectFieldInput>;
  create?: InputMaybe<SeedContainedInCreateFieldInput>;
  delete?: InputMaybe<SeedContainedInDeleteFieldInput>;
  disconnect?: InputMaybe<SeedContainedInDisconnectFieldInput>;
  update?: InputMaybe<SeedContainedInUpdateConnectionInput>;
  where?: InputMaybe<SeedContainedInConnectionWhere>;
};

export type SeedContainerContainedInAggregationSelection = {
  __typename?: 'SeedContainerContainedInAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<SeedContainerContainedInNodeAggregateSelection>;
};

export type SeedContainerContainedInNodeAggregateSelection = {
  __typename?: 'SeedContainerContainedInNodeAggregateSelection';
  containerType: StringAggregateSelectionNonNullable;
};

export type SeedCreateInput = {
  amount?: InputMaybe<Scalars['Int']>;
  containedIn?: InputMaybe<SeedContainedInFieldInput>;
  unit?: InputMaybe<Scalars['String']>;
};

export type SeedDeleteInput = {
  containedIn?: InputMaybe<SeedContainedInDeleteFieldInput>;
};

export type SeedDisconnectInput = {
  containedIn?: InputMaybe<SeedContainedInDisconnectFieldInput>;
};

export type SeedEdge = {
  __typename?: 'SeedEdge';
  cursor: Scalars['String'];
  node: Seed;
};

export type SeedOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more SeedSort objects to sort Seeds by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SeedSort>>;
};

export type SeedRelationInput = {
  containedIn?: InputMaybe<SeedContainedInCreateFieldInput>;
};

/** Fields to sort Seeds by. The order in which sorts are applied is not guaranteed when specifying many fields in one SeedSort object. */
export type SeedSort = {
  amount?: InputMaybe<SortDirection>;
  unit?: InputMaybe<SortDirection>;
};

export type SeedUpdateInput = {
  amount?: InputMaybe<Scalars['Int']>;
  amount_DECREMENT?: InputMaybe<Scalars['Int']>;
  amount_INCREMENT?: InputMaybe<Scalars['Int']>;
  containedIn?: InputMaybe<SeedContainedInUpdateFieldInput>;
  unit?: InputMaybe<Scalars['String']>;
};

export type SeedWhere = {
  AND?: InputMaybe<Array<SeedWhere>>;
  OR?: InputMaybe<Array<SeedWhere>>;
  amount?: InputMaybe<Scalars['Int']>;
  amount_GT?: InputMaybe<Scalars['Int']>;
  amount_GTE?: InputMaybe<Scalars['Int']>;
  amount_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  amount_LT?: InputMaybe<Scalars['Int']>;
  amount_LTE?: InputMaybe<Scalars['Int']>;
  amount_NOT?: InputMaybe<Scalars['Int']>;
  amount_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  containedIn?: InputMaybe<ContainerWhere>;
  containedInAggregate?: InputMaybe<SeedContainedInAggregateInput>;
  containedInConnection?: InputMaybe<SeedContainedInConnectionWhere>;
  containedInConnection_NOT?: InputMaybe<SeedContainedInConnectionWhere>;
  containedIn_NOT?: InputMaybe<ContainerWhere>;
  unit?: InputMaybe<Scalars['String']>;
  unit_CONTAINS?: InputMaybe<Scalars['String']>;
  unit_ENDS_WITH?: InputMaybe<Scalars['String']>;
  unit_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  unit_NOT?: InputMaybe<Scalars['String']>;
  unit_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  unit_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  unit_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  unit_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  unit_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type SeedsConnection = {
  __typename?: 'SeedsConnection';
  edges: Array<SeedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC'
}

export type StringAggregateSelectionNonNullable = {
  __typename?: 'StringAggregateSelectionNonNullable';
  longest: Scalars['String'];
  shortest: Scalars['String'];
};

export type StringAggregateSelectionNullable = {
  __typename?: 'StringAggregateSelectionNullable';
  longest?: Maybe<Scalars['String']>;
  shortest?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  WateringTaskChange?: Maybe<Scalars['Boolean']>;
};

export type UpdateCategoriesMutationResponse = {
  __typename?: 'UpdateCategoriesMutationResponse';
  categories: Array<Category>;
  info: UpdateInfo;
};

export type UpdateChangeRequestsMutationResponse = {
  __typename?: 'UpdateChangeRequestsMutationResponse';
  changeRequests: Array<ChangeRequest>;
  info: UpdateInfo;
};

export type UpdateContainersMutationResponse = {
  __typename?: 'UpdateContainersMutationResponse';
  containers: Array<Container>;
  info: UpdateInfo;
};

export type UpdateGardenFeaturesMutationResponse = {
  __typename?: 'UpdateGardenFeaturesMutationResponse';
  gardenFeatures: Array<GardenFeature>;
  info: UpdateInfo;
};

export type UpdateGardenLayersMutationResponse = {
  __typename?: 'UpdateGardenLayersMutationResponse';
  gardenLayers: Array<GardenLayer>;
  info: UpdateInfo;
};

export type UpdateGardenSettingsMutationResponse = {
  __typename?: 'UpdateGardenSettingsMutationResponse';
  gardenSettings: Array<GardenSettings>;
  info: UpdateInfo;
};

export type UpdateGardensMutationResponse = {
  __typename?: 'UpdateGardensMutationResponse';
  gardens: Array<Garden>;
  info: UpdateInfo;
};

export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  nodesDeleted: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type UpdateLogEventsMutationResponse = {
  __typename?: 'UpdateLogEventsMutationResponse';
  info: UpdateInfo;
  logEvents: Array<LogEvent>;
};

export type UpdateMarkerShapesMutationResponse = {
  __typename?: 'UpdateMarkerShapesMutationResponse';
  info: UpdateInfo;
  markerShapes: Array<MarkerShape>;
};

export type UpdatePlantSpeciesMutationResponse = {
  __typename?: 'UpdatePlantSpeciesMutationResponse';
  info: UpdateInfo;
  plantSpecies: Array<PlantSpecies>;
};

export type UpdatePlantVarietiesMutationResponse = {
  __typename?: 'UpdatePlantVarietiesMutationResponse';
  info: UpdateInfo;
  plantVarieties: Array<PlantVariety>;
};

export type UpdatePolygonShapesMutationResponse = {
  __typename?: 'UpdatePolygonShapesMutationResponse';
  info: UpdateInfo;
  polygonShapes: Array<PolygonShape>;
};

export type UpdateSeedsMutationResponse = {
  __typename?: 'UpdateSeedsMutationResponse';
  info: UpdateInfo;
  seeds: Array<Seed>;
};

export type UpdateUserSettingsMutationResponse = {
  __typename?: 'UpdateUserSettingsMutationResponse';
  info: UpdateInfo;
  userSettings: Array<UserSettings>;
};

export type UpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse';
  info: UpdateInfo;
  users: Array<User>;
};

export type UpdateWateringPeriodsMutationResponse = {
  __typename?: 'UpdateWateringPeriodsMutationResponse';
  info: UpdateInfo;
  wateringPeriods: Array<WateringPeriod>;
};

export type UpdateWateringTasksMutationResponse = {
  __typename?: 'UpdateWateringTasksMutationResponse';
  info: UpdateInfo;
  wateringTasks: Array<WateringTask>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  assigned: Array<WateringTask>;
  assignedAggregate?: Maybe<UserWateringTaskAssignedAggregationSelection>;
  assignedConnection: UserAssignedConnection;
  available: Array<WateringTask>;
  availableAggregate?: Maybe<UserWateringTaskAvailableAggregationSelection>;
  availableConnection: UserAvailableConnection;
  changerequests_requested_by: Array<ChangeRequest>;
  changerequests_requested_byAggregate?: Maybe<UserChangeRequestChangerequests_Requested_ByAggregationSelection>;
  changerequests_requested_byConnection: UserChangerequests_Requested_ByConnection;
  changerequests_requested_to: Array<ChangeRequest>;
  changerequests_requested_toAggregate?: Maybe<UserChangeRequestChangerequests_Requested_ToAggregationSelection>;
  changerequests_requested_toConnection: UserChangerequests_Requested_ToConnection;
  id: Scalars['String'];
  label: Scalars['String'];
  logevents_triggered_by: Array<LogEvent>;
  logevents_triggered_byAggregate?: Maybe<UserLogEventLogevents_Triggered_ByAggregationSelection>;
  logevents_triggered_byConnection: UserLogevents_Triggered_ByConnection;
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
};


export type UserAssignedArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<WateringTaskOptions>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type UserAssignedAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type UserAssignedConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserAssignedConnectionSort>>;
  where?: InputMaybe<UserAssignedConnectionWhere>;
};


export type UserAvailableArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<WateringTaskOptions>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type UserAvailableAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type UserAvailableConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserAvailableConnectionSort>>;
  where?: InputMaybe<UserAvailableConnectionWhere>;
};


export type UserChangerequests_Requested_ByArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ChangeRequestOptions>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type UserChangerequests_Requested_ByAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type UserChangerequests_Requested_ByConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserChangerequests_Requested_ByConnectionSort>>;
  where?: InputMaybe<UserChangerequests_Requested_ByConnectionWhere>;
};


export type UserChangerequests_Requested_ToArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ChangeRequestOptions>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type UserChangerequests_Requested_ToAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type UserChangerequests_Requested_ToConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserChangerequests_Requested_ToConnectionSort>>;
  where?: InputMaybe<UserChangerequests_Requested_ToConnectionWhere>;
};


export type UserLogevents_Triggered_ByArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<LogEventOptions>;
  where?: InputMaybe<LogEventWhere>;
};


export type UserLogevents_Triggered_ByAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<LogEventWhere>;
};


export type UserLogevents_Triggered_ByConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserLogevents_Triggered_ByConnectionSort>>;
  where?: InputMaybe<UserLogevents_Triggered_ByConnectionWhere>;
};

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  count: Scalars['Int'];
  id: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type UserAssignedAggregateInput = {
  AND?: InputMaybe<Array<UserAssignedAggregateInput>>;
  OR?: InputMaybe<Array<UserAssignedAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserAssignedNodeAggregationWhereInput>;
};

export type UserAssignedConnectFieldInput = {
  connect?: InputMaybe<Array<WateringTaskConnectInput>>;
  where?: InputMaybe<WateringTaskConnectWhere>;
};

export type UserAssignedConnection = {
  __typename?: 'UserAssignedConnection';
  edges: Array<UserAssignedRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserAssignedConnectionSort = {
  node?: InputMaybe<WateringTaskSort>;
};

export type UserAssignedConnectionWhere = {
  AND?: InputMaybe<Array<UserAssignedConnectionWhere>>;
  OR?: InputMaybe<Array<UserAssignedConnectionWhere>>;
  node?: InputMaybe<WateringTaskWhere>;
  node_NOT?: InputMaybe<WateringTaskWhere>;
};

export type UserAssignedCreateFieldInput = {
  node: WateringTaskCreateInput;
};

export type UserAssignedDeleteFieldInput = {
  delete?: InputMaybe<WateringTaskDeleteInput>;
  where?: InputMaybe<UserAssignedConnectionWhere>;
};

export type UserAssignedDisconnectFieldInput = {
  disconnect?: InputMaybe<WateringTaskDisconnectInput>;
  where?: InputMaybe<UserAssignedConnectionWhere>;
};

export type UserAssignedFieldInput = {
  connect?: InputMaybe<Array<UserAssignedConnectFieldInput>>;
  create?: InputMaybe<Array<UserAssignedCreateFieldInput>>;
};

export type UserAssignedNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserAssignedNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserAssignedNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserAssignedRelationship = {
  __typename?: 'UserAssignedRelationship';
  cursor: Scalars['String'];
  node: WateringTask;
};

export type UserAssignedUpdateConnectionInput = {
  node?: InputMaybe<WateringTaskUpdateInput>;
};

export type UserAssignedUpdateFieldInput = {
  connect?: InputMaybe<Array<UserAssignedConnectFieldInput>>;
  create?: InputMaybe<Array<UserAssignedCreateFieldInput>>;
  delete?: InputMaybe<Array<UserAssignedDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserAssignedDisconnectFieldInput>>;
  update?: InputMaybe<UserAssignedUpdateConnectionInput>;
  where?: InputMaybe<UserAssignedConnectionWhere>;
};

export type UserAvailableAggregateInput = {
  AND?: InputMaybe<Array<UserAvailableAggregateInput>>;
  OR?: InputMaybe<Array<UserAvailableAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserAvailableNodeAggregationWhereInput>;
};

export type UserAvailableConnectFieldInput = {
  connect?: InputMaybe<Array<WateringTaskConnectInput>>;
  where?: InputMaybe<WateringTaskConnectWhere>;
};

export type UserAvailableConnection = {
  __typename?: 'UserAvailableConnection';
  edges: Array<UserAvailableRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserAvailableConnectionSort = {
  node?: InputMaybe<WateringTaskSort>;
};

export type UserAvailableConnectionWhere = {
  AND?: InputMaybe<Array<UserAvailableConnectionWhere>>;
  OR?: InputMaybe<Array<UserAvailableConnectionWhere>>;
  node?: InputMaybe<WateringTaskWhere>;
  node_NOT?: InputMaybe<WateringTaskWhere>;
};

export type UserAvailableCreateFieldInput = {
  node: WateringTaskCreateInput;
};

export type UserAvailableDeleteFieldInput = {
  delete?: InputMaybe<WateringTaskDeleteInput>;
  where?: InputMaybe<UserAvailableConnectionWhere>;
};

export type UserAvailableDisconnectFieldInput = {
  disconnect?: InputMaybe<WateringTaskDisconnectInput>;
  where?: InputMaybe<UserAvailableConnectionWhere>;
};

export type UserAvailableFieldInput = {
  connect?: InputMaybe<Array<UserAvailableConnectFieldInput>>;
  create?: InputMaybe<Array<UserAvailableCreateFieldInput>>;
};

export type UserAvailableNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserAvailableNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserAvailableNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserAvailableRelationship = {
  __typename?: 'UserAvailableRelationship';
  cursor: Scalars['String'];
  node: WateringTask;
};

export type UserAvailableUpdateConnectionInput = {
  node?: InputMaybe<WateringTaskUpdateInput>;
};

export type UserAvailableUpdateFieldInput = {
  connect?: InputMaybe<Array<UserAvailableConnectFieldInput>>;
  create?: InputMaybe<Array<UserAvailableCreateFieldInput>>;
  delete?: InputMaybe<Array<UserAvailableDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserAvailableDisconnectFieldInput>>;
  update?: InputMaybe<UserAvailableUpdateConnectionInput>;
  where?: InputMaybe<UserAvailableConnectionWhere>;
};

export type UserChangeRequestChangerequests_Requested_ByAggregationSelection = {
  __typename?: 'UserChangeRequestChangerequests_requested_byAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserChangeRequestChangerequests_Requested_ByNodeAggregateSelection>;
};

export type UserChangeRequestChangerequests_Requested_ByNodeAggregateSelection = {
  __typename?: 'UserChangeRequestChangerequests_requested_byNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type UserChangeRequestChangerequests_Requested_ToAggregationSelection = {
  __typename?: 'UserChangeRequestChangerequests_requested_toAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserChangeRequestChangerequests_Requested_ToNodeAggregateSelection>;
};

export type UserChangeRequestChangerequests_Requested_ToNodeAggregateSelection = {
  __typename?: 'UserChangeRequestChangerequests_requested_toNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type UserChangerequests_Requested_ByAggregateInput = {
  AND?: InputMaybe<Array<UserChangerequests_Requested_ByAggregateInput>>;
  OR?: InputMaybe<Array<UserChangerequests_Requested_ByAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserChangerequests_Requested_ByNodeAggregationWhereInput>;
};

export type UserChangerequests_Requested_ByConnectFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestConnectInput>>;
  where?: InputMaybe<ChangeRequestConnectWhere>;
};

export type UserChangerequests_Requested_ByConnection = {
  __typename?: 'UserChangerequests_requested_byConnection';
  edges: Array<UserChangerequests_Requested_ByRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserChangerequests_Requested_ByConnectionSort = {
  node?: InputMaybe<ChangeRequestSort>;
};

export type UserChangerequests_Requested_ByConnectionWhere = {
  AND?: InputMaybe<Array<UserChangerequests_Requested_ByConnectionWhere>>;
  OR?: InputMaybe<Array<UserChangerequests_Requested_ByConnectionWhere>>;
  node?: InputMaybe<ChangeRequestWhere>;
  node_NOT?: InputMaybe<ChangeRequestWhere>;
};

export type UserChangerequests_Requested_ByCreateFieldInput = {
  node: ChangeRequestCreateInput;
};

export type UserChangerequests_Requested_ByDeleteFieldInput = {
  delete?: InputMaybe<ChangeRequestDeleteInput>;
  where?: InputMaybe<UserChangerequests_Requested_ByConnectionWhere>;
};

export type UserChangerequests_Requested_ByDisconnectFieldInput = {
  disconnect?: InputMaybe<ChangeRequestDisconnectInput>;
  where?: InputMaybe<UserChangerequests_Requested_ByConnectionWhere>;
};

export type UserChangerequests_Requested_ByFieldInput = {
  connect?: InputMaybe<Array<UserChangerequests_Requested_ByConnectFieldInput>>;
  create?: InputMaybe<Array<UserChangerequests_Requested_ByCreateFieldInput>>;
};

export type UserChangerequests_Requested_ByNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserChangerequests_Requested_ByNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserChangerequests_Requested_ByNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserChangerequests_Requested_ByRelationship = {
  __typename?: 'UserChangerequests_requested_byRelationship';
  cursor: Scalars['String'];
  node: ChangeRequest;
};

export type UserChangerequests_Requested_ByUpdateConnectionInput = {
  node?: InputMaybe<ChangeRequestUpdateInput>;
};

export type UserChangerequests_Requested_ByUpdateFieldInput = {
  connect?: InputMaybe<Array<UserChangerequests_Requested_ByConnectFieldInput>>;
  create?: InputMaybe<Array<UserChangerequests_Requested_ByCreateFieldInput>>;
  delete?: InputMaybe<Array<UserChangerequests_Requested_ByDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserChangerequests_Requested_ByDisconnectFieldInput>>;
  update?: InputMaybe<UserChangerequests_Requested_ByUpdateConnectionInput>;
  where?: InputMaybe<UserChangerequests_Requested_ByConnectionWhere>;
};

export type UserChangerequests_Requested_ToAggregateInput = {
  AND?: InputMaybe<Array<UserChangerequests_Requested_ToAggregateInput>>;
  OR?: InputMaybe<Array<UserChangerequests_Requested_ToAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserChangerequests_Requested_ToNodeAggregationWhereInput>;
};

export type UserChangerequests_Requested_ToConnectFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestConnectInput>>;
  where?: InputMaybe<ChangeRequestConnectWhere>;
};

export type UserChangerequests_Requested_ToConnection = {
  __typename?: 'UserChangerequests_requested_toConnection';
  edges: Array<UserChangerequests_Requested_ToRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserChangerequests_Requested_ToConnectionSort = {
  node?: InputMaybe<ChangeRequestSort>;
};

export type UserChangerequests_Requested_ToConnectionWhere = {
  AND?: InputMaybe<Array<UserChangerequests_Requested_ToConnectionWhere>>;
  OR?: InputMaybe<Array<UserChangerequests_Requested_ToConnectionWhere>>;
  node?: InputMaybe<ChangeRequestWhere>;
  node_NOT?: InputMaybe<ChangeRequestWhere>;
};

export type UserChangerequests_Requested_ToCreateFieldInput = {
  node: ChangeRequestCreateInput;
};

export type UserChangerequests_Requested_ToDeleteFieldInput = {
  delete?: InputMaybe<ChangeRequestDeleteInput>;
  where?: InputMaybe<UserChangerequests_Requested_ToConnectionWhere>;
};

export type UserChangerequests_Requested_ToDisconnectFieldInput = {
  disconnect?: InputMaybe<ChangeRequestDisconnectInput>;
  where?: InputMaybe<UserChangerequests_Requested_ToConnectionWhere>;
};

export type UserChangerequests_Requested_ToFieldInput = {
  connect?: InputMaybe<Array<UserChangerequests_Requested_ToConnectFieldInput>>;
  create?: InputMaybe<Array<UserChangerequests_Requested_ToCreateFieldInput>>;
};

export type UserChangerequests_Requested_ToNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserChangerequests_Requested_ToNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserChangerequests_Requested_ToNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserChangerequests_Requested_ToRelationship = {
  __typename?: 'UserChangerequests_requested_toRelationship';
  cursor: Scalars['String'];
  node: ChangeRequest;
};

export type UserChangerequests_Requested_ToUpdateConnectionInput = {
  node?: InputMaybe<ChangeRequestUpdateInput>;
};

export type UserChangerequests_Requested_ToUpdateFieldInput = {
  connect?: InputMaybe<Array<UserChangerequests_Requested_ToConnectFieldInput>>;
  create?: InputMaybe<Array<UserChangerequests_Requested_ToCreateFieldInput>>;
  delete?: InputMaybe<Array<UserChangerequests_Requested_ToDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserChangerequests_Requested_ToDisconnectFieldInput>>;
  update?: InputMaybe<UserChangerequests_Requested_ToUpdateConnectionInput>;
  where?: InputMaybe<UserChangerequests_Requested_ToConnectionWhere>;
};

export type UserConnectInput = {
  assigned?: InputMaybe<Array<UserAssignedConnectFieldInput>>;
  available?: InputMaybe<Array<UserAvailableConnectFieldInput>>;
  changerequests_requested_by?: InputMaybe<Array<UserChangerequests_Requested_ByConnectFieldInput>>;
  changerequests_requested_to?: InputMaybe<Array<UserChangerequests_Requested_ToConnectFieldInput>>;
  logevents_triggered_by?: InputMaybe<Array<UserLogevents_Triggered_ByConnectFieldInput>>;
};

export type UserConnectWhere = {
  node: UserWhere;
};

export type UserCreateInput = {
  _id: Scalars['ID'];
  assigned?: InputMaybe<UserAssignedFieldInput>;
  available?: InputMaybe<UserAvailableFieldInput>;
  changerequests_requested_by?: InputMaybe<UserChangerequests_Requested_ByFieldInput>;
  changerequests_requested_to?: InputMaybe<UserChangerequests_Requested_ToFieldInput>;
  id: Scalars['String'];
  label: Scalars['String'];
  logevents_triggered_by?: InputMaybe<UserLogevents_Triggered_ByFieldInput>;
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
};

export type UserDeleteInput = {
  assigned?: InputMaybe<Array<UserAssignedDeleteFieldInput>>;
  available?: InputMaybe<Array<UserAvailableDeleteFieldInput>>;
  changerequests_requested_by?: InputMaybe<Array<UserChangerequests_Requested_ByDeleteFieldInput>>;
  changerequests_requested_to?: InputMaybe<Array<UserChangerequests_Requested_ToDeleteFieldInput>>;
  logevents_triggered_by?: InputMaybe<Array<UserLogevents_Triggered_ByDeleteFieldInput>>;
};

export type UserDisconnectInput = {
  assigned?: InputMaybe<Array<UserAssignedDisconnectFieldInput>>;
  available?: InputMaybe<Array<UserAvailableDisconnectFieldInput>>;
  changerequests_requested_by?: InputMaybe<Array<UserChangerequests_Requested_ByDisconnectFieldInput>>;
  changerequests_requested_to?: InputMaybe<Array<UserChangerequests_Requested_ToDisconnectFieldInput>>;
  logevents_triggered_by?: InputMaybe<Array<UserLogevents_Triggered_ByDisconnectFieldInput>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserLogEventLogevents_Triggered_ByAggregationSelection = {
  __typename?: 'UserLogEventLogevents_triggered_byAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserLogEventLogevents_Triggered_ByNodeAggregateSelection>;
};

export type UserLogEventLogevents_Triggered_ByNodeAggregateSelection = {
  __typename?: 'UserLogEventLogevents_triggered_byNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  date: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type UserLogevents_Triggered_ByAggregateInput = {
  AND?: InputMaybe<Array<UserLogevents_Triggered_ByAggregateInput>>;
  OR?: InputMaybe<Array<UserLogevents_Triggered_ByAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserLogevents_Triggered_ByNodeAggregationWhereInput>;
};

export type UserLogevents_Triggered_ByConnectFieldInput = {
  connect?: InputMaybe<Array<LogEventConnectInput>>;
  where?: InputMaybe<LogEventConnectWhere>;
};

export type UserLogevents_Triggered_ByConnection = {
  __typename?: 'UserLogevents_triggered_byConnection';
  edges: Array<UserLogevents_Triggered_ByRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserLogevents_Triggered_ByConnectionSort = {
  node?: InputMaybe<LogEventSort>;
};

export type UserLogevents_Triggered_ByConnectionWhere = {
  AND?: InputMaybe<Array<UserLogevents_Triggered_ByConnectionWhere>>;
  OR?: InputMaybe<Array<UserLogevents_Triggered_ByConnectionWhere>>;
  node?: InputMaybe<LogEventWhere>;
  node_NOT?: InputMaybe<LogEventWhere>;
};

export type UserLogevents_Triggered_ByCreateFieldInput = {
  node: LogEventCreateInput;
};

export type UserLogevents_Triggered_ByDeleteFieldInput = {
  delete?: InputMaybe<LogEventDeleteInput>;
  where?: InputMaybe<UserLogevents_Triggered_ByConnectionWhere>;
};

export type UserLogevents_Triggered_ByDisconnectFieldInput = {
  disconnect?: InputMaybe<LogEventDisconnectInput>;
  where?: InputMaybe<UserLogevents_Triggered_ByConnectionWhere>;
};

export type UserLogevents_Triggered_ByFieldInput = {
  connect?: InputMaybe<Array<UserLogevents_Triggered_ByConnectFieldInput>>;
  create?: InputMaybe<Array<UserLogevents_Triggered_ByCreateFieldInput>>;
};

export type UserLogevents_Triggered_ByNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserLogevents_Triggered_ByNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserLogevents_Triggered_ByNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  date_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  date_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  date_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  date_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  date_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  date_EQUAL?: InputMaybe<Scalars['String']>;
  date_GT?: InputMaybe<Scalars['Int']>;
  date_GTE?: InputMaybe<Scalars['Int']>;
  date_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  date_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  date_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  date_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  date_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  date_LT?: InputMaybe<Scalars['Int']>;
  date_LTE?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserLogevents_Triggered_ByRelationship = {
  __typename?: 'UserLogevents_triggered_byRelationship';
  cursor: Scalars['String'];
  node: LogEvent;
};

export type UserLogevents_Triggered_ByUpdateConnectionInput = {
  node?: InputMaybe<LogEventUpdateInput>;
};

export type UserLogevents_Triggered_ByUpdateFieldInput = {
  connect?: InputMaybe<Array<UserLogevents_Triggered_ByConnectFieldInput>>;
  create?: InputMaybe<Array<UserLogevents_Triggered_ByCreateFieldInput>>;
  delete?: InputMaybe<Array<UserLogevents_Triggered_ByDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserLogevents_Triggered_ByDisconnectFieldInput>>;
  update?: InputMaybe<UserLogevents_Triggered_ByUpdateConnectionInput>;
  where?: InputMaybe<UserLogevents_Triggered_ByConnectionWhere>;
};

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
};

export type UserRelationInput = {
  assigned?: InputMaybe<Array<UserAssignedCreateFieldInput>>;
  available?: InputMaybe<Array<UserAvailableCreateFieldInput>>;
  changerequests_requested_by?: InputMaybe<Array<UserChangerequests_Requested_ByCreateFieldInput>>;
  changerequests_requested_to?: InputMaybe<Array<UserChangerequests_Requested_ToCreateFieldInput>>;
  logevents_triggered_by?: InputMaybe<Array<UserLogevents_Triggered_ByCreateFieldInput>>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  email?: Maybe<Scalars['String']>;
  letitrain_maximum_tasks?: Maybe<Scalars['Int']>;
  ui_locale?: Maybe<Scalars['String']>;
};

export type UserSettingsAggregateSelection = {
  __typename?: 'UserSettingsAggregateSelection';
  count: Scalars['Int'];
  email: StringAggregateSelectionNullable;
  letitrain_maximum_tasks: IntAggregateSelectionNullable;
  ui_locale: StringAggregateSelectionNullable;
};

export type UserSettingsConnection = {
  __typename?: 'UserSettingsConnection';
  edges: Array<UserSettingsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserSettingsCreateInput = {
  email?: InputMaybe<Scalars['String']>;
  letitrain_maximum_tasks?: InputMaybe<Scalars['Int']>;
  ui_locale?: InputMaybe<Scalars['String']>;
};

export type UserSettingsEdge = {
  __typename?: 'UserSettingsEdge';
  cursor: Scalars['String'];
  node: UserSettings;
};

export type UserSettingsInput = {
  letitrain_maximum_tasks?: InputMaybe<Scalars['Int']>;
  ui_locale?: InputMaybe<Scalars['String']>;
};

export type UserSettingsOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserSettingsSort objects to sort UserSettings by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSettingsSort>>;
};

/** Fields to sort UserSettings by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSettingsSort object. */
export type UserSettingsSort = {
  email?: InputMaybe<SortDirection>;
  letitrain_maximum_tasks?: InputMaybe<SortDirection>;
  ui_locale?: InputMaybe<SortDirection>;
};

export type UserSettingsUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  letitrain_maximum_tasks?: InputMaybe<Scalars['Int']>;
  letitrain_maximum_tasks_DECREMENT?: InputMaybe<Scalars['Int']>;
  letitrain_maximum_tasks_INCREMENT?: InputMaybe<Scalars['Int']>;
  ui_locale?: InputMaybe<Scalars['String']>;
};

export type UserSettingsWhere = {
  AND?: InputMaybe<Array<UserSettingsWhere>>;
  OR?: InputMaybe<Array<UserSettingsWhere>>;
  email?: InputMaybe<Scalars['String']>;
  email_CONTAINS?: InputMaybe<Scalars['String']>;
  email_ENDS_WITH?: InputMaybe<Scalars['String']>;
  email_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email_NOT?: InputMaybe<Scalars['String']>;
  email_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  email_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  email_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  email_STARTS_WITH?: InputMaybe<Scalars['String']>;
  letitrain_maximum_tasks?: InputMaybe<Scalars['Int']>;
  letitrain_maximum_tasks_GT?: InputMaybe<Scalars['Int']>;
  letitrain_maximum_tasks_GTE?: InputMaybe<Scalars['Int']>;
  letitrain_maximum_tasks_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  letitrain_maximum_tasks_LT?: InputMaybe<Scalars['Int']>;
  letitrain_maximum_tasks_LTE?: InputMaybe<Scalars['Int']>;
  letitrain_maximum_tasks_NOT?: InputMaybe<Scalars['Int']>;
  letitrain_maximum_tasks_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  ui_locale?: InputMaybe<Scalars['String']>;
  ui_locale_CONTAINS?: InputMaybe<Scalars['String']>;
  ui_locale_ENDS_WITH?: InputMaybe<Scalars['String']>;
  ui_locale_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ui_locale_NOT?: InputMaybe<Scalars['String']>;
  ui_locale_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  ui_locale_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  ui_locale_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ui_locale_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  ui_locale_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  _id?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
  neo4jImportId?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type UserUpdateInput = {
  _id?: InputMaybe<Scalars['ID']>;
  assigned?: InputMaybe<Array<UserAssignedUpdateFieldInput>>;
  available?: InputMaybe<Array<UserAvailableUpdateFieldInput>>;
  changerequests_requested_by?: InputMaybe<Array<UserChangerequests_Requested_ByUpdateFieldInput>>;
  changerequests_requested_to?: InputMaybe<Array<UserChangerequests_Requested_ToUpdateFieldInput>>;
  id?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  logevents_triggered_by?: InputMaybe<Array<UserLogevents_Triggered_ByUpdateFieldInput>>;
  neo4jImportId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type UserWateringTaskAssignedAggregationSelection = {
  __typename?: 'UserWateringTaskAssignedAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserWateringTaskAssignedNodeAggregateSelection>;
};

export type UserWateringTaskAssignedNodeAggregateSelection = {
  __typename?: 'UserWateringTaskAssignedNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type UserWateringTaskAvailableAggregationSelection = {
  __typename?: 'UserWateringTaskAvailableAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserWateringTaskAvailableNodeAggregateSelection>;
};

export type UserWateringTaskAvailableNodeAggregateSelection = {
  __typename?: 'UserWateringTaskAvailableNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>;
  OR?: InputMaybe<Array<UserWhere>>;
  _id?: InputMaybe<Scalars['ID']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT?: InputMaybe<Scalars['ID']>;
  _id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  assignedAggregate?: InputMaybe<UserAssignedAggregateInput>;
  assignedConnection_ALL?: InputMaybe<UserAssignedConnectionWhere>;
  assignedConnection_NONE?: InputMaybe<UserAssignedConnectionWhere>;
  assignedConnection_SINGLE?: InputMaybe<UserAssignedConnectionWhere>;
  assignedConnection_SOME?: InputMaybe<UserAssignedConnectionWhere>;
  /** Return Users where all of the related WateringTasks match this filter */
  assigned_ALL?: InputMaybe<WateringTaskWhere>;
  /** Return Users where none of the related WateringTasks match this filter */
  assigned_NONE?: InputMaybe<WateringTaskWhere>;
  /** Return Users where one of the related WateringTasks match this filter */
  assigned_SINGLE?: InputMaybe<WateringTaskWhere>;
  /** Return Users where some of the related WateringTasks match this filter */
  assigned_SOME?: InputMaybe<WateringTaskWhere>;
  availableAggregate?: InputMaybe<UserAvailableAggregateInput>;
  availableConnection_ALL?: InputMaybe<UserAvailableConnectionWhere>;
  availableConnection_NONE?: InputMaybe<UserAvailableConnectionWhere>;
  availableConnection_SINGLE?: InputMaybe<UserAvailableConnectionWhere>;
  availableConnection_SOME?: InputMaybe<UserAvailableConnectionWhere>;
  /** Return Users where all of the related WateringTasks match this filter */
  available_ALL?: InputMaybe<WateringTaskWhere>;
  /** Return Users where none of the related WateringTasks match this filter */
  available_NONE?: InputMaybe<WateringTaskWhere>;
  /** Return Users where one of the related WateringTasks match this filter */
  available_SINGLE?: InputMaybe<WateringTaskWhere>;
  /** Return Users where some of the related WateringTasks match this filter */
  available_SOME?: InputMaybe<WateringTaskWhere>;
  changerequests_requested_byAggregate?: InputMaybe<UserChangerequests_Requested_ByAggregateInput>;
  changerequests_requested_byConnection_ALL?: InputMaybe<UserChangerequests_Requested_ByConnectionWhere>;
  changerequests_requested_byConnection_NONE?: InputMaybe<UserChangerequests_Requested_ByConnectionWhere>;
  changerequests_requested_byConnection_SINGLE?: InputMaybe<UserChangerequests_Requested_ByConnectionWhere>;
  changerequests_requested_byConnection_SOME?: InputMaybe<UserChangerequests_Requested_ByConnectionWhere>;
  /** Return Users where all of the related ChangeRequests match this filter */
  changerequests_requested_by_ALL?: InputMaybe<ChangeRequestWhere>;
  /** Return Users where none of the related ChangeRequests match this filter */
  changerequests_requested_by_NONE?: InputMaybe<ChangeRequestWhere>;
  /** Return Users where one of the related ChangeRequests match this filter */
  changerequests_requested_by_SINGLE?: InputMaybe<ChangeRequestWhere>;
  /** Return Users where some of the related ChangeRequests match this filter */
  changerequests_requested_by_SOME?: InputMaybe<ChangeRequestWhere>;
  changerequests_requested_toAggregate?: InputMaybe<UserChangerequests_Requested_ToAggregateInput>;
  changerequests_requested_toConnection_ALL?: InputMaybe<UserChangerequests_Requested_ToConnectionWhere>;
  changerequests_requested_toConnection_NONE?: InputMaybe<UserChangerequests_Requested_ToConnectionWhere>;
  changerequests_requested_toConnection_SINGLE?: InputMaybe<UserChangerequests_Requested_ToConnectionWhere>;
  changerequests_requested_toConnection_SOME?: InputMaybe<UserChangerequests_Requested_ToConnectionWhere>;
  /** Return Users where all of the related ChangeRequests match this filter */
  changerequests_requested_to_ALL?: InputMaybe<ChangeRequestWhere>;
  /** Return Users where none of the related ChangeRequests match this filter */
  changerequests_requested_to_NONE?: InputMaybe<ChangeRequestWhere>;
  /** Return Users where one of the related ChangeRequests match this filter */
  changerequests_requested_to_SINGLE?: InputMaybe<ChangeRequestWhere>;
  /** Return Users where some of the related ChangeRequests match this filter */
  changerequests_requested_to_SOME?: InputMaybe<ChangeRequestWhere>;
  id?: InputMaybe<Scalars['String']>;
  id_CONTAINS?: InputMaybe<Scalars['String']>;
  id_ENDS_WITH?: InputMaybe<Scalars['String']>;
  id_IN?: InputMaybe<Array<Scalars['String']>>;
  id_NOT?: InputMaybe<Scalars['String']>;
  id_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  id_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  id_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  logevents_triggered_byAggregate?: InputMaybe<UserLogevents_Triggered_ByAggregateInput>;
  logevents_triggered_byConnection_ALL?: InputMaybe<UserLogevents_Triggered_ByConnectionWhere>;
  logevents_triggered_byConnection_NONE?: InputMaybe<UserLogevents_Triggered_ByConnectionWhere>;
  logevents_triggered_byConnection_SINGLE?: InputMaybe<UserLogevents_Triggered_ByConnectionWhere>;
  logevents_triggered_byConnection_SOME?: InputMaybe<UserLogevents_Triggered_ByConnectionWhere>;
  /** Return Users where all of the related LogEvents match this filter */
  logevents_triggered_by_ALL?: InputMaybe<LogEventWhere>;
  /** Return Users where none of the related LogEvents match this filter */
  logevents_triggered_by_NONE?: InputMaybe<LogEventWhere>;
  /** Return Users where one of the related LogEvents match this filter */
  logevents_triggered_by_SINGLE?: InputMaybe<LogEventWhere>;
  /** Return Users where some of the related LogEvents match this filter */
  logevents_triggered_by_SOME?: InputMaybe<LogEventWhere>;
  neo4jImportId?: InputMaybe<Scalars['String']>;
  neo4jImportId_CONTAINS?: InputMaybe<Scalars['String']>;
  neo4jImportId_ENDS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_IN?: InputMaybe<Array<Scalars['String']>>;
  neo4jImportId_NOT?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  neo4jImportId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_CONTAINS?: InputMaybe<Scalars['String']>;
  type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_IN?: InputMaybe<Array<Scalars['String']>>;
  type_NOT?: InputMaybe<Scalars['String']>;
  type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type_STARTS_WITH?: InputMaybe<Scalars['String']>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringPeriod = {
  __typename?: 'WateringPeriod';
  _id: Scalars['ID'];
  at?: Maybe<Garden>;
  atAggregate?: Maybe<WateringPeriodGardenAtAggregationSelection>;
  atConnection: WateringPeriodAtConnection;
  from: Scalars['Date'];
  hasUsersAssigned?: Maybe<Scalars['Boolean']>;
  till: Scalars['Date'];
  wateringtasks: Array<WateringTask>;
  wateringtasksAggregate?: Maybe<WateringPeriodWateringTaskWateringtasksAggregationSelection>;
  wateringtasksConnection: WateringPeriodWateringtasksConnection;
};


export type WateringPeriodAtArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<GardenOptions>;
  where?: InputMaybe<GardenWhere>;
};


export type WateringPeriodAtAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<GardenWhere>;
};


export type WateringPeriodAtConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<WateringPeriodAtConnectionSort>>;
  where?: InputMaybe<WateringPeriodAtConnectionWhere>;
};


export type WateringPeriodWateringtasksArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<WateringTaskOptions>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type WateringPeriodWateringtasksAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<WateringTaskWhere>;
};


export type WateringPeriodWateringtasksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<WateringPeriodWateringtasksConnectionSort>>;
  where?: InputMaybe<WateringPeriodWateringtasksConnectionWhere>;
};

export type WateringPeriodAggregateSelection = {
  __typename?: 'WateringPeriodAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  count: Scalars['Int'];
};

export type WateringPeriodAtAggregateInput = {
  AND?: InputMaybe<Array<WateringPeriodAtAggregateInput>>;
  OR?: InputMaybe<Array<WateringPeriodAtAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<WateringPeriodAtNodeAggregationWhereInput>;
};

export type WateringPeriodAtConnectFieldInput = {
  connect?: InputMaybe<GardenConnectInput>;
  where?: InputMaybe<GardenConnectWhere>;
};

export type WateringPeriodAtConnection = {
  __typename?: 'WateringPeriodAtConnection';
  edges: Array<WateringPeriodAtRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringPeriodAtConnectionSort = {
  node?: InputMaybe<GardenSort>;
};

export type WateringPeriodAtConnectionWhere = {
  AND?: InputMaybe<Array<WateringPeriodAtConnectionWhere>>;
  OR?: InputMaybe<Array<WateringPeriodAtConnectionWhere>>;
  node?: InputMaybe<GardenWhere>;
  node_NOT?: InputMaybe<GardenWhere>;
};

export type WateringPeriodAtCreateFieldInput = {
  node: GardenCreateInput;
};

export type WateringPeriodAtDeleteFieldInput = {
  delete?: InputMaybe<GardenDeleteInput>;
  where?: InputMaybe<WateringPeriodAtConnectionWhere>;
};

export type WateringPeriodAtDisconnectFieldInput = {
  disconnect?: InputMaybe<GardenDisconnectInput>;
  where?: InputMaybe<WateringPeriodAtConnectionWhere>;
};

export type WateringPeriodAtFieldInput = {
  connect?: InputMaybe<WateringPeriodAtConnectFieldInput>;
  create?: InputMaybe<WateringPeriodAtCreateFieldInput>;
};

export type WateringPeriodAtNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WateringPeriodAtNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WateringPeriodAtNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  gardenId_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type WateringPeriodAtRelationship = {
  __typename?: 'WateringPeriodAtRelationship';
  cursor: Scalars['String'];
  node: Garden;
};

export type WateringPeriodAtUpdateConnectionInput = {
  node?: InputMaybe<GardenUpdateInput>;
};

export type WateringPeriodAtUpdateFieldInput = {
  connect?: InputMaybe<WateringPeriodAtConnectFieldInput>;
  create?: InputMaybe<WateringPeriodAtCreateFieldInput>;
  delete?: InputMaybe<WateringPeriodAtDeleteFieldInput>;
  disconnect?: InputMaybe<WateringPeriodAtDisconnectFieldInput>;
  update?: InputMaybe<WateringPeriodAtUpdateConnectionInput>;
  where?: InputMaybe<WateringPeriodAtConnectionWhere>;
};

export type WateringPeriodConnectInput = {
  at?: InputMaybe<WateringPeriodAtConnectFieldInput>;
  wateringtasks?: InputMaybe<Array<WateringPeriodWateringtasksConnectFieldInput>>;
};

export type WateringPeriodConnectWhere = {
  node: WateringPeriodWhere;
};

export type WateringPeriodCreateInput = {
  _id: Scalars['ID'];
  at?: InputMaybe<WateringPeriodAtFieldInput>;
  from: Scalars['Date'];
  till: Scalars['Date'];
  wateringtasks?: InputMaybe<WateringPeriodWateringtasksFieldInput>;
};

export type WateringPeriodDeleteInput = {
  at?: InputMaybe<WateringPeriodAtDeleteFieldInput>;
  wateringtasks?: InputMaybe<Array<WateringPeriodWateringtasksDeleteFieldInput>>;
};

export type WateringPeriodDisconnectInput = {
  at?: InputMaybe<WateringPeriodAtDisconnectFieldInput>;
  wateringtasks?: InputMaybe<Array<WateringPeriodWateringtasksDisconnectFieldInput>>;
};

export type WateringPeriodEdge = {
  __typename?: 'WateringPeriodEdge';
  cursor: Scalars['String'];
  node: WateringPeriod;
};

export type WateringPeriodGardenAtAggregationSelection = {
  __typename?: 'WateringPeriodGardenAtAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<WateringPeriodGardenAtNodeAggregateSelection>;
};

export type WateringPeriodGardenAtNodeAggregateSelection = {
  __typename?: 'WateringPeriodGardenAtNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  gardenId: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
};

export type WateringPeriodOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more WateringPeriodSort objects to sort WateringPeriods by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<WateringPeriodSort>>;
};

export type WateringPeriodRelationInput = {
  at?: InputMaybe<WateringPeriodAtCreateFieldInput>;
  wateringtasks?: InputMaybe<Array<WateringPeriodWateringtasksCreateFieldInput>>;
};

/** Fields to sort WateringPeriods by. The order in which sorts are applied is not guaranteed when specifying many fields in one WateringPeriodSort object. */
export type WateringPeriodSort = {
  _id?: InputMaybe<SortDirection>;
  from?: InputMaybe<SortDirection>;
  hasUsersAssigned?: InputMaybe<SortDirection>;
  till?: InputMaybe<SortDirection>;
};

export type WateringPeriodUpdateInput = {
  _id?: InputMaybe<Scalars['ID']>;
  at?: InputMaybe<WateringPeriodAtUpdateFieldInput>;
  from?: InputMaybe<Scalars['Date']>;
  till?: InputMaybe<Scalars['Date']>;
  wateringtasks?: InputMaybe<Array<WateringPeriodWateringtasksUpdateFieldInput>>;
};

export type WateringPeriodWateringTaskWateringtasksAggregationSelection = {
  __typename?: 'WateringPeriodWateringTaskWateringtasksAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<WateringPeriodWateringTaskWateringtasksNodeAggregateSelection>;
};

export type WateringPeriodWateringTaskWateringtasksNodeAggregateSelection = {
  __typename?: 'WateringPeriodWateringTaskWateringtasksNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type WateringPeriodWateringtasksAggregateInput = {
  AND?: InputMaybe<Array<WateringPeriodWateringtasksAggregateInput>>;
  OR?: InputMaybe<Array<WateringPeriodWateringtasksAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<WateringPeriodWateringtasksNodeAggregationWhereInput>;
};

export type WateringPeriodWateringtasksConnectFieldInput = {
  connect?: InputMaybe<Array<WateringTaskConnectInput>>;
  where?: InputMaybe<WateringTaskConnectWhere>;
};

export type WateringPeriodWateringtasksConnection = {
  __typename?: 'WateringPeriodWateringtasksConnection';
  edges: Array<WateringPeriodWateringtasksRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringPeriodWateringtasksConnectionSort = {
  node?: InputMaybe<WateringTaskSort>;
};

export type WateringPeriodWateringtasksConnectionWhere = {
  AND?: InputMaybe<Array<WateringPeriodWateringtasksConnectionWhere>>;
  OR?: InputMaybe<Array<WateringPeriodWateringtasksConnectionWhere>>;
  node?: InputMaybe<WateringTaskWhere>;
  node_NOT?: InputMaybe<WateringTaskWhere>;
};

export type WateringPeriodWateringtasksCreateFieldInput = {
  node: WateringTaskCreateInput;
};

export type WateringPeriodWateringtasksDeleteFieldInput = {
  delete?: InputMaybe<WateringTaskDeleteInput>;
  where?: InputMaybe<WateringPeriodWateringtasksConnectionWhere>;
};

export type WateringPeriodWateringtasksDisconnectFieldInput = {
  disconnect?: InputMaybe<WateringTaskDisconnectInput>;
  where?: InputMaybe<WateringPeriodWateringtasksConnectionWhere>;
};

export type WateringPeriodWateringtasksFieldInput = {
  connect?: InputMaybe<Array<WateringPeriodWateringtasksConnectFieldInput>>;
  create?: InputMaybe<Array<WateringPeriodWateringtasksCreateFieldInput>>;
};

export type WateringPeriodWateringtasksNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WateringPeriodWateringtasksNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WateringPeriodWateringtasksNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type WateringPeriodWateringtasksRelationship = {
  __typename?: 'WateringPeriodWateringtasksRelationship';
  cursor: Scalars['String'];
  node: WateringTask;
};

export type WateringPeriodWateringtasksUpdateConnectionInput = {
  node?: InputMaybe<WateringTaskUpdateInput>;
};

export type WateringPeriodWateringtasksUpdateFieldInput = {
  connect?: InputMaybe<Array<WateringPeriodWateringtasksConnectFieldInput>>;
  create?: InputMaybe<Array<WateringPeriodWateringtasksCreateFieldInput>>;
  delete?: InputMaybe<Array<WateringPeriodWateringtasksDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<WateringPeriodWateringtasksDisconnectFieldInput>>;
  update?: InputMaybe<WateringPeriodWateringtasksUpdateConnectionInput>;
  where?: InputMaybe<WateringPeriodWateringtasksConnectionWhere>;
};

export type WateringPeriodWhere = {
  AND?: InputMaybe<Array<WateringPeriodWhere>>;
  OR?: InputMaybe<Array<WateringPeriodWhere>>;
  _id?: InputMaybe<Scalars['ID']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT?: InputMaybe<Scalars['ID']>;
  _id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  at?: InputMaybe<GardenWhere>;
  atAggregate?: InputMaybe<WateringPeriodAtAggregateInput>;
  atConnection?: InputMaybe<WateringPeriodAtConnectionWhere>;
  atConnection_NOT?: InputMaybe<WateringPeriodAtConnectionWhere>;
  at_NOT?: InputMaybe<GardenWhere>;
  from?: InputMaybe<Scalars['Date']>;
  from_GT?: InputMaybe<Scalars['Date']>;
  from_GTE?: InputMaybe<Scalars['Date']>;
  from_IN?: InputMaybe<Array<Scalars['Date']>>;
  from_LT?: InputMaybe<Scalars['Date']>;
  from_LTE?: InputMaybe<Scalars['Date']>;
  from_NOT?: InputMaybe<Scalars['Date']>;
  from_NOT_IN?: InputMaybe<Array<Scalars['Date']>>;
  till?: InputMaybe<Scalars['Date']>;
  till_GT?: InputMaybe<Scalars['Date']>;
  till_GTE?: InputMaybe<Scalars['Date']>;
  till_IN?: InputMaybe<Array<Scalars['Date']>>;
  till_LT?: InputMaybe<Scalars['Date']>;
  till_LTE?: InputMaybe<Scalars['Date']>;
  till_NOT?: InputMaybe<Scalars['Date']>;
  till_NOT_IN?: InputMaybe<Array<Scalars['Date']>>;
  wateringtasksAggregate?: InputMaybe<WateringPeriodWateringtasksAggregateInput>;
  wateringtasksConnection_ALL?: InputMaybe<WateringPeriodWateringtasksConnectionWhere>;
  wateringtasksConnection_NONE?: InputMaybe<WateringPeriodWateringtasksConnectionWhere>;
  wateringtasksConnection_SINGLE?: InputMaybe<WateringPeriodWateringtasksConnectionWhere>;
  wateringtasksConnection_SOME?: InputMaybe<WateringPeriodWateringtasksConnectionWhere>;
  /** Return WateringPeriods where all of the related WateringTasks match this filter */
  wateringtasks_ALL?: InputMaybe<WateringTaskWhere>;
  /** Return WateringPeriods where none of the related WateringTasks match this filter */
  wateringtasks_NONE?: InputMaybe<WateringTaskWhere>;
  /** Return WateringPeriods where one of the related WateringTasks match this filter */
  wateringtasks_SINGLE?: InputMaybe<WateringTaskWhere>;
  /** Return WateringPeriods where some of the related WateringTasks match this filter */
  wateringtasks_SOME?: InputMaybe<WateringTaskWhere>;
};

export type WateringPeriodsConnection = {
  __typename?: 'WateringPeriodsConnection';
  edges: Array<WateringPeriodEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringTask = {
  __typename?: 'WateringTask';
  _id: Scalars['ID'];
  changerequests_requested_for: Array<ChangeRequest>;
  changerequests_requested_forAggregate?: Maybe<WateringTaskChangeRequestChangerequests_Requested_ForAggregationSelection>;
  changerequests_requested_forConnection: WateringTaskChangerequests_Requested_ForConnection;
  changerequests_requested_new_task: Array<ChangeRequest>;
  changerequests_requested_new_taskAggregate?: Maybe<WateringTaskChangeRequestChangerequests_Requested_New_TaskAggregationSelection>;
  changerequests_requested_new_taskConnection: WateringTaskChangerequests_Requested_New_TaskConnection;
  date: Scalars['Date'];
  done?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  logevents_refers_to: Array<LogEvent>;
  logevents_refers_toAggregate?: Maybe<WateringTaskLogEventLogevents_Refers_ToAggregationSelection>;
  logevents_refers_toConnection: WateringTaskLogevents_Refers_ToConnection;
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
  users_assigned: Array<User>;
  users_assignedAggregate?: Maybe<WateringTaskUserUsers_AssignedAggregationSelection>;
  users_assignedConnection: WateringTaskUsers_AssignedConnection;
  users_available: Array<User>;
  users_availableAggregate?: Maybe<WateringTaskUserUsers_AvailableAggregationSelection>;
  users_availableConnection: WateringTaskUsers_AvailableConnection;
  wateringperiod: Array<WateringPeriod>;
  wateringperiodAggregate?: Maybe<WateringTaskWateringPeriodWateringperiodAggregationSelection>;
  wateringperiodConnection: WateringTaskWateringperiodConnection;
};


export type WateringTaskChangerequests_Requested_ForArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ChangeRequestOptions>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type WateringTaskChangerequests_Requested_ForAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type WateringTaskChangerequests_Requested_ForConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForConnectionSort>>;
  where?: InputMaybe<WateringTaskChangerequests_Requested_ForConnectionWhere>;
};


export type WateringTaskChangerequests_Requested_New_TaskArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<ChangeRequestOptions>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type WateringTaskChangerequests_Requested_New_TaskAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ChangeRequestWhere>;
};


export type WateringTaskChangerequests_Requested_New_TaskConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskConnectionSort>>;
  where?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>;
};


export type WateringTaskLogevents_Refers_ToArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<LogEventOptions>;
  where?: InputMaybe<LogEventWhere>;
};


export type WateringTaskLogevents_Refers_ToAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<LogEventWhere>;
};


export type WateringTaskLogevents_Refers_ToConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<WateringTaskLogevents_Refers_ToConnectionSort>>;
  where?: InputMaybe<WateringTaskLogevents_Refers_ToConnectionWhere>;
};


export type WateringTaskUsers_AssignedArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type WateringTaskUsers_AssignedAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserWhere>;
};


export type WateringTaskUsers_AssignedConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<WateringTaskUsers_AssignedConnectionSort>>;
  where?: InputMaybe<WateringTaskUsers_AssignedConnectionWhere>;
};


export type WateringTaskUsers_AvailableArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type WateringTaskUsers_AvailableAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserWhere>;
};


export type WateringTaskUsers_AvailableConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<WateringTaskUsers_AvailableConnectionSort>>;
  where?: InputMaybe<WateringTaskUsers_AvailableConnectionWhere>;
};


export type WateringTaskWateringperiodArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<WateringPeriodOptions>;
  where?: InputMaybe<WateringPeriodWhere>;
};


export type WateringTaskWateringperiodAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<WateringPeriodWhere>;
};


export type WateringTaskWateringperiodConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<WateringTaskWateringperiodConnectionSort>>;
  where?: InputMaybe<WateringTaskWateringperiodConnectionWhere>;
};

export type WateringTaskAggregateSelection = {
  __typename?: 'WateringTaskAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  count: Scalars['Int'];
  label: StringAggregateSelectionNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type WateringTaskChangeRequestChangerequests_Requested_ForAggregationSelection = {
  __typename?: 'WateringTaskChangeRequestChangerequests_requested_forAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<WateringTaskChangeRequestChangerequests_Requested_ForNodeAggregateSelection>;
};

export type WateringTaskChangeRequestChangerequests_Requested_ForNodeAggregateSelection = {
  __typename?: 'WateringTaskChangeRequestChangerequests_requested_forNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type WateringTaskChangeRequestChangerequests_Requested_New_TaskAggregationSelection = {
  __typename?: 'WateringTaskChangeRequestChangerequests_requested_new_taskAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<WateringTaskChangeRequestChangerequests_Requested_New_TaskNodeAggregateSelection>;
};

export type WateringTaskChangeRequestChangerequests_Requested_New_TaskNodeAggregateSelection = {
  __typename?: 'WateringTaskChangeRequestChangerequests_requested_new_taskNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type WateringTaskChangerequests_Requested_ForAggregateInput = {
  AND?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForAggregateInput>>;
  OR?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<WateringTaskChangerequests_Requested_ForNodeAggregationWhereInput>;
};

export type WateringTaskChangerequests_Requested_ForConnectFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestConnectInput>>;
  where?: InputMaybe<ChangeRequestConnectWhere>;
};

export type WateringTaskChangerequests_Requested_ForConnection = {
  __typename?: 'WateringTaskChangerequests_requested_forConnection';
  edges: Array<WateringTaskChangerequests_Requested_ForRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringTaskChangerequests_Requested_ForConnectionSort = {
  node?: InputMaybe<ChangeRequestSort>;
};

export type WateringTaskChangerequests_Requested_ForConnectionWhere = {
  AND?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForConnectionWhere>>;
  OR?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForConnectionWhere>>;
  node?: InputMaybe<ChangeRequestWhere>;
  node_NOT?: InputMaybe<ChangeRequestWhere>;
};

export type WateringTaskChangerequests_Requested_ForCreateFieldInput = {
  node: ChangeRequestCreateInput;
};

export type WateringTaskChangerequests_Requested_ForDeleteFieldInput = {
  delete?: InputMaybe<ChangeRequestDeleteInput>;
  where?: InputMaybe<WateringTaskChangerequests_Requested_ForConnectionWhere>;
};

export type WateringTaskChangerequests_Requested_ForDisconnectFieldInput = {
  disconnect?: InputMaybe<ChangeRequestDisconnectInput>;
  where?: InputMaybe<WateringTaskChangerequests_Requested_ForConnectionWhere>;
};

export type WateringTaskChangerequests_Requested_ForFieldInput = {
  connect?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForCreateFieldInput>>;
};

export type WateringTaskChangerequests_Requested_ForNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type WateringTaskChangerequests_Requested_ForRelationship = {
  __typename?: 'WateringTaskChangerequests_requested_forRelationship';
  cursor: Scalars['String'];
  node: ChangeRequest;
};

export type WateringTaskChangerequests_Requested_ForUpdateConnectionInput = {
  node?: InputMaybe<ChangeRequestUpdateInput>;
};

export type WateringTaskChangerequests_Requested_ForUpdateFieldInput = {
  connect?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForCreateFieldInput>>;
  delete?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForDisconnectFieldInput>>;
  update?: InputMaybe<WateringTaskChangerequests_Requested_ForUpdateConnectionInput>;
  where?: InputMaybe<WateringTaskChangerequests_Requested_ForConnectionWhere>;
};

export type WateringTaskChangerequests_Requested_New_TaskAggregateInput = {
  AND?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskAggregateInput>>;
  OR?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskNodeAggregationWhereInput>;
};

export type WateringTaskChangerequests_Requested_New_TaskConnectFieldInput = {
  connect?: InputMaybe<Array<ChangeRequestConnectInput>>;
  where?: InputMaybe<ChangeRequestConnectWhere>;
};

export type WateringTaskChangerequests_Requested_New_TaskConnection = {
  __typename?: 'WateringTaskChangerequests_requested_new_taskConnection';
  edges: Array<WateringTaskChangerequests_Requested_New_TaskRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringTaskChangerequests_Requested_New_TaskConnectionSort = {
  node?: InputMaybe<ChangeRequestSort>;
};

export type WateringTaskChangerequests_Requested_New_TaskConnectionWhere = {
  AND?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>>;
  OR?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>>;
  node?: InputMaybe<ChangeRequestWhere>;
  node_NOT?: InputMaybe<ChangeRequestWhere>;
};

export type WateringTaskChangerequests_Requested_New_TaskCreateFieldInput = {
  node: ChangeRequestCreateInput;
};

export type WateringTaskChangerequests_Requested_New_TaskDeleteFieldInput = {
  delete?: InputMaybe<ChangeRequestDeleteInput>;
  where?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>;
};

export type WateringTaskChangerequests_Requested_New_TaskDisconnectFieldInput = {
  disconnect?: InputMaybe<ChangeRequestDisconnectInput>;
  where?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>;
};

export type WateringTaskChangerequests_Requested_New_TaskFieldInput = {
  connect?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskCreateFieldInput>>;
};

export type WateringTaskChangerequests_Requested_New_TaskNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type WateringTaskChangerequests_Requested_New_TaskRelationship = {
  __typename?: 'WateringTaskChangerequests_requested_new_taskRelationship';
  cursor: Scalars['String'];
  node: ChangeRequest;
};

export type WateringTaskChangerequests_Requested_New_TaskUpdateConnectionInput = {
  node?: InputMaybe<ChangeRequestUpdateInput>;
};

export type WateringTaskChangerequests_Requested_New_TaskUpdateFieldInput = {
  connect?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskCreateFieldInput>>;
  delete?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskDisconnectFieldInput>>;
  update?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskUpdateConnectionInput>;
  where?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>;
};

export type WateringTaskConnectInput = {
  changerequests_requested_for?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForConnectFieldInput>>;
  changerequests_requested_new_task?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskConnectFieldInput>>;
  logevents_refers_to?: InputMaybe<Array<WateringTaskLogevents_Refers_ToConnectFieldInput>>;
  users_assigned?: InputMaybe<Array<WateringTaskUsers_AssignedConnectFieldInput>>;
  users_available?: InputMaybe<Array<WateringTaskUsers_AvailableConnectFieldInput>>;
  wateringperiod?: InputMaybe<Array<WateringTaskWateringperiodConnectFieldInput>>;
};

export type WateringTaskConnectWhere = {
  node: WateringTaskWhere;
};

export type WateringTaskCreateInput = {
  _id: Scalars['ID'];
  changerequests_requested_for?: InputMaybe<WateringTaskChangerequests_Requested_ForFieldInput>;
  changerequests_requested_new_task?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskFieldInput>;
  date: Scalars['Date'];
  done?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  logevents_refers_to?: InputMaybe<WateringTaskLogevents_Refers_ToFieldInput>;
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
  users_assigned?: InputMaybe<WateringTaskUsers_AssignedFieldInput>;
  users_available?: InputMaybe<WateringTaskUsers_AvailableFieldInput>;
  wateringperiod?: InputMaybe<WateringTaskWateringperiodFieldInput>;
};

export type WateringTaskDeleteInput = {
  changerequests_requested_for?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForDeleteFieldInput>>;
  changerequests_requested_new_task?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskDeleteFieldInput>>;
  logevents_refers_to?: InputMaybe<Array<WateringTaskLogevents_Refers_ToDeleteFieldInput>>;
  users_assigned?: InputMaybe<Array<WateringTaskUsers_AssignedDeleteFieldInput>>;
  users_available?: InputMaybe<Array<WateringTaskUsers_AvailableDeleteFieldInput>>;
  wateringperiod?: InputMaybe<Array<WateringTaskWateringperiodDeleteFieldInput>>;
};

export type WateringTaskDisconnectInput = {
  changerequests_requested_for?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForDisconnectFieldInput>>;
  changerequests_requested_new_task?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskDisconnectFieldInput>>;
  logevents_refers_to?: InputMaybe<Array<WateringTaskLogevents_Refers_ToDisconnectFieldInput>>;
  users_assigned?: InputMaybe<Array<WateringTaskUsers_AssignedDisconnectFieldInput>>;
  users_available?: InputMaybe<Array<WateringTaskUsers_AvailableDisconnectFieldInput>>;
  wateringperiod?: InputMaybe<Array<WateringTaskWateringperiodDisconnectFieldInput>>;
};

export type WateringTaskEdge = {
  __typename?: 'WateringTaskEdge';
  cursor: Scalars['String'];
  node: WateringTask;
};

export type WateringTaskLogEventLogevents_Refers_ToAggregationSelection = {
  __typename?: 'WateringTaskLogEventLogevents_refers_toAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<WateringTaskLogEventLogevents_Refers_ToNodeAggregateSelection>;
};

export type WateringTaskLogEventLogevents_Refers_ToNodeAggregateSelection = {
  __typename?: 'WateringTaskLogEventLogevents_refers_toNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  date: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type WateringTaskLogevents_Refers_ToAggregateInput = {
  AND?: InputMaybe<Array<WateringTaskLogevents_Refers_ToAggregateInput>>;
  OR?: InputMaybe<Array<WateringTaskLogevents_Refers_ToAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<WateringTaskLogevents_Refers_ToNodeAggregationWhereInput>;
};

export type WateringTaskLogevents_Refers_ToConnectFieldInput = {
  connect?: InputMaybe<Array<LogEventConnectInput>>;
  where?: InputMaybe<LogEventConnectWhere>;
};

export type WateringTaskLogevents_Refers_ToConnection = {
  __typename?: 'WateringTaskLogevents_refers_toConnection';
  edges: Array<WateringTaskLogevents_Refers_ToRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringTaskLogevents_Refers_ToConnectionSort = {
  node?: InputMaybe<LogEventSort>;
};

export type WateringTaskLogevents_Refers_ToConnectionWhere = {
  AND?: InputMaybe<Array<WateringTaskLogevents_Refers_ToConnectionWhere>>;
  OR?: InputMaybe<Array<WateringTaskLogevents_Refers_ToConnectionWhere>>;
  node?: InputMaybe<LogEventWhere>;
  node_NOT?: InputMaybe<LogEventWhere>;
};

export type WateringTaskLogevents_Refers_ToCreateFieldInput = {
  node: LogEventCreateInput;
};

export type WateringTaskLogevents_Refers_ToDeleteFieldInput = {
  delete?: InputMaybe<LogEventDeleteInput>;
  where?: InputMaybe<WateringTaskLogevents_Refers_ToConnectionWhere>;
};

export type WateringTaskLogevents_Refers_ToDisconnectFieldInput = {
  disconnect?: InputMaybe<LogEventDisconnectInput>;
  where?: InputMaybe<WateringTaskLogevents_Refers_ToConnectionWhere>;
};

export type WateringTaskLogevents_Refers_ToFieldInput = {
  connect?: InputMaybe<Array<WateringTaskLogevents_Refers_ToConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskLogevents_Refers_ToCreateFieldInput>>;
};

export type WateringTaskLogevents_Refers_ToNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WateringTaskLogevents_Refers_ToNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WateringTaskLogevents_Refers_ToNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  date_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  date_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  date_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  date_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  date_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  date_EQUAL?: InputMaybe<Scalars['String']>;
  date_GT?: InputMaybe<Scalars['Int']>;
  date_GTE?: InputMaybe<Scalars['Int']>;
  date_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  date_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  date_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  date_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  date_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  date_LT?: InputMaybe<Scalars['Int']>;
  date_LTE?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  date_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type WateringTaskLogevents_Refers_ToRelationship = {
  __typename?: 'WateringTaskLogevents_refers_toRelationship';
  cursor: Scalars['String'];
  node: LogEvent;
};

export type WateringTaskLogevents_Refers_ToUpdateConnectionInput = {
  node?: InputMaybe<LogEventUpdateInput>;
};

export type WateringTaskLogevents_Refers_ToUpdateFieldInput = {
  connect?: InputMaybe<Array<WateringTaskLogevents_Refers_ToConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskLogevents_Refers_ToCreateFieldInput>>;
  delete?: InputMaybe<Array<WateringTaskLogevents_Refers_ToDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<WateringTaskLogevents_Refers_ToDisconnectFieldInput>>;
  update?: InputMaybe<WateringTaskLogevents_Refers_ToUpdateConnectionInput>;
  where?: InputMaybe<WateringTaskLogevents_Refers_ToConnectionWhere>;
};

export type WateringTaskOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more WateringTaskSort objects to sort WateringTasks by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<WateringTaskSort>>;
};

export type WateringTaskRelationInput = {
  changerequests_requested_for?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForCreateFieldInput>>;
  changerequests_requested_new_task?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskCreateFieldInput>>;
  logevents_refers_to?: InputMaybe<Array<WateringTaskLogevents_Refers_ToCreateFieldInput>>;
  users_assigned?: InputMaybe<Array<WateringTaskUsers_AssignedCreateFieldInput>>;
  users_available?: InputMaybe<Array<WateringTaskUsers_AvailableCreateFieldInput>>;
  wateringperiod?: InputMaybe<Array<WateringTaskWateringperiodCreateFieldInput>>;
};

/** Fields to sort WateringTasks by. The order in which sorts are applied is not guaranteed when specifying many fields in one WateringTaskSort object. */
export type WateringTaskSort = {
  _id?: InputMaybe<SortDirection>;
  date?: InputMaybe<SortDirection>;
  done?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
  neo4jImportId?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type WateringTaskUpdateInput = {
  _id?: InputMaybe<Scalars['ID']>;
  changerequests_requested_for?: InputMaybe<Array<WateringTaskChangerequests_Requested_ForUpdateFieldInput>>;
  changerequests_requested_new_task?: InputMaybe<Array<WateringTaskChangerequests_Requested_New_TaskUpdateFieldInput>>;
  date?: InputMaybe<Scalars['Date']>;
  done?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  logevents_refers_to?: InputMaybe<Array<WateringTaskLogevents_Refers_ToUpdateFieldInput>>;
  neo4jImportId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  users_assigned?: InputMaybe<Array<WateringTaskUsers_AssignedUpdateFieldInput>>;
  users_available?: InputMaybe<Array<WateringTaskUsers_AvailableUpdateFieldInput>>;
  wateringperiod?: InputMaybe<Array<WateringTaskWateringperiodUpdateFieldInput>>;
};

export type WateringTaskUserUsers_AssignedAggregationSelection = {
  __typename?: 'WateringTaskUserUsers_assignedAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<WateringTaskUserUsers_AssignedNodeAggregateSelection>;
};

export type WateringTaskUserUsers_AssignedNodeAggregateSelection = {
  __typename?: 'WateringTaskUserUsers_assignedNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  id: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type WateringTaskUserUsers_AvailableAggregationSelection = {
  __typename?: 'WateringTaskUserUsers_availableAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<WateringTaskUserUsers_AvailableNodeAggregateSelection>;
};

export type WateringTaskUserUsers_AvailableNodeAggregateSelection = {
  __typename?: 'WateringTaskUserUsers_availableNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
  id: StringAggregateSelectionNonNullable;
  label: StringAggregateSelectionNonNullable;
  neo4jImportId: StringAggregateSelectionNonNullable;
  type: StringAggregateSelectionNonNullable;
};

export type WateringTaskUsers_AssignedAggregateInput = {
  AND?: InputMaybe<Array<WateringTaskUsers_AssignedAggregateInput>>;
  OR?: InputMaybe<Array<WateringTaskUsers_AssignedAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<WateringTaskUsers_AssignedNodeAggregationWhereInput>;
};

export type WateringTaskUsers_AssignedConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>;
  where?: InputMaybe<UserConnectWhere>;
};

export type WateringTaskUsers_AssignedConnection = {
  __typename?: 'WateringTaskUsers_assignedConnection';
  edges: Array<WateringTaskUsers_AssignedRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringTaskUsers_AssignedConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type WateringTaskUsers_AssignedConnectionWhere = {
  AND?: InputMaybe<Array<WateringTaskUsers_AssignedConnectionWhere>>;
  OR?: InputMaybe<Array<WateringTaskUsers_AssignedConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
};

export type WateringTaskUsers_AssignedCreateFieldInput = {
  node: UserCreateInput;
};

export type WateringTaskUsers_AssignedDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<WateringTaskUsers_AssignedConnectionWhere>;
};

export type WateringTaskUsers_AssignedDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<WateringTaskUsers_AssignedConnectionWhere>;
};

export type WateringTaskUsers_AssignedFieldInput = {
  connect?: InputMaybe<Array<WateringTaskUsers_AssignedConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskUsers_AssignedCreateFieldInput>>;
};

export type WateringTaskUsers_AssignedNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WateringTaskUsers_AssignedNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WateringTaskUsers_AssignedNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  id_EQUAL?: InputMaybe<Scalars['String']>;
  id_GT?: InputMaybe<Scalars['Int']>;
  id_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  id_LT?: InputMaybe<Scalars['Int']>;
  id_LTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type WateringTaskUsers_AssignedRelationship = {
  __typename?: 'WateringTaskUsers_assignedRelationship';
  cursor: Scalars['String'];
  node: User;
};

export type WateringTaskUsers_AssignedUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type WateringTaskUsers_AssignedUpdateFieldInput = {
  connect?: InputMaybe<Array<WateringTaskUsers_AssignedConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskUsers_AssignedCreateFieldInput>>;
  delete?: InputMaybe<Array<WateringTaskUsers_AssignedDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<WateringTaskUsers_AssignedDisconnectFieldInput>>;
  update?: InputMaybe<WateringTaskUsers_AssignedUpdateConnectionInput>;
  where?: InputMaybe<WateringTaskUsers_AssignedConnectionWhere>;
};

export type WateringTaskUsers_AvailableAggregateInput = {
  AND?: InputMaybe<Array<WateringTaskUsers_AvailableAggregateInput>>;
  OR?: InputMaybe<Array<WateringTaskUsers_AvailableAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<WateringTaskUsers_AvailableNodeAggregationWhereInput>;
};

export type WateringTaskUsers_AvailableConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>;
  where?: InputMaybe<UserConnectWhere>;
};

export type WateringTaskUsers_AvailableConnection = {
  __typename?: 'WateringTaskUsers_availableConnection';
  edges: Array<WateringTaskUsers_AvailableRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringTaskUsers_AvailableConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type WateringTaskUsers_AvailableConnectionWhere = {
  AND?: InputMaybe<Array<WateringTaskUsers_AvailableConnectionWhere>>;
  OR?: InputMaybe<Array<WateringTaskUsers_AvailableConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
};

export type WateringTaskUsers_AvailableCreateFieldInput = {
  node: UserCreateInput;
};

export type WateringTaskUsers_AvailableDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<WateringTaskUsers_AvailableConnectionWhere>;
};

export type WateringTaskUsers_AvailableDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<WateringTaskUsers_AvailableConnectionWhere>;
};

export type WateringTaskUsers_AvailableFieldInput = {
  connect?: InputMaybe<Array<WateringTaskUsers_AvailableConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskUsers_AvailableCreateFieldInput>>;
};

export type WateringTaskUsers_AvailableNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WateringTaskUsers_AvailableNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WateringTaskUsers_AvailableNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
  id_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  id_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  id_EQUAL?: InputMaybe<Scalars['String']>;
  id_GT?: InputMaybe<Scalars['Int']>;
  id_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  id_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  id_LT?: InputMaybe<Scalars['Int']>;
  id_LTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  id_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  label_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  label_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  label_EQUAL?: InputMaybe<Scalars['String']>;
  label_GT?: InputMaybe<Scalars['Int']>;
  label_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  label_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  label_LT?: InputMaybe<Scalars['Int']>;
  label_LTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  label_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  neo4jImportId_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  neo4jImportId_EQUAL?: InputMaybe<Scalars['String']>;
  neo4jImportId_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_LTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  neo4jImportId_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
  type_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  type_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  type_EQUAL?: InputMaybe<Scalars['String']>;
  type_GT?: InputMaybe<Scalars['Int']>;
  type_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  type_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  type_LT?: InputMaybe<Scalars['Int']>;
  type_LTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  type_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type WateringTaskUsers_AvailableRelationship = {
  __typename?: 'WateringTaskUsers_availableRelationship';
  cursor: Scalars['String'];
  node: User;
};

export type WateringTaskUsers_AvailableUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type WateringTaskUsers_AvailableUpdateFieldInput = {
  connect?: InputMaybe<Array<WateringTaskUsers_AvailableConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskUsers_AvailableCreateFieldInput>>;
  delete?: InputMaybe<Array<WateringTaskUsers_AvailableDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<WateringTaskUsers_AvailableDisconnectFieldInput>>;
  update?: InputMaybe<WateringTaskUsers_AvailableUpdateConnectionInput>;
  where?: InputMaybe<WateringTaskUsers_AvailableConnectionWhere>;
};

export type WateringTaskWateringPeriodWateringperiodAggregationSelection = {
  __typename?: 'WateringTaskWateringPeriodWateringperiodAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<WateringTaskWateringPeriodWateringperiodNodeAggregateSelection>;
};

export type WateringTaskWateringPeriodWateringperiodNodeAggregateSelection = {
  __typename?: 'WateringTaskWateringPeriodWateringperiodNodeAggregateSelection';
  _id: IdAggregateSelectionNonNullable;
};

export type WateringTaskWateringperiodAggregateInput = {
  AND?: InputMaybe<Array<WateringTaskWateringperiodAggregateInput>>;
  OR?: InputMaybe<Array<WateringTaskWateringperiodAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<WateringTaskWateringperiodNodeAggregationWhereInput>;
};

export type WateringTaskWateringperiodConnectFieldInput = {
  connect?: InputMaybe<Array<WateringPeriodConnectInput>>;
  where?: InputMaybe<WateringPeriodConnectWhere>;
};

export type WateringTaskWateringperiodConnection = {
  __typename?: 'WateringTaskWateringperiodConnection';
  edges: Array<WateringTaskWateringperiodRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WateringTaskWateringperiodConnectionSort = {
  node?: InputMaybe<WateringPeriodSort>;
};

export type WateringTaskWateringperiodConnectionWhere = {
  AND?: InputMaybe<Array<WateringTaskWateringperiodConnectionWhere>>;
  OR?: InputMaybe<Array<WateringTaskWateringperiodConnectionWhere>>;
  node?: InputMaybe<WateringPeriodWhere>;
  node_NOT?: InputMaybe<WateringPeriodWhere>;
};

export type WateringTaskWateringperiodCreateFieldInput = {
  node: WateringPeriodCreateInput;
};

export type WateringTaskWateringperiodDeleteFieldInput = {
  delete?: InputMaybe<WateringPeriodDeleteInput>;
  where?: InputMaybe<WateringTaskWateringperiodConnectionWhere>;
};

export type WateringTaskWateringperiodDisconnectFieldInput = {
  disconnect?: InputMaybe<WateringPeriodDisconnectInput>;
  where?: InputMaybe<WateringTaskWateringperiodConnectionWhere>;
};

export type WateringTaskWateringperiodFieldInput = {
  connect?: InputMaybe<Array<WateringTaskWateringperiodConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskWateringperiodCreateFieldInput>>;
};

export type WateringTaskWateringperiodNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WateringTaskWateringperiodNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WateringTaskWateringperiodNodeAggregationWhereInput>>;
  _id_EQUAL?: InputMaybe<Scalars['ID']>;
};

export type WateringTaskWateringperiodRelationship = {
  __typename?: 'WateringTaskWateringperiodRelationship';
  cursor: Scalars['String'];
  node: WateringPeriod;
};

export type WateringTaskWateringperiodUpdateConnectionInput = {
  node?: InputMaybe<WateringPeriodUpdateInput>;
};

export type WateringTaskWateringperiodUpdateFieldInput = {
  connect?: InputMaybe<Array<WateringTaskWateringperiodConnectFieldInput>>;
  create?: InputMaybe<Array<WateringTaskWateringperiodCreateFieldInput>>;
  delete?: InputMaybe<Array<WateringTaskWateringperiodDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<WateringTaskWateringperiodDisconnectFieldInput>>;
  update?: InputMaybe<WateringTaskWateringperiodUpdateConnectionInput>;
  where?: InputMaybe<WateringTaskWateringperiodConnectionWhere>;
};

export type WateringTaskWhere = {
  AND?: InputMaybe<Array<WateringTaskWhere>>;
  OR?: InputMaybe<Array<WateringTaskWhere>>;
  _id?: InputMaybe<Scalars['ID']>;
  _id_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT?: InputMaybe<Scalars['ID']>;
  _id_NOT_CONTAINS?: InputMaybe<Scalars['ID']>;
  _id_NOT_ENDS_WITH?: InputMaybe<Scalars['ID']>;
  _id_NOT_IN?: InputMaybe<Array<Scalars['ID']>>;
  _id_NOT_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  _id_STARTS_WITH?: InputMaybe<Scalars['ID']>;
  changerequests_requested_forAggregate?: InputMaybe<WateringTaskChangerequests_Requested_ForAggregateInput>;
  changerequests_requested_forConnection_ALL?: InputMaybe<WateringTaskChangerequests_Requested_ForConnectionWhere>;
  changerequests_requested_forConnection_NONE?: InputMaybe<WateringTaskChangerequests_Requested_ForConnectionWhere>;
  changerequests_requested_forConnection_SINGLE?: InputMaybe<WateringTaskChangerequests_Requested_ForConnectionWhere>;
  changerequests_requested_forConnection_SOME?: InputMaybe<WateringTaskChangerequests_Requested_ForConnectionWhere>;
  /** Return WateringTasks where all of the related ChangeRequests match this filter */
  changerequests_requested_for_ALL?: InputMaybe<ChangeRequestWhere>;
  /** Return WateringTasks where none of the related ChangeRequests match this filter */
  changerequests_requested_for_NONE?: InputMaybe<ChangeRequestWhere>;
  /** Return WateringTasks where one of the related ChangeRequests match this filter */
  changerequests_requested_for_SINGLE?: InputMaybe<ChangeRequestWhere>;
  /** Return WateringTasks where some of the related ChangeRequests match this filter */
  changerequests_requested_for_SOME?: InputMaybe<ChangeRequestWhere>;
  changerequests_requested_new_taskAggregate?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskAggregateInput>;
  changerequests_requested_new_taskConnection_ALL?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>;
  changerequests_requested_new_taskConnection_NONE?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>;
  changerequests_requested_new_taskConnection_SINGLE?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>;
  changerequests_requested_new_taskConnection_SOME?: InputMaybe<WateringTaskChangerequests_Requested_New_TaskConnectionWhere>;
  /** Return WateringTasks where all of the related ChangeRequests match this filter */
  changerequests_requested_new_task_ALL?: InputMaybe<ChangeRequestWhere>;
  /** Return WateringTasks where none of the related ChangeRequests match this filter */
  changerequests_requested_new_task_NONE?: InputMaybe<ChangeRequestWhere>;
  /** Return WateringTasks where one of the related ChangeRequests match this filter */
  changerequests_requested_new_task_SINGLE?: InputMaybe<ChangeRequestWhere>;
  /** Return WateringTasks where some of the related ChangeRequests match this filter */
  changerequests_requested_new_task_SOME?: InputMaybe<ChangeRequestWhere>;
  date?: InputMaybe<Scalars['Date']>;
  date_GT?: InputMaybe<Scalars['Date']>;
  date_GTE?: InputMaybe<Scalars['Date']>;
  date_IN?: InputMaybe<Array<Scalars['Date']>>;
  date_LT?: InputMaybe<Scalars['Date']>;
  date_LTE?: InputMaybe<Scalars['Date']>;
  date_NOT?: InputMaybe<Scalars['Date']>;
  date_NOT_IN?: InputMaybe<Array<Scalars['Date']>>;
  done?: InputMaybe<Scalars['Boolean']>;
  done_NOT?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  label_CONTAINS?: InputMaybe<Scalars['String']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label_NOT?: InputMaybe<Scalars['String']>;
  label_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  label_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  label_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  label_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']>;
  logevents_refers_toAggregate?: InputMaybe<WateringTaskLogevents_Refers_ToAggregateInput>;
  logevents_refers_toConnection_ALL?: InputMaybe<WateringTaskLogevents_Refers_ToConnectionWhere>;
  logevents_refers_toConnection_NONE?: InputMaybe<WateringTaskLogevents_Refers_ToConnectionWhere>;
  logevents_refers_toConnection_SINGLE?: InputMaybe<WateringTaskLogevents_Refers_ToConnectionWhere>;
  logevents_refers_toConnection_SOME?: InputMaybe<WateringTaskLogevents_Refers_ToConnectionWhere>;
  /** Return WateringTasks where all of the related LogEvents match this filter */
  logevents_refers_to_ALL?: InputMaybe<LogEventWhere>;
  /** Return WateringTasks where none of the related LogEvents match this filter */
  logevents_refers_to_NONE?: InputMaybe<LogEventWhere>;
  /** Return WateringTasks where one of the related LogEvents match this filter */
  logevents_refers_to_SINGLE?: InputMaybe<LogEventWhere>;
  /** Return WateringTasks where some of the related LogEvents match this filter */
  logevents_refers_to_SOME?: InputMaybe<LogEventWhere>;
  neo4jImportId?: InputMaybe<Scalars['String']>;
  neo4jImportId_CONTAINS?: InputMaybe<Scalars['String']>;
  neo4jImportId_ENDS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_IN?: InputMaybe<Array<Scalars['String']>>;
  neo4jImportId_NOT?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  neo4jImportId_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  neo4jImportId_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_CONTAINS?: InputMaybe<Scalars['String']>;
  type_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_IN?: InputMaybe<Array<Scalars['String']>>;
  type_NOT?: InputMaybe<Scalars['String']>;
  type_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  type_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  type_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  type_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  type_STARTS_WITH?: InputMaybe<Scalars['String']>;
  users_assignedAggregate?: InputMaybe<WateringTaskUsers_AssignedAggregateInput>;
  users_assignedConnection_ALL?: InputMaybe<WateringTaskUsers_AssignedConnectionWhere>;
  users_assignedConnection_NONE?: InputMaybe<WateringTaskUsers_AssignedConnectionWhere>;
  users_assignedConnection_SINGLE?: InputMaybe<WateringTaskUsers_AssignedConnectionWhere>;
  users_assignedConnection_SOME?: InputMaybe<WateringTaskUsers_AssignedConnectionWhere>;
  /** Return WateringTasks where all of the related Users match this filter */
  users_assigned_ALL?: InputMaybe<UserWhere>;
  /** Return WateringTasks where none of the related Users match this filter */
  users_assigned_NONE?: InputMaybe<UserWhere>;
  /** Return WateringTasks where one of the related Users match this filter */
  users_assigned_SINGLE?: InputMaybe<UserWhere>;
  /** Return WateringTasks where some of the related Users match this filter */
  users_assigned_SOME?: InputMaybe<UserWhere>;
  users_availableAggregate?: InputMaybe<WateringTaskUsers_AvailableAggregateInput>;
  users_availableConnection_ALL?: InputMaybe<WateringTaskUsers_AvailableConnectionWhere>;
  users_availableConnection_NONE?: InputMaybe<WateringTaskUsers_AvailableConnectionWhere>;
  users_availableConnection_SINGLE?: InputMaybe<WateringTaskUsers_AvailableConnectionWhere>;
  users_availableConnection_SOME?: InputMaybe<WateringTaskUsers_AvailableConnectionWhere>;
  /** Return WateringTasks where all of the related Users match this filter */
  users_available_ALL?: InputMaybe<UserWhere>;
  /** Return WateringTasks where none of the related Users match this filter */
  users_available_NONE?: InputMaybe<UserWhere>;
  /** Return WateringTasks where one of the related Users match this filter */
  users_available_SINGLE?: InputMaybe<UserWhere>;
  /** Return WateringTasks where some of the related Users match this filter */
  users_available_SOME?: InputMaybe<UserWhere>;
  wateringperiodAggregate?: InputMaybe<WateringTaskWateringperiodAggregateInput>;
  wateringperiodConnection_ALL?: InputMaybe<WateringTaskWateringperiodConnectionWhere>;
  wateringperiodConnection_NONE?: InputMaybe<WateringTaskWateringperiodConnectionWhere>;
  wateringperiodConnection_SINGLE?: InputMaybe<WateringTaskWateringperiodConnectionWhere>;
  wateringperiodConnection_SOME?: InputMaybe<WateringTaskWateringperiodConnectionWhere>;
  /** Return WateringTasks where all of the related WateringPeriods match this filter */
  wateringperiod_ALL?: InputMaybe<WateringPeriodWhere>;
  /** Return WateringTasks where none of the related WateringPeriods match this filter */
  wateringperiod_NONE?: InputMaybe<WateringPeriodWhere>;
  /** Return WateringTasks where one of the related WateringPeriods match this filter */
  wateringperiod_SINGLE?: InputMaybe<WateringPeriodWhere>;
  /** Return WateringTasks where some of the related WateringPeriods match this filter */
  wateringperiod_SOME?: InputMaybe<WateringPeriodWhere>;
};

export type WateringTasksConnection = {
  __typename?: 'WateringTasksConnection';
  edges: Array<WateringTaskEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CategoriesConnection: ResolverTypeWrapper<CategoriesConnection>;
  Category: ResolverTypeWrapper<Category>;
  CategoryAggregateSelection: ResolverTypeWrapper<CategoryAggregateSelection>;
  CategoryCategoryChildCategoriesAggregationSelection: ResolverTypeWrapper<CategoryCategoryChildCategoriesAggregationSelection>;
  CategoryCategoryChildCategoriesNodeAggregateSelection: ResolverTypeWrapper<CategoryCategoryChildCategoriesNodeAggregateSelection>;
  CategoryCategoryParentCategoryAggregationSelection: ResolverTypeWrapper<CategoryCategoryParentCategoryAggregationSelection>;
  CategoryCategoryParentCategoryNodeAggregateSelection: ResolverTypeWrapper<CategoryCategoryParentCategoryNodeAggregateSelection>;
  CategoryChildCategoriesAggregateInput: CategoryChildCategoriesAggregateInput;
  CategoryChildCategoriesConnectFieldInput: CategoryChildCategoriesConnectFieldInput;
  CategoryChildCategoriesConnection: ResolverTypeWrapper<CategoryChildCategoriesConnection>;
  CategoryChildCategoriesConnectionSort: CategoryChildCategoriesConnectionSort;
  CategoryChildCategoriesConnectionWhere: CategoryChildCategoriesConnectionWhere;
  CategoryChildCategoriesCreateFieldInput: CategoryChildCategoriesCreateFieldInput;
  CategoryChildCategoriesDeleteFieldInput: CategoryChildCategoriesDeleteFieldInput;
  CategoryChildCategoriesDisconnectFieldInput: CategoryChildCategoriesDisconnectFieldInput;
  CategoryChildCategoriesFieldInput: CategoryChildCategoriesFieldInput;
  CategoryChildCategoriesNodeAggregationWhereInput: CategoryChildCategoriesNodeAggregationWhereInput;
  CategoryChildCategoriesRelationship: ResolverTypeWrapper<CategoryChildCategoriesRelationship>;
  CategoryChildCategoriesUpdateConnectionInput: CategoryChildCategoriesUpdateConnectionInput;
  CategoryChildCategoriesUpdateFieldInput: CategoryChildCategoriesUpdateFieldInput;
  CategoryConnectInput: CategoryConnectInput;
  CategoryConnectWhere: CategoryConnectWhere;
  CategoryCreateInput: CategoryCreateInput;
  CategoryDeleteInput: CategoryDeleteInput;
  CategoryDisconnectInput: CategoryDisconnectInput;
  CategoryEdge: ResolverTypeWrapper<CategoryEdge>;
  CategoryOptions: CategoryOptions;
  CategoryParentCategoryAggregateInput: CategoryParentCategoryAggregateInput;
  CategoryParentCategoryConnectFieldInput: CategoryParentCategoryConnectFieldInput;
  CategoryParentCategoryConnection: ResolverTypeWrapper<CategoryParentCategoryConnection>;
  CategoryParentCategoryConnectionSort: CategoryParentCategoryConnectionSort;
  CategoryParentCategoryConnectionWhere: CategoryParentCategoryConnectionWhere;
  CategoryParentCategoryCreateFieldInput: CategoryParentCategoryCreateFieldInput;
  CategoryParentCategoryDeleteFieldInput: CategoryParentCategoryDeleteFieldInput;
  CategoryParentCategoryDisconnectFieldInput: CategoryParentCategoryDisconnectFieldInput;
  CategoryParentCategoryFieldInput: CategoryParentCategoryFieldInput;
  CategoryParentCategoryNodeAggregationWhereInput: CategoryParentCategoryNodeAggregationWhereInput;
  CategoryParentCategoryRelationship: ResolverTypeWrapper<CategoryParentCategoryRelationship>;
  CategoryParentCategoryUpdateConnectionInput: CategoryParentCategoryUpdateConnectionInput;
  CategoryParentCategoryUpdateFieldInput: CategoryParentCategoryUpdateFieldInput;
  CategoryPlantSpeciesSpeciesAggregationSelection: ResolverTypeWrapper<CategoryPlantSpeciesSpeciesAggregationSelection>;
  CategoryPlantSpeciesSpeciesNodeAggregateSelection: ResolverTypeWrapper<CategoryPlantSpeciesSpeciesNodeAggregateSelection>;
  CategoryRelationInput: CategoryRelationInput;
  CategorySort: CategorySort;
  CategorySpeciesAggregateInput: CategorySpeciesAggregateInput;
  CategorySpeciesConnectFieldInput: CategorySpeciesConnectFieldInput;
  CategorySpeciesConnection: ResolverTypeWrapper<CategorySpeciesConnection>;
  CategorySpeciesConnectionSort: CategorySpeciesConnectionSort;
  CategorySpeciesConnectionWhere: CategorySpeciesConnectionWhere;
  CategorySpeciesCreateFieldInput: CategorySpeciesCreateFieldInput;
  CategorySpeciesDeleteFieldInput: CategorySpeciesDeleteFieldInput;
  CategorySpeciesDisconnectFieldInput: CategorySpeciesDisconnectFieldInput;
  CategorySpeciesFieldInput: CategorySpeciesFieldInput;
  CategorySpeciesNodeAggregationWhereInput: CategorySpeciesNodeAggregationWhereInput;
  CategorySpeciesRelationship: ResolverTypeWrapper<CategorySpeciesRelationship>;
  CategorySpeciesUpdateConnectionInput: CategorySpeciesUpdateConnectionInput;
  CategorySpeciesUpdateFieldInput: CategorySpeciesUpdateFieldInput;
  CategoryUpdateInput: CategoryUpdateInput;
  CategoryWhere: CategoryWhere;
  ChangeRequest: ResolverTypeWrapper<ChangeRequest>;
  ChangeRequestAggregateSelection: ResolverTypeWrapper<ChangeRequestAggregateSelection>;
  ChangeRequestConnectInput: ChangeRequestConnectInput;
  ChangeRequestConnectWhere: ChangeRequestConnectWhere;
  ChangeRequestCreateInput: ChangeRequestCreateInput;
  ChangeRequestDeleteInput: ChangeRequestDeleteInput;
  ChangeRequestDisconnectInput: ChangeRequestDisconnectInput;
  ChangeRequestEdge: ResolverTypeWrapper<ChangeRequestEdge>;
  ChangeRequestOptions: ChangeRequestOptions;
  ChangeRequestRelationInput: ChangeRequestRelationInput;
  ChangeRequestRequested_byAggregateInput: ChangeRequestRequested_ByAggregateInput;
  ChangeRequestRequested_byConnectFieldInput: ChangeRequestRequested_ByConnectFieldInput;
  ChangeRequestRequested_byConnection: ResolverTypeWrapper<ChangeRequestRequested_ByConnection>;
  ChangeRequestRequested_byConnectionSort: ChangeRequestRequested_ByConnectionSort;
  ChangeRequestRequested_byConnectionWhere: ChangeRequestRequested_ByConnectionWhere;
  ChangeRequestRequested_byCreateFieldInput: ChangeRequestRequested_ByCreateFieldInput;
  ChangeRequestRequested_byDeleteFieldInput: ChangeRequestRequested_ByDeleteFieldInput;
  ChangeRequestRequested_byDisconnectFieldInput: ChangeRequestRequested_ByDisconnectFieldInput;
  ChangeRequestRequested_byFieldInput: ChangeRequestRequested_ByFieldInput;
  ChangeRequestRequested_byNodeAggregationWhereInput: ChangeRequestRequested_ByNodeAggregationWhereInput;
  ChangeRequestRequested_byRelationship: ResolverTypeWrapper<ChangeRequestRequested_ByRelationship>;
  ChangeRequestRequested_byUpdateConnectionInput: ChangeRequestRequested_ByUpdateConnectionInput;
  ChangeRequestRequested_byUpdateFieldInput: ChangeRequestRequested_ByUpdateFieldInput;
  ChangeRequestRequested_forAggregateInput: ChangeRequestRequested_ForAggregateInput;
  ChangeRequestRequested_forConnectFieldInput: ChangeRequestRequested_ForConnectFieldInput;
  ChangeRequestRequested_forConnection: ResolverTypeWrapper<ChangeRequestRequested_ForConnection>;
  ChangeRequestRequested_forConnectionSort: ChangeRequestRequested_ForConnectionSort;
  ChangeRequestRequested_forConnectionWhere: ChangeRequestRequested_ForConnectionWhere;
  ChangeRequestRequested_forCreateFieldInput: ChangeRequestRequested_ForCreateFieldInput;
  ChangeRequestRequested_forDeleteFieldInput: ChangeRequestRequested_ForDeleteFieldInput;
  ChangeRequestRequested_forDisconnectFieldInput: ChangeRequestRequested_ForDisconnectFieldInput;
  ChangeRequestRequested_forFieldInput: ChangeRequestRequested_ForFieldInput;
  ChangeRequestRequested_forNodeAggregationWhereInput: ChangeRequestRequested_ForNodeAggregationWhereInput;
  ChangeRequestRequested_forRelationship: ResolverTypeWrapper<ChangeRequestRequested_ForRelationship>;
  ChangeRequestRequested_forUpdateConnectionInput: ChangeRequestRequested_ForUpdateConnectionInput;
  ChangeRequestRequested_forUpdateFieldInput: ChangeRequestRequested_ForUpdateFieldInput;
  ChangeRequestRequested_new_taskAggregateInput: ChangeRequestRequested_New_TaskAggregateInput;
  ChangeRequestRequested_new_taskConnectFieldInput: ChangeRequestRequested_New_TaskConnectFieldInput;
  ChangeRequestRequested_new_taskConnection: ResolverTypeWrapper<ChangeRequestRequested_New_TaskConnection>;
  ChangeRequestRequested_new_taskConnectionSort: ChangeRequestRequested_New_TaskConnectionSort;
  ChangeRequestRequested_new_taskConnectionWhere: ChangeRequestRequested_New_TaskConnectionWhere;
  ChangeRequestRequested_new_taskCreateFieldInput: ChangeRequestRequested_New_TaskCreateFieldInput;
  ChangeRequestRequested_new_taskDeleteFieldInput: ChangeRequestRequested_New_TaskDeleteFieldInput;
  ChangeRequestRequested_new_taskDisconnectFieldInput: ChangeRequestRequested_New_TaskDisconnectFieldInput;
  ChangeRequestRequested_new_taskFieldInput: ChangeRequestRequested_New_TaskFieldInput;
  ChangeRequestRequested_new_taskNodeAggregationWhereInput: ChangeRequestRequested_New_TaskNodeAggregationWhereInput;
  ChangeRequestRequested_new_taskRelationship: ResolverTypeWrapper<ChangeRequestRequested_New_TaskRelationship>;
  ChangeRequestRequested_new_taskUpdateConnectionInput: ChangeRequestRequested_New_TaskUpdateConnectionInput;
  ChangeRequestRequested_new_taskUpdateFieldInput: ChangeRequestRequested_New_TaskUpdateFieldInput;
  ChangeRequestRequested_toAggregateInput: ChangeRequestRequested_ToAggregateInput;
  ChangeRequestRequested_toConnectFieldInput: ChangeRequestRequested_ToConnectFieldInput;
  ChangeRequestRequested_toConnection: ResolverTypeWrapper<ChangeRequestRequested_ToConnection>;
  ChangeRequestRequested_toConnectionSort: ChangeRequestRequested_ToConnectionSort;
  ChangeRequestRequested_toConnectionWhere: ChangeRequestRequested_ToConnectionWhere;
  ChangeRequestRequested_toCreateFieldInput: ChangeRequestRequested_ToCreateFieldInput;
  ChangeRequestRequested_toDeleteFieldInput: ChangeRequestRequested_ToDeleteFieldInput;
  ChangeRequestRequested_toDisconnectFieldInput: ChangeRequestRequested_ToDisconnectFieldInput;
  ChangeRequestRequested_toFieldInput: ChangeRequestRequested_ToFieldInput;
  ChangeRequestRequested_toNodeAggregationWhereInput: ChangeRequestRequested_ToNodeAggregationWhereInput;
  ChangeRequestRequested_toRelationship: ResolverTypeWrapper<ChangeRequestRequested_ToRelationship>;
  ChangeRequestRequested_toUpdateConnectionInput: ChangeRequestRequested_ToUpdateConnectionInput;
  ChangeRequestRequested_toUpdateFieldInput: ChangeRequestRequested_ToUpdateFieldInput;
  ChangeRequestSort: ChangeRequestSort;
  ChangeRequestUpdateInput: ChangeRequestUpdateInput;
  ChangeRequestUserRequested_byAggregationSelection: ResolverTypeWrapper<ChangeRequestUserRequested_ByAggregationSelection>;
  ChangeRequestUserRequested_byNodeAggregateSelection: ResolverTypeWrapper<ChangeRequestUserRequested_ByNodeAggregateSelection>;
  ChangeRequestUserRequested_toAggregationSelection: ResolverTypeWrapper<ChangeRequestUserRequested_ToAggregationSelection>;
  ChangeRequestUserRequested_toNodeAggregateSelection: ResolverTypeWrapper<ChangeRequestUserRequested_ToNodeAggregateSelection>;
  ChangeRequestWateringTaskRequested_forAggregationSelection: ResolverTypeWrapper<ChangeRequestWateringTaskRequested_ForAggregationSelection>;
  ChangeRequestWateringTaskRequested_forNodeAggregateSelection: ResolverTypeWrapper<ChangeRequestWateringTaskRequested_ForNodeAggregateSelection>;
  ChangeRequestWateringTaskRequested_new_taskAggregationSelection: ResolverTypeWrapper<ChangeRequestWateringTaskRequested_New_TaskAggregationSelection>;
  ChangeRequestWateringTaskRequested_new_taskNodeAggregateSelection: ResolverTypeWrapper<ChangeRequestWateringTaskRequested_New_TaskNodeAggregateSelection>;
  ChangeRequestWhere: ChangeRequestWhere;
  ChangeRequestsConnection: ResolverTypeWrapper<ChangeRequestsConnection>;
  Container: ResolverTypeWrapper<Container>;
  ContainerAggregateSelection: ResolverTypeWrapper<ContainerAggregateSelection>;
  ContainerConnectInput: ContainerConnectInput;
  ContainerConnectOrCreateInput: ContainerConnectOrCreateInput;
  ContainerConnectWhere: ContainerConnectWhere;
  ContainerCreateInput: ContainerCreateInput;
  ContainerDeleteInput: ContainerDeleteInput;
  ContainerDisconnectInput: ContainerDisconnectInput;
  ContainerEdge: ResolverTypeWrapper<ContainerEdge>;
  ContainerGardenFeatureStorageLocationAggregationSelection: ResolverTypeWrapper<ContainerGardenFeatureStorageLocationAggregationSelection>;
  ContainerGardenFeatureStorageLocationNodeAggregateSelection: ResolverTypeWrapper<ContainerGardenFeatureStorageLocationNodeAggregateSelection>;
  ContainerOptions: ContainerOptions;
  ContainerRelationInput: ContainerRelationInput;
  ContainerSort: ContainerSort;
  ContainerStorageLocationAggregateInput: ContainerStorageLocationAggregateInput;
  ContainerStorageLocationConnectFieldInput: ContainerStorageLocationConnectFieldInput;
  ContainerStorageLocationConnectOrCreateFieldInput: ContainerStorageLocationConnectOrCreateFieldInput;
  ContainerStorageLocationConnectOrCreateFieldInputOnCreate: ContainerStorageLocationConnectOrCreateFieldInputOnCreate;
  ContainerStorageLocationConnection: ResolverTypeWrapper<ContainerStorageLocationConnection>;
  ContainerStorageLocationConnectionSort: ContainerStorageLocationConnectionSort;
  ContainerStorageLocationConnectionWhere: ContainerStorageLocationConnectionWhere;
  ContainerStorageLocationCreateFieldInput: ContainerStorageLocationCreateFieldInput;
  ContainerStorageLocationDeleteFieldInput: ContainerStorageLocationDeleteFieldInput;
  ContainerStorageLocationDisconnectFieldInput: ContainerStorageLocationDisconnectFieldInput;
  ContainerStorageLocationFieldInput: ContainerStorageLocationFieldInput;
  ContainerStorageLocationNodeAggregationWhereInput: ContainerStorageLocationNodeAggregationWhereInput;
  ContainerStorageLocationRelationship: ResolverTypeWrapper<ContainerStorageLocationRelationship>;
  ContainerStorageLocationUpdateConnectionInput: ContainerStorageLocationUpdateConnectionInput;
  ContainerStorageLocationUpdateFieldInput: ContainerStorageLocationUpdateFieldInput;
  ContainerUpdateInput: ContainerUpdateInput;
  ContainerWhere: ContainerWhere;
  ContainersConnection: ResolverTypeWrapper<ContainersConnection>;
  CreateCategoriesMutationResponse: ResolverTypeWrapper<CreateCategoriesMutationResponse>;
  CreateChangeRequestsMutationResponse: ResolverTypeWrapper<CreateChangeRequestsMutationResponse>;
  CreateContainersMutationResponse: ResolverTypeWrapper<CreateContainersMutationResponse>;
  CreateGardenFeaturesMutationResponse: ResolverTypeWrapper<CreateGardenFeaturesMutationResponse>;
  CreateGardenLayersMutationResponse: ResolverTypeWrapper<CreateGardenLayersMutationResponse>;
  CreateGardenSettingsMutationResponse: ResolverTypeWrapper<CreateGardenSettingsMutationResponse>;
  CreateGardensMutationResponse: ResolverTypeWrapper<CreateGardensMutationResponse>;
  CreateInfo: ResolverTypeWrapper<CreateInfo>;
  CreateLogEventsMutationResponse: ResolverTypeWrapper<CreateLogEventsMutationResponse>;
  CreateMarkerShapesMutationResponse: ResolverTypeWrapper<CreateMarkerShapesMutationResponse>;
  CreatePlantSpeciesMutationResponse: ResolverTypeWrapper<CreatePlantSpeciesMutationResponse>;
  CreatePlantVarietiesMutationResponse: ResolverTypeWrapper<CreatePlantVarietiesMutationResponse>;
  CreatePolygonShapesMutationResponse: ResolverTypeWrapper<CreatePolygonShapesMutationResponse>;
  CreateSeedsMutationResponse: ResolverTypeWrapper<CreateSeedsMutationResponse>;
  CreateUserSettingsMutationResponse: ResolverTypeWrapper<CreateUserSettingsMutationResponse>;
  CreateUsersMutationResponse: ResolverTypeWrapper<CreateUsersMutationResponse>;
  CreateWateringPeriodsMutationResponse: ResolverTypeWrapper<CreateWateringPeriodsMutationResponse>;
  CreateWateringTasksMutationResponse: ResolverTypeWrapper<CreateWateringTasksMutationResponse>;
  CropRotation: ResolversTypes['PlantSpeciesCropRotationFactorRelationship'];
  CropRotationCreateInput: CropRotationCreateInput;
  CropRotationSort: CropRotationSort;
  CropRotationUpdateInput: CropRotationUpdateInput;
  CropRotationWhere: CropRotationWhere;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteInfo: ResolverTypeWrapper<DeleteInfo>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Garden: ResolverTypeWrapper<Garden>;
  GardenAggregateSelection: ResolverTypeWrapper<GardenAggregateSelection>;
  GardenConnectInput: GardenConnectInput;
  GardenConnectWhere: GardenConnectWhere;
  GardenCreateInput: GardenCreateInput;
  GardenDeleteInput: GardenDeleteInput;
  GardenDisconnectInput: GardenDisconnectInput;
  GardenEdge: ResolverTypeWrapper<GardenEdge>;
  GardenFeature: ResolverTypeWrapper<GardenFeature>;
  GardenFeatureAggregateSelection: ResolverTypeWrapper<GardenFeatureAggregateSelection>;
  GardenFeatureConnectInput: GardenFeatureConnectInput;
  GardenFeatureConnectOrCreateWhere: GardenFeatureConnectOrCreateWhere;
  GardenFeatureConnectWhere: GardenFeatureConnectWhere;
  GardenFeatureContainerContainsAggregationSelection: ResolverTypeWrapper<GardenFeatureContainerContainsAggregationSelection>;
  GardenFeatureContainerContainsNodeAggregateSelection: ResolverTypeWrapper<GardenFeatureContainerContainsNodeAggregateSelection>;
  GardenFeatureContainsAggregateInput: GardenFeatureContainsAggregateInput;
  GardenFeatureContainsConnectFieldInput: GardenFeatureContainsConnectFieldInput;
  GardenFeatureContainsConnection: ResolverTypeWrapper<GardenFeatureContainsConnection>;
  GardenFeatureContainsConnectionSort: GardenFeatureContainsConnectionSort;
  GardenFeatureContainsConnectionWhere: GardenFeatureContainsConnectionWhere;
  GardenFeatureContainsCreateFieldInput: GardenFeatureContainsCreateFieldInput;
  GardenFeatureContainsDeleteFieldInput: GardenFeatureContainsDeleteFieldInput;
  GardenFeatureContainsDisconnectFieldInput: GardenFeatureContainsDisconnectFieldInput;
  GardenFeatureContainsFieldInput: GardenFeatureContainsFieldInput;
  GardenFeatureContainsNodeAggregationWhereInput: GardenFeatureContainsNodeAggregationWhereInput;
  GardenFeatureContainsRelationship: ResolverTypeWrapper<GardenFeatureContainsRelationship>;
  GardenFeatureContainsUpdateConnectionInput: GardenFeatureContainsUpdateConnectionInput;
  GardenFeatureContainsUpdateFieldInput: GardenFeatureContainsUpdateFieldInput;
  GardenFeatureCreateInput: GardenFeatureCreateInput;
  GardenFeatureDeleteInput: GardenFeatureDeleteInput;
  GardenFeatureDisconnectInput: GardenFeatureDisconnectInput;
  GardenFeatureEdge: ResolverTypeWrapper<GardenFeatureEdge>;
  GardenFeatureOnCreateInput: GardenFeatureOnCreateInput;
  GardenFeatureOptions: GardenFeatureOptions;
  GardenFeatureRelationInput: GardenFeatureRelationInput;
  GardenFeatureShapeConnectFieldInput: GardenFeatureShapeConnectFieldInput;
  GardenFeatureShapeConnection: ResolverTypeWrapper<GardenFeatureShapeConnection>;
  GardenFeatureShapeConnectionSort: GardenFeatureShapeConnectionSort;
  GardenFeatureShapeConnectionWhere: GardenFeatureShapeConnectionWhere;
  GardenFeatureShapeCreateFieldInput: GardenFeatureShapeCreateFieldInput;
  GardenFeatureShapeDeleteFieldInput: GardenFeatureShapeDeleteFieldInput;
  GardenFeatureShapeDisconnectFieldInput: GardenFeatureShapeDisconnectFieldInput;
  GardenFeatureShapeFieldInput: GardenFeatureShapeFieldInput;
  GardenFeatureShapeRelationship: ResolverTypeWrapper<GardenFeatureShapeRelationship>;
  GardenFeatureShapeUpdateConnectionInput: GardenFeatureShapeUpdateConnectionInput;
  GardenFeatureShapeUpdateFieldInput: GardenFeatureShapeUpdateFieldInput;
  GardenFeatureSort: GardenFeatureSort;
  GardenFeatureUniqueWhere: GardenFeatureUniqueWhere;
  GardenFeatureUpdateInput: GardenFeatureUpdateInput;
  GardenFeatureWhere: GardenFeatureWhere;
  GardenFeaturesConnection: ResolverTypeWrapper<GardenFeaturesConnection>;
  GardenGardenSettingsSettingsAggregationSelection: ResolverTypeWrapper<GardenGardenSettingsSettingsAggregationSelection>;
  GardenGardenSettingsSettingsNodeAggregateSelection: ResolverTypeWrapper<GardenGardenSettingsSettingsNodeAggregateSelection>;
  GardenLayer: ResolverTypeWrapper<GardenLayer>;
  GardenLayerAggregateSelection: ResolverTypeWrapper<GardenLayerAggregateSelection>;
  GardenLayerAtAggregateInput: GardenLayerAtAggregateInput;
  GardenLayerAtConnectFieldInput: GardenLayerAtConnectFieldInput;
  GardenLayerAtConnection: ResolverTypeWrapper<GardenLayerAtConnection>;
  GardenLayerAtConnectionSort: GardenLayerAtConnectionSort;
  GardenLayerAtConnectionWhere: GardenLayerAtConnectionWhere;
  GardenLayerAtCreateFieldInput: GardenLayerAtCreateFieldInput;
  GardenLayerAtDeleteFieldInput: GardenLayerAtDeleteFieldInput;
  GardenLayerAtDisconnectFieldInput: GardenLayerAtDisconnectFieldInput;
  GardenLayerAtFieldInput: GardenLayerAtFieldInput;
  GardenLayerAtNodeAggregationWhereInput: GardenLayerAtNodeAggregationWhereInput;
  GardenLayerAtRelationship: ResolverTypeWrapper<GardenLayerAtRelationship>;
  GardenLayerAtUpdateConnectionInput: GardenLayerAtUpdateConnectionInput;
  GardenLayerAtUpdateFieldInput: GardenLayerAtUpdateFieldInput;
  GardenLayerConnectInput: GardenLayerConnectInput;
  GardenLayerConnectOrCreateWhere: GardenLayerConnectOrCreateWhere;
  GardenLayerConnectWhere: GardenLayerConnectWhere;
  GardenLayerCreateInput: GardenLayerCreateInput;
  GardenLayerDeleteInput: GardenLayerDeleteInput;
  GardenLayerDisconnectInput: GardenLayerDisconnectInput;
  GardenLayerEdge: ResolverTypeWrapper<GardenLayerEdge>;
  GardenLayerGardenAtAggregationSelection: ResolverTypeWrapper<GardenLayerGardenAtAggregationSelection>;
  GardenLayerGardenAtNodeAggregateSelection: ResolverTypeWrapper<GardenLayerGardenAtNodeAggregateSelection>;
  GardenLayerHas_shapeConnectFieldInput: GardenLayerHas_ShapeConnectFieldInput;
  GardenLayerHas_shapeConnection: ResolverTypeWrapper<GardenLayerHas_ShapeConnection>;
  GardenLayerHas_shapeConnectionSort: GardenLayerHas_ShapeConnectionSort;
  GardenLayerHas_shapeConnectionWhere: GardenLayerHas_ShapeConnectionWhere;
  GardenLayerHas_shapeCreateFieldInput: GardenLayerHas_ShapeCreateFieldInput;
  GardenLayerHas_shapeDeleteFieldInput: GardenLayerHas_ShapeDeleteFieldInput;
  GardenLayerHas_shapeDisconnectFieldInput: GardenLayerHas_ShapeDisconnectFieldInput;
  GardenLayerHas_shapeFieldInput: GardenLayerHas_ShapeFieldInput;
  GardenLayerHas_shapeRelationship: ResolverTypeWrapper<GardenLayerHas_ShapeRelationship>;
  GardenLayerHas_shapeUpdateConnectionInput: GardenLayerHas_ShapeUpdateConnectionInput;
  GardenLayerHas_shapeUpdateFieldInput: GardenLayerHas_ShapeUpdateFieldInput;
  GardenLayerOnCreateInput: GardenLayerOnCreateInput;
  GardenLayerOptions: GardenLayerOptions;
  GardenLayerRelationInput: GardenLayerRelationInput;
  GardenLayerSort: GardenLayerSort;
  GardenLayerUniqueWhere: GardenLayerUniqueWhere;
  GardenLayerUpdateInput: GardenLayerUpdateInput;
  GardenLayerWhere: GardenLayerWhere;
  GardenLayersConnection: ResolverTypeWrapper<GardenLayersConnection>;
  GardenOptions: GardenOptions;
  GardenRelationInput: GardenRelationInput;
  GardenSettings: ResolverTypeWrapper<GardenSettings>;
  GardenSettingsAggregateInput: GardenSettingsAggregateInput;
  GardenSettingsAggregateSelection: ResolverTypeWrapper<GardenSettingsAggregateSelection>;
  GardenSettingsConnectFieldInput: GardenSettingsConnectFieldInput;
  GardenSettingsConnectInput: GardenSettingsConnectInput;
  GardenSettingsConnectWhere: GardenSettingsConnectWhere;
  GardenSettingsConnection: ResolverTypeWrapper<GardenSettingsConnection>;
  GardenSettingsConnectionSort: GardenSettingsConnectionSort;
  GardenSettingsConnectionWhere: GardenSettingsConnectionWhere;
  GardenSettingsCreateFieldInput: GardenSettingsCreateFieldInput;
  GardenSettingsCreateInput: GardenSettingsCreateInput;
  GardenSettingsDeleteFieldInput: GardenSettingsDeleteFieldInput;
  GardenSettingsDeleteInput: GardenSettingsDeleteInput;
  GardenSettingsDisconnectFieldInput: GardenSettingsDisconnectFieldInput;
  GardenSettingsDisconnectInput: GardenSettingsDisconnectInput;
  GardenSettingsEdge: ResolverTypeWrapper<GardenSettingsEdge>;
  GardenSettingsFieldInput: GardenSettingsFieldInput;
  GardenSettingsGardenAggregateInput: GardenSettingsGardenAggregateInput;
  GardenSettingsGardenConnectFieldInput: GardenSettingsGardenConnectFieldInput;
  GardenSettingsGardenConnection: ResolverTypeWrapper<GardenSettingsGardenConnection>;
  GardenSettingsGardenConnectionSort: GardenSettingsGardenConnectionSort;
  GardenSettingsGardenConnectionWhere: GardenSettingsGardenConnectionWhere;
  GardenSettingsGardenCreateFieldInput: GardenSettingsGardenCreateFieldInput;
  GardenSettingsGardenDeleteFieldInput: GardenSettingsGardenDeleteFieldInput;
  GardenSettingsGardenDisconnectFieldInput: GardenSettingsGardenDisconnectFieldInput;
  GardenSettingsGardenFieldInput: GardenSettingsGardenFieldInput;
  GardenSettingsGardenGardenAggregationSelection: ResolverTypeWrapper<GardenSettingsGardenGardenAggregationSelection>;
  GardenSettingsGardenGardenNodeAggregateSelection: ResolverTypeWrapper<GardenSettingsGardenGardenNodeAggregateSelection>;
  GardenSettingsGardenNodeAggregationWhereInput: GardenSettingsGardenNodeAggregationWhereInput;
  GardenSettingsGardenRelationship: ResolverTypeWrapper<GardenSettingsGardenRelationship>;
  GardenSettingsGardenUpdateConnectionInput: GardenSettingsGardenUpdateConnectionInput;
  GardenSettingsGardenUpdateFieldInput: GardenSettingsGardenUpdateFieldInput;
  GardenSettingsInput: GardenSettingsInput;
  GardenSettingsNodeAggregationWhereInput: GardenSettingsNodeAggregationWhereInput;
  GardenSettingsOptions: GardenSettingsOptions;
  GardenSettingsRelationInput: GardenSettingsRelationInput;
  GardenSettingsRelationship: ResolverTypeWrapper<GardenSettingsRelationship>;
  GardenSettingsSort: GardenSettingsSort;
  GardenSettingsUpdateConnectionInput: GardenSettingsUpdateConnectionInput;
  GardenSettingsUpdateFieldInput: GardenSettingsUpdateFieldInput;
  GardenSettingsUpdateInput: GardenSettingsUpdateInput;
  GardenSettingsWhere: GardenSettingsWhere;
  GardenSort: GardenSort;
  GardenUpdateInput: GardenUpdateInput;
  GardenWhere: GardenWhere;
  GardensConnection: ResolverTypeWrapper<GardensConnection>;
  GeoShape: ResolversTypes['MarkerShape'] | ResolversTypes['PolygonShape'];
  GeoShapeBelongs_toAggregateInput: GeoShapeBelongs_ToAggregateInput;
  GeoShapeBelongs_toConnectFieldInput: GeoShapeBelongs_ToConnectFieldInput;
  GeoShapeBelongs_toConnectOrCreateFieldInput: GeoShapeBelongs_ToConnectOrCreateFieldInput;
  GeoShapeBelongs_toConnectOrCreateFieldInputOnCreate: GeoShapeBelongs_ToConnectOrCreateFieldInputOnCreate;
  GeoShapeBelongs_toConnection: ResolverTypeWrapper<GeoShapeBelongs_ToConnection>;
  GeoShapeBelongs_toConnectionSort: GeoShapeBelongs_ToConnectionSort;
  GeoShapeBelongs_toConnectionWhere: GeoShapeBelongs_ToConnectionWhere;
  GeoShapeBelongs_toCreateFieldInput: GeoShapeBelongs_ToCreateFieldInput;
  GeoShapeBelongs_toDeleteFieldInput: GeoShapeBelongs_ToDeleteFieldInput;
  GeoShapeBelongs_toDisconnectFieldInput: GeoShapeBelongs_ToDisconnectFieldInput;
  GeoShapeBelongs_toFieldInput: GeoShapeBelongs_ToFieldInput;
  GeoShapeBelongs_toNodeAggregationWhereInput: GeoShapeBelongs_ToNodeAggregationWhereInput;
  GeoShapeBelongs_toRelationship: ResolverTypeWrapper<GeoShapeBelongs_ToRelationship>;
  GeoShapeBelongs_toUpdateConnectionInput: GeoShapeBelongs_ToUpdateConnectionInput;
  GeoShapeBelongs_toUpdateFieldInput: GeoShapeBelongs_ToUpdateFieldInput;
  GeoShapeConnectInput: GeoShapeConnectInput;
  GeoShapeConnectWhere: GeoShapeConnectWhere;
  GeoShapeCreateInput: GeoShapeCreateInput;
  GeoShapeDeleteInput: GeoShapeDeleteInput;
  GeoShapeDisconnectInput: GeoShapeDisconnectInput;
  GeoShapeFeatureAggregateInput: GeoShapeFeatureAggregateInput;
  GeoShapeFeatureConnectFieldInput: GeoShapeFeatureConnectFieldInput;
  GeoShapeFeatureConnectOrCreateFieldInput: GeoShapeFeatureConnectOrCreateFieldInput;
  GeoShapeFeatureConnectOrCreateFieldInputOnCreate: GeoShapeFeatureConnectOrCreateFieldInputOnCreate;
  GeoShapeFeatureConnection: ResolverTypeWrapper<GeoShapeFeatureConnection>;
  GeoShapeFeatureConnectionSort: GeoShapeFeatureConnectionSort;
  GeoShapeFeatureConnectionWhere: GeoShapeFeatureConnectionWhere;
  GeoShapeFeatureCreateFieldInput: GeoShapeFeatureCreateFieldInput;
  GeoShapeFeatureDeleteFieldInput: GeoShapeFeatureDeleteFieldInput;
  GeoShapeFeatureDisconnectFieldInput: GeoShapeFeatureDisconnectFieldInput;
  GeoShapeFeatureFieldInput: GeoShapeFeatureFieldInput;
  GeoShapeFeatureNodeAggregationWhereInput: GeoShapeFeatureNodeAggregationWhereInput;
  GeoShapeFeatureRelationship: ResolverTypeWrapper<GeoShapeFeatureRelationship>;
  GeoShapeFeatureUpdateConnectionInput: GeoShapeFeatureUpdateConnectionInput;
  GeoShapeFeatureUpdateFieldInput: GeoShapeFeatureUpdateFieldInput;
  GeoShapeImplementationsConnectInput: GeoShapeImplementationsConnectInput;
  GeoShapeImplementationsDeleteInput: GeoShapeImplementationsDeleteInput;
  GeoShapeImplementationsDisconnectInput: GeoShapeImplementationsDisconnectInput;
  GeoShapeImplementationsUpdateInput: GeoShapeImplementationsUpdateInput;
  GeoShapeImplementationsWhere: GeoShapeImplementationsWhere;
  GeoShapeOptions: GeoShapeOptions;
  GeoShapeSort: GeoShapeSort;
  GeoShapeUpdateInput: GeoShapeUpdateInput;
  GeoShapeWhere: GeoShapeWhere;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IDAggregateSelectionNonNullable: ResolverTypeWrapper<IdAggregateSelectionNonNullable>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntAggregateSelectionNullable: ResolverTypeWrapper<IntAggregateSelectionNullable>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LogEvent: ResolverTypeWrapper<LogEvent>;
  LogEventAggregateSelection: ResolverTypeWrapper<LogEventAggregateSelection>;
  LogEventConnectInput: LogEventConnectInput;
  LogEventConnectWhere: LogEventConnectWhere;
  LogEventCreateInput: LogEventCreateInput;
  LogEventDeleteInput: LogEventDeleteInput;
  LogEventDisconnectInput: LogEventDisconnectInput;
  LogEventEdge: ResolverTypeWrapper<LogEventEdge>;
  LogEventOptions: LogEventOptions;
  LogEventRefers_toAggregateInput: LogEventRefers_ToAggregateInput;
  LogEventRefers_toConnectFieldInput: LogEventRefers_ToConnectFieldInput;
  LogEventRefers_toConnection: ResolverTypeWrapper<LogEventRefers_ToConnection>;
  LogEventRefers_toConnectionSort: LogEventRefers_ToConnectionSort;
  LogEventRefers_toConnectionWhere: LogEventRefers_ToConnectionWhere;
  LogEventRefers_toCreateFieldInput: LogEventRefers_ToCreateFieldInput;
  LogEventRefers_toDeleteFieldInput: LogEventRefers_ToDeleteFieldInput;
  LogEventRefers_toDisconnectFieldInput: LogEventRefers_ToDisconnectFieldInput;
  LogEventRefers_toFieldInput: LogEventRefers_ToFieldInput;
  LogEventRefers_toNodeAggregationWhereInput: LogEventRefers_ToNodeAggregationWhereInput;
  LogEventRefers_toRelationship: ResolverTypeWrapper<LogEventRefers_ToRelationship>;
  LogEventRefers_toUpdateConnectionInput: LogEventRefers_ToUpdateConnectionInput;
  LogEventRefers_toUpdateFieldInput: LogEventRefers_ToUpdateFieldInput;
  LogEventRelationInput: LogEventRelationInput;
  LogEventSort: LogEventSort;
  LogEventTriggered_byAggregateInput: LogEventTriggered_ByAggregateInput;
  LogEventTriggered_byConnectFieldInput: LogEventTriggered_ByConnectFieldInput;
  LogEventTriggered_byConnection: ResolverTypeWrapper<LogEventTriggered_ByConnection>;
  LogEventTriggered_byConnectionSort: LogEventTriggered_ByConnectionSort;
  LogEventTriggered_byConnectionWhere: LogEventTriggered_ByConnectionWhere;
  LogEventTriggered_byCreateFieldInput: LogEventTriggered_ByCreateFieldInput;
  LogEventTriggered_byDeleteFieldInput: LogEventTriggered_ByDeleteFieldInput;
  LogEventTriggered_byDisconnectFieldInput: LogEventTriggered_ByDisconnectFieldInput;
  LogEventTriggered_byFieldInput: LogEventTriggered_ByFieldInput;
  LogEventTriggered_byNodeAggregationWhereInput: LogEventTriggered_ByNodeAggregationWhereInput;
  LogEventTriggered_byRelationship: ResolverTypeWrapper<LogEventTriggered_ByRelationship>;
  LogEventTriggered_byUpdateConnectionInput: LogEventTriggered_ByUpdateConnectionInput;
  LogEventTriggered_byUpdateFieldInput: LogEventTriggered_ByUpdateFieldInput;
  LogEventUpdateInput: LogEventUpdateInput;
  LogEventUserTriggered_byAggregationSelection: ResolverTypeWrapper<LogEventUserTriggered_ByAggregationSelection>;
  LogEventUserTriggered_byNodeAggregateSelection: ResolverTypeWrapper<LogEventUserTriggered_ByNodeAggregateSelection>;
  LogEventWateringTaskRefers_toAggregationSelection: ResolverTypeWrapper<LogEventWateringTaskRefers_ToAggregationSelection>;
  LogEventWateringTaskRefers_toNodeAggregateSelection: ResolverTypeWrapper<LogEventWateringTaskRefers_ToNodeAggregateSelection>;
  LogEventWhere: LogEventWhere;
  LogEventsConnection: ResolverTypeWrapper<LogEventsConnection>;
  MarkerShape: ResolverTypeWrapper<MarkerShape>;
  MarkerShapeAggregateSelection: ResolverTypeWrapper<MarkerShapeAggregateSelection>;
  MarkerShapeBelongs_toAggregateInput: MarkerShapeBelongs_ToAggregateInput;
  MarkerShapeBelongs_toNodeAggregationWhereInput: MarkerShapeBelongs_ToNodeAggregationWhereInput;
  MarkerShapeConnectInput: MarkerShapeConnectInput;
  MarkerShapeConnectOrCreateInput: MarkerShapeConnectOrCreateInput;
  MarkerShapeCreateInput: MarkerShapeCreateInput;
  MarkerShapeDeleteInput: MarkerShapeDeleteInput;
  MarkerShapeDisconnectInput: MarkerShapeDisconnectInput;
  MarkerShapeEdge: ResolverTypeWrapper<MarkerShapeEdge>;
  MarkerShapeFeatureAggregateInput: MarkerShapeFeatureAggregateInput;
  MarkerShapeFeatureNodeAggregationWhereInput: MarkerShapeFeatureNodeAggregationWhereInput;
  MarkerShapeGardenFeatureFeatureAggregationSelection: ResolverTypeWrapper<MarkerShapeGardenFeatureFeatureAggregationSelection>;
  MarkerShapeGardenFeatureFeatureNodeAggregateSelection: ResolverTypeWrapper<MarkerShapeGardenFeatureFeatureNodeAggregateSelection>;
  MarkerShapeGardenLayerBelongs_toAggregationSelection: ResolverTypeWrapper<MarkerShapeGardenLayerBelongs_ToAggregationSelection>;
  MarkerShapeGardenLayerBelongs_toNodeAggregateSelection: ResolverTypeWrapper<MarkerShapeGardenLayerBelongs_ToNodeAggregateSelection>;
  MarkerShapeOptions: MarkerShapeOptions;
  MarkerShapeRelationInput: MarkerShapeRelationInput;
  MarkerShapeSort: MarkerShapeSort;
  MarkerShapeUpdateInput: MarkerShapeUpdateInput;
  MarkerShapeWhere: MarkerShapeWhere;
  MarkerShapesConnection: ResolverTypeWrapper<MarkerShapesConnection>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PlantSpecies: ResolverTypeWrapper<PlantSpecies>;
  PlantSpeciesAggregateSelection: ResolverTypeWrapper<PlantSpeciesAggregateSelection>;
  PlantSpeciesCategoriesAggregateInput: PlantSpeciesCategoriesAggregateInput;
  PlantSpeciesCategoriesConnectFieldInput: PlantSpeciesCategoriesConnectFieldInput;
  PlantSpeciesCategoriesConnection: ResolverTypeWrapper<PlantSpeciesCategoriesConnection>;
  PlantSpeciesCategoriesConnectionSort: PlantSpeciesCategoriesConnectionSort;
  PlantSpeciesCategoriesConnectionWhere: PlantSpeciesCategoriesConnectionWhere;
  PlantSpeciesCategoriesCreateFieldInput: PlantSpeciesCategoriesCreateFieldInput;
  PlantSpeciesCategoriesDeleteFieldInput: PlantSpeciesCategoriesDeleteFieldInput;
  PlantSpeciesCategoriesDisconnectFieldInput: PlantSpeciesCategoriesDisconnectFieldInput;
  PlantSpeciesCategoriesFieldInput: PlantSpeciesCategoriesFieldInput;
  PlantSpeciesCategoriesNodeAggregationWhereInput: PlantSpeciesCategoriesNodeAggregationWhereInput;
  PlantSpeciesCategoriesRelationship: ResolverTypeWrapper<PlantSpeciesCategoriesRelationship>;
  PlantSpeciesCategoriesUpdateConnectionInput: PlantSpeciesCategoriesUpdateConnectionInput;
  PlantSpeciesCategoriesUpdateFieldInput: PlantSpeciesCategoriesUpdateFieldInput;
  PlantSpeciesCategoryCategoriesAggregationSelection: ResolverTypeWrapper<PlantSpeciesCategoryCategoriesAggregationSelection>;
  PlantSpeciesCategoryCategoriesNodeAggregateSelection: ResolverTypeWrapper<PlantSpeciesCategoryCategoriesNodeAggregateSelection>;
  PlantSpeciesConnectInput: PlantSpeciesConnectInput;
  PlantSpeciesConnectWhere: PlantSpeciesConnectWhere;
  PlantSpeciesConnection: ResolverTypeWrapper<PlantSpeciesConnection>;
  PlantSpeciesCreateInput: PlantSpeciesCreateInput;
  PlantSpeciesCropRotationFactorAggregateInput: PlantSpeciesCropRotationFactorAggregateInput;
  PlantSpeciesCropRotationFactorConnectFieldInput: PlantSpeciesCropRotationFactorConnectFieldInput;
  PlantSpeciesCropRotationFactorConnection: ResolverTypeWrapper<PlantSpeciesCropRotationFactorConnection>;
  PlantSpeciesCropRotationFactorConnectionSort: PlantSpeciesCropRotationFactorConnectionSort;
  PlantSpeciesCropRotationFactorConnectionWhere: PlantSpeciesCropRotationFactorConnectionWhere;
  PlantSpeciesCropRotationFactorCreateFieldInput: PlantSpeciesCropRotationFactorCreateFieldInput;
  PlantSpeciesCropRotationFactorDeleteFieldInput: PlantSpeciesCropRotationFactorDeleteFieldInput;
  PlantSpeciesCropRotationFactorDisconnectFieldInput: PlantSpeciesCropRotationFactorDisconnectFieldInput;
  PlantSpeciesCropRotationFactorEdgeAggregationWhereInput: PlantSpeciesCropRotationFactorEdgeAggregationWhereInput;
  PlantSpeciesCropRotationFactorFieldInput: PlantSpeciesCropRotationFactorFieldInput;
  PlantSpeciesCropRotationFactorNodeAggregationWhereInput: PlantSpeciesCropRotationFactorNodeAggregationWhereInput;
  PlantSpeciesCropRotationFactorRelationship: ResolverTypeWrapper<PlantSpeciesCropRotationFactorRelationship>;
  PlantSpeciesCropRotationFactorUpdateConnectionInput: PlantSpeciesCropRotationFactorUpdateConnectionInput;
  PlantSpeciesCropRotationFactorUpdateFieldInput: PlantSpeciesCropRotationFactorUpdateFieldInput;
  PlantSpeciesDeleteInput: PlantSpeciesDeleteInput;
  PlantSpeciesDisconnectInput: PlantSpeciesDisconnectInput;
  PlantSpeciesEdge: ResolverTypeWrapper<PlantSpeciesEdge>;
  PlantSpeciesOptions: PlantSpeciesOptions;
  PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection: ResolverTypeWrapper<PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection>;
  PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection: ResolverTypeWrapper<PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection>;
  PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection: ResolverTypeWrapper<PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection>;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection: ResolverTypeWrapper<PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection>;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection: ResolverTypeWrapper<PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection>;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection: ResolverTypeWrapper<PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection>;
  PlantSpeciesPlantVarietyVarietiesAggregationSelection: ResolverTypeWrapper<PlantSpeciesPlantVarietyVarietiesAggregationSelection>;
  PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection: ResolverTypeWrapper<PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection>;
  PlantSpeciesPositiveNeighborhoodAggregateInput: PlantSpeciesPositiveNeighborhoodAggregateInput;
  PlantSpeciesPositiveNeighborhoodConnectFieldInput: PlantSpeciesPositiveNeighborhoodConnectFieldInput;
  PlantSpeciesPositiveNeighborhoodConnection: ResolverTypeWrapper<PlantSpeciesPositiveNeighborhoodConnection>;
  PlantSpeciesPositiveNeighborhoodConnectionSort: PlantSpeciesPositiveNeighborhoodConnectionSort;
  PlantSpeciesPositiveNeighborhoodConnectionWhere: PlantSpeciesPositiveNeighborhoodConnectionWhere;
  PlantSpeciesPositiveNeighborhoodCreateFieldInput: PlantSpeciesPositiveNeighborhoodCreateFieldInput;
  PlantSpeciesPositiveNeighborhoodDeleteFieldInput: PlantSpeciesPositiveNeighborhoodDeleteFieldInput;
  PlantSpeciesPositiveNeighborhoodDisconnectFieldInput: PlantSpeciesPositiveNeighborhoodDisconnectFieldInput;
  PlantSpeciesPositiveNeighborhoodEdgeAggregationWhereInput: PlantSpeciesPositiveNeighborhoodEdgeAggregationWhereInput;
  PlantSpeciesPositiveNeighborhoodFieldInput: PlantSpeciesPositiveNeighborhoodFieldInput;
  PlantSpeciesPositiveNeighborhoodNodeAggregationWhereInput: PlantSpeciesPositiveNeighborhoodNodeAggregationWhereInput;
  PlantSpeciesPositiveNeighborhoodRelationship: ResolverTypeWrapper<PlantSpeciesPositiveNeighborhoodRelationship>;
  PlantSpeciesPositiveNeighborhoodUpdateConnectionInput: PlantSpeciesPositiveNeighborhoodUpdateConnectionInput;
  PlantSpeciesPositiveNeighborhoodUpdateFieldInput: PlantSpeciesPositiveNeighborhoodUpdateFieldInput;
  PlantSpeciesRelationInput: PlantSpeciesRelationInput;
  PlantSpeciesSort: PlantSpeciesSort;
  PlantSpeciesUpdateInput: PlantSpeciesUpdateInput;
  PlantSpeciesVarietiesAggregateInput: PlantSpeciesVarietiesAggregateInput;
  PlantSpeciesVarietiesConnectFieldInput: PlantSpeciesVarietiesConnectFieldInput;
  PlantSpeciesVarietiesConnection: ResolverTypeWrapper<PlantSpeciesVarietiesConnection>;
  PlantSpeciesVarietiesConnectionSort: PlantSpeciesVarietiesConnectionSort;
  PlantSpeciesVarietiesConnectionWhere: PlantSpeciesVarietiesConnectionWhere;
  PlantSpeciesVarietiesCreateFieldInput: PlantSpeciesVarietiesCreateFieldInput;
  PlantSpeciesVarietiesDeleteFieldInput: PlantSpeciesVarietiesDeleteFieldInput;
  PlantSpeciesVarietiesDisconnectFieldInput: PlantSpeciesVarietiesDisconnectFieldInput;
  PlantSpeciesVarietiesFieldInput: PlantSpeciesVarietiesFieldInput;
  PlantSpeciesVarietiesNodeAggregationWhereInput: PlantSpeciesVarietiesNodeAggregationWhereInput;
  PlantSpeciesVarietiesRelationship: ResolverTypeWrapper<PlantSpeciesVarietiesRelationship>;
  PlantSpeciesVarietiesUpdateConnectionInput: PlantSpeciesVarietiesUpdateConnectionInput;
  PlantSpeciesVarietiesUpdateFieldInput: PlantSpeciesVarietiesUpdateFieldInput;
  PlantSpeciesWhere: PlantSpeciesWhere;
  PlantVarietiesConnection: ResolverTypeWrapper<PlantVarietiesConnection>;
  PlantVariety: ResolverTypeWrapper<PlantVariety>;
  PlantVarietyAggregateSelection: ResolverTypeWrapper<PlantVarietyAggregateSelection>;
  PlantVarietyConnectInput: PlantVarietyConnectInput;
  PlantVarietyConnectWhere: PlantVarietyConnectWhere;
  PlantVarietyCreateInput: PlantVarietyCreateInput;
  PlantVarietyDeleteInput: PlantVarietyDeleteInput;
  PlantVarietyDisconnectInput: PlantVarietyDisconnectInput;
  PlantVarietyEdge: ResolverTypeWrapper<PlantVarietyEdge>;
  PlantVarietyOptions: PlantVarietyOptions;
  PlantVarietyPlantSpeciesSpeciesAggregationSelection: ResolverTypeWrapper<PlantVarietyPlantSpeciesSpeciesAggregationSelection>;
  PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection: ResolverTypeWrapper<PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection>;
  PlantVarietyRelationInput: PlantVarietyRelationInput;
  PlantVarietySort: PlantVarietySort;
  PlantVarietySpeciesAggregateInput: PlantVarietySpeciesAggregateInput;
  PlantVarietySpeciesConnectFieldInput: PlantVarietySpeciesConnectFieldInput;
  PlantVarietySpeciesConnection: ResolverTypeWrapper<PlantVarietySpeciesConnection>;
  PlantVarietySpeciesConnectionSort: PlantVarietySpeciesConnectionSort;
  PlantVarietySpeciesConnectionWhere: PlantVarietySpeciesConnectionWhere;
  PlantVarietySpeciesCreateFieldInput: PlantVarietySpeciesCreateFieldInput;
  PlantVarietySpeciesDeleteFieldInput: PlantVarietySpeciesDeleteFieldInput;
  PlantVarietySpeciesDisconnectFieldInput: PlantVarietySpeciesDisconnectFieldInput;
  PlantVarietySpeciesFieldInput: PlantVarietySpeciesFieldInput;
  PlantVarietySpeciesNodeAggregationWhereInput: PlantVarietySpeciesNodeAggregationWhereInput;
  PlantVarietySpeciesRelationship: ResolverTypeWrapper<PlantVarietySpeciesRelationship>;
  PlantVarietySpeciesUpdateConnectionInput: PlantVarietySpeciesUpdateConnectionInput;
  PlantVarietySpeciesUpdateFieldInput: PlantVarietySpeciesUpdateFieldInput;
  PlantVarietyUpdateInput: PlantVarietyUpdateInput;
  PlantVarietyWhere: PlantVarietyWhere;
  Point: ResolverTypeWrapper<Point>;
  PointDistance: PointDistance;
  PointInput: PointInput;
  PolygonShape: ResolverTypeWrapper<PolygonShape>;
  PolygonShapeAggregateSelection: ResolverTypeWrapper<PolygonShapeAggregateSelection>;
  PolygonShapeBelongs_toAggregateInput: PolygonShapeBelongs_ToAggregateInput;
  PolygonShapeBelongs_toNodeAggregationWhereInput: PolygonShapeBelongs_ToNodeAggregationWhereInput;
  PolygonShapeConnectInput: PolygonShapeConnectInput;
  PolygonShapeConnectOrCreateInput: PolygonShapeConnectOrCreateInput;
  PolygonShapeCreateInput: PolygonShapeCreateInput;
  PolygonShapeDeleteInput: PolygonShapeDeleteInput;
  PolygonShapeDisconnectInput: PolygonShapeDisconnectInput;
  PolygonShapeEdge: ResolverTypeWrapper<PolygonShapeEdge>;
  PolygonShapeFeatureAggregateInput: PolygonShapeFeatureAggregateInput;
  PolygonShapeFeatureNodeAggregationWhereInput: PolygonShapeFeatureNodeAggregationWhereInput;
  PolygonShapeGardenFeatureFeatureAggregationSelection: ResolverTypeWrapper<PolygonShapeGardenFeatureFeatureAggregationSelection>;
  PolygonShapeGardenFeatureFeatureNodeAggregateSelection: ResolverTypeWrapper<PolygonShapeGardenFeatureFeatureNodeAggregateSelection>;
  PolygonShapeGardenLayerBelongs_toAggregationSelection: ResolverTypeWrapper<PolygonShapeGardenLayerBelongs_ToAggregationSelection>;
  PolygonShapeGardenLayerBelongs_toNodeAggregateSelection: ResolverTypeWrapper<PolygonShapeGardenLayerBelongs_ToNodeAggregateSelection>;
  PolygonShapeOptions: PolygonShapeOptions;
  PolygonShapeRelationInput: PolygonShapeRelationInput;
  PolygonShapeSort: PolygonShapeSort;
  PolygonShapeUpdateInput: PolygonShapeUpdateInput;
  PolygonShapeWhere: PolygonShapeWhere;
  PolygonShapesConnection: ResolverTypeWrapper<PolygonShapesConnection>;
  PositiveNeighborhood: ResolversTypes['PlantSpeciesPositiveNeighborhoodRelationship'];
  PositiveNeighborhoodCreateInput: PositiveNeighborhoodCreateInput;
  PositiveNeighborhoodSort: PositiveNeighborhoodSort;
  PositiveNeighborhoodUpdateInput: PositiveNeighborhoodUpdateInput;
  PositiveNeighborhoodWhere: PositiveNeighborhoodWhere;
  PushKeyInput: PushKeyInput;
  PushMessageInput: PushMessageInput;
  PushSubscriptionInput: PushSubscriptionInput;
  Query: ResolverTypeWrapper<{}>;
  Seed: ResolverTypeWrapper<Seed>;
  SeedAggregateSelection: ResolverTypeWrapper<SeedAggregateSelection>;
  SeedConnectInput: SeedConnectInput;
  SeedContainedInAggregateInput: SeedContainedInAggregateInput;
  SeedContainedInConnectFieldInput: SeedContainedInConnectFieldInput;
  SeedContainedInConnection: ResolverTypeWrapper<SeedContainedInConnection>;
  SeedContainedInConnectionSort: SeedContainedInConnectionSort;
  SeedContainedInConnectionWhere: SeedContainedInConnectionWhere;
  SeedContainedInCreateFieldInput: SeedContainedInCreateFieldInput;
  SeedContainedInDeleteFieldInput: SeedContainedInDeleteFieldInput;
  SeedContainedInDisconnectFieldInput: SeedContainedInDisconnectFieldInput;
  SeedContainedInFieldInput: SeedContainedInFieldInput;
  SeedContainedInNodeAggregationWhereInput: SeedContainedInNodeAggregationWhereInput;
  SeedContainedInRelationship: ResolverTypeWrapper<SeedContainedInRelationship>;
  SeedContainedInUpdateConnectionInput: SeedContainedInUpdateConnectionInput;
  SeedContainedInUpdateFieldInput: SeedContainedInUpdateFieldInput;
  SeedContainerContainedInAggregationSelection: ResolverTypeWrapper<SeedContainerContainedInAggregationSelection>;
  SeedContainerContainedInNodeAggregateSelection: ResolverTypeWrapper<SeedContainerContainedInNodeAggregateSelection>;
  SeedCreateInput: SeedCreateInput;
  SeedDeleteInput: SeedDeleteInput;
  SeedDisconnectInput: SeedDisconnectInput;
  SeedEdge: ResolverTypeWrapper<SeedEdge>;
  SeedOptions: SeedOptions;
  SeedRelationInput: SeedRelationInput;
  SeedSort: SeedSort;
  SeedUpdateInput: SeedUpdateInput;
  SeedWhere: SeedWhere;
  SeedsConnection: ResolverTypeWrapper<SeedsConnection>;
  SortDirection: SortDirection;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringAggregateSelectionNonNullable: ResolverTypeWrapper<StringAggregateSelectionNonNullable>;
  StringAggregateSelectionNullable: ResolverTypeWrapper<StringAggregateSelectionNullable>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateCategoriesMutationResponse: ResolverTypeWrapper<UpdateCategoriesMutationResponse>;
  UpdateChangeRequestsMutationResponse: ResolverTypeWrapper<UpdateChangeRequestsMutationResponse>;
  UpdateContainersMutationResponse: ResolverTypeWrapper<UpdateContainersMutationResponse>;
  UpdateGardenFeaturesMutationResponse: ResolverTypeWrapper<UpdateGardenFeaturesMutationResponse>;
  UpdateGardenLayersMutationResponse: ResolverTypeWrapper<UpdateGardenLayersMutationResponse>;
  UpdateGardenSettingsMutationResponse: ResolverTypeWrapper<UpdateGardenSettingsMutationResponse>;
  UpdateGardensMutationResponse: ResolverTypeWrapper<UpdateGardensMutationResponse>;
  UpdateInfo: ResolverTypeWrapper<UpdateInfo>;
  UpdateLogEventsMutationResponse: ResolverTypeWrapper<UpdateLogEventsMutationResponse>;
  UpdateMarkerShapesMutationResponse: ResolverTypeWrapper<UpdateMarkerShapesMutationResponse>;
  UpdatePlantSpeciesMutationResponse: ResolverTypeWrapper<UpdatePlantSpeciesMutationResponse>;
  UpdatePlantVarietiesMutationResponse: ResolverTypeWrapper<UpdatePlantVarietiesMutationResponse>;
  UpdatePolygonShapesMutationResponse: ResolverTypeWrapper<UpdatePolygonShapesMutationResponse>;
  UpdateSeedsMutationResponse: ResolverTypeWrapper<UpdateSeedsMutationResponse>;
  UpdateUserSettingsMutationResponse: ResolverTypeWrapper<UpdateUserSettingsMutationResponse>;
  UpdateUsersMutationResponse: ResolverTypeWrapper<UpdateUsersMutationResponse>;
  UpdateWateringPeriodsMutationResponse: ResolverTypeWrapper<UpdateWateringPeriodsMutationResponse>;
  UpdateWateringTasksMutationResponse: ResolverTypeWrapper<UpdateWateringTasksMutationResponse>;
  User: ResolverTypeWrapper<User>;
  UserAggregateSelection: ResolverTypeWrapper<UserAggregateSelection>;
  UserAssignedAggregateInput: UserAssignedAggregateInput;
  UserAssignedConnectFieldInput: UserAssignedConnectFieldInput;
  UserAssignedConnection: ResolverTypeWrapper<UserAssignedConnection>;
  UserAssignedConnectionSort: UserAssignedConnectionSort;
  UserAssignedConnectionWhere: UserAssignedConnectionWhere;
  UserAssignedCreateFieldInput: UserAssignedCreateFieldInput;
  UserAssignedDeleteFieldInput: UserAssignedDeleteFieldInput;
  UserAssignedDisconnectFieldInput: UserAssignedDisconnectFieldInput;
  UserAssignedFieldInput: UserAssignedFieldInput;
  UserAssignedNodeAggregationWhereInput: UserAssignedNodeAggregationWhereInput;
  UserAssignedRelationship: ResolverTypeWrapper<UserAssignedRelationship>;
  UserAssignedUpdateConnectionInput: UserAssignedUpdateConnectionInput;
  UserAssignedUpdateFieldInput: UserAssignedUpdateFieldInput;
  UserAvailableAggregateInput: UserAvailableAggregateInput;
  UserAvailableConnectFieldInput: UserAvailableConnectFieldInput;
  UserAvailableConnection: ResolverTypeWrapper<UserAvailableConnection>;
  UserAvailableConnectionSort: UserAvailableConnectionSort;
  UserAvailableConnectionWhere: UserAvailableConnectionWhere;
  UserAvailableCreateFieldInput: UserAvailableCreateFieldInput;
  UserAvailableDeleteFieldInput: UserAvailableDeleteFieldInput;
  UserAvailableDisconnectFieldInput: UserAvailableDisconnectFieldInput;
  UserAvailableFieldInput: UserAvailableFieldInput;
  UserAvailableNodeAggregationWhereInput: UserAvailableNodeAggregationWhereInput;
  UserAvailableRelationship: ResolverTypeWrapper<UserAvailableRelationship>;
  UserAvailableUpdateConnectionInput: UserAvailableUpdateConnectionInput;
  UserAvailableUpdateFieldInput: UserAvailableUpdateFieldInput;
  UserChangeRequestChangerequests_requested_byAggregationSelection: ResolverTypeWrapper<UserChangeRequestChangerequests_Requested_ByAggregationSelection>;
  UserChangeRequestChangerequests_requested_byNodeAggregateSelection: ResolverTypeWrapper<UserChangeRequestChangerequests_Requested_ByNodeAggregateSelection>;
  UserChangeRequestChangerequests_requested_toAggregationSelection: ResolverTypeWrapper<UserChangeRequestChangerequests_Requested_ToAggregationSelection>;
  UserChangeRequestChangerequests_requested_toNodeAggregateSelection: ResolverTypeWrapper<UserChangeRequestChangerequests_Requested_ToNodeAggregateSelection>;
  UserChangerequests_requested_byAggregateInput: UserChangerequests_Requested_ByAggregateInput;
  UserChangerequests_requested_byConnectFieldInput: UserChangerequests_Requested_ByConnectFieldInput;
  UserChangerequests_requested_byConnection: ResolverTypeWrapper<UserChangerequests_Requested_ByConnection>;
  UserChangerequests_requested_byConnectionSort: UserChangerequests_Requested_ByConnectionSort;
  UserChangerequests_requested_byConnectionWhere: UserChangerequests_Requested_ByConnectionWhere;
  UserChangerequests_requested_byCreateFieldInput: UserChangerequests_Requested_ByCreateFieldInput;
  UserChangerequests_requested_byDeleteFieldInput: UserChangerequests_Requested_ByDeleteFieldInput;
  UserChangerequests_requested_byDisconnectFieldInput: UserChangerequests_Requested_ByDisconnectFieldInput;
  UserChangerequests_requested_byFieldInput: UserChangerequests_Requested_ByFieldInput;
  UserChangerequests_requested_byNodeAggregationWhereInput: UserChangerequests_Requested_ByNodeAggregationWhereInput;
  UserChangerequests_requested_byRelationship: ResolverTypeWrapper<UserChangerequests_Requested_ByRelationship>;
  UserChangerequests_requested_byUpdateConnectionInput: UserChangerequests_Requested_ByUpdateConnectionInput;
  UserChangerequests_requested_byUpdateFieldInput: UserChangerequests_Requested_ByUpdateFieldInput;
  UserChangerequests_requested_toAggregateInput: UserChangerequests_Requested_ToAggregateInput;
  UserChangerequests_requested_toConnectFieldInput: UserChangerequests_Requested_ToConnectFieldInput;
  UserChangerequests_requested_toConnection: ResolverTypeWrapper<UserChangerequests_Requested_ToConnection>;
  UserChangerequests_requested_toConnectionSort: UserChangerequests_Requested_ToConnectionSort;
  UserChangerequests_requested_toConnectionWhere: UserChangerequests_Requested_ToConnectionWhere;
  UserChangerequests_requested_toCreateFieldInput: UserChangerequests_Requested_ToCreateFieldInput;
  UserChangerequests_requested_toDeleteFieldInput: UserChangerequests_Requested_ToDeleteFieldInput;
  UserChangerequests_requested_toDisconnectFieldInput: UserChangerequests_Requested_ToDisconnectFieldInput;
  UserChangerequests_requested_toFieldInput: UserChangerequests_Requested_ToFieldInput;
  UserChangerequests_requested_toNodeAggregationWhereInput: UserChangerequests_Requested_ToNodeAggregationWhereInput;
  UserChangerequests_requested_toRelationship: ResolverTypeWrapper<UserChangerequests_Requested_ToRelationship>;
  UserChangerequests_requested_toUpdateConnectionInput: UserChangerequests_Requested_ToUpdateConnectionInput;
  UserChangerequests_requested_toUpdateFieldInput: UserChangerequests_Requested_ToUpdateFieldInput;
  UserConnectInput: UserConnectInput;
  UserConnectWhere: UserConnectWhere;
  UserCreateInput: UserCreateInput;
  UserDeleteInput: UserDeleteInput;
  UserDisconnectInput: UserDisconnectInput;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  UserLogEventLogevents_triggered_byAggregationSelection: ResolverTypeWrapper<UserLogEventLogevents_Triggered_ByAggregationSelection>;
  UserLogEventLogevents_triggered_byNodeAggregateSelection: ResolverTypeWrapper<UserLogEventLogevents_Triggered_ByNodeAggregateSelection>;
  UserLogevents_triggered_byAggregateInput: UserLogevents_Triggered_ByAggregateInput;
  UserLogevents_triggered_byConnectFieldInput: UserLogevents_Triggered_ByConnectFieldInput;
  UserLogevents_triggered_byConnection: ResolverTypeWrapper<UserLogevents_Triggered_ByConnection>;
  UserLogevents_triggered_byConnectionSort: UserLogevents_Triggered_ByConnectionSort;
  UserLogevents_triggered_byConnectionWhere: UserLogevents_Triggered_ByConnectionWhere;
  UserLogevents_triggered_byCreateFieldInput: UserLogevents_Triggered_ByCreateFieldInput;
  UserLogevents_triggered_byDeleteFieldInput: UserLogevents_Triggered_ByDeleteFieldInput;
  UserLogevents_triggered_byDisconnectFieldInput: UserLogevents_Triggered_ByDisconnectFieldInput;
  UserLogevents_triggered_byFieldInput: UserLogevents_Triggered_ByFieldInput;
  UserLogevents_triggered_byNodeAggregationWhereInput: UserLogevents_Triggered_ByNodeAggregationWhereInput;
  UserLogevents_triggered_byRelationship: ResolverTypeWrapper<UserLogevents_Triggered_ByRelationship>;
  UserLogevents_triggered_byUpdateConnectionInput: UserLogevents_Triggered_ByUpdateConnectionInput;
  UserLogevents_triggered_byUpdateFieldInput: UserLogevents_Triggered_ByUpdateFieldInput;
  UserOptions: UserOptions;
  UserRelationInput: UserRelationInput;
  UserSettings: ResolverTypeWrapper<UserSettings>;
  UserSettingsAggregateSelection: ResolverTypeWrapper<UserSettingsAggregateSelection>;
  UserSettingsConnection: ResolverTypeWrapper<UserSettingsConnection>;
  UserSettingsCreateInput: UserSettingsCreateInput;
  UserSettingsEdge: ResolverTypeWrapper<UserSettingsEdge>;
  UserSettingsInput: UserSettingsInput;
  UserSettingsOptions: UserSettingsOptions;
  UserSettingsSort: UserSettingsSort;
  UserSettingsUpdateInput: UserSettingsUpdateInput;
  UserSettingsWhere: UserSettingsWhere;
  UserSort: UserSort;
  UserUpdateInput: UserUpdateInput;
  UserWateringTaskAssignedAggregationSelection: ResolverTypeWrapper<UserWateringTaskAssignedAggregationSelection>;
  UserWateringTaskAssignedNodeAggregateSelection: ResolverTypeWrapper<UserWateringTaskAssignedNodeAggregateSelection>;
  UserWateringTaskAvailableAggregationSelection: ResolverTypeWrapper<UserWateringTaskAvailableAggregationSelection>;
  UserWateringTaskAvailableNodeAggregateSelection: ResolverTypeWrapper<UserWateringTaskAvailableNodeAggregateSelection>;
  UserWhere: UserWhere;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  WateringPeriod: ResolverTypeWrapper<WateringPeriod>;
  WateringPeriodAggregateSelection: ResolverTypeWrapper<WateringPeriodAggregateSelection>;
  WateringPeriodAtAggregateInput: WateringPeriodAtAggregateInput;
  WateringPeriodAtConnectFieldInput: WateringPeriodAtConnectFieldInput;
  WateringPeriodAtConnection: ResolverTypeWrapper<WateringPeriodAtConnection>;
  WateringPeriodAtConnectionSort: WateringPeriodAtConnectionSort;
  WateringPeriodAtConnectionWhere: WateringPeriodAtConnectionWhere;
  WateringPeriodAtCreateFieldInput: WateringPeriodAtCreateFieldInput;
  WateringPeriodAtDeleteFieldInput: WateringPeriodAtDeleteFieldInput;
  WateringPeriodAtDisconnectFieldInput: WateringPeriodAtDisconnectFieldInput;
  WateringPeriodAtFieldInput: WateringPeriodAtFieldInput;
  WateringPeriodAtNodeAggregationWhereInput: WateringPeriodAtNodeAggregationWhereInput;
  WateringPeriodAtRelationship: ResolverTypeWrapper<WateringPeriodAtRelationship>;
  WateringPeriodAtUpdateConnectionInput: WateringPeriodAtUpdateConnectionInput;
  WateringPeriodAtUpdateFieldInput: WateringPeriodAtUpdateFieldInput;
  WateringPeriodConnectInput: WateringPeriodConnectInput;
  WateringPeriodConnectWhere: WateringPeriodConnectWhere;
  WateringPeriodCreateInput: WateringPeriodCreateInput;
  WateringPeriodDeleteInput: WateringPeriodDeleteInput;
  WateringPeriodDisconnectInput: WateringPeriodDisconnectInput;
  WateringPeriodEdge: ResolverTypeWrapper<WateringPeriodEdge>;
  WateringPeriodGardenAtAggregationSelection: ResolverTypeWrapper<WateringPeriodGardenAtAggregationSelection>;
  WateringPeriodGardenAtNodeAggregateSelection: ResolverTypeWrapper<WateringPeriodGardenAtNodeAggregateSelection>;
  WateringPeriodOptions: WateringPeriodOptions;
  WateringPeriodRelationInput: WateringPeriodRelationInput;
  WateringPeriodSort: WateringPeriodSort;
  WateringPeriodUpdateInput: WateringPeriodUpdateInput;
  WateringPeriodWateringTaskWateringtasksAggregationSelection: ResolverTypeWrapper<WateringPeriodWateringTaskWateringtasksAggregationSelection>;
  WateringPeriodWateringTaskWateringtasksNodeAggregateSelection: ResolverTypeWrapper<WateringPeriodWateringTaskWateringtasksNodeAggregateSelection>;
  WateringPeriodWateringtasksAggregateInput: WateringPeriodWateringtasksAggregateInput;
  WateringPeriodWateringtasksConnectFieldInput: WateringPeriodWateringtasksConnectFieldInput;
  WateringPeriodWateringtasksConnection: ResolverTypeWrapper<WateringPeriodWateringtasksConnection>;
  WateringPeriodWateringtasksConnectionSort: WateringPeriodWateringtasksConnectionSort;
  WateringPeriodWateringtasksConnectionWhere: WateringPeriodWateringtasksConnectionWhere;
  WateringPeriodWateringtasksCreateFieldInput: WateringPeriodWateringtasksCreateFieldInput;
  WateringPeriodWateringtasksDeleteFieldInput: WateringPeriodWateringtasksDeleteFieldInput;
  WateringPeriodWateringtasksDisconnectFieldInput: WateringPeriodWateringtasksDisconnectFieldInput;
  WateringPeriodWateringtasksFieldInput: WateringPeriodWateringtasksFieldInput;
  WateringPeriodWateringtasksNodeAggregationWhereInput: WateringPeriodWateringtasksNodeAggregationWhereInput;
  WateringPeriodWateringtasksRelationship: ResolverTypeWrapper<WateringPeriodWateringtasksRelationship>;
  WateringPeriodWateringtasksUpdateConnectionInput: WateringPeriodWateringtasksUpdateConnectionInput;
  WateringPeriodWateringtasksUpdateFieldInput: WateringPeriodWateringtasksUpdateFieldInput;
  WateringPeriodWhere: WateringPeriodWhere;
  WateringPeriodsConnection: ResolverTypeWrapper<WateringPeriodsConnection>;
  WateringTask: ResolverTypeWrapper<WateringTask>;
  WateringTaskAggregateSelection: ResolverTypeWrapper<WateringTaskAggregateSelection>;
  WateringTaskChangeRequestChangerequests_requested_forAggregationSelection: ResolverTypeWrapper<WateringTaskChangeRequestChangerequests_Requested_ForAggregationSelection>;
  WateringTaskChangeRequestChangerequests_requested_forNodeAggregateSelection: ResolverTypeWrapper<WateringTaskChangeRequestChangerequests_Requested_ForNodeAggregateSelection>;
  WateringTaskChangeRequestChangerequests_requested_new_taskAggregationSelection: ResolverTypeWrapper<WateringTaskChangeRequestChangerequests_Requested_New_TaskAggregationSelection>;
  WateringTaskChangeRequestChangerequests_requested_new_taskNodeAggregateSelection: ResolverTypeWrapper<WateringTaskChangeRequestChangerequests_Requested_New_TaskNodeAggregateSelection>;
  WateringTaskChangerequests_requested_forAggregateInput: WateringTaskChangerequests_Requested_ForAggregateInput;
  WateringTaskChangerequests_requested_forConnectFieldInput: WateringTaskChangerequests_Requested_ForConnectFieldInput;
  WateringTaskChangerequests_requested_forConnection: ResolverTypeWrapper<WateringTaskChangerequests_Requested_ForConnection>;
  WateringTaskChangerequests_requested_forConnectionSort: WateringTaskChangerequests_Requested_ForConnectionSort;
  WateringTaskChangerequests_requested_forConnectionWhere: WateringTaskChangerequests_Requested_ForConnectionWhere;
  WateringTaskChangerequests_requested_forCreateFieldInput: WateringTaskChangerequests_Requested_ForCreateFieldInput;
  WateringTaskChangerequests_requested_forDeleteFieldInput: WateringTaskChangerequests_Requested_ForDeleteFieldInput;
  WateringTaskChangerequests_requested_forDisconnectFieldInput: WateringTaskChangerequests_Requested_ForDisconnectFieldInput;
  WateringTaskChangerequests_requested_forFieldInput: WateringTaskChangerequests_Requested_ForFieldInput;
  WateringTaskChangerequests_requested_forNodeAggregationWhereInput: WateringTaskChangerequests_Requested_ForNodeAggregationWhereInput;
  WateringTaskChangerequests_requested_forRelationship: ResolverTypeWrapper<WateringTaskChangerequests_Requested_ForRelationship>;
  WateringTaskChangerequests_requested_forUpdateConnectionInput: WateringTaskChangerequests_Requested_ForUpdateConnectionInput;
  WateringTaskChangerequests_requested_forUpdateFieldInput: WateringTaskChangerequests_Requested_ForUpdateFieldInput;
  WateringTaskChangerequests_requested_new_taskAggregateInput: WateringTaskChangerequests_Requested_New_TaskAggregateInput;
  WateringTaskChangerequests_requested_new_taskConnectFieldInput: WateringTaskChangerequests_Requested_New_TaskConnectFieldInput;
  WateringTaskChangerequests_requested_new_taskConnection: ResolverTypeWrapper<WateringTaskChangerequests_Requested_New_TaskConnection>;
  WateringTaskChangerequests_requested_new_taskConnectionSort: WateringTaskChangerequests_Requested_New_TaskConnectionSort;
  WateringTaskChangerequests_requested_new_taskConnectionWhere: WateringTaskChangerequests_Requested_New_TaskConnectionWhere;
  WateringTaskChangerequests_requested_new_taskCreateFieldInput: WateringTaskChangerequests_Requested_New_TaskCreateFieldInput;
  WateringTaskChangerequests_requested_new_taskDeleteFieldInput: WateringTaskChangerequests_Requested_New_TaskDeleteFieldInput;
  WateringTaskChangerequests_requested_new_taskDisconnectFieldInput: WateringTaskChangerequests_Requested_New_TaskDisconnectFieldInput;
  WateringTaskChangerequests_requested_new_taskFieldInput: WateringTaskChangerequests_Requested_New_TaskFieldInput;
  WateringTaskChangerequests_requested_new_taskNodeAggregationWhereInput: WateringTaskChangerequests_Requested_New_TaskNodeAggregationWhereInput;
  WateringTaskChangerequests_requested_new_taskRelationship: ResolverTypeWrapper<WateringTaskChangerequests_Requested_New_TaskRelationship>;
  WateringTaskChangerequests_requested_new_taskUpdateConnectionInput: WateringTaskChangerequests_Requested_New_TaskUpdateConnectionInput;
  WateringTaskChangerequests_requested_new_taskUpdateFieldInput: WateringTaskChangerequests_Requested_New_TaskUpdateFieldInput;
  WateringTaskConnectInput: WateringTaskConnectInput;
  WateringTaskConnectWhere: WateringTaskConnectWhere;
  WateringTaskCreateInput: WateringTaskCreateInput;
  WateringTaskDeleteInput: WateringTaskDeleteInput;
  WateringTaskDisconnectInput: WateringTaskDisconnectInput;
  WateringTaskEdge: ResolverTypeWrapper<WateringTaskEdge>;
  WateringTaskLogEventLogevents_refers_toAggregationSelection: ResolverTypeWrapper<WateringTaskLogEventLogevents_Refers_ToAggregationSelection>;
  WateringTaskLogEventLogevents_refers_toNodeAggregateSelection: ResolverTypeWrapper<WateringTaskLogEventLogevents_Refers_ToNodeAggregateSelection>;
  WateringTaskLogevents_refers_toAggregateInput: WateringTaskLogevents_Refers_ToAggregateInput;
  WateringTaskLogevents_refers_toConnectFieldInput: WateringTaskLogevents_Refers_ToConnectFieldInput;
  WateringTaskLogevents_refers_toConnection: ResolverTypeWrapper<WateringTaskLogevents_Refers_ToConnection>;
  WateringTaskLogevents_refers_toConnectionSort: WateringTaskLogevents_Refers_ToConnectionSort;
  WateringTaskLogevents_refers_toConnectionWhere: WateringTaskLogevents_Refers_ToConnectionWhere;
  WateringTaskLogevents_refers_toCreateFieldInput: WateringTaskLogevents_Refers_ToCreateFieldInput;
  WateringTaskLogevents_refers_toDeleteFieldInput: WateringTaskLogevents_Refers_ToDeleteFieldInput;
  WateringTaskLogevents_refers_toDisconnectFieldInput: WateringTaskLogevents_Refers_ToDisconnectFieldInput;
  WateringTaskLogevents_refers_toFieldInput: WateringTaskLogevents_Refers_ToFieldInput;
  WateringTaskLogevents_refers_toNodeAggregationWhereInput: WateringTaskLogevents_Refers_ToNodeAggregationWhereInput;
  WateringTaskLogevents_refers_toRelationship: ResolverTypeWrapper<WateringTaskLogevents_Refers_ToRelationship>;
  WateringTaskLogevents_refers_toUpdateConnectionInput: WateringTaskLogevents_Refers_ToUpdateConnectionInput;
  WateringTaskLogevents_refers_toUpdateFieldInput: WateringTaskLogevents_Refers_ToUpdateFieldInput;
  WateringTaskOptions: WateringTaskOptions;
  WateringTaskRelationInput: WateringTaskRelationInput;
  WateringTaskSort: WateringTaskSort;
  WateringTaskUpdateInput: WateringTaskUpdateInput;
  WateringTaskUserUsers_assignedAggregationSelection: ResolverTypeWrapper<WateringTaskUserUsers_AssignedAggregationSelection>;
  WateringTaskUserUsers_assignedNodeAggregateSelection: ResolverTypeWrapper<WateringTaskUserUsers_AssignedNodeAggregateSelection>;
  WateringTaskUserUsers_availableAggregationSelection: ResolverTypeWrapper<WateringTaskUserUsers_AvailableAggregationSelection>;
  WateringTaskUserUsers_availableNodeAggregateSelection: ResolverTypeWrapper<WateringTaskUserUsers_AvailableNodeAggregateSelection>;
  WateringTaskUsers_assignedAggregateInput: WateringTaskUsers_AssignedAggregateInput;
  WateringTaskUsers_assignedConnectFieldInput: WateringTaskUsers_AssignedConnectFieldInput;
  WateringTaskUsers_assignedConnection: ResolverTypeWrapper<WateringTaskUsers_AssignedConnection>;
  WateringTaskUsers_assignedConnectionSort: WateringTaskUsers_AssignedConnectionSort;
  WateringTaskUsers_assignedConnectionWhere: WateringTaskUsers_AssignedConnectionWhere;
  WateringTaskUsers_assignedCreateFieldInput: WateringTaskUsers_AssignedCreateFieldInput;
  WateringTaskUsers_assignedDeleteFieldInput: WateringTaskUsers_AssignedDeleteFieldInput;
  WateringTaskUsers_assignedDisconnectFieldInput: WateringTaskUsers_AssignedDisconnectFieldInput;
  WateringTaskUsers_assignedFieldInput: WateringTaskUsers_AssignedFieldInput;
  WateringTaskUsers_assignedNodeAggregationWhereInput: WateringTaskUsers_AssignedNodeAggregationWhereInput;
  WateringTaskUsers_assignedRelationship: ResolverTypeWrapper<WateringTaskUsers_AssignedRelationship>;
  WateringTaskUsers_assignedUpdateConnectionInput: WateringTaskUsers_AssignedUpdateConnectionInput;
  WateringTaskUsers_assignedUpdateFieldInput: WateringTaskUsers_AssignedUpdateFieldInput;
  WateringTaskUsers_availableAggregateInput: WateringTaskUsers_AvailableAggregateInput;
  WateringTaskUsers_availableConnectFieldInput: WateringTaskUsers_AvailableConnectFieldInput;
  WateringTaskUsers_availableConnection: ResolverTypeWrapper<WateringTaskUsers_AvailableConnection>;
  WateringTaskUsers_availableConnectionSort: WateringTaskUsers_AvailableConnectionSort;
  WateringTaskUsers_availableConnectionWhere: WateringTaskUsers_AvailableConnectionWhere;
  WateringTaskUsers_availableCreateFieldInput: WateringTaskUsers_AvailableCreateFieldInput;
  WateringTaskUsers_availableDeleteFieldInput: WateringTaskUsers_AvailableDeleteFieldInput;
  WateringTaskUsers_availableDisconnectFieldInput: WateringTaskUsers_AvailableDisconnectFieldInput;
  WateringTaskUsers_availableFieldInput: WateringTaskUsers_AvailableFieldInput;
  WateringTaskUsers_availableNodeAggregationWhereInput: WateringTaskUsers_AvailableNodeAggregationWhereInput;
  WateringTaskUsers_availableRelationship: ResolverTypeWrapper<WateringTaskUsers_AvailableRelationship>;
  WateringTaskUsers_availableUpdateConnectionInput: WateringTaskUsers_AvailableUpdateConnectionInput;
  WateringTaskUsers_availableUpdateFieldInput: WateringTaskUsers_AvailableUpdateFieldInput;
  WateringTaskWateringPeriodWateringperiodAggregationSelection: ResolverTypeWrapper<WateringTaskWateringPeriodWateringperiodAggregationSelection>;
  WateringTaskWateringPeriodWateringperiodNodeAggregateSelection: ResolverTypeWrapper<WateringTaskWateringPeriodWateringperiodNodeAggregateSelection>;
  WateringTaskWateringperiodAggregateInput: WateringTaskWateringperiodAggregateInput;
  WateringTaskWateringperiodConnectFieldInput: WateringTaskWateringperiodConnectFieldInput;
  WateringTaskWateringperiodConnection: ResolverTypeWrapper<WateringTaskWateringperiodConnection>;
  WateringTaskWateringperiodConnectionSort: WateringTaskWateringperiodConnectionSort;
  WateringTaskWateringperiodConnectionWhere: WateringTaskWateringperiodConnectionWhere;
  WateringTaskWateringperiodCreateFieldInput: WateringTaskWateringperiodCreateFieldInput;
  WateringTaskWateringperiodDeleteFieldInput: WateringTaskWateringperiodDeleteFieldInput;
  WateringTaskWateringperiodDisconnectFieldInput: WateringTaskWateringperiodDisconnectFieldInput;
  WateringTaskWateringperiodFieldInput: WateringTaskWateringperiodFieldInput;
  WateringTaskWateringperiodNodeAggregationWhereInput: WateringTaskWateringperiodNodeAggregationWhereInput;
  WateringTaskWateringperiodRelationship: ResolverTypeWrapper<WateringTaskWateringperiodRelationship>;
  WateringTaskWateringperiodUpdateConnectionInput: WateringTaskWateringperiodUpdateConnectionInput;
  WateringTaskWateringperiodUpdateFieldInput: WateringTaskWateringperiodUpdateFieldInput;
  WateringTaskWhere: WateringTaskWhere;
  WateringTasksConnection: ResolverTypeWrapper<WateringTasksConnection>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CategoriesConnection: CategoriesConnection;
  Category: Category;
  CategoryAggregateSelection: CategoryAggregateSelection;
  CategoryCategoryChildCategoriesAggregationSelection: CategoryCategoryChildCategoriesAggregationSelection;
  CategoryCategoryChildCategoriesNodeAggregateSelection: CategoryCategoryChildCategoriesNodeAggregateSelection;
  CategoryCategoryParentCategoryAggregationSelection: CategoryCategoryParentCategoryAggregationSelection;
  CategoryCategoryParentCategoryNodeAggregateSelection: CategoryCategoryParentCategoryNodeAggregateSelection;
  CategoryChildCategoriesAggregateInput: CategoryChildCategoriesAggregateInput;
  CategoryChildCategoriesConnectFieldInput: CategoryChildCategoriesConnectFieldInput;
  CategoryChildCategoriesConnection: CategoryChildCategoriesConnection;
  CategoryChildCategoriesConnectionSort: CategoryChildCategoriesConnectionSort;
  CategoryChildCategoriesConnectionWhere: CategoryChildCategoriesConnectionWhere;
  CategoryChildCategoriesCreateFieldInput: CategoryChildCategoriesCreateFieldInput;
  CategoryChildCategoriesDeleteFieldInput: CategoryChildCategoriesDeleteFieldInput;
  CategoryChildCategoriesDisconnectFieldInput: CategoryChildCategoriesDisconnectFieldInput;
  CategoryChildCategoriesFieldInput: CategoryChildCategoriesFieldInput;
  CategoryChildCategoriesNodeAggregationWhereInput: CategoryChildCategoriesNodeAggregationWhereInput;
  CategoryChildCategoriesRelationship: CategoryChildCategoriesRelationship;
  CategoryChildCategoriesUpdateConnectionInput: CategoryChildCategoriesUpdateConnectionInput;
  CategoryChildCategoriesUpdateFieldInput: CategoryChildCategoriesUpdateFieldInput;
  CategoryConnectInput: CategoryConnectInput;
  CategoryConnectWhere: CategoryConnectWhere;
  CategoryCreateInput: CategoryCreateInput;
  CategoryDeleteInput: CategoryDeleteInput;
  CategoryDisconnectInput: CategoryDisconnectInput;
  CategoryEdge: CategoryEdge;
  CategoryOptions: CategoryOptions;
  CategoryParentCategoryAggregateInput: CategoryParentCategoryAggregateInput;
  CategoryParentCategoryConnectFieldInput: CategoryParentCategoryConnectFieldInput;
  CategoryParentCategoryConnection: CategoryParentCategoryConnection;
  CategoryParentCategoryConnectionSort: CategoryParentCategoryConnectionSort;
  CategoryParentCategoryConnectionWhere: CategoryParentCategoryConnectionWhere;
  CategoryParentCategoryCreateFieldInput: CategoryParentCategoryCreateFieldInput;
  CategoryParentCategoryDeleteFieldInput: CategoryParentCategoryDeleteFieldInput;
  CategoryParentCategoryDisconnectFieldInput: CategoryParentCategoryDisconnectFieldInput;
  CategoryParentCategoryFieldInput: CategoryParentCategoryFieldInput;
  CategoryParentCategoryNodeAggregationWhereInput: CategoryParentCategoryNodeAggregationWhereInput;
  CategoryParentCategoryRelationship: CategoryParentCategoryRelationship;
  CategoryParentCategoryUpdateConnectionInput: CategoryParentCategoryUpdateConnectionInput;
  CategoryParentCategoryUpdateFieldInput: CategoryParentCategoryUpdateFieldInput;
  CategoryPlantSpeciesSpeciesAggregationSelection: CategoryPlantSpeciesSpeciesAggregationSelection;
  CategoryPlantSpeciesSpeciesNodeAggregateSelection: CategoryPlantSpeciesSpeciesNodeAggregateSelection;
  CategoryRelationInput: CategoryRelationInput;
  CategorySort: CategorySort;
  CategorySpeciesAggregateInput: CategorySpeciesAggregateInput;
  CategorySpeciesConnectFieldInput: CategorySpeciesConnectFieldInput;
  CategorySpeciesConnection: CategorySpeciesConnection;
  CategorySpeciesConnectionSort: CategorySpeciesConnectionSort;
  CategorySpeciesConnectionWhere: CategorySpeciesConnectionWhere;
  CategorySpeciesCreateFieldInput: CategorySpeciesCreateFieldInput;
  CategorySpeciesDeleteFieldInput: CategorySpeciesDeleteFieldInput;
  CategorySpeciesDisconnectFieldInput: CategorySpeciesDisconnectFieldInput;
  CategorySpeciesFieldInput: CategorySpeciesFieldInput;
  CategorySpeciesNodeAggregationWhereInput: CategorySpeciesNodeAggregationWhereInput;
  CategorySpeciesRelationship: CategorySpeciesRelationship;
  CategorySpeciesUpdateConnectionInput: CategorySpeciesUpdateConnectionInput;
  CategorySpeciesUpdateFieldInput: CategorySpeciesUpdateFieldInput;
  CategoryUpdateInput: CategoryUpdateInput;
  CategoryWhere: CategoryWhere;
  ChangeRequest: ChangeRequest;
  ChangeRequestAggregateSelection: ChangeRequestAggregateSelection;
  ChangeRequestConnectInput: ChangeRequestConnectInput;
  ChangeRequestConnectWhere: ChangeRequestConnectWhere;
  ChangeRequestCreateInput: ChangeRequestCreateInput;
  ChangeRequestDeleteInput: ChangeRequestDeleteInput;
  ChangeRequestDisconnectInput: ChangeRequestDisconnectInput;
  ChangeRequestEdge: ChangeRequestEdge;
  ChangeRequestOptions: ChangeRequestOptions;
  ChangeRequestRelationInput: ChangeRequestRelationInput;
  ChangeRequestRequested_byAggregateInput: ChangeRequestRequested_ByAggregateInput;
  ChangeRequestRequested_byConnectFieldInput: ChangeRequestRequested_ByConnectFieldInput;
  ChangeRequestRequested_byConnection: ChangeRequestRequested_ByConnection;
  ChangeRequestRequested_byConnectionSort: ChangeRequestRequested_ByConnectionSort;
  ChangeRequestRequested_byConnectionWhere: ChangeRequestRequested_ByConnectionWhere;
  ChangeRequestRequested_byCreateFieldInput: ChangeRequestRequested_ByCreateFieldInput;
  ChangeRequestRequested_byDeleteFieldInput: ChangeRequestRequested_ByDeleteFieldInput;
  ChangeRequestRequested_byDisconnectFieldInput: ChangeRequestRequested_ByDisconnectFieldInput;
  ChangeRequestRequested_byFieldInput: ChangeRequestRequested_ByFieldInput;
  ChangeRequestRequested_byNodeAggregationWhereInput: ChangeRequestRequested_ByNodeAggregationWhereInput;
  ChangeRequestRequested_byRelationship: ChangeRequestRequested_ByRelationship;
  ChangeRequestRequested_byUpdateConnectionInput: ChangeRequestRequested_ByUpdateConnectionInput;
  ChangeRequestRequested_byUpdateFieldInput: ChangeRequestRequested_ByUpdateFieldInput;
  ChangeRequestRequested_forAggregateInput: ChangeRequestRequested_ForAggregateInput;
  ChangeRequestRequested_forConnectFieldInput: ChangeRequestRequested_ForConnectFieldInput;
  ChangeRequestRequested_forConnection: ChangeRequestRequested_ForConnection;
  ChangeRequestRequested_forConnectionSort: ChangeRequestRequested_ForConnectionSort;
  ChangeRequestRequested_forConnectionWhere: ChangeRequestRequested_ForConnectionWhere;
  ChangeRequestRequested_forCreateFieldInput: ChangeRequestRequested_ForCreateFieldInput;
  ChangeRequestRequested_forDeleteFieldInput: ChangeRequestRequested_ForDeleteFieldInput;
  ChangeRequestRequested_forDisconnectFieldInput: ChangeRequestRequested_ForDisconnectFieldInput;
  ChangeRequestRequested_forFieldInput: ChangeRequestRequested_ForFieldInput;
  ChangeRequestRequested_forNodeAggregationWhereInput: ChangeRequestRequested_ForNodeAggregationWhereInput;
  ChangeRequestRequested_forRelationship: ChangeRequestRequested_ForRelationship;
  ChangeRequestRequested_forUpdateConnectionInput: ChangeRequestRequested_ForUpdateConnectionInput;
  ChangeRequestRequested_forUpdateFieldInput: ChangeRequestRequested_ForUpdateFieldInput;
  ChangeRequestRequested_new_taskAggregateInput: ChangeRequestRequested_New_TaskAggregateInput;
  ChangeRequestRequested_new_taskConnectFieldInput: ChangeRequestRequested_New_TaskConnectFieldInput;
  ChangeRequestRequested_new_taskConnection: ChangeRequestRequested_New_TaskConnection;
  ChangeRequestRequested_new_taskConnectionSort: ChangeRequestRequested_New_TaskConnectionSort;
  ChangeRequestRequested_new_taskConnectionWhere: ChangeRequestRequested_New_TaskConnectionWhere;
  ChangeRequestRequested_new_taskCreateFieldInput: ChangeRequestRequested_New_TaskCreateFieldInput;
  ChangeRequestRequested_new_taskDeleteFieldInput: ChangeRequestRequested_New_TaskDeleteFieldInput;
  ChangeRequestRequested_new_taskDisconnectFieldInput: ChangeRequestRequested_New_TaskDisconnectFieldInput;
  ChangeRequestRequested_new_taskFieldInput: ChangeRequestRequested_New_TaskFieldInput;
  ChangeRequestRequested_new_taskNodeAggregationWhereInput: ChangeRequestRequested_New_TaskNodeAggregationWhereInput;
  ChangeRequestRequested_new_taskRelationship: ChangeRequestRequested_New_TaskRelationship;
  ChangeRequestRequested_new_taskUpdateConnectionInput: ChangeRequestRequested_New_TaskUpdateConnectionInput;
  ChangeRequestRequested_new_taskUpdateFieldInput: ChangeRequestRequested_New_TaskUpdateFieldInput;
  ChangeRequestRequested_toAggregateInput: ChangeRequestRequested_ToAggregateInput;
  ChangeRequestRequested_toConnectFieldInput: ChangeRequestRequested_ToConnectFieldInput;
  ChangeRequestRequested_toConnection: ChangeRequestRequested_ToConnection;
  ChangeRequestRequested_toConnectionSort: ChangeRequestRequested_ToConnectionSort;
  ChangeRequestRequested_toConnectionWhere: ChangeRequestRequested_ToConnectionWhere;
  ChangeRequestRequested_toCreateFieldInput: ChangeRequestRequested_ToCreateFieldInput;
  ChangeRequestRequested_toDeleteFieldInput: ChangeRequestRequested_ToDeleteFieldInput;
  ChangeRequestRequested_toDisconnectFieldInput: ChangeRequestRequested_ToDisconnectFieldInput;
  ChangeRequestRequested_toFieldInput: ChangeRequestRequested_ToFieldInput;
  ChangeRequestRequested_toNodeAggregationWhereInput: ChangeRequestRequested_ToNodeAggregationWhereInput;
  ChangeRequestRequested_toRelationship: ChangeRequestRequested_ToRelationship;
  ChangeRequestRequested_toUpdateConnectionInput: ChangeRequestRequested_ToUpdateConnectionInput;
  ChangeRequestRequested_toUpdateFieldInput: ChangeRequestRequested_ToUpdateFieldInput;
  ChangeRequestSort: ChangeRequestSort;
  ChangeRequestUpdateInput: ChangeRequestUpdateInput;
  ChangeRequestUserRequested_byAggregationSelection: ChangeRequestUserRequested_ByAggregationSelection;
  ChangeRequestUserRequested_byNodeAggregateSelection: ChangeRequestUserRequested_ByNodeAggregateSelection;
  ChangeRequestUserRequested_toAggregationSelection: ChangeRequestUserRequested_ToAggregationSelection;
  ChangeRequestUserRequested_toNodeAggregateSelection: ChangeRequestUserRequested_ToNodeAggregateSelection;
  ChangeRequestWateringTaskRequested_forAggregationSelection: ChangeRequestWateringTaskRequested_ForAggregationSelection;
  ChangeRequestWateringTaskRequested_forNodeAggregateSelection: ChangeRequestWateringTaskRequested_ForNodeAggregateSelection;
  ChangeRequestWateringTaskRequested_new_taskAggregationSelection: ChangeRequestWateringTaskRequested_New_TaskAggregationSelection;
  ChangeRequestWateringTaskRequested_new_taskNodeAggregateSelection: ChangeRequestWateringTaskRequested_New_TaskNodeAggregateSelection;
  ChangeRequestWhere: ChangeRequestWhere;
  ChangeRequestsConnection: ChangeRequestsConnection;
  Container: Container;
  ContainerAggregateSelection: ContainerAggregateSelection;
  ContainerConnectInput: ContainerConnectInput;
  ContainerConnectOrCreateInput: ContainerConnectOrCreateInput;
  ContainerConnectWhere: ContainerConnectWhere;
  ContainerCreateInput: ContainerCreateInput;
  ContainerDeleteInput: ContainerDeleteInput;
  ContainerDisconnectInput: ContainerDisconnectInput;
  ContainerEdge: ContainerEdge;
  ContainerGardenFeatureStorageLocationAggregationSelection: ContainerGardenFeatureStorageLocationAggregationSelection;
  ContainerGardenFeatureStorageLocationNodeAggregateSelection: ContainerGardenFeatureStorageLocationNodeAggregateSelection;
  ContainerOptions: ContainerOptions;
  ContainerRelationInput: ContainerRelationInput;
  ContainerSort: ContainerSort;
  ContainerStorageLocationAggregateInput: ContainerStorageLocationAggregateInput;
  ContainerStorageLocationConnectFieldInput: ContainerStorageLocationConnectFieldInput;
  ContainerStorageLocationConnectOrCreateFieldInput: ContainerStorageLocationConnectOrCreateFieldInput;
  ContainerStorageLocationConnectOrCreateFieldInputOnCreate: ContainerStorageLocationConnectOrCreateFieldInputOnCreate;
  ContainerStorageLocationConnection: ContainerStorageLocationConnection;
  ContainerStorageLocationConnectionSort: ContainerStorageLocationConnectionSort;
  ContainerStorageLocationConnectionWhere: ContainerStorageLocationConnectionWhere;
  ContainerStorageLocationCreateFieldInput: ContainerStorageLocationCreateFieldInput;
  ContainerStorageLocationDeleteFieldInput: ContainerStorageLocationDeleteFieldInput;
  ContainerStorageLocationDisconnectFieldInput: ContainerStorageLocationDisconnectFieldInput;
  ContainerStorageLocationFieldInput: ContainerStorageLocationFieldInput;
  ContainerStorageLocationNodeAggregationWhereInput: ContainerStorageLocationNodeAggregationWhereInput;
  ContainerStorageLocationRelationship: ContainerStorageLocationRelationship;
  ContainerStorageLocationUpdateConnectionInput: ContainerStorageLocationUpdateConnectionInput;
  ContainerStorageLocationUpdateFieldInput: ContainerStorageLocationUpdateFieldInput;
  ContainerUpdateInput: ContainerUpdateInput;
  ContainerWhere: ContainerWhere;
  ContainersConnection: ContainersConnection;
  CreateCategoriesMutationResponse: CreateCategoriesMutationResponse;
  CreateChangeRequestsMutationResponse: CreateChangeRequestsMutationResponse;
  CreateContainersMutationResponse: CreateContainersMutationResponse;
  CreateGardenFeaturesMutationResponse: CreateGardenFeaturesMutationResponse;
  CreateGardenLayersMutationResponse: CreateGardenLayersMutationResponse;
  CreateGardenSettingsMutationResponse: CreateGardenSettingsMutationResponse;
  CreateGardensMutationResponse: CreateGardensMutationResponse;
  CreateInfo: CreateInfo;
  CreateLogEventsMutationResponse: CreateLogEventsMutationResponse;
  CreateMarkerShapesMutationResponse: CreateMarkerShapesMutationResponse;
  CreatePlantSpeciesMutationResponse: CreatePlantSpeciesMutationResponse;
  CreatePlantVarietiesMutationResponse: CreatePlantVarietiesMutationResponse;
  CreatePolygonShapesMutationResponse: CreatePolygonShapesMutationResponse;
  CreateSeedsMutationResponse: CreateSeedsMutationResponse;
  CreateUserSettingsMutationResponse: CreateUserSettingsMutationResponse;
  CreateUsersMutationResponse: CreateUsersMutationResponse;
  CreateWateringPeriodsMutationResponse: CreateWateringPeriodsMutationResponse;
  CreateWateringTasksMutationResponse: CreateWateringTasksMutationResponse;
  CropRotation: ResolversParentTypes['PlantSpeciesCropRotationFactorRelationship'];
  CropRotationCreateInput: CropRotationCreateInput;
  CropRotationSort: CropRotationSort;
  CropRotationUpdateInput: CropRotationUpdateInput;
  CropRotationWhere: CropRotationWhere;
  Date: Scalars['Date'];
  DeleteInfo: DeleteInfo;
  Float: Scalars['Float'];
  Garden: Garden;
  GardenAggregateSelection: GardenAggregateSelection;
  GardenConnectInput: GardenConnectInput;
  GardenConnectWhere: GardenConnectWhere;
  GardenCreateInput: GardenCreateInput;
  GardenDeleteInput: GardenDeleteInput;
  GardenDisconnectInput: GardenDisconnectInput;
  GardenEdge: GardenEdge;
  GardenFeature: GardenFeature;
  GardenFeatureAggregateSelection: GardenFeatureAggregateSelection;
  GardenFeatureConnectInput: GardenFeatureConnectInput;
  GardenFeatureConnectOrCreateWhere: GardenFeatureConnectOrCreateWhere;
  GardenFeatureConnectWhere: GardenFeatureConnectWhere;
  GardenFeatureContainerContainsAggregationSelection: GardenFeatureContainerContainsAggregationSelection;
  GardenFeatureContainerContainsNodeAggregateSelection: GardenFeatureContainerContainsNodeAggregateSelection;
  GardenFeatureContainsAggregateInput: GardenFeatureContainsAggregateInput;
  GardenFeatureContainsConnectFieldInput: GardenFeatureContainsConnectFieldInput;
  GardenFeatureContainsConnection: GardenFeatureContainsConnection;
  GardenFeatureContainsConnectionSort: GardenFeatureContainsConnectionSort;
  GardenFeatureContainsConnectionWhere: GardenFeatureContainsConnectionWhere;
  GardenFeatureContainsCreateFieldInput: GardenFeatureContainsCreateFieldInput;
  GardenFeatureContainsDeleteFieldInput: GardenFeatureContainsDeleteFieldInput;
  GardenFeatureContainsDisconnectFieldInput: GardenFeatureContainsDisconnectFieldInput;
  GardenFeatureContainsFieldInput: GardenFeatureContainsFieldInput;
  GardenFeatureContainsNodeAggregationWhereInput: GardenFeatureContainsNodeAggregationWhereInput;
  GardenFeatureContainsRelationship: GardenFeatureContainsRelationship;
  GardenFeatureContainsUpdateConnectionInput: GardenFeatureContainsUpdateConnectionInput;
  GardenFeatureContainsUpdateFieldInput: GardenFeatureContainsUpdateFieldInput;
  GardenFeatureCreateInput: GardenFeatureCreateInput;
  GardenFeatureDeleteInput: GardenFeatureDeleteInput;
  GardenFeatureDisconnectInput: GardenFeatureDisconnectInput;
  GardenFeatureEdge: GardenFeatureEdge;
  GardenFeatureOnCreateInput: GardenFeatureOnCreateInput;
  GardenFeatureOptions: GardenFeatureOptions;
  GardenFeatureRelationInput: GardenFeatureRelationInput;
  GardenFeatureShapeConnectFieldInput: GardenFeatureShapeConnectFieldInput;
  GardenFeatureShapeConnection: GardenFeatureShapeConnection;
  GardenFeatureShapeConnectionSort: GardenFeatureShapeConnectionSort;
  GardenFeatureShapeConnectionWhere: GardenFeatureShapeConnectionWhere;
  GardenFeatureShapeCreateFieldInput: GardenFeatureShapeCreateFieldInput;
  GardenFeatureShapeDeleteFieldInput: GardenFeatureShapeDeleteFieldInput;
  GardenFeatureShapeDisconnectFieldInput: GardenFeatureShapeDisconnectFieldInput;
  GardenFeatureShapeFieldInput: GardenFeatureShapeFieldInput;
  GardenFeatureShapeRelationship: GardenFeatureShapeRelationship;
  GardenFeatureShapeUpdateConnectionInput: GardenFeatureShapeUpdateConnectionInput;
  GardenFeatureShapeUpdateFieldInput: GardenFeatureShapeUpdateFieldInput;
  GardenFeatureSort: GardenFeatureSort;
  GardenFeatureUniqueWhere: GardenFeatureUniqueWhere;
  GardenFeatureUpdateInput: GardenFeatureUpdateInput;
  GardenFeatureWhere: GardenFeatureWhere;
  GardenFeaturesConnection: GardenFeaturesConnection;
  GardenGardenSettingsSettingsAggregationSelection: GardenGardenSettingsSettingsAggregationSelection;
  GardenGardenSettingsSettingsNodeAggregateSelection: GardenGardenSettingsSettingsNodeAggregateSelection;
  GardenLayer: GardenLayer;
  GardenLayerAggregateSelection: GardenLayerAggregateSelection;
  GardenLayerAtAggregateInput: GardenLayerAtAggregateInput;
  GardenLayerAtConnectFieldInput: GardenLayerAtConnectFieldInput;
  GardenLayerAtConnection: GardenLayerAtConnection;
  GardenLayerAtConnectionSort: GardenLayerAtConnectionSort;
  GardenLayerAtConnectionWhere: GardenLayerAtConnectionWhere;
  GardenLayerAtCreateFieldInput: GardenLayerAtCreateFieldInput;
  GardenLayerAtDeleteFieldInput: GardenLayerAtDeleteFieldInput;
  GardenLayerAtDisconnectFieldInput: GardenLayerAtDisconnectFieldInput;
  GardenLayerAtFieldInput: GardenLayerAtFieldInput;
  GardenLayerAtNodeAggregationWhereInput: GardenLayerAtNodeAggregationWhereInput;
  GardenLayerAtRelationship: GardenLayerAtRelationship;
  GardenLayerAtUpdateConnectionInput: GardenLayerAtUpdateConnectionInput;
  GardenLayerAtUpdateFieldInput: GardenLayerAtUpdateFieldInput;
  GardenLayerConnectInput: GardenLayerConnectInput;
  GardenLayerConnectOrCreateWhere: GardenLayerConnectOrCreateWhere;
  GardenLayerConnectWhere: GardenLayerConnectWhere;
  GardenLayerCreateInput: GardenLayerCreateInput;
  GardenLayerDeleteInput: GardenLayerDeleteInput;
  GardenLayerDisconnectInput: GardenLayerDisconnectInput;
  GardenLayerEdge: GardenLayerEdge;
  GardenLayerGardenAtAggregationSelection: GardenLayerGardenAtAggregationSelection;
  GardenLayerGardenAtNodeAggregateSelection: GardenLayerGardenAtNodeAggregateSelection;
  GardenLayerHas_shapeConnectFieldInput: GardenLayerHas_ShapeConnectFieldInput;
  GardenLayerHas_shapeConnection: GardenLayerHas_ShapeConnection;
  GardenLayerHas_shapeConnectionSort: GardenLayerHas_ShapeConnectionSort;
  GardenLayerHas_shapeConnectionWhere: GardenLayerHas_ShapeConnectionWhere;
  GardenLayerHas_shapeCreateFieldInput: GardenLayerHas_ShapeCreateFieldInput;
  GardenLayerHas_shapeDeleteFieldInput: GardenLayerHas_ShapeDeleteFieldInput;
  GardenLayerHas_shapeDisconnectFieldInput: GardenLayerHas_ShapeDisconnectFieldInput;
  GardenLayerHas_shapeFieldInput: GardenLayerHas_ShapeFieldInput;
  GardenLayerHas_shapeRelationship: GardenLayerHas_ShapeRelationship;
  GardenLayerHas_shapeUpdateConnectionInput: GardenLayerHas_ShapeUpdateConnectionInput;
  GardenLayerHas_shapeUpdateFieldInput: GardenLayerHas_ShapeUpdateFieldInput;
  GardenLayerOnCreateInput: GardenLayerOnCreateInput;
  GardenLayerOptions: GardenLayerOptions;
  GardenLayerRelationInput: GardenLayerRelationInput;
  GardenLayerSort: GardenLayerSort;
  GardenLayerUniqueWhere: GardenLayerUniqueWhere;
  GardenLayerUpdateInput: GardenLayerUpdateInput;
  GardenLayerWhere: GardenLayerWhere;
  GardenLayersConnection: GardenLayersConnection;
  GardenOptions: GardenOptions;
  GardenRelationInput: GardenRelationInput;
  GardenSettings: GardenSettings;
  GardenSettingsAggregateInput: GardenSettingsAggregateInput;
  GardenSettingsAggregateSelection: GardenSettingsAggregateSelection;
  GardenSettingsConnectFieldInput: GardenSettingsConnectFieldInput;
  GardenSettingsConnectInput: GardenSettingsConnectInput;
  GardenSettingsConnectWhere: GardenSettingsConnectWhere;
  GardenSettingsConnection: GardenSettingsConnection;
  GardenSettingsConnectionSort: GardenSettingsConnectionSort;
  GardenSettingsConnectionWhere: GardenSettingsConnectionWhere;
  GardenSettingsCreateFieldInput: GardenSettingsCreateFieldInput;
  GardenSettingsCreateInput: GardenSettingsCreateInput;
  GardenSettingsDeleteFieldInput: GardenSettingsDeleteFieldInput;
  GardenSettingsDeleteInput: GardenSettingsDeleteInput;
  GardenSettingsDisconnectFieldInput: GardenSettingsDisconnectFieldInput;
  GardenSettingsDisconnectInput: GardenSettingsDisconnectInput;
  GardenSettingsEdge: GardenSettingsEdge;
  GardenSettingsFieldInput: GardenSettingsFieldInput;
  GardenSettingsGardenAggregateInput: GardenSettingsGardenAggregateInput;
  GardenSettingsGardenConnectFieldInput: GardenSettingsGardenConnectFieldInput;
  GardenSettingsGardenConnection: GardenSettingsGardenConnection;
  GardenSettingsGardenConnectionSort: GardenSettingsGardenConnectionSort;
  GardenSettingsGardenConnectionWhere: GardenSettingsGardenConnectionWhere;
  GardenSettingsGardenCreateFieldInput: GardenSettingsGardenCreateFieldInput;
  GardenSettingsGardenDeleteFieldInput: GardenSettingsGardenDeleteFieldInput;
  GardenSettingsGardenDisconnectFieldInput: GardenSettingsGardenDisconnectFieldInput;
  GardenSettingsGardenFieldInput: GardenSettingsGardenFieldInput;
  GardenSettingsGardenGardenAggregationSelection: GardenSettingsGardenGardenAggregationSelection;
  GardenSettingsGardenGardenNodeAggregateSelection: GardenSettingsGardenGardenNodeAggregateSelection;
  GardenSettingsGardenNodeAggregationWhereInput: GardenSettingsGardenNodeAggregationWhereInput;
  GardenSettingsGardenRelationship: GardenSettingsGardenRelationship;
  GardenSettingsGardenUpdateConnectionInput: GardenSettingsGardenUpdateConnectionInput;
  GardenSettingsGardenUpdateFieldInput: GardenSettingsGardenUpdateFieldInput;
  GardenSettingsInput: GardenSettingsInput;
  GardenSettingsNodeAggregationWhereInput: GardenSettingsNodeAggregationWhereInput;
  GardenSettingsOptions: GardenSettingsOptions;
  GardenSettingsRelationInput: GardenSettingsRelationInput;
  GardenSettingsRelationship: GardenSettingsRelationship;
  GardenSettingsSort: GardenSettingsSort;
  GardenSettingsUpdateConnectionInput: GardenSettingsUpdateConnectionInput;
  GardenSettingsUpdateFieldInput: GardenSettingsUpdateFieldInput;
  GardenSettingsUpdateInput: GardenSettingsUpdateInput;
  GardenSettingsWhere: GardenSettingsWhere;
  GardenSort: GardenSort;
  GardenUpdateInput: GardenUpdateInput;
  GardenWhere: GardenWhere;
  GardensConnection: GardensConnection;
  GeoShape: ResolversParentTypes['MarkerShape'] | ResolversParentTypes['PolygonShape'];
  GeoShapeBelongs_toAggregateInput: GeoShapeBelongs_ToAggregateInput;
  GeoShapeBelongs_toConnectFieldInput: GeoShapeBelongs_ToConnectFieldInput;
  GeoShapeBelongs_toConnectOrCreateFieldInput: GeoShapeBelongs_ToConnectOrCreateFieldInput;
  GeoShapeBelongs_toConnectOrCreateFieldInputOnCreate: GeoShapeBelongs_ToConnectOrCreateFieldInputOnCreate;
  GeoShapeBelongs_toConnection: GeoShapeBelongs_ToConnection;
  GeoShapeBelongs_toConnectionSort: GeoShapeBelongs_ToConnectionSort;
  GeoShapeBelongs_toConnectionWhere: GeoShapeBelongs_ToConnectionWhere;
  GeoShapeBelongs_toCreateFieldInput: GeoShapeBelongs_ToCreateFieldInput;
  GeoShapeBelongs_toDeleteFieldInput: GeoShapeBelongs_ToDeleteFieldInput;
  GeoShapeBelongs_toDisconnectFieldInput: GeoShapeBelongs_ToDisconnectFieldInput;
  GeoShapeBelongs_toFieldInput: GeoShapeBelongs_ToFieldInput;
  GeoShapeBelongs_toNodeAggregationWhereInput: GeoShapeBelongs_ToNodeAggregationWhereInput;
  GeoShapeBelongs_toRelationship: GeoShapeBelongs_ToRelationship;
  GeoShapeBelongs_toUpdateConnectionInput: GeoShapeBelongs_ToUpdateConnectionInput;
  GeoShapeBelongs_toUpdateFieldInput: GeoShapeBelongs_ToUpdateFieldInput;
  GeoShapeConnectInput: GeoShapeConnectInput;
  GeoShapeConnectWhere: GeoShapeConnectWhere;
  GeoShapeCreateInput: GeoShapeCreateInput;
  GeoShapeDeleteInput: GeoShapeDeleteInput;
  GeoShapeDisconnectInput: GeoShapeDisconnectInput;
  GeoShapeFeatureAggregateInput: GeoShapeFeatureAggregateInput;
  GeoShapeFeatureConnectFieldInput: GeoShapeFeatureConnectFieldInput;
  GeoShapeFeatureConnectOrCreateFieldInput: GeoShapeFeatureConnectOrCreateFieldInput;
  GeoShapeFeatureConnectOrCreateFieldInputOnCreate: GeoShapeFeatureConnectOrCreateFieldInputOnCreate;
  GeoShapeFeatureConnection: GeoShapeFeatureConnection;
  GeoShapeFeatureConnectionSort: GeoShapeFeatureConnectionSort;
  GeoShapeFeatureConnectionWhere: GeoShapeFeatureConnectionWhere;
  GeoShapeFeatureCreateFieldInput: GeoShapeFeatureCreateFieldInput;
  GeoShapeFeatureDeleteFieldInput: GeoShapeFeatureDeleteFieldInput;
  GeoShapeFeatureDisconnectFieldInput: GeoShapeFeatureDisconnectFieldInput;
  GeoShapeFeatureFieldInput: GeoShapeFeatureFieldInput;
  GeoShapeFeatureNodeAggregationWhereInput: GeoShapeFeatureNodeAggregationWhereInput;
  GeoShapeFeatureRelationship: GeoShapeFeatureRelationship;
  GeoShapeFeatureUpdateConnectionInput: GeoShapeFeatureUpdateConnectionInput;
  GeoShapeFeatureUpdateFieldInput: GeoShapeFeatureUpdateFieldInput;
  GeoShapeImplementationsConnectInput: GeoShapeImplementationsConnectInput;
  GeoShapeImplementationsDeleteInput: GeoShapeImplementationsDeleteInput;
  GeoShapeImplementationsDisconnectInput: GeoShapeImplementationsDisconnectInput;
  GeoShapeImplementationsUpdateInput: GeoShapeImplementationsUpdateInput;
  GeoShapeImplementationsWhere: GeoShapeImplementationsWhere;
  GeoShapeOptions: GeoShapeOptions;
  GeoShapeSort: GeoShapeSort;
  GeoShapeUpdateInput: GeoShapeUpdateInput;
  GeoShapeWhere: GeoShapeWhere;
  ID: Scalars['ID'];
  IDAggregateSelectionNonNullable: IdAggregateSelectionNonNullable;
  Int: Scalars['Int'];
  IntAggregateSelectionNullable: IntAggregateSelectionNullable;
  JSON: Scalars['JSON'];
  LogEvent: LogEvent;
  LogEventAggregateSelection: LogEventAggregateSelection;
  LogEventConnectInput: LogEventConnectInput;
  LogEventConnectWhere: LogEventConnectWhere;
  LogEventCreateInput: LogEventCreateInput;
  LogEventDeleteInput: LogEventDeleteInput;
  LogEventDisconnectInput: LogEventDisconnectInput;
  LogEventEdge: LogEventEdge;
  LogEventOptions: LogEventOptions;
  LogEventRefers_toAggregateInput: LogEventRefers_ToAggregateInput;
  LogEventRefers_toConnectFieldInput: LogEventRefers_ToConnectFieldInput;
  LogEventRefers_toConnection: LogEventRefers_ToConnection;
  LogEventRefers_toConnectionSort: LogEventRefers_ToConnectionSort;
  LogEventRefers_toConnectionWhere: LogEventRefers_ToConnectionWhere;
  LogEventRefers_toCreateFieldInput: LogEventRefers_ToCreateFieldInput;
  LogEventRefers_toDeleteFieldInput: LogEventRefers_ToDeleteFieldInput;
  LogEventRefers_toDisconnectFieldInput: LogEventRefers_ToDisconnectFieldInput;
  LogEventRefers_toFieldInput: LogEventRefers_ToFieldInput;
  LogEventRefers_toNodeAggregationWhereInput: LogEventRefers_ToNodeAggregationWhereInput;
  LogEventRefers_toRelationship: LogEventRefers_ToRelationship;
  LogEventRefers_toUpdateConnectionInput: LogEventRefers_ToUpdateConnectionInput;
  LogEventRefers_toUpdateFieldInput: LogEventRefers_ToUpdateFieldInput;
  LogEventRelationInput: LogEventRelationInput;
  LogEventSort: LogEventSort;
  LogEventTriggered_byAggregateInput: LogEventTriggered_ByAggregateInput;
  LogEventTriggered_byConnectFieldInput: LogEventTriggered_ByConnectFieldInput;
  LogEventTriggered_byConnection: LogEventTriggered_ByConnection;
  LogEventTriggered_byConnectionSort: LogEventTriggered_ByConnectionSort;
  LogEventTriggered_byConnectionWhere: LogEventTriggered_ByConnectionWhere;
  LogEventTriggered_byCreateFieldInput: LogEventTriggered_ByCreateFieldInput;
  LogEventTriggered_byDeleteFieldInput: LogEventTriggered_ByDeleteFieldInput;
  LogEventTriggered_byDisconnectFieldInput: LogEventTriggered_ByDisconnectFieldInput;
  LogEventTriggered_byFieldInput: LogEventTriggered_ByFieldInput;
  LogEventTriggered_byNodeAggregationWhereInput: LogEventTriggered_ByNodeAggregationWhereInput;
  LogEventTriggered_byRelationship: LogEventTriggered_ByRelationship;
  LogEventTriggered_byUpdateConnectionInput: LogEventTriggered_ByUpdateConnectionInput;
  LogEventTriggered_byUpdateFieldInput: LogEventTriggered_ByUpdateFieldInput;
  LogEventUpdateInput: LogEventUpdateInput;
  LogEventUserTriggered_byAggregationSelection: LogEventUserTriggered_ByAggregationSelection;
  LogEventUserTriggered_byNodeAggregateSelection: LogEventUserTriggered_ByNodeAggregateSelection;
  LogEventWateringTaskRefers_toAggregationSelection: LogEventWateringTaskRefers_ToAggregationSelection;
  LogEventWateringTaskRefers_toNodeAggregateSelection: LogEventWateringTaskRefers_ToNodeAggregateSelection;
  LogEventWhere: LogEventWhere;
  LogEventsConnection: LogEventsConnection;
  MarkerShape: MarkerShape;
  MarkerShapeAggregateSelection: MarkerShapeAggregateSelection;
  MarkerShapeBelongs_toAggregateInput: MarkerShapeBelongs_ToAggregateInput;
  MarkerShapeBelongs_toNodeAggregationWhereInput: MarkerShapeBelongs_ToNodeAggregationWhereInput;
  MarkerShapeConnectInput: MarkerShapeConnectInput;
  MarkerShapeConnectOrCreateInput: MarkerShapeConnectOrCreateInput;
  MarkerShapeCreateInput: MarkerShapeCreateInput;
  MarkerShapeDeleteInput: MarkerShapeDeleteInput;
  MarkerShapeDisconnectInput: MarkerShapeDisconnectInput;
  MarkerShapeEdge: MarkerShapeEdge;
  MarkerShapeFeatureAggregateInput: MarkerShapeFeatureAggregateInput;
  MarkerShapeFeatureNodeAggregationWhereInput: MarkerShapeFeatureNodeAggregationWhereInput;
  MarkerShapeGardenFeatureFeatureAggregationSelection: MarkerShapeGardenFeatureFeatureAggregationSelection;
  MarkerShapeGardenFeatureFeatureNodeAggregateSelection: MarkerShapeGardenFeatureFeatureNodeAggregateSelection;
  MarkerShapeGardenLayerBelongs_toAggregationSelection: MarkerShapeGardenLayerBelongs_ToAggregationSelection;
  MarkerShapeGardenLayerBelongs_toNodeAggregateSelection: MarkerShapeGardenLayerBelongs_ToNodeAggregateSelection;
  MarkerShapeOptions: MarkerShapeOptions;
  MarkerShapeRelationInput: MarkerShapeRelationInput;
  MarkerShapeSort: MarkerShapeSort;
  MarkerShapeUpdateInput: MarkerShapeUpdateInput;
  MarkerShapeWhere: MarkerShapeWhere;
  MarkerShapesConnection: MarkerShapesConnection;
  Mutation: {};
  PageInfo: PageInfo;
  PlantSpecies: PlantSpecies;
  PlantSpeciesAggregateSelection: PlantSpeciesAggregateSelection;
  PlantSpeciesCategoriesAggregateInput: PlantSpeciesCategoriesAggregateInput;
  PlantSpeciesCategoriesConnectFieldInput: PlantSpeciesCategoriesConnectFieldInput;
  PlantSpeciesCategoriesConnection: PlantSpeciesCategoriesConnection;
  PlantSpeciesCategoriesConnectionSort: PlantSpeciesCategoriesConnectionSort;
  PlantSpeciesCategoriesConnectionWhere: PlantSpeciesCategoriesConnectionWhere;
  PlantSpeciesCategoriesCreateFieldInput: PlantSpeciesCategoriesCreateFieldInput;
  PlantSpeciesCategoriesDeleteFieldInput: PlantSpeciesCategoriesDeleteFieldInput;
  PlantSpeciesCategoriesDisconnectFieldInput: PlantSpeciesCategoriesDisconnectFieldInput;
  PlantSpeciesCategoriesFieldInput: PlantSpeciesCategoriesFieldInput;
  PlantSpeciesCategoriesNodeAggregationWhereInput: PlantSpeciesCategoriesNodeAggregationWhereInput;
  PlantSpeciesCategoriesRelationship: PlantSpeciesCategoriesRelationship;
  PlantSpeciesCategoriesUpdateConnectionInput: PlantSpeciesCategoriesUpdateConnectionInput;
  PlantSpeciesCategoriesUpdateFieldInput: PlantSpeciesCategoriesUpdateFieldInput;
  PlantSpeciesCategoryCategoriesAggregationSelection: PlantSpeciesCategoryCategoriesAggregationSelection;
  PlantSpeciesCategoryCategoriesNodeAggregateSelection: PlantSpeciesCategoryCategoriesNodeAggregateSelection;
  PlantSpeciesConnectInput: PlantSpeciesConnectInput;
  PlantSpeciesConnectWhere: PlantSpeciesConnectWhere;
  PlantSpeciesConnection: PlantSpeciesConnection;
  PlantSpeciesCreateInput: PlantSpeciesCreateInput;
  PlantSpeciesCropRotationFactorAggregateInput: PlantSpeciesCropRotationFactorAggregateInput;
  PlantSpeciesCropRotationFactorConnectFieldInput: PlantSpeciesCropRotationFactorConnectFieldInput;
  PlantSpeciesCropRotationFactorConnection: PlantSpeciesCropRotationFactorConnection;
  PlantSpeciesCropRotationFactorConnectionSort: PlantSpeciesCropRotationFactorConnectionSort;
  PlantSpeciesCropRotationFactorConnectionWhere: PlantSpeciesCropRotationFactorConnectionWhere;
  PlantSpeciesCropRotationFactorCreateFieldInput: PlantSpeciesCropRotationFactorCreateFieldInput;
  PlantSpeciesCropRotationFactorDeleteFieldInput: PlantSpeciesCropRotationFactorDeleteFieldInput;
  PlantSpeciesCropRotationFactorDisconnectFieldInput: PlantSpeciesCropRotationFactorDisconnectFieldInput;
  PlantSpeciesCropRotationFactorEdgeAggregationWhereInput: PlantSpeciesCropRotationFactorEdgeAggregationWhereInput;
  PlantSpeciesCropRotationFactorFieldInput: PlantSpeciesCropRotationFactorFieldInput;
  PlantSpeciesCropRotationFactorNodeAggregationWhereInput: PlantSpeciesCropRotationFactorNodeAggregationWhereInput;
  PlantSpeciesCropRotationFactorRelationship: PlantSpeciesCropRotationFactorRelationship;
  PlantSpeciesCropRotationFactorUpdateConnectionInput: PlantSpeciesCropRotationFactorUpdateConnectionInput;
  PlantSpeciesCropRotationFactorUpdateFieldInput: PlantSpeciesCropRotationFactorUpdateFieldInput;
  PlantSpeciesDeleteInput: PlantSpeciesDeleteInput;
  PlantSpeciesDisconnectInput: PlantSpeciesDisconnectInput;
  PlantSpeciesEdge: PlantSpeciesEdge;
  PlantSpeciesOptions: PlantSpeciesOptions;
  PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection: PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection;
  PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection: PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection;
  PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection: PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection: PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection: PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection: PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection;
  PlantSpeciesPlantVarietyVarietiesAggregationSelection: PlantSpeciesPlantVarietyVarietiesAggregationSelection;
  PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection: PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection;
  PlantSpeciesPositiveNeighborhoodAggregateInput: PlantSpeciesPositiveNeighborhoodAggregateInput;
  PlantSpeciesPositiveNeighborhoodConnectFieldInput: PlantSpeciesPositiveNeighborhoodConnectFieldInput;
  PlantSpeciesPositiveNeighborhoodConnection: PlantSpeciesPositiveNeighborhoodConnection;
  PlantSpeciesPositiveNeighborhoodConnectionSort: PlantSpeciesPositiveNeighborhoodConnectionSort;
  PlantSpeciesPositiveNeighborhoodConnectionWhere: PlantSpeciesPositiveNeighborhoodConnectionWhere;
  PlantSpeciesPositiveNeighborhoodCreateFieldInput: PlantSpeciesPositiveNeighborhoodCreateFieldInput;
  PlantSpeciesPositiveNeighborhoodDeleteFieldInput: PlantSpeciesPositiveNeighborhoodDeleteFieldInput;
  PlantSpeciesPositiveNeighborhoodDisconnectFieldInput: PlantSpeciesPositiveNeighborhoodDisconnectFieldInput;
  PlantSpeciesPositiveNeighborhoodEdgeAggregationWhereInput: PlantSpeciesPositiveNeighborhoodEdgeAggregationWhereInput;
  PlantSpeciesPositiveNeighborhoodFieldInput: PlantSpeciesPositiveNeighborhoodFieldInput;
  PlantSpeciesPositiveNeighborhoodNodeAggregationWhereInput: PlantSpeciesPositiveNeighborhoodNodeAggregationWhereInput;
  PlantSpeciesPositiveNeighborhoodRelationship: PlantSpeciesPositiveNeighborhoodRelationship;
  PlantSpeciesPositiveNeighborhoodUpdateConnectionInput: PlantSpeciesPositiveNeighborhoodUpdateConnectionInput;
  PlantSpeciesPositiveNeighborhoodUpdateFieldInput: PlantSpeciesPositiveNeighborhoodUpdateFieldInput;
  PlantSpeciesRelationInput: PlantSpeciesRelationInput;
  PlantSpeciesSort: PlantSpeciesSort;
  PlantSpeciesUpdateInput: PlantSpeciesUpdateInput;
  PlantSpeciesVarietiesAggregateInput: PlantSpeciesVarietiesAggregateInput;
  PlantSpeciesVarietiesConnectFieldInput: PlantSpeciesVarietiesConnectFieldInput;
  PlantSpeciesVarietiesConnection: PlantSpeciesVarietiesConnection;
  PlantSpeciesVarietiesConnectionSort: PlantSpeciesVarietiesConnectionSort;
  PlantSpeciesVarietiesConnectionWhere: PlantSpeciesVarietiesConnectionWhere;
  PlantSpeciesVarietiesCreateFieldInput: PlantSpeciesVarietiesCreateFieldInput;
  PlantSpeciesVarietiesDeleteFieldInput: PlantSpeciesVarietiesDeleteFieldInput;
  PlantSpeciesVarietiesDisconnectFieldInput: PlantSpeciesVarietiesDisconnectFieldInput;
  PlantSpeciesVarietiesFieldInput: PlantSpeciesVarietiesFieldInput;
  PlantSpeciesVarietiesNodeAggregationWhereInput: PlantSpeciesVarietiesNodeAggregationWhereInput;
  PlantSpeciesVarietiesRelationship: PlantSpeciesVarietiesRelationship;
  PlantSpeciesVarietiesUpdateConnectionInput: PlantSpeciesVarietiesUpdateConnectionInput;
  PlantSpeciesVarietiesUpdateFieldInput: PlantSpeciesVarietiesUpdateFieldInput;
  PlantSpeciesWhere: PlantSpeciesWhere;
  PlantVarietiesConnection: PlantVarietiesConnection;
  PlantVariety: PlantVariety;
  PlantVarietyAggregateSelection: PlantVarietyAggregateSelection;
  PlantVarietyConnectInput: PlantVarietyConnectInput;
  PlantVarietyConnectWhere: PlantVarietyConnectWhere;
  PlantVarietyCreateInput: PlantVarietyCreateInput;
  PlantVarietyDeleteInput: PlantVarietyDeleteInput;
  PlantVarietyDisconnectInput: PlantVarietyDisconnectInput;
  PlantVarietyEdge: PlantVarietyEdge;
  PlantVarietyOptions: PlantVarietyOptions;
  PlantVarietyPlantSpeciesSpeciesAggregationSelection: PlantVarietyPlantSpeciesSpeciesAggregationSelection;
  PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection: PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection;
  PlantVarietyRelationInput: PlantVarietyRelationInput;
  PlantVarietySort: PlantVarietySort;
  PlantVarietySpeciesAggregateInput: PlantVarietySpeciesAggregateInput;
  PlantVarietySpeciesConnectFieldInput: PlantVarietySpeciesConnectFieldInput;
  PlantVarietySpeciesConnection: PlantVarietySpeciesConnection;
  PlantVarietySpeciesConnectionSort: PlantVarietySpeciesConnectionSort;
  PlantVarietySpeciesConnectionWhere: PlantVarietySpeciesConnectionWhere;
  PlantVarietySpeciesCreateFieldInput: PlantVarietySpeciesCreateFieldInput;
  PlantVarietySpeciesDeleteFieldInput: PlantVarietySpeciesDeleteFieldInput;
  PlantVarietySpeciesDisconnectFieldInput: PlantVarietySpeciesDisconnectFieldInput;
  PlantVarietySpeciesFieldInput: PlantVarietySpeciesFieldInput;
  PlantVarietySpeciesNodeAggregationWhereInput: PlantVarietySpeciesNodeAggregationWhereInput;
  PlantVarietySpeciesRelationship: PlantVarietySpeciesRelationship;
  PlantVarietySpeciesUpdateConnectionInput: PlantVarietySpeciesUpdateConnectionInput;
  PlantVarietySpeciesUpdateFieldInput: PlantVarietySpeciesUpdateFieldInput;
  PlantVarietyUpdateInput: PlantVarietyUpdateInput;
  PlantVarietyWhere: PlantVarietyWhere;
  Point: Point;
  PointDistance: PointDistance;
  PointInput: PointInput;
  PolygonShape: PolygonShape;
  PolygonShapeAggregateSelection: PolygonShapeAggregateSelection;
  PolygonShapeBelongs_toAggregateInput: PolygonShapeBelongs_ToAggregateInput;
  PolygonShapeBelongs_toNodeAggregationWhereInput: PolygonShapeBelongs_ToNodeAggregationWhereInput;
  PolygonShapeConnectInput: PolygonShapeConnectInput;
  PolygonShapeConnectOrCreateInput: PolygonShapeConnectOrCreateInput;
  PolygonShapeCreateInput: PolygonShapeCreateInput;
  PolygonShapeDeleteInput: PolygonShapeDeleteInput;
  PolygonShapeDisconnectInput: PolygonShapeDisconnectInput;
  PolygonShapeEdge: PolygonShapeEdge;
  PolygonShapeFeatureAggregateInput: PolygonShapeFeatureAggregateInput;
  PolygonShapeFeatureNodeAggregationWhereInput: PolygonShapeFeatureNodeAggregationWhereInput;
  PolygonShapeGardenFeatureFeatureAggregationSelection: PolygonShapeGardenFeatureFeatureAggregationSelection;
  PolygonShapeGardenFeatureFeatureNodeAggregateSelection: PolygonShapeGardenFeatureFeatureNodeAggregateSelection;
  PolygonShapeGardenLayerBelongs_toAggregationSelection: PolygonShapeGardenLayerBelongs_ToAggregationSelection;
  PolygonShapeGardenLayerBelongs_toNodeAggregateSelection: PolygonShapeGardenLayerBelongs_ToNodeAggregateSelection;
  PolygonShapeOptions: PolygonShapeOptions;
  PolygonShapeRelationInput: PolygonShapeRelationInput;
  PolygonShapeSort: PolygonShapeSort;
  PolygonShapeUpdateInput: PolygonShapeUpdateInput;
  PolygonShapeWhere: PolygonShapeWhere;
  PolygonShapesConnection: PolygonShapesConnection;
  PositiveNeighborhood: ResolversParentTypes['PlantSpeciesPositiveNeighborhoodRelationship'];
  PositiveNeighborhoodCreateInput: PositiveNeighborhoodCreateInput;
  PositiveNeighborhoodSort: PositiveNeighborhoodSort;
  PositiveNeighborhoodUpdateInput: PositiveNeighborhoodUpdateInput;
  PositiveNeighborhoodWhere: PositiveNeighborhoodWhere;
  PushKeyInput: PushKeyInput;
  PushMessageInput: PushMessageInput;
  PushSubscriptionInput: PushSubscriptionInput;
  Query: {};
  Seed: Seed;
  SeedAggregateSelection: SeedAggregateSelection;
  SeedConnectInput: SeedConnectInput;
  SeedContainedInAggregateInput: SeedContainedInAggregateInput;
  SeedContainedInConnectFieldInput: SeedContainedInConnectFieldInput;
  SeedContainedInConnection: SeedContainedInConnection;
  SeedContainedInConnectionSort: SeedContainedInConnectionSort;
  SeedContainedInConnectionWhere: SeedContainedInConnectionWhere;
  SeedContainedInCreateFieldInput: SeedContainedInCreateFieldInput;
  SeedContainedInDeleteFieldInput: SeedContainedInDeleteFieldInput;
  SeedContainedInDisconnectFieldInput: SeedContainedInDisconnectFieldInput;
  SeedContainedInFieldInput: SeedContainedInFieldInput;
  SeedContainedInNodeAggregationWhereInput: SeedContainedInNodeAggregationWhereInput;
  SeedContainedInRelationship: SeedContainedInRelationship;
  SeedContainedInUpdateConnectionInput: SeedContainedInUpdateConnectionInput;
  SeedContainedInUpdateFieldInput: SeedContainedInUpdateFieldInput;
  SeedContainerContainedInAggregationSelection: SeedContainerContainedInAggregationSelection;
  SeedContainerContainedInNodeAggregateSelection: SeedContainerContainedInNodeAggregateSelection;
  SeedCreateInput: SeedCreateInput;
  SeedDeleteInput: SeedDeleteInput;
  SeedDisconnectInput: SeedDisconnectInput;
  SeedEdge: SeedEdge;
  SeedOptions: SeedOptions;
  SeedRelationInput: SeedRelationInput;
  SeedSort: SeedSort;
  SeedUpdateInput: SeedUpdateInput;
  SeedWhere: SeedWhere;
  SeedsConnection: SeedsConnection;
  String: Scalars['String'];
  StringAggregateSelectionNonNullable: StringAggregateSelectionNonNullable;
  StringAggregateSelectionNullable: StringAggregateSelectionNullable;
  Subscription: {};
  UpdateCategoriesMutationResponse: UpdateCategoriesMutationResponse;
  UpdateChangeRequestsMutationResponse: UpdateChangeRequestsMutationResponse;
  UpdateContainersMutationResponse: UpdateContainersMutationResponse;
  UpdateGardenFeaturesMutationResponse: UpdateGardenFeaturesMutationResponse;
  UpdateGardenLayersMutationResponse: UpdateGardenLayersMutationResponse;
  UpdateGardenSettingsMutationResponse: UpdateGardenSettingsMutationResponse;
  UpdateGardensMutationResponse: UpdateGardensMutationResponse;
  UpdateInfo: UpdateInfo;
  UpdateLogEventsMutationResponse: UpdateLogEventsMutationResponse;
  UpdateMarkerShapesMutationResponse: UpdateMarkerShapesMutationResponse;
  UpdatePlantSpeciesMutationResponse: UpdatePlantSpeciesMutationResponse;
  UpdatePlantVarietiesMutationResponse: UpdatePlantVarietiesMutationResponse;
  UpdatePolygonShapesMutationResponse: UpdatePolygonShapesMutationResponse;
  UpdateSeedsMutationResponse: UpdateSeedsMutationResponse;
  UpdateUserSettingsMutationResponse: UpdateUserSettingsMutationResponse;
  UpdateUsersMutationResponse: UpdateUsersMutationResponse;
  UpdateWateringPeriodsMutationResponse: UpdateWateringPeriodsMutationResponse;
  UpdateWateringTasksMutationResponse: UpdateWateringTasksMutationResponse;
  User: User;
  UserAggregateSelection: UserAggregateSelection;
  UserAssignedAggregateInput: UserAssignedAggregateInput;
  UserAssignedConnectFieldInput: UserAssignedConnectFieldInput;
  UserAssignedConnection: UserAssignedConnection;
  UserAssignedConnectionSort: UserAssignedConnectionSort;
  UserAssignedConnectionWhere: UserAssignedConnectionWhere;
  UserAssignedCreateFieldInput: UserAssignedCreateFieldInput;
  UserAssignedDeleteFieldInput: UserAssignedDeleteFieldInput;
  UserAssignedDisconnectFieldInput: UserAssignedDisconnectFieldInput;
  UserAssignedFieldInput: UserAssignedFieldInput;
  UserAssignedNodeAggregationWhereInput: UserAssignedNodeAggregationWhereInput;
  UserAssignedRelationship: UserAssignedRelationship;
  UserAssignedUpdateConnectionInput: UserAssignedUpdateConnectionInput;
  UserAssignedUpdateFieldInput: UserAssignedUpdateFieldInput;
  UserAvailableAggregateInput: UserAvailableAggregateInput;
  UserAvailableConnectFieldInput: UserAvailableConnectFieldInput;
  UserAvailableConnection: UserAvailableConnection;
  UserAvailableConnectionSort: UserAvailableConnectionSort;
  UserAvailableConnectionWhere: UserAvailableConnectionWhere;
  UserAvailableCreateFieldInput: UserAvailableCreateFieldInput;
  UserAvailableDeleteFieldInput: UserAvailableDeleteFieldInput;
  UserAvailableDisconnectFieldInput: UserAvailableDisconnectFieldInput;
  UserAvailableFieldInput: UserAvailableFieldInput;
  UserAvailableNodeAggregationWhereInput: UserAvailableNodeAggregationWhereInput;
  UserAvailableRelationship: UserAvailableRelationship;
  UserAvailableUpdateConnectionInput: UserAvailableUpdateConnectionInput;
  UserAvailableUpdateFieldInput: UserAvailableUpdateFieldInput;
  UserChangeRequestChangerequests_requested_byAggregationSelection: UserChangeRequestChangerequests_Requested_ByAggregationSelection;
  UserChangeRequestChangerequests_requested_byNodeAggregateSelection: UserChangeRequestChangerequests_Requested_ByNodeAggregateSelection;
  UserChangeRequestChangerequests_requested_toAggregationSelection: UserChangeRequestChangerequests_Requested_ToAggregationSelection;
  UserChangeRequestChangerequests_requested_toNodeAggregateSelection: UserChangeRequestChangerequests_Requested_ToNodeAggregateSelection;
  UserChangerequests_requested_byAggregateInput: UserChangerequests_Requested_ByAggregateInput;
  UserChangerequests_requested_byConnectFieldInput: UserChangerequests_Requested_ByConnectFieldInput;
  UserChangerequests_requested_byConnection: UserChangerequests_Requested_ByConnection;
  UserChangerequests_requested_byConnectionSort: UserChangerequests_Requested_ByConnectionSort;
  UserChangerequests_requested_byConnectionWhere: UserChangerequests_Requested_ByConnectionWhere;
  UserChangerequests_requested_byCreateFieldInput: UserChangerequests_Requested_ByCreateFieldInput;
  UserChangerequests_requested_byDeleteFieldInput: UserChangerequests_Requested_ByDeleteFieldInput;
  UserChangerequests_requested_byDisconnectFieldInput: UserChangerequests_Requested_ByDisconnectFieldInput;
  UserChangerequests_requested_byFieldInput: UserChangerequests_Requested_ByFieldInput;
  UserChangerequests_requested_byNodeAggregationWhereInput: UserChangerequests_Requested_ByNodeAggregationWhereInput;
  UserChangerequests_requested_byRelationship: UserChangerequests_Requested_ByRelationship;
  UserChangerequests_requested_byUpdateConnectionInput: UserChangerequests_Requested_ByUpdateConnectionInput;
  UserChangerequests_requested_byUpdateFieldInput: UserChangerequests_Requested_ByUpdateFieldInput;
  UserChangerequests_requested_toAggregateInput: UserChangerequests_Requested_ToAggregateInput;
  UserChangerequests_requested_toConnectFieldInput: UserChangerequests_Requested_ToConnectFieldInput;
  UserChangerequests_requested_toConnection: UserChangerequests_Requested_ToConnection;
  UserChangerequests_requested_toConnectionSort: UserChangerequests_Requested_ToConnectionSort;
  UserChangerequests_requested_toConnectionWhere: UserChangerequests_Requested_ToConnectionWhere;
  UserChangerequests_requested_toCreateFieldInput: UserChangerequests_Requested_ToCreateFieldInput;
  UserChangerequests_requested_toDeleteFieldInput: UserChangerequests_Requested_ToDeleteFieldInput;
  UserChangerequests_requested_toDisconnectFieldInput: UserChangerequests_Requested_ToDisconnectFieldInput;
  UserChangerequests_requested_toFieldInput: UserChangerequests_Requested_ToFieldInput;
  UserChangerequests_requested_toNodeAggregationWhereInput: UserChangerequests_Requested_ToNodeAggregationWhereInput;
  UserChangerequests_requested_toRelationship: UserChangerequests_Requested_ToRelationship;
  UserChangerequests_requested_toUpdateConnectionInput: UserChangerequests_Requested_ToUpdateConnectionInput;
  UserChangerequests_requested_toUpdateFieldInput: UserChangerequests_Requested_ToUpdateFieldInput;
  UserConnectInput: UserConnectInput;
  UserConnectWhere: UserConnectWhere;
  UserCreateInput: UserCreateInput;
  UserDeleteInput: UserDeleteInput;
  UserDisconnectInput: UserDisconnectInput;
  UserEdge: UserEdge;
  UserLogEventLogevents_triggered_byAggregationSelection: UserLogEventLogevents_Triggered_ByAggregationSelection;
  UserLogEventLogevents_triggered_byNodeAggregateSelection: UserLogEventLogevents_Triggered_ByNodeAggregateSelection;
  UserLogevents_triggered_byAggregateInput: UserLogevents_Triggered_ByAggregateInput;
  UserLogevents_triggered_byConnectFieldInput: UserLogevents_Triggered_ByConnectFieldInput;
  UserLogevents_triggered_byConnection: UserLogevents_Triggered_ByConnection;
  UserLogevents_triggered_byConnectionSort: UserLogevents_Triggered_ByConnectionSort;
  UserLogevents_triggered_byConnectionWhere: UserLogevents_Triggered_ByConnectionWhere;
  UserLogevents_triggered_byCreateFieldInput: UserLogevents_Triggered_ByCreateFieldInput;
  UserLogevents_triggered_byDeleteFieldInput: UserLogevents_Triggered_ByDeleteFieldInput;
  UserLogevents_triggered_byDisconnectFieldInput: UserLogevents_Triggered_ByDisconnectFieldInput;
  UserLogevents_triggered_byFieldInput: UserLogevents_Triggered_ByFieldInput;
  UserLogevents_triggered_byNodeAggregationWhereInput: UserLogevents_Triggered_ByNodeAggregationWhereInput;
  UserLogevents_triggered_byRelationship: UserLogevents_Triggered_ByRelationship;
  UserLogevents_triggered_byUpdateConnectionInput: UserLogevents_Triggered_ByUpdateConnectionInput;
  UserLogevents_triggered_byUpdateFieldInput: UserLogevents_Triggered_ByUpdateFieldInput;
  UserOptions: UserOptions;
  UserRelationInput: UserRelationInput;
  UserSettings: UserSettings;
  UserSettingsAggregateSelection: UserSettingsAggregateSelection;
  UserSettingsConnection: UserSettingsConnection;
  UserSettingsCreateInput: UserSettingsCreateInput;
  UserSettingsEdge: UserSettingsEdge;
  UserSettingsInput: UserSettingsInput;
  UserSettingsOptions: UserSettingsOptions;
  UserSettingsSort: UserSettingsSort;
  UserSettingsUpdateInput: UserSettingsUpdateInput;
  UserSettingsWhere: UserSettingsWhere;
  UserSort: UserSort;
  UserUpdateInput: UserUpdateInput;
  UserWateringTaskAssignedAggregationSelection: UserWateringTaskAssignedAggregationSelection;
  UserWateringTaskAssignedNodeAggregateSelection: UserWateringTaskAssignedNodeAggregateSelection;
  UserWateringTaskAvailableAggregationSelection: UserWateringTaskAvailableAggregationSelection;
  UserWateringTaskAvailableNodeAggregateSelection: UserWateringTaskAvailableNodeAggregateSelection;
  UserWhere: UserWhere;
  UsersConnection: UsersConnection;
  WateringPeriod: WateringPeriod;
  WateringPeriodAggregateSelection: WateringPeriodAggregateSelection;
  WateringPeriodAtAggregateInput: WateringPeriodAtAggregateInput;
  WateringPeriodAtConnectFieldInput: WateringPeriodAtConnectFieldInput;
  WateringPeriodAtConnection: WateringPeriodAtConnection;
  WateringPeriodAtConnectionSort: WateringPeriodAtConnectionSort;
  WateringPeriodAtConnectionWhere: WateringPeriodAtConnectionWhere;
  WateringPeriodAtCreateFieldInput: WateringPeriodAtCreateFieldInput;
  WateringPeriodAtDeleteFieldInput: WateringPeriodAtDeleteFieldInput;
  WateringPeriodAtDisconnectFieldInput: WateringPeriodAtDisconnectFieldInput;
  WateringPeriodAtFieldInput: WateringPeriodAtFieldInput;
  WateringPeriodAtNodeAggregationWhereInput: WateringPeriodAtNodeAggregationWhereInput;
  WateringPeriodAtRelationship: WateringPeriodAtRelationship;
  WateringPeriodAtUpdateConnectionInput: WateringPeriodAtUpdateConnectionInput;
  WateringPeriodAtUpdateFieldInput: WateringPeriodAtUpdateFieldInput;
  WateringPeriodConnectInput: WateringPeriodConnectInput;
  WateringPeriodConnectWhere: WateringPeriodConnectWhere;
  WateringPeriodCreateInput: WateringPeriodCreateInput;
  WateringPeriodDeleteInput: WateringPeriodDeleteInput;
  WateringPeriodDisconnectInput: WateringPeriodDisconnectInput;
  WateringPeriodEdge: WateringPeriodEdge;
  WateringPeriodGardenAtAggregationSelection: WateringPeriodGardenAtAggregationSelection;
  WateringPeriodGardenAtNodeAggregateSelection: WateringPeriodGardenAtNodeAggregateSelection;
  WateringPeriodOptions: WateringPeriodOptions;
  WateringPeriodRelationInput: WateringPeriodRelationInput;
  WateringPeriodSort: WateringPeriodSort;
  WateringPeriodUpdateInput: WateringPeriodUpdateInput;
  WateringPeriodWateringTaskWateringtasksAggregationSelection: WateringPeriodWateringTaskWateringtasksAggregationSelection;
  WateringPeriodWateringTaskWateringtasksNodeAggregateSelection: WateringPeriodWateringTaskWateringtasksNodeAggregateSelection;
  WateringPeriodWateringtasksAggregateInput: WateringPeriodWateringtasksAggregateInput;
  WateringPeriodWateringtasksConnectFieldInput: WateringPeriodWateringtasksConnectFieldInput;
  WateringPeriodWateringtasksConnection: WateringPeriodWateringtasksConnection;
  WateringPeriodWateringtasksConnectionSort: WateringPeriodWateringtasksConnectionSort;
  WateringPeriodWateringtasksConnectionWhere: WateringPeriodWateringtasksConnectionWhere;
  WateringPeriodWateringtasksCreateFieldInput: WateringPeriodWateringtasksCreateFieldInput;
  WateringPeriodWateringtasksDeleteFieldInput: WateringPeriodWateringtasksDeleteFieldInput;
  WateringPeriodWateringtasksDisconnectFieldInput: WateringPeriodWateringtasksDisconnectFieldInput;
  WateringPeriodWateringtasksFieldInput: WateringPeriodWateringtasksFieldInput;
  WateringPeriodWateringtasksNodeAggregationWhereInput: WateringPeriodWateringtasksNodeAggregationWhereInput;
  WateringPeriodWateringtasksRelationship: WateringPeriodWateringtasksRelationship;
  WateringPeriodWateringtasksUpdateConnectionInput: WateringPeriodWateringtasksUpdateConnectionInput;
  WateringPeriodWateringtasksUpdateFieldInput: WateringPeriodWateringtasksUpdateFieldInput;
  WateringPeriodWhere: WateringPeriodWhere;
  WateringPeriodsConnection: WateringPeriodsConnection;
  WateringTask: WateringTask;
  WateringTaskAggregateSelection: WateringTaskAggregateSelection;
  WateringTaskChangeRequestChangerequests_requested_forAggregationSelection: WateringTaskChangeRequestChangerequests_Requested_ForAggregationSelection;
  WateringTaskChangeRequestChangerequests_requested_forNodeAggregateSelection: WateringTaskChangeRequestChangerequests_Requested_ForNodeAggregateSelection;
  WateringTaskChangeRequestChangerequests_requested_new_taskAggregationSelection: WateringTaskChangeRequestChangerequests_Requested_New_TaskAggregationSelection;
  WateringTaskChangeRequestChangerequests_requested_new_taskNodeAggregateSelection: WateringTaskChangeRequestChangerequests_Requested_New_TaskNodeAggregateSelection;
  WateringTaskChangerequests_requested_forAggregateInput: WateringTaskChangerequests_Requested_ForAggregateInput;
  WateringTaskChangerequests_requested_forConnectFieldInput: WateringTaskChangerequests_Requested_ForConnectFieldInput;
  WateringTaskChangerequests_requested_forConnection: WateringTaskChangerequests_Requested_ForConnection;
  WateringTaskChangerequests_requested_forConnectionSort: WateringTaskChangerequests_Requested_ForConnectionSort;
  WateringTaskChangerequests_requested_forConnectionWhere: WateringTaskChangerequests_Requested_ForConnectionWhere;
  WateringTaskChangerequests_requested_forCreateFieldInput: WateringTaskChangerequests_Requested_ForCreateFieldInput;
  WateringTaskChangerequests_requested_forDeleteFieldInput: WateringTaskChangerequests_Requested_ForDeleteFieldInput;
  WateringTaskChangerequests_requested_forDisconnectFieldInput: WateringTaskChangerequests_Requested_ForDisconnectFieldInput;
  WateringTaskChangerequests_requested_forFieldInput: WateringTaskChangerequests_Requested_ForFieldInput;
  WateringTaskChangerequests_requested_forNodeAggregationWhereInput: WateringTaskChangerequests_Requested_ForNodeAggregationWhereInput;
  WateringTaskChangerequests_requested_forRelationship: WateringTaskChangerequests_Requested_ForRelationship;
  WateringTaskChangerequests_requested_forUpdateConnectionInput: WateringTaskChangerequests_Requested_ForUpdateConnectionInput;
  WateringTaskChangerequests_requested_forUpdateFieldInput: WateringTaskChangerequests_Requested_ForUpdateFieldInput;
  WateringTaskChangerequests_requested_new_taskAggregateInput: WateringTaskChangerequests_Requested_New_TaskAggregateInput;
  WateringTaskChangerequests_requested_new_taskConnectFieldInput: WateringTaskChangerequests_Requested_New_TaskConnectFieldInput;
  WateringTaskChangerequests_requested_new_taskConnection: WateringTaskChangerequests_Requested_New_TaskConnection;
  WateringTaskChangerequests_requested_new_taskConnectionSort: WateringTaskChangerequests_Requested_New_TaskConnectionSort;
  WateringTaskChangerequests_requested_new_taskConnectionWhere: WateringTaskChangerequests_Requested_New_TaskConnectionWhere;
  WateringTaskChangerequests_requested_new_taskCreateFieldInput: WateringTaskChangerequests_Requested_New_TaskCreateFieldInput;
  WateringTaskChangerequests_requested_new_taskDeleteFieldInput: WateringTaskChangerequests_Requested_New_TaskDeleteFieldInput;
  WateringTaskChangerequests_requested_new_taskDisconnectFieldInput: WateringTaskChangerequests_Requested_New_TaskDisconnectFieldInput;
  WateringTaskChangerequests_requested_new_taskFieldInput: WateringTaskChangerequests_Requested_New_TaskFieldInput;
  WateringTaskChangerequests_requested_new_taskNodeAggregationWhereInput: WateringTaskChangerequests_Requested_New_TaskNodeAggregationWhereInput;
  WateringTaskChangerequests_requested_new_taskRelationship: WateringTaskChangerequests_Requested_New_TaskRelationship;
  WateringTaskChangerequests_requested_new_taskUpdateConnectionInput: WateringTaskChangerequests_Requested_New_TaskUpdateConnectionInput;
  WateringTaskChangerequests_requested_new_taskUpdateFieldInput: WateringTaskChangerequests_Requested_New_TaskUpdateFieldInput;
  WateringTaskConnectInput: WateringTaskConnectInput;
  WateringTaskConnectWhere: WateringTaskConnectWhere;
  WateringTaskCreateInput: WateringTaskCreateInput;
  WateringTaskDeleteInput: WateringTaskDeleteInput;
  WateringTaskDisconnectInput: WateringTaskDisconnectInput;
  WateringTaskEdge: WateringTaskEdge;
  WateringTaskLogEventLogevents_refers_toAggregationSelection: WateringTaskLogEventLogevents_Refers_ToAggregationSelection;
  WateringTaskLogEventLogevents_refers_toNodeAggregateSelection: WateringTaskLogEventLogevents_Refers_ToNodeAggregateSelection;
  WateringTaskLogevents_refers_toAggregateInput: WateringTaskLogevents_Refers_ToAggregateInput;
  WateringTaskLogevents_refers_toConnectFieldInput: WateringTaskLogevents_Refers_ToConnectFieldInput;
  WateringTaskLogevents_refers_toConnection: WateringTaskLogevents_Refers_ToConnection;
  WateringTaskLogevents_refers_toConnectionSort: WateringTaskLogevents_Refers_ToConnectionSort;
  WateringTaskLogevents_refers_toConnectionWhere: WateringTaskLogevents_Refers_ToConnectionWhere;
  WateringTaskLogevents_refers_toCreateFieldInput: WateringTaskLogevents_Refers_ToCreateFieldInput;
  WateringTaskLogevents_refers_toDeleteFieldInput: WateringTaskLogevents_Refers_ToDeleteFieldInput;
  WateringTaskLogevents_refers_toDisconnectFieldInput: WateringTaskLogevents_Refers_ToDisconnectFieldInput;
  WateringTaskLogevents_refers_toFieldInput: WateringTaskLogevents_Refers_ToFieldInput;
  WateringTaskLogevents_refers_toNodeAggregationWhereInput: WateringTaskLogevents_Refers_ToNodeAggregationWhereInput;
  WateringTaskLogevents_refers_toRelationship: WateringTaskLogevents_Refers_ToRelationship;
  WateringTaskLogevents_refers_toUpdateConnectionInput: WateringTaskLogevents_Refers_ToUpdateConnectionInput;
  WateringTaskLogevents_refers_toUpdateFieldInput: WateringTaskLogevents_Refers_ToUpdateFieldInput;
  WateringTaskOptions: WateringTaskOptions;
  WateringTaskRelationInput: WateringTaskRelationInput;
  WateringTaskSort: WateringTaskSort;
  WateringTaskUpdateInput: WateringTaskUpdateInput;
  WateringTaskUserUsers_assignedAggregationSelection: WateringTaskUserUsers_AssignedAggregationSelection;
  WateringTaskUserUsers_assignedNodeAggregateSelection: WateringTaskUserUsers_AssignedNodeAggregateSelection;
  WateringTaskUserUsers_availableAggregationSelection: WateringTaskUserUsers_AvailableAggregationSelection;
  WateringTaskUserUsers_availableNodeAggregateSelection: WateringTaskUserUsers_AvailableNodeAggregateSelection;
  WateringTaskUsers_assignedAggregateInput: WateringTaskUsers_AssignedAggregateInput;
  WateringTaskUsers_assignedConnectFieldInput: WateringTaskUsers_AssignedConnectFieldInput;
  WateringTaskUsers_assignedConnection: WateringTaskUsers_AssignedConnection;
  WateringTaskUsers_assignedConnectionSort: WateringTaskUsers_AssignedConnectionSort;
  WateringTaskUsers_assignedConnectionWhere: WateringTaskUsers_AssignedConnectionWhere;
  WateringTaskUsers_assignedCreateFieldInput: WateringTaskUsers_AssignedCreateFieldInput;
  WateringTaskUsers_assignedDeleteFieldInput: WateringTaskUsers_AssignedDeleteFieldInput;
  WateringTaskUsers_assignedDisconnectFieldInput: WateringTaskUsers_AssignedDisconnectFieldInput;
  WateringTaskUsers_assignedFieldInput: WateringTaskUsers_AssignedFieldInput;
  WateringTaskUsers_assignedNodeAggregationWhereInput: WateringTaskUsers_AssignedNodeAggregationWhereInput;
  WateringTaskUsers_assignedRelationship: WateringTaskUsers_AssignedRelationship;
  WateringTaskUsers_assignedUpdateConnectionInput: WateringTaskUsers_AssignedUpdateConnectionInput;
  WateringTaskUsers_assignedUpdateFieldInput: WateringTaskUsers_AssignedUpdateFieldInput;
  WateringTaskUsers_availableAggregateInput: WateringTaskUsers_AvailableAggregateInput;
  WateringTaskUsers_availableConnectFieldInput: WateringTaskUsers_AvailableConnectFieldInput;
  WateringTaskUsers_availableConnection: WateringTaskUsers_AvailableConnection;
  WateringTaskUsers_availableConnectionSort: WateringTaskUsers_AvailableConnectionSort;
  WateringTaskUsers_availableConnectionWhere: WateringTaskUsers_AvailableConnectionWhere;
  WateringTaskUsers_availableCreateFieldInput: WateringTaskUsers_AvailableCreateFieldInput;
  WateringTaskUsers_availableDeleteFieldInput: WateringTaskUsers_AvailableDeleteFieldInput;
  WateringTaskUsers_availableDisconnectFieldInput: WateringTaskUsers_AvailableDisconnectFieldInput;
  WateringTaskUsers_availableFieldInput: WateringTaskUsers_AvailableFieldInput;
  WateringTaskUsers_availableNodeAggregationWhereInput: WateringTaskUsers_AvailableNodeAggregationWhereInput;
  WateringTaskUsers_availableRelationship: WateringTaskUsers_AvailableRelationship;
  WateringTaskUsers_availableUpdateConnectionInput: WateringTaskUsers_AvailableUpdateConnectionInput;
  WateringTaskUsers_availableUpdateFieldInput: WateringTaskUsers_AvailableUpdateFieldInput;
  WateringTaskWateringPeriodWateringperiodAggregationSelection: WateringTaskWateringPeriodWateringperiodAggregationSelection;
  WateringTaskWateringPeriodWateringperiodNodeAggregateSelection: WateringTaskWateringPeriodWateringperiodNodeAggregateSelection;
  WateringTaskWateringperiodAggregateInput: WateringTaskWateringperiodAggregateInput;
  WateringTaskWateringperiodConnectFieldInput: WateringTaskWateringperiodConnectFieldInput;
  WateringTaskWateringperiodConnection: WateringTaskWateringperiodConnection;
  WateringTaskWateringperiodConnectionSort: WateringTaskWateringperiodConnectionSort;
  WateringTaskWateringperiodConnectionWhere: WateringTaskWateringperiodConnectionWhere;
  WateringTaskWateringperiodCreateFieldInput: WateringTaskWateringperiodCreateFieldInput;
  WateringTaskWateringperiodDeleteFieldInput: WateringTaskWateringperiodDeleteFieldInput;
  WateringTaskWateringperiodDisconnectFieldInput: WateringTaskWateringperiodDisconnectFieldInput;
  WateringTaskWateringperiodFieldInput: WateringTaskWateringperiodFieldInput;
  WateringTaskWateringperiodNodeAggregationWhereInput: WateringTaskWateringperiodNodeAggregationWhereInput;
  WateringTaskWateringperiodRelationship: WateringTaskWateringperiodRelationship;
  WateringTaskWateringperiodUpdateConnectionInput: WateringTaskWateringperiodUpdateConnectionInput;
  WateringTaskWateringperiodUpdateFieldInput: WateringTaskWateringperiodUpdateFieldInput;
  WateringTaskWhere: WateringTaskWhere;
  WateringTasksConnection: WateringTasksConnection;
};

export type AuthDirectiveArgs = { };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasPermissionDirectiveArgs = {
  resources?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type HasPermissionDirectiveResolver<Result, Parent, ContextType = any, Args = HasPermissionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasRoleDirectiveArgs = {
  role?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type HasRoleDirectiveResolver<Result, Parent, ContextType = any, Args = HasRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CategoriesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoriesConnection'] = ResolversParentTypes['CategoriesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CategoryEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  childCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<CategoryChildCategoriesArgs, 'directed'>>;
  childCategoriesAggregate?: Resolver<Maybe<ResolversTypes['CategoryCategoryChildCategoriesAggregationSelection']>, ParentType, ContextType, RequireFields<CategoryChildCategoriesAggregateArgs, 'directed'>>;
  childCategoriesConnection?: Resolver<ResolversTypes['CategoryChildCategoriesConnection'], ParentType, ContextType, RequireFields<CategoryChildCategoriesConnectionArgs, 'directed'>>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<CategoryParentCategoryArgs, 'directed'>>;
  parentCategoryAggregate?: Resolver<Maybe<ResolversTypes['CategoryCategoryParentCategoryAggregationSelection']>, ParentType, ContextType, RequireFields<CategoryParentCategoryAggregateArgs, 'directed'>>;
  parentCategoryConnection?: Resolver<ResolversTypes['CategoryParentCategoryConnection'], ParentType, ContextType, RequireFields<CategoryParentCategoryConnectionArgs, 'directed'>>;
  species?: Resolver<Array<ResolversTypes['PlantSpecies']>, ParentType, ContextType, RequireFields<CategorySpeciesArgs, 'directed'>>;
  speciesAggregate?: Resolver<Maybe<ResolversTypes['CategoryPlantSpeciesSpeciesAggregationSelection']>, ParentType, ContextType, RequireFields<CategorySpeciesAggregateArgs, 'directed'>>;
  speciesConnection?: Resolver<ResolversTypes['CategorySpeciesConnection'], ParentType, ContextType, RequireFields<CategorySpeciesConnectionArgs, 'directed'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryAggregateSelection'] = ResolversParentTypes['CategoryAggregateSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryCategoryChildCategoriesAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryCategoryChildCategoriesAggregationSelection'] = ResolversParentTypes['CategoryCategoryChildCategoriesAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['CategoryCategoryChildCategoriesNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryCategoryChildCategoriesNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryCategoryChildCategoriesNodeAggregateSelection'] = ResolversParentTypes['CategoryCategoryChildCategoriesNodeAggregateSelection']> = {
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryCategoryParentCategoryAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryCategoryParentCategoryAggregationSelection'] = ResolversParentTypes['CategoryCategoryParentCategoryAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['CategoryCategoryParentCategoryNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryCategoryParentCategoryNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryCategoryParentCategoryNodeAggregateSelection'] = ResolversParentTypes['CategoryCategoryParentCategoryNodeAggregateSelection']> = {
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryChildCategoriesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryChildCategoriesConnection'] = ResolversParentTypes['CategoryChildCategoriesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CategoryChildCategoriesRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryChildCategoriesRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryChildCategoriesRelationship'] = ResolversParentTypes['CategoryChildCategoriesRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryEdge'] = ResolversParentTypes['CategoryEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryParentCategoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryParentCategoryConnection'] = ResolversParentTypes['CategoryParentCategoryConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CategoryParentCategoryRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryParentCategoryRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryParentCategoryRelationship'] = ResolversParentTypes['CategoryParentCategoryRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryPlantSpeciesSpeciesAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryPlantSpeciesSpeciesAggregationSelection'] = ResolversParentTypes['CategoryPlantSpeciesSpeciesAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['CategoryPlantSpeciesSpeciesNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryPlantSpeciesSpeciesNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryPlantSpeciesSpeciesNodeAggregateSelection'] = ResolversParentTypes['CategoryPlantSpeciesSpeciesNodeAggregateSelection']> = {
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategorySpeciesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategorySpeciesConnection'] = ResolversParentTypes['CategorySpeciesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CategorySpeciesRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategorySpeciesRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategorySpeciesRelationship'] = ResolversParentTypes['CategorySpeciesRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlantSpecies'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequest'] = ResolversParentTypes['ChangeRequest']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requested_by?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ByArgs, 'directed'>>;
  requested_byAggregate?: Resolver<Maybe<ResolversTypes['ChangeRequestUserRequested_byAggregationSelection']>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ByAggregateArgs, 'directed'>>;
  requested_byConnection?: Resolver<ResolversTypes['ChangeRequestRequested_byConnection'], ParentType, ContextType, RequireFields<ChangeRequestRequested_ByConnectionArgs, 'directed'>>;
  requested_for?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ForArgs, 'directed'>>;
  requested_forAggregate?: Resolver<Maybe<ResolversTypes['ChangeRequestWateringTaskRequested_forAggregationSelection']>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ForAggregateArgs, 'directed'>>;
  requested_forConnection?: Resolver<ResolversTypes['ChangeRequestRequested_forConnection'], ParentType, ContextType, RequireFields<ChangeRequestRequested_ForConnectionArgs, 'directed'>>;
  requested_new_task?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<ChangeRequestRequested_New_TaskArgs, 'directed'>>;
  requested_new_taskAggregate?: Resolver<Maybe<ResolversTypes['ChangeRequestWateringTaskRequested_new_taskAggregationSelection']>, ParentType, ContextType, RequireFields<ChangeRequestRequested_New_TaskAggregateArgs, 'directed'>>;
  requested_new_taskConnection?: Resolver<ResolversTypes['ChangeRequestRequested_new_taskConnection'], ParentType, ContextType, RequireFields<ChangeRequestRequested_New_TaskConnectionArgs, 'directed'>>;
  requested_to?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ToArgs, 'directed'>>;
  requested_toAggregate?: Resolver<Maybe<ResolversTypes['ChangeRequestUserRequested_toAggregationSelection']>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ToAggregateArgs, 'directed'>>;
  requested_toConnection?: Resolver<ResolversTypes['ChangeRequestRequested_toConnection'], ParentType, ContextType, RequireFields<ChangeRequestRequested_ToConnectionArgs, 'directed'>>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestAggregateSelection'] = ResolversParentTypes['ChangeRequestAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestEdge'] = ResolversParentTypes['ChangeRequestEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ChangeRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestRequested_ByConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestRequested_byConnection'] = ResolversParentTypes['ChangeRequestRequested_byConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ChangeRequestRequested_byRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestRequested_ByRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestRequested_byRelationship'] = ResolversParentTypes['ChangeRequestRequested_byRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestRequested_ForConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestRequested_forConnection'] = ResolversParentTypes['ChangeRequestRequested_forConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ChangeRequestRequested_forRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestRequested_ForRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestRequested_forRelationship'] = ResolversParentTypes['ChangeRequestRequested_forRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestRequested_New_TaskConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestRequested_new_taskConnection'] = ResolversParentTypes['ChangeRequestRequested_new_taskConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ChangeRequestRequested_new_taskRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestRequested_New_TaskRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestRequested_new_taskRelationship'] = ResolversParentTypes['ChangeRequestRequested_new_taskRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestRequested_ToConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestRequested_toConnection'] = ResolversParentTypes['ChangeRequestRequested_toConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ChangeRequestRequested_toRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestRequested_ToRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestRequested_toRelationship'] = ResolversParentTypes['ChangeRequestRequested_toRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestUserRequested_ByAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestUserRequested_byAggregationSelection'] = ResolversParentTypes['ChangeRequestUserRequested_byAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['ChangeRequestUserRequested_byNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestUserRequested_ByNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestUserRequested_byNodeAggregateSelection'] = ResolversParentTypes['ChangeRequestUserRequested_byNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestUserRequested_ToAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestUserRequested_toAggregationSelection'] = ResolversParentTypes['ChangeRequestUserRequested_toAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['ChangeRequestUserRequested_toNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestUserRequested_ToNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestUserRequested_toNodeAggregateSelection'] = ResolversParentTypes['ChangeRequestUserRequested_toNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestWateringTaskRequested_ForAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestWateringTaskRequested_forAggregationSelection'] = ResolversParentTypes['ChangeRequestWateringTaskRequested_forAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['ChangeRequestWateringTaskRequested_forNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestWateringTaskRequested_ForNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestWateringTaskRequested_forNodeAggregateSelection'] = ResolversParentTypes['ChangeRequestWateringTaskRequested_forNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestWateringTaskRequested_New_TaskAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestWateringTaskRequested_new_taskAggregationSelection'] = ResolversParentTypes['ChangeRequestWateringTaskRequested_new_taskAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['ChangeRequestWateringTaskRequested_new_taskNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestWateringTaskRequested_New_TaskNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestWateringTaskRequested_new_taskNodeAggregateSelection'] = ResolversParentTypes['ChangeRequestWateringTaskRequested_new_taskNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequestsConnection'] = ResolversParentTypes['ChangeRequestsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ChangeRequestEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContainerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Container'] = ResolversParentTypes['Container']> = {
  containerType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storageLocation?: Resolver<Array<ResolversTypes['GardenFeature']>, ParentType, ContextType, RequireFields<ContainerStorageLocationArgs, 'directed'>>;
  storageLocationAggregate?: Resolver<Maybe<ResolversTypes['ContainerGardenFeatureStorageLocationAggregationSelection']>, ParentType, ContextType, RequireFields<ContainerStorageLocationAggregateArgs, 'directed'>>;
  storageLocationConnection?: Resolver<ResolversTypes['ContainerStorageLocationConnection'], ParentType, ContextType, RequireFields<ContainerStorageLocationConnectionArgs, 'directed'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContainerAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContainerAggregateSelection'] = ResolversParentTypes['ContainerAggregateSelection']> = {
  containerType?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContainerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContainerEdge'] = ResolversParentTypes['ContainerEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Container'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContainerGardenFeatureStorageLocationAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContainerGardenFeatureStorageLocationAggregationSelection'] = ResolversParentTypes['ContainerGardenFeatureStorageLocationAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['ContainerGardenFeatureStorageLocationNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContainerGardenFeatureStorageLocationNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContainerGardenFeatureStorageLocationNodeAggregateSelection'] = ResolversParentTypes['ContainerGardenFeatureStorageLocationNodeAggregateSelection']> = {
  featureId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  featureType?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContainerStorageLocationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContainerStorageLocationConnection'] = ResolversParentTypes['ContainerStorageLocationConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ContainerStorageLocationRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContainerStorageLocationRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContainerStorageLocationRelationship'] = ResolversParentTypes['ContainerStorageLocationRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GardenFeature'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContainersConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContainersConnection'] = ResolversParentTypes['ContainersConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ContainerEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCategoriesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCategoriesMutationResponse'] = ResolversParentTypes['CreateCategoriesMutationResponse']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateChangeRequestsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateChangeRequestsMutationResponse'] = ResolversParentTypes['CreateChangeRequestsMutationResponse']> = {
  changeRequests?: Resolver<Array<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateContainersMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateContainersMutationResponse'] = ResolversParentTypes['CreateContainersMutationResponse']> = {
  containers?: Resolver<Array<ResolversTypes['Container']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateGardenFeaturesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateGardenFeaturesMutationResponse'] = ResolversParentTypes['CreateGardenFeaturesMutationResponse']> = {
  gardenFeatures?: Resolver<Array<ResolversTypes['GardenFeature']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateGardenLayersMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateGardenLayersMutationResponse'] = ResolversParentTypes['CreateGardenLayersMutationResponse']> = {
  gardenLayers?: Resolver<Array<ResolversTypes['GardenLayer']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateGardenSettingsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateGardenSettingsMutationResponse'] = ResolversParentTypes['CreateGardenSettingsMutationResponse']> = {
  gardenSettings?: Resolver<Array<ResolversTypes['GardenSettings']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateGardensMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateGardensMutationResponse'] = ResolversParentTypes['CreateGardensMutationResponse']> = {
  gardens?: Resolver<Array<ResolversTypes['Garden']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateInfo'] = ResolversParentTypes['CreateInfo']> = {
  bookmark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nodesCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  relationshipsCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLogEventsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateLogEventsMutationResponse'] = ResolversParentTypes['CreateLogEventsMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  logEvents?: Resolver<Array<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMarkerShapesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateMarkerShapesMutationResponse'] = ResolversParentTypes['CreateMarkerShapesMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  markerShapes?: Resolver<Array<ResolversTypes['MarkerShape']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePlantSpeciesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePlantSpeciesMutationResponse'] = ResolversParentTypes['CreatePlantSpeciesMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  plantSpecies?: Resolver<Array<ResolversTypes['PlantSpecies']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePlantVarietiesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePlantVarietiesMutationResponse'] = ResolversParentTypes['CreatePlantVarietiesMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  plantVarieties?: Resolver<Array<ResolversTypes['PlantVariety']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatePolygonShapesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePolygonShapesMutationResponse'] = ResolversParentTypes['CreatePolygonShapesMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  polygonShapes?: Resolver<Array<ResolversTypes['PolygonShape']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateSeedsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateSeedsMutationResponse'] = ResolversParentTypes['CreateSeedsMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  seeds?: Resolver<Array<ResolversTypes['Seed']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserSettingsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserSettingsMutationResponse'] = ResolversParentTypes['CreateUserSettingsMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  userSettings?: Resolver<Array<ResolversTypes['UserSettings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUsersMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUsersMutationResponse'] = ResolversParentTypes['CreateUsersMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateWateringPeriodsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateWateringPeriodsMutationResponse'] = ResolversParentTypes['CreateWateringPeriodsMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  wateringPeriods?: Resolver<Array<ResolversTypes['WateringPeriod']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateWateringTasksMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateWateringTasksMutationResponse'] = ResolversParentTypes['CreateWateringTasksMutationResponse']> = {
  info?: Resolver<ResolversTypes['CreateInfo'], ParentType, ContextType>;
  wateringTasks?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CropRotationResolvers<ContextType = any, ParentType extends ResolversParentTypes['CropRotation'] = ResolversParentTypes['CropRotation']> = {
  __resolveType: TypeResolveFn<'PlantSpeciesCropRotationFactorRelationship', ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteInfo'] = ResolversParentTypes['DeleteInfo']> = {
  bookmark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nodesDeleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  relationshipsDeleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Garden'] = ResolversParentTypes['Garden']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  gardenId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['GardenSettings']>, ParentType, ContextType, RequireFields<GardenSettingsArgs, 'directed'>>;
  settingsAggregate?: Resolver<Maybe<ResolversTypes['GardenGardenSettingsSettingsAggregationSelection']>, ParentType, ContextType, RequireFields<GardenSettingsAggregateArgs, 'directed'>>;
  settingsConnection?: Resolver<ResolversTypes['GardenSettingsConnection'], ParentType, ContextType, RequireFields<GardenSettingsConnectionArgs, 'directed'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenAggregateSelection'] = ResolversParentTypes['GardenAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gardenId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenEdge'] = ResolversParentTypes['GardenEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Garden'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeature'] = ResolversParentTypes['GardenFeature']> = {
  contains?: Resolver<Array<ResolversTypes['Container']>, ParentType, ContextType, RequireFields<GardenFeatureContainsArgs, 'directed'>>;
  containsAggregate?: Resolver<Maybe<ResolversTypes['GardenFeatureContainerContainsAggregationSelection']>, ParentType, ContextType, RequireFields<GardenFeatureContainsAggregateArgs, 'directed'>>;
  containsConnection?: Resolver<ResolversTypes['GardenFeatureContainsConnection'], ParentType, ContextType, RequireFields<GardenFeatureContainsConnectionArgs, 'directed'>>;
  featureId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  featureType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  infoText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plants?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  shape?: Resolver<Array<ResolversTypes['GeoShape']>, ParentType, ContextType, RequireFields<GardenFeatureShapeArgs, 'directed'>>;
  shapeConnection?: Resolver<ResolversTypes['GardenFeatureShapeConnection'], ParentType, ContextType, RequireFields<GardenFeatureShapeConnectionArgs, 'directed'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeatureAggregateSelection'] = ResolversParentTypes['GardenFeatureAggregateSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  featureId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  featureType?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureContainerContainsAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeatureContainerContainsAggregationSelection'] = ResolversParentTypes['GardenFeatureContainerContainsAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GardenFeatureContainerContainsNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureContainerContainsNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeatureContainerContainsNodeAggregateSelection'] = ResolversParentTypes['GardenFeatureContainerContainsNodeAggregateSelection']> = {
  containerType?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureContainsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeatureContainsConnection'] = ResolversParentTypes['GardenFeatureContainsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenFeatureContainsRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureContainsRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeatureContainsRelationship'] = ResolversParentTypes['GardenFeatureContainsRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Container'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeatureEdge'] = ResolversParentTypes['GardenFeatureEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GardenFeature'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureShapeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeatureShapeConnection'] = ResolversParentTypes['GardenFeatureShapeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenFeatureShapeRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeatureShapeRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeatureShapeRelationship'] = ResolversParentTypes['GardenFeatureShapeRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GeoShape'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenFeaturesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenFeaturesConnection'] = ResolversParentTypes['GardenFeaturesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenFeatureEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenGardenSettingsSettingsAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenGardenSettingsSettingsAggregationSelection'] = ResolversParentTypes['GardenGardenSettingsSettingsAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GardenGardenSettingsSettingsNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenGardenSettingsSettingsNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenGardenSettingsSettingsNodeAggregateSelection'] = ResolversParentTypes['GardenGardenSettingsSettingsNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  homepageUrl?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoPageMarkdown?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  logoUrl?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  shortDescription?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayer'] = ResolversParentTypes['GardenLayer']> = {
  at?: Resolver<Maybe<ResolversTypes['Garden']>, ParentType, ContextType, RequireFields<GardenLayerAtArgs, 'directed'>>;
  atAggregate?: Resolver<Maybe<ResolversTypes['GardenLayerGardenAtAggregationSelection']>, ParentType, ContextType, RequireFields<GardenLayerAtAggregateArgs, 'directed'>>;
  atConnection?: Resolver<ResolversTypes['GardenLayerAtConnection'], ParentType, ContextType, RequireFields<GardenLayerAtConnectionArgs, 'directed'>>;
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  has_shape?: Resolver<Array<ResolversTypes['GeoShape']>, ParentType, ContextType, RequireFields<GardenLayerHas_ShapeArgs, 'directed'>>;
  has_shapeConnection?: Resolver<ResolversTypes['GardenLayerHas_shapeConnection'], ParentType, ContextType, RequireFields<GardenLayerHas_ShapeConnectionArgs, 'directed'>>;
  layerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayerAggregateSelection'] = ResolversParentTypes['GardenLayerAggregateSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  layerId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerAtConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayerAtConnection'] = ResolversParentTypes['GardenLayerAtConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenLayerAtRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerAtRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayerAtRelationship'] = ResolversParentTypes['GardenLayerAtRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Garden'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayerEdge'] = ResolversParentTypes['GardenLayerEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GardenLayer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerGardenAtAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayerGardenAtAggregationSelection'] = ResolversParentTypes['GardenLayerGardenAtAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GardenLayerGardenAtNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerGardenAtNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayerGardenAtNodeAggregateSelection'] = ResolversParentTypes['GardenLayerGardenAtNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  gardenId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerHas_ShapeConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayerHas_shapeConnection'] = ResolversParentTypes['GardenLayerHas_shapeConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenLayerHas_shapeRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayerHas_ShapeRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayerHas_shapeRelationship'] = ResolversParentTypes['GardenLayerHas_shapeRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GeoShape'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenLayersConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenLayersConnection'] = ResolversParentTypes['GardenLayersConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenLayerEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettings'] = ResolversParentTypes['GardenSettings']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  garden?: Resolver<ResolversTypes['Garden'], ParentType, ContextType, RequireFields<GardenSettingsGardenArgs, 'directed'>>;
  gardenAggregate?: Resolver<Maybe<ResolversTypes['GardenSettingsGardenGardenAggregationSelection']>, ParentType, ContextType, RequireFields<GardenSettingsGardenAggregateArgs, 'directed'>>;
  gardenConnection?: Resolver<ResolversTypes['GardenSettingsGardenConnection'], ParentType, ContextType, RequireFields<GardenSettingsGardenConnectionArgs, 'directed'>>;
  homepageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  infoPageMarkdown?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['Point']>, ParentType, ContextType>;
  logoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettingsAggregateSelection'] = ResolversParentTypes['GardenSettingsAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  homepageUrl?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoPageMarkdown?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  logoUrl?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  shortDescription?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettingsConnection'] = ResolversParentTypes['GardenSettingsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenSettingsRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettingsEdge'] = ResolversParentTypes['GardenSettingsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GardenSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsGardenConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettingsGardenConnection'] = ResolversParentTypes['GardenSettingsGardenConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenSettingsGardenRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsGardenGardenAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettingsGardenGardenAggregationSelection'] = ResolversParentTypes['GardenSettingsGardenGardenAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['GardenSettingsGardenGardenNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsGardenGardenNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettingsGardenGardenNodeAggregateSelection'] = ResolversParentTypes['GardenSettingsGardenGardenNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  gardenId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsGardenRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettingsGardenRelationship'] = ResolversParentTypes['GardenSettingsGardenRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Garden'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardenSettingsRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardenSettingsRelationship'] = ResolversParentTypes['GardenSettingsRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GardenSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GardensConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GardensConnection'] = ResolversParentTypes['GardensConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GardenEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoShapeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoShape'] = ResolversParentTypes['GeoShape']> = {
  __resolveType: TypeResolveFn<'MarkerShape' | 'PolygonShape', ParentType, ContextType>;
  belongs_to?: Resolver<Array<ResolversTypes['GardenLayer']>, ParentType, ContextType, RequireFields<GeoShapeBelongs_ToArgs, 'directed'>>;
  belongs_toConnection?: Resolver<ResolversTypes['GeoShapeBelongs_toConnection'], ParentType, ContextType, RequireFields<GeoShapeBelongs_ToConnectionArgs, 'directed'>>;
  feature?: Resolver<Maybe<ResolversTypes['GardenFeature']>, ParentType, ContextType, RequireFields<GeoShapeFeatureArgs, 'directed'>>;
  featureConnection?: Resolver<ResolversTypes['GeoShapeFeatureConnection'], ParentType, ContextType, RequireFields<GeoShapeFeatureConnectionArgs, 'directed'>>;
  points?: Resolver<Array<Maybe<ResolversTypes['Point']>>, ParentType, ContextType>;
  shapeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type GeoShapeBelongs_ToConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoShapeBelongs_toConnection'] = ResolversParentTypes['GeoShapeBelongs_toConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GeoShapeBelongs_toRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoShapeBelongs_ToRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoShapeBelongs_toRelationship'] = ResolversParentTypes['GeoShapeBelongs_toRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GardenLayer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoShapeFeatureConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoShapeFeatureConnection'] = ResolversParentTypes['GeoShapeFeatureConnection']> = {
  edges?: Resolver<Array<ResolversTypes['GeoShapeFeatureRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoShapeFeatureRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoShapeFeatureRelationship'] = ResolversParentTypes['GeoShapeFeatureRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['GardenFeature'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IdAggregateSelectionNonNullableResolvers<ContextType = any, ParentType extends ResolversParentTypes['IDAggregateSelectionNonNullable'] = ResolversParentTypes['IDAggregateSelectionNonNullable']> = {
  longest?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shortest?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntAggregateSelectionNullableResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntAggregateSelectionNullable'] = ResolversParentTypes['IntAggregateSelectionNullable']> = {
  average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LogEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEvent'] = ResolversParentTypes['LogEvent']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refers_to?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<LogEventRefers_ToArgs, 'directed'>>;
  refers_toAggregate?: Resolver<Maybe<ResolversTypes['LogEventWateringTaskRefers_toAggregationSelection']>, ParentType, ContextType, RequireFields<LogEventRefers_ToAggregateArgs, 'directed'>>;
  refers_toConnection?: Resolver<ResolversTypes['LogEventRefers_toConnection'], ParentType, ContextType, RequireFields<LogEventRefers_ToConnectionArgs, 'directed'>>;
  triggered_by?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<LogEventTriggered_ByArgs, 'directed'>>;
  triggered_byAggregate?: Resolver<Maybe<ResolversTypes['LogEventUserTriggered_byAggregationSelection']>, ParentType, ContextType, RequireFields<LogEventTriggered_ByAggregateArgs, 'directed'>>;
  triggered_byConnection?: Resolver<ResolversTypes['LogEventTriggered_byConnection'], ParentType, ContextType, RequireFields<LogEventTriggered_ByConnectionArgs, 'directed'>>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventAggregateSelection'] = ResolversParentTypes['LogEventAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventEdge'] = ResolversParentTypes['LogEventEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LogEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventRefers_ToConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventRefers_toConnection'] = ResolversParentTypes['LogEventRefers_toConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LogEventRefers_toRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventRefers_ToRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventRefers_toRelationship'] = ResolversParentTypes['LogEventRefers_toRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventTriggered_ByConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventTriggered_byConnection'] = ResolversParentTypes['LogEventTriggered_byConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LogEventTriggered_byRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventTriggered_ByRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventTriggered_byRelationship'] = ResolversParentTypes['LogEventTriggered_byRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventUserTriggered_ByAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventUserTriggered_byAggregationSelection'] = ResolversParentTypes['LogEventUserTriggered_byAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['LogEventUserTriggered_byNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventUserTriggered_ByNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventUserTriggered_byNodeAggregateSelection'] = ResolversParentTypes['LogEventUserTriggered_byNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventWateringTaskRefers_ToAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventWateringTaskRefers_toAggregationSelection'] = ResolversParentTypes['LogEventWateringTaskRefers_toAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['LogEventWateringTaskRefers_toNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventWateringTaskRefers_ToNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventWateringTaskRefers_toNodeAggregateSelection'] = ResolversParentTypes['LogEventWateringTaskRefers_toNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogEventsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEventsConnection'] = ResolversParentTypes['LogEventsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['LogEventEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerShapeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkerShape'] = ResolversParentTypes['MarkerShape']> = {
  belongs_to?: Resolver<Array<ResolversTypes['GardenLayer']>, ParentType, ContextType, RequireFields<MarkerShapeBelongs_ToArgs, 'directed'>>;
  belongs_toAggregate?: Resolver<Maybe<ResolversTypes['MarkerShapeGardenLayerBelongs_toAggregationSelection']>, ParentType, ContextType, RequireFields<MarkerShapeBelongs_ToAggregateArgs, 'directed'>>;
  belongs_toConnection?: Resolver<ResolversTypes['GeoShapeBelongs_toConnection'], ParentType, ContextType, RequireFields<MarkerShapeBelongs_ToConnectionArgs, 'directed'>>;
  feature?: Resolver<Maybe<ResolversTypes['GardenFeature']>, ParentType, ContextType, RequireFields<MarkerShapeFeatureArgs, 'directed'>>;
  featureAggregate?: Resolver<Maybe<ResolversTypes['MarkerShapeGardenFeatureFeatureAggregationSelection']>, ParentType, ContextType, RequireFields<MarkerShapeFeatureAggregateArgs, 'directed'>>;
  featureConnection?: Resolver<ResolversTypes['GeoShapeFeatureConnection'], ParentType, ContextType, RequireFields<MarkerShapeFeatureConnectionArgs, 'directed'>>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  point?: Resolver<ResolversTypes['Point'], ParentType, ContextType>;
  points?: Resolver<Array<Maybe<ResolversTypes['Point']>>, ParentType, ContextType>;
  shapeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerShapeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkerShapeAggregateSelection'] = ResolversParentTypes['MarkerShapeAggregateSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  shapeId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerShapeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkerShapeEdge'] = ResolversParentTypes['MarkerShapeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['MarkerShape'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerShapeGardenFeatureFeatureAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkerShapeGardenFeatureFeatureAggregationSelection'] = ResolversParentTypes['MarkerShapeGardenFeatureFeatureAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['MarkerShapeGardenFeatureFeatureNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerShapeGardenFeatureFeatureNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkerShapeGardenFeatureFeatureNodeAggregateSelection'] = ResolversParentTypes['MarkerShapeGardenFeatureFeatureNodeAggregateSelection']> = {
  featureId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  featureType?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerShapeGardenLayerBelongs_ToAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkerShapeGardenLayerBelongs_toAggregationSelection'] = ResolversParentTypes['MarkerShapeGardenLayerBelongs_toAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['MarkerShapeGardenLayerBelongs_toNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerShapeGardenLayerBelongs_ToNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkerShapeGardenLayerBelongs_toNodeAggregateSelection'] = ResolversParentTypes['MarkerShapeGardenLayerBelongs_toNodeAggregateSelection']> = {
  layerId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkerShapesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MarkerShapesConnection'] = ResolversParentTypes['MarkerShapesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['MarkerShapeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAssignment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddAssignmentArgs, 'date' | 'gardenId'>>;
  createCategories?: Resolver<ResolversTypes['CreateCategoriesMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateCategoriesArgs, 'input'>>;
  createChangeRequests?: Resolver<ResolversTypes['CreateChangeRequestsMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateChangeRequestsArgs, 'input'>>;
  createContainers?: Resolver<ResolversTypes['CreateContainersMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateContainersArgs, 'input'>>;
  createGardenFeatures?: Resolver<ResolversTypes['CreateGardenFeaturesMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateGardenFeaturesArgs, 'input'>>;
  createGardenLayers?: Resolver<ResolversTypes['CreateGardenLayersMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateGardenLayersArgs, 'input'>>;
  createGardenSettings?: Resolver<ResolversTypes['CreateGardenSettingsMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateGardenSettingsArgs, 'input'>>;
  createGardens?: Resolver<ResolversTypes['CreateGardensMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateGardensArgs, 'input'>>;
  createLogEvents?: Resolver<ResolversTypes['CreateLogEventsMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateLogEventsArgs, 'input'>>;
  createMarkerShapes?: Resolver<ResolversTypes['CreateMarkerShapesMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateMarkerShapesArgs, 'input'>>;
  createPlantSpecies?: Resolver<ResolversTypes['CreatePlantSpeciesMutationResponse'], ParentType, ContextType, RequireFields<MutationCreatePlantSpeciesArgs, 'input'>>;
  createPlantVarieties?: Resolver<ResolversTypes['CreatePlantVarietiesMutationResponse'], ParentType, ContextType, RequireFields<MutationCreatePlantVarietiesArgs, 'input'>>;
  createPolygonShapes?: Resolver<ResolversTypes['CreatePolygonShapesMutationResponse'], ParentType, ContextType, RequireFields<MutationCreatePolygonShapesArgs, 'input'>>;
  createSeeds?: Resolver<ResolversTypes['CreateSeedsMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateSeedsArgs, 'input'>>;
  createUserSettings?: Resolver<ResolversTypes['CreateUserSettingsMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateUserSettingsArgs, 'input'>>;
  createUsers?: Resolver<ResolversTypes['CreateUsersMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateUsersArgs, 'input'>>;
  createWateringPeriods?: Resolver<ResolversTypes['CreateWateringPeriodsMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateWateringPeriodsArgs, 'input'>>;
  createWateringTasks?: Resolver<ResolversTypes['CreateWateringTasksMutationResponse'], ParentType, ContextType, RequireFields<MutationCreateWateringTasksArgs, 'input'>>;
  deleteCategories?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteCategoriesArgs>>;
  deleteChangeRequests?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteChangeRequestsArgs>>;
  deleteContainers?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteContainersArgs>>;
  deleteGardenFeatures?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteGardenFeaturesArgs>>;
  deleteGardenLayers?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteGardenLayersArgs>>;
  deleteGardenSettings?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteGardenSettingsArgs>>;
  deleteGardens?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteGardensArgs>>;
  deleteLogEvents?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteLogEventsArgs>>;
  deleteMarkerShapes?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteMarkerShapesArgs>>;
  deletePlantSpecies?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeletePlantSpeciesArgs>>;
  deletePlantVarieties?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeletePlantVarietiesArgs>>;
  deletePolygonShapes?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeletePolygonShapesArgs>>;
  deleteSeeds?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteSeedsArgs>>;
  deleteUserSettings?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteUserSettingsArgs>>;
  deleteUsers?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteUsersArgs>>;
  deleteWateringPeriods?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteWateringPeriodsArgs>>;
  deleteWateringTasks?: Resolver<ResolversTypes['DeleteInfo'], ParentType, ContextType, Partial<MutationDeleteWateringTasksArgs>>;
  mergeGardenSettings?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationMergeGardenSettingsArgs>>;
  ownMergeUserSettings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType, Partial<MutationOwnMergeUserSettingsArgs>>;
  planWateringPeriods?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationPlanWateringPeriodsArgs, 'gardenId'>>;
  publishToAll?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationPublishToAllArgs>>;
  pushSubscribe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationPushSubscribeArgs>>;
  removeAssignment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveAssignmentArgs, 'date' | 'gardenId'>>;
  seedAvailabilitiesFromTests?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  seedNeo4jFromJSON?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sendWelcomeMail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  setUserAvailability?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSetUserAvailabilityArgs, 'dates' | 'gardenId'>>;
  updateCategories?: Resolver<ResolversTypes['UpdateCategoriesMutationResponse'], ParentType, ContextType, Partial<MutationUpdateCategoriesArgs>>;
  updateChangeRequests?: Resolver<ResolversTypes['UpdateChangeRequestsMutationResponse'], ParentType, ContextType, Partial<MutationUpdateChangeRequestsArgs>>;
  updateContainers?: Resolver<ResolversTypes['UpdateContainersMutationResponse'], ParentType, ContextType, Partial<MutationUpdateContainersArgs>>;
  updateGardenFeatures?: Resolver<ResolversTypes['UpdateGardenFeaturesMutationResponse'], ParentType, ContextType, Partial<MutationUpdateGardenFeaturesArgs>>;
  updateGardenLayers?: Resolver<ResolversTypes['UpdateGardenLayersMutationResponse'], ParentType, ContextType, Partial<MutationUpdateGardenLayersArgs>>;
  updateGardenSettings?: Resolver<ResolversTypes['UpdateGardenSettingsMutationResponse'], ParentType, ContextType, Partial<MutationUpdateGardenSettingsArgs>>;
  updateGardens?: Resolver<ResolversTypes['UpdateGardensMutationResponse'], ParentType, ContextType, Partial<MutationUpdateGardensArgs>>;
  updateLogEvents?: Resolver<ResolversTypes['UpdateLogEventsMutationResponse'], ParentType, ContextType, Partial<MutationUpdateLogEventsArgs>>;
  updateMarkerShapes?: Resolver<ResolversTypes['UpdateMarkerShapesMutationResponse'], ParentType, ContextType, Partial<MutationUpdateMarkerShapesArgs>>;
  updatePlantSpecies?: Resolver<ResolversTypes['UpdatePlantSpeciesMutationResponse'], ParentType, ContextType, Partial<MutationUpdatePlantSpeciesArgs>>;
  updatePlantVarieties?: Resolver<ResolversTypes['UpdatePlantVarietiesMutationResponse'], ParentType, ContextType, Partial<MutationUpdatePlantVarietiesArgs>>;
  updatePolygonShapes?: Resolver<ResolversTypes['UpdatePolygonShapesMutationResponse'], ParentType, ContextType, Partial<MutationUpdatePolygonShapesArgs>>;
  updateSeeds?: Resolver<ResolversTypes['UpdateSeedsMutationResponse'], ParentType, ContextType, Partial<MutationUpdateSeedsArgs>>;
  updateUserSettings?: Resolver<ResolversTypes['UpdateUserSettingsMutationResponse'], ParentType, ContextType, Partial<MutationUpdateUserSettingsArgs>>;
  updateUsers?: Resolver<ResolversTypes['UpdateUsersMutationResponse'], ParentType, ContextType, Partial<MutationUpdateUsersArgs>>;
  updateWateringPeriods?: Resolver<ResolversTypes['UpdateWateringPeriodsMutationResponse'], ParentType, ContextType, Partial<MutationUpdateWateringPeriodsArgs>>;
  updateWateringTasks?: Resolver<ResolversTypes['UpdateWateringTasksMutationResponse'], ParentType, ContextType, Partial<MutationUpdateWateringTasksArgs>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpecies'] = ResolversParentTypes['PlantSpecies']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<PlantSpeciesCategoriesArgs, 'directed'>>;
  categoriesAggregate?: Resolver<Maybe<ResolversTypes['PlantSpeciesCategoryCategoriesAggregationSelection']>, ParentType, ContextType, RequireFields<PlantSpeciesCategoriesAggregateArgs, 'directed'>>;
  categoriesConnection?: Resolver<ResolversTypes['PlantSpeciesCategoriesConnection'], ParentType, ContextType, RequireFields<PlantSpeciesCategoriesConnectionArgs, 'directed'>>;
  cropRotationFactor?: Resolver<Array<ResolversTypes['PlantSpecies']>, ParentType, ContextType, RequireFields<PlantSpeciesCropRotationFactorArgs, 'directed'>>;
  cropRotationFactorAggregate?: Resolver<Maybe<ResolversTypes['PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection']>, ParentType, ContextType, RequireFields<PlantSpeciesCropRotationFactorAggregateArgs, 'directed'>>;
  cropRotationFactorConnection?: Resolver<ResolversTypes['PlantSpeciesCropRotationFactorConnection'], ParentType, ContextType, RequireFields<PlantSpeciesCropRotationFactorConnectionArgs, 'directed'>>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  infoText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  positiveNeighborhood?: Resolver<Array<ResolversTypes['PlantSpecies']>, ParentType, ContextType, RequireFields<PlantSpeciesPositiveNeighborhoodArgs, 'directed'>>;
  positiveNeighborhoodAggregate?: Resolver<Maybe<ResolversTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection']>, ParentType, ContextType, RequireFields<PlantSpeciesPositiveNeighborhoodAggregateArgs, 'directed'>>;
  positiveNeighborhoodConnection?: Resolver<ResolversTypes['PlantSpeciesPositiveNeighborhoodConnection'], ParentType, ContextType, RequireFields<PlantSpeciesPositiveNeighborhoodConnectionArgs, 'directed'>>;
  varieties?: Resolver<Array<ResolversTypes['PlantVariety']>, ParentType, ContextType, RequireFields<PlantSpeciesVarietiesArgs, 'directed'>>;
  varietiesAggregate?: Resolver<Maybe<ResolversTypes['PlantSpeciesPlantVarietyVarietiesAggregationSelection']>, ParentType, ContextType, RequireFields<PlantSpeciesVarietiesAggregateArgs, 'directed'>>;
  varietiesConnection?: Resolver<ResolversTypes['PlantSpeciesVarietiesConnection'], ParentType, ContextType, RequireFields<PlantSpeciesVarietiesConnectionArgs, 'directed'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesAggregateSelection'] = ResolversParentTypes['PlantSpeciesAggregateSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesCategoriesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesCategoriesConnection'] = ResolversParentTypes['PlantSpeciesCategoriesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PlantSpeciesCategoriesRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesCategoriesRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesCategoriesRelationship'] = ResolversParentTypes['PlantSpeciesCategoriesRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesCategoryCategoriesAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesCategoryCategoriesAggregationSelection'] = ResolversParentTypes['PlantSpeciesCategoryCategoriesAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PlantSpeciesCategoryCategoriesNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesCategoryCategoriesNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesCategoryCategoriesNodeAggregateSelection'] = ResolversParentTypes['PlantSpeciesCategoryCategoriesNodeAggregateSelection']> = {
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesConnection'] = ResolversParentTypes['PlantSpeciesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PlantSpeciesEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesCropRotationFactorConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesCropRotationFactorConnection'] = ResolversParentTypes['PlantSpeciesCropRotationFactorConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PlantSpeciesCropRotationFactorRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesCropRotationFactorRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesCropRotationFactorRelationship'] = ResolversParentTypes['PlantSpeciesCropRotationFactorRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlantSpecies'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesEdge'] = ResolversParentTypes['PlantSpeciesEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlantSpecies'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection'] = ResolversParentTypes['PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  edge?: Resolver<Maybe<ResolversTypes['PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection'] = ResolversParentTypes['PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection']> = {
  weight?: Resolver<ResolversTypes['IntAggregateSelectionNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection'] = ResolversParentTypes['PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection']> = {
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection'] = ResolversParentTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  edge?: Resolver<Maybe<ResolversTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection'] = ResolversParentTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection']> = {
  weight?: Resolver<ResolversTypes['IntAggregateSelectionNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection'] = ResolversParentTypes['PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection']> = {
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPlantVarietyVarietiesAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPlantVarietyVarietiesAggregationSelection'] = ResolversParentTypes['PlantSpeciesPlantVarietyVarietiesAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPlantVarietyVarietiesNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection'] = ResolversParentTypes['PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection']> = {
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPositiveNeighborhoodConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPositiveNeighborhoodConnection'] = ResolversParentTypes['PlantSpeciesPositiveNeighborhoodConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PlantSpeciesPositiveNeighborhoodRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesPositiveNeighborhoodRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesPositiveNeighborhoodRelationship'] = ResolversParentTypes['PlantSpeciesPositiveNeighborhoodRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlantSpecies'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesVarietiesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesVarietiesConnection'] = ResolversParentTypes['PlantSpeciesVarietiesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PlantSpeciesVarietiesRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantSpeciesVarietiesRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantSpeciesVarietiesRelationship'] = ResolversParentTypes['PlantSpeciesVarietiesRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlantVariety'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantVarietiesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantVarietiesConnection'] = ResolversParentTypes['PlantVarietiesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PlantVarietyEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantVarietyResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantVariety'] = ResolversParentTypes['PlantVariety']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  infoText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  species?: Resolver<ResolversTypes['PlantSpecies'], ParentType, ContextType, RequireFields<PlantVarietySpeciesArgs, 'directed'>>;
  speciesAggregate?: Resolver<Maybe<ResolversTypes['PlantVarietyPlantSpeciesSpeciesAggregationSelection']>, ParentType, ContextType, RequireFields<PlantVarietySpeciesAggregateArgs, 'directed'>>;
  speciesConnection?: Resolver<ResolversTypes['PlantVarietySpeciesConnection'], ParentType, ContextType, RequireFields<PlantVarietySpeciesConnectionArgs, 'directed'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantVarietyAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantVarietyAggregateSelection'] = ResolversParentTypes['PlantVarietyAggregateSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantVarietyEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantVarietyEdge'] = ResolversParentTypes['PlantVarietyEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlantVariety'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantVarietyPlantSpeciesSpeciesAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantVarietyPlantSpeciesSpeciesAggregationSelection'] = ResolversParentTypes['PlantVarietyPlantSpeciesSpeciesAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantVarietyPlantSpeciesSpeciesNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection'] = ResolversParentTypes['PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection']> = {
  description?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantVarietySpeciesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantVarietySpeciesConnection'] = ResolversParentTypes['PlantVarietySpeciesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PlantVarietySpeciesRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlantVarietySpeciesRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlantVarietySpeciesRelationship'] = ResolversParentTypes['PlantVarietySpeciesRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PlantSpecies'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PointResolvers<ContextType = any, ParentType extends ResolversParentTypes['Point'] = ResolversParentTypes['Point']> = {
  crs?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  srid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolygonShapeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolygonShape'] = ResolversParentTypes['PolygonShape']> = {
  belongs_to?: Resolver<Array<ResolversTypes['GardenLayer']>, ParentType, ContextType, RequireFields<PolygonShapeBelongs_ToArgs, 'directed'>>;
  belongs_toAggregate?: Resolver<Maybe<ResolversTypes['PolygonShapeGardenLayerBelongs_toAggregationSelection']>, ParentType, ContextType, RequireFields<PolygonShapeBelongs_ToAggregateArgs, 'directed'>>;
  belongs_toConnection?: Resolver<ResolversTypes['GeoShapeBelongs_toConnection'], ParentType, ContextType, RequireFields<PolygonShapeBelongs_ToConnectionArgs, 'directed'>>;
  feature?: Resolver<Maybe<ResolversTypes['GardenFeature']>, ParentType, ContextType, RequireFields<PolygonShapeFeatureArgs, 'directed'>>;
  featureAggregate?: Resolver<Maybe<ResolversTypes['PolygonShapeGardenFeatureFeatureAggregationSelection']>, ParentType, ContextType, RequireFields<PolygonShapeFeatureAggregateArgs, 'directed'>>;
  featureConnection?: Resolver<ResolversTypes['GeoShapeFeatureConnection'], ParentType, ContextType, RequireFields<PolygonShapeFeatureConnectionArgs, 'directed'>>;
  points?: Resolver<Array<Maybe<ResolversTypes['Point']>>, ParentType, ContextType>;
  shapeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startPoint?: Resolver<Maybe<ResolversTypes['Point']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolygonShapeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolygonShapeAggregateSelection'] = ResolversParentTypes['PolygonShapeAggregateSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shapeId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolygonShapeEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolygonShapeEdge'] = ResolversParentTypes['PolygonShapeEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PolygonShape'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolygonShapeGardenFeatureFeatureAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolygonShapeGardenFeatureFeatureAggregationSelection'] = ResolversParentTypes['PolygonShapeGardenFeatureFeatureAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PolygonShapeGardenFeatureFeatureNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolygonShapeGardenFeatureFeatureNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolygonShapeGardenFeatureFeatureNodeAggregateSelection'] = ResolversParentTypes['PolygonShapeGardenFeatureFeatureNodeAggregateSelection']> = {
  featureId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  featureType?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  infoText?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolygonShapeGardenLayerBelongs_ToAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolygonShapeGardenLayerBelongs_toAggregationSelection'] = ResolversParentTypes['PolygonShapeGardenLayerBelongs_toAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['PolygonShapeGardenLayerBelongs_toNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolygonShapeGardenLayerBelongs_ToNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolygonShapeGardenLayerBelongs_toNodeAggregateSelection'] = ResolversParentTypes['PolygonShapeGardenLayerBelongs_toNodeAggregateSelection']> = {
  layerId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PolygonShapesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolygonShapesConnection'] = ResolversParentTypes['PolygonShapesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PolygonShapeEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PositiveNeighborhoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['PositiveNeighborhood'] = ResolversParentTypes['PositiveNeighborhood']> = {
  __resolveType: TypeResolveFn<'PlantSpeciesPositiveNeighborhoodRelationship', ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  assignableWateringPeriod?: Resolver<Array<ResolversTypes['WateringPeriod']>, ParentType, ContextType, RequireFields<QueryAssignableWateringPeriodArgs, 'gardenId'>>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, Partial<QueryCategoriesArgs>>;
  categoriesAggregate?: Resolver<ResolversTypes['CategoryAggregateSelection'], ParentType, ContextType, Partial<QueryCategoriesAggregateArgs>>;
  categoriesConnection?: Resolver<ResolversTypes['CategoriesConnection'], ParentType, ContextType, Partial<QueryCategoriesConnectionArgs>>;
  changeRequests?: Resolver<Array<ResolversTypes['ChangeRequest']>, ParentType, ContextType, Partial<QueryChangeRequestsArgs>>;
  changeRequestsAggregate?: Resolver<ResolversTypes['ChangeRequestAggregateSelection'], ParentType, ContextType, Partial<QueryChangeRequestsAggregateArgs>>;
  changeRequestsConnection?: Resolver<ResolversTypes['ChangeRequestsConnection'], ParentType, ContextType, Partial<QueryChangeRequestsConnectionArgs>>;
  containers?: Resolver<Array<ResolversTypes['Container']>, ParentType, ContextType, Partial<QueryContainersArgs>>;
  containersAggregate?: Resolver<ResolversTypes['ContainerAggregateSelection'], ParentType, ContextType, Partial<QueryContainersAggregateArgs>>;
  containersConnection?: Resolver<ResolversTypes['ContainersConnection'], ParentType, ContextType, Partial<QueryContainersConnectionArgs>>;
  gardenFeatures?: Resolver<Array<ResolversTypes['GardenFeature']>, ParentType, ContextType, Partial<QueryGardenFeaturesArgs>>;
  gardenFeaturesAggregate?: Resolver<ResolversTypes['GardenFeatureAggregateSelection'], ParentType, ContextType, Partial<QueryGardenFeaturesAggregateArgs>>;
  gardenFeaturesConnection?: Resolver<ResolversTypes['GardenFeaturesConnection'], ParentType, ContextType, Partial<QueryGardenFeaturesConnectionArgs>>;
  gardenLayers?: Resolver<Array<ResolversTypes['GardenLayer']>, ParentType, ContextType, Partial<QueryGardenLayersArgs>>;
  gardenLayersAggregate?: Resolver<ResolversTypes['GardenLayerAggregateSelection'], ParentType, ContextType, Partial<QueryGardenLayersAggregateArgs>>;
  gardenLayersConnection?: Resolver<ResolversTypes['GardenLayersConnection'], ParentType, ContextType, Partial<QueryGardenLayersConnectionArgs>>;
  gardenSettings?: Resolver<Array<ResolversTypes['GardenSettings']>, ParentType, ContextType, Partial<QueryGardenSettingsArgs>>;
  gardenSettingsAggregate?: Resolver<ResolversTypes['GardenSettingsAggregateSelection'], ParentType, ContextType, Partial<QueryGardenSettingsAggregateArgs>>;
  gardenSettingsConnection?: Resolver<ResolversTypes['GardenSettingsConnection'], ParentType, ContextType, Partial<QueryGardenSettingsConnectionArgs>>;
  gardens?: Resolver<Array<ResolversTypes['Garden']>, ParentType, ContextType, Partial<QueryGardensArgs>>;
  gardensAggregate?: Resolver<ResolversTypes['GardenAggregateSelection'], ParentType, ContextType, Partial<QueryGardensAggregateArgs>>;
  gardensConnection?: Resolver<ResolversTypes['GardensConnection'], ParentType, ContextType, Partial<QueryGardensConnectionArgs>>;
  logEvents?: Resolver<Array<ResolversTypes['LogEvent']>, ParentType, ContextType, Partial<QueryLogEventsArgs>>;
  logEventsAggregate?: Resolver<ResolversTypes['LogEventAggregateSelection'], ParentType, ContextType, Partial<QueryLogEventsAggregateArgs>>;
  logEventsConnection?: Resolver<ResolversTypes['LogEventsConnection'], ParentType, ContextType, Partial<QueryLogEventsConnectionArgs>>;
  markerShapes?: Resolver<Array<ResolversTypes['MarkerShape']>, ParentType, ContextType, Partial<QueryMarkerShapesArgs>>;
  markerShapesAggregate?: Resolver<ResolversTypes['MarkerShapeAggregateSelection'], ParentType, ContextType, Partial<QueryMarkerShapesAggregateArgs>>;
  markerShapesConnection?: Resolver<ResolversTypes['MarkerShapesConnection'], ParentType, ContextType, Partial<QueryMarkerShapesConnectionArgs>>;
  plantSpecies?: Resolver<Array<ResolversTypes['PlantSpecies']>, ParentType, ContextType, Partial<QueryPlantSpeciesArgs>>;
  plantSpeciesAggregate?: Resolver<ResolversTypes['PlantSpeciesAggregateSelection'], ParentType, ContextType, Partial<QueryPlantSpeciesAggregateArgs>>;
  plantSpeciesConnection?: Resolver<ResolversTypes['PlantSpeciesConnection'], ParentType, ContextType, Partial<QueryPlantSpeciesConnectionArgs>>;
  plantVarieties?: Resolver<Array<ResolversTypes['PlantVariety']>, ParentType, ContextType, Partial<QueryPlantVarietiesArgs>>;
  plantVarietiesAggregate?: Resolver<ResolversTypes['PlantVarietyAggregateSelection'], ParentType, ContextType, Partial<QueryPlantVarietiesAggregateArgs>>;
  plantVarietiesConnection?: Resolver<ResolversTypes['PlantVarietiesConnection'], ParentType, ContextType, Partial<QueryPlantVarietiesConnectionArgs>>;
  polygonShapes?: Resolver<Array<ResolversTypes['PolygonShape']>, ParentType, ContextType, Partial<QueryPolygonShapesArgs>>;
  polygonShapesAggregate?: Resolver<ResolversTypes['PolygonShapeAggregateSelection'], ParentType, ContextType, Partial<QueryPolygonShapesAggregateArgs>>;
  polygonShapesConnection?: Resolver<ResolversTypes['PolygonShapesConnection'], ParentType, ContextType, Partial<QueryPolygonShapesConnectionArgs>>;
  seeds?: Resolver<Array<ResolversTypes['Seed']>, ParentType, ContextType, Partial<QuerySeedsArgs>>;
  seedsAggregate?: Resolver<ResolversTypes['SeedAggregateSelection'], ParentType, ContextType, Partial<QuerySeedsAggregateArgs>>;
  seedsConnection?: Resolver<ResolversTypes['SeedsConnection'], ParentType, ContextType, Partial<QuerySeedsConnectionArgs>>;
  userSettings?: Resolver<Array<ResolversTypes['UserSettings']>, ParentType, ContextType, Partial<QueryUserSettingsArgs>>;
  userSettingsAggregate?: Resolver<ResolversTypes['UserSettingsAggregateSelection'], ParentType, ContextType, Partial<QueryUserSettingsAggregateArgs>>;
  userSettingsConnection?: Resolver<ResolversTypes['UserSettingsConnection'], ParentType, ContextType, Partial<QueryUserSettingsConnectionArgs>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
  usersAggregate?: Resolver<ResolversTypes['UserAggregateSelection'], ParentType, ContextType, Partial<QueryUsersAggregateArgs>>;
  usersConnection?: Resolver<ResolversTypes['UsersConnection'], ParentType, ContextType, Partial<QueryUsersConnectionArgs>>;
  wateringPeriods?: Resolver<Array<ResolversTypes['WateringPeriod']>, ParentType, ContextType, Partial<QueryWateringPeriodsArgs>>;
  wateringPeriodsAggregate?: Resolver<ResolversTypes['WateringPeriodAggregateSelection'], ParentType, ContextType, Partial<QueryWateringPeriodsAggregateArgs>>;
  wateringPeriodsConnection?: Resolver<ResolversTypes['WateringPeriodsConnection'], ParentType, ContextType, Partial<QueryWateringPeriodsConnectionArgs>>;
  wateringTasks?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType, Partial<QueryWateringTasksArgs>>;
  wateringTasksAggregate?: Resolver<ResolversTypes['WateringTaskAggregateSelection'], ParentType, ContextType, Partial<QueryWateringTasksAggregateArgs>>;
  wateringTasksConnection?: Resolver<ResolversTypes['WateringTasksConnection'], ParentType, ContextType, Partial<QueryWateringTasksConnectionArgs>>;
};

export type SeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Seed'] = ResolversParentTypes['Seed']> = {
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  containedIn?: Resolver<Maybe<ResolversTypes['Container']>, ParentType, ContextType, RequireFields<SeedContainedInArgs, 'directed'>>;
  containedInAggregate?: Resolver<Maybe<ResolversTypes['SeedContainerContainedInAggregationSelection']>, ParentType, ContextType, RequireFields<SeedContainedInAggregateArgs, 'directed'>>;
  containedInConnection?: Resolver<ResolversTypes['SeedContainedInConnection'], ParentType, ContextType, RequireFields<SeedContainedInConnectionArgs, 'directed'>>;
  unit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  variety?: Resolver<ResolversTypes['PlantVariety'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeedAggregateSelection'] = ResolversParentTypes['SeedAggregateSelection']> = {
  amount?: Resolver<ResolversTypes['IntAggregateSelectionNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedContainedInConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeedContainedInConnection'] = ResolversParentTypes['SeedContainedInConnection']> = {
  edges?: Resolver<Array<ResolversTypes['SeedContainedInRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedContainedInRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeedContainedInRelationship'] = ResolversParentTypes['SeedContainedInRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Container'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedContainerContainedInAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeedContainerContainedInAggregationSelection'] = ResolversParentTypes['SeedContainerContainedInAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['SeedContainerContainedInNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedContainerContainedInNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeedContainerContainedInNodeAggregateSelection'] = ResolversParentTypes['SeedContainerContainedInNodeAggregateSelection']> = {
  containerType?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeedEdge'] = ResolversParentTypes['SeedEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Seed'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeedsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeedsConnection'] = ResolversParentTypes['SeedsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['SeedEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StringAggregateSelectionNonNullableResolvers<ContextType = any, ParentType extends ResolversParentTypes['StringAggregateSelectionNonNullable'] = ResolversParentTypes['StringAggregateSelectionNonNullable']> = {
  longest?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortest?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StringAggregateSelectionNullableResolvers<ContextType = any, ParentType extends ResolversParentTypes['StringAggregateSelectionNullable'] = ResolversParentTypes['StringAggregateSelectionNullable']> = {
  longest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  WateringTaskChange?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "WateringTaskChange", ParentType, ContextType>;
};

export type UpdateCategoriesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateCategoriesMutationResponse'] = ResolversParentTypes['UpdateCategoriesMutationResponse']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateChangeRequestsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateChangeRequestsMutationResponse'] = ResolversParentTypes['UpdateChangeRequestsMutationResponse']> = {
  changeRequests?: Resolver<Array<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateContainersMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateContainersMutationResponse'] = ResolversParentTypes['UpdateContainersMutationResponse']> = {
  containers?: Resolver<Array<ResolversTypes['Container']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateGardenFeaturesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateGardenFeaturesMutationResponse'] = ResolversParentTypes['UpdateGardenFeaturesMutationResponse']> = {
  gardenFeatures?: Resolver<Array<ResolversTypes['GardenFeature']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateGardenLayersMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateGardenLayersMutationResponse'] = ResolversParentTypes['UpdateGardenLayersMutationResponse']> = {
  gardenLayers?: Resolver<Array<ResolversTypes['GardenLayer']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateGardenSettingsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateGardenSettingsMutationResponse'] = ResolversParentTypes['UpdateGardenSettingsMutationResponse']> = {
  gardenSettings?: Resolver<Array<ResolversTypes['GardenSettings']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateGardensMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateGardensMutationResponse'] = ResolversParentTypes['UpdateGardensMutationResponse']> = {
  gardens?: Resolver<Array<ResolversTypes['Garden']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateInfo'] = ResolversParentTypes['UpdateInfo']> = {
  bookmark?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nodesCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nodesDeleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  relationshipsCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  relationshipsDeleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateLogEventsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateLogEventsMutationResponse'] = ResolversParentTypes['UpdateLogEventsMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  logEvents?: Resolver<Array<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMarkerShapesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMarkerShapesMutationResponse'] = ResolversParentTypes['UpdateMarkerShapesMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  markerShapes?: Resolver<Array<ResolversTypes['MarkerShape']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePlantSpeciesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatePlantSpeciesMutationResponse'] = ResolversParentTypes['UpdatePlantSpeciesMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  plantSpecies?: Resolver<Array<ResolversTypes['PlantSpecies']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePlantVarietiesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatePlantVarietiesMutationResponse'] = ResolversParentTypes['UpdatePlantVarietiesMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  plantVarieties?: Resolver<Array<ResolversTypes['PlantVariety']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePolygonShapesMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatePolygonShapesMutationResponse'] = ResolversParentTypes['UpdatePolygonShapesMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  polygonShapes?: Resolver<Array<ResolversTypes['PolygonShape']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateSeedsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateSeedsMutationResponse'] = ResolversParentTypes['UpdateSeedsMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  seeds?: Resolver<Array<ResolversTypes['Seed']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUserSettingsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserSettingsMutationResponse'] = ResolversParentTypes['UpdateUserSettingsMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  userSettings?: Resolver<Array<ResolversTypes['UserSettings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateUsersMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUsersMutationResponse'] = ResolversParentTypes['UpdateUsersMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateWateringPeriodsMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateWateringPeriodsMutationResponse'] = ResolversParentTypes['UpdateWateringPeriodsMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  wateringPeriods?: Resolver<Array<ResolversTypes['WateringPeriod']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateWateringTasksMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateWateringTasksMutationResponse'] = ResolversParentTypes['UpdateWateringTasksMutationResponse']> = {
  info?: Resolver<ResolversTypes['UpdateInfo'], ParentType, ContextType>;
  wateringTasks?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  assigned?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<UserAssignedArgs, 'directed'>>;
  assignedAggregate?: Resolver<Maybe<ResolversTypes['UserWateringTaskAssignedAggregationSelection']>, ParentType, ContextType, RequireFields<UserAssignedAggregateArgs, 'directed'>>;
  assignedConnection?: Resolver<ResolversTypes['UserAssignedConnection'], ParentType, ContextType, RequireFields<UserAssignedConnectionArgs, 'directed'>>;
  available?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<UserAvailableArgs, 'directed'>>;
  availableAggregate?: Resolver<Maybe<ResolversTypes['UserWateringTaskAvailableAggregationSelection']>, ParentType, ContextType, RequireFields<UserAvailableAggregateArgs, 'directed'>>;
  availableConnection?: Resolver<ResolversTypes['UserAvailableConnection'], ParentType, ContextType, RequireFields<UserAvailableConnectionArgs, 'directed'>>;
  changerequests_requested_by?: Resolver<Array<ResolversTypes['ChangeRequest']>, ParentType, ContextType, RequireFields<UserChangerequests_Requested_ByArgs, 'directed'>>;
  changerequests_requested_byAggregate?: Resolver<Maybe<ResolversTypes['UserChangeRequestChangerequests_requested_byAggregationSelection']>, ParentType, ContextType, RequireFields<UserChangerequests_Requested_ByAggregateArgs, 'directed'>>;
  changerequests_requested_byConnection?: Resolver<ResolversTypes['UserChangerequests_requested_byConnection'], ParentType, ContextType, RequireFields<UserChangerequests_Requested_ByConnectionArgs, 'directed'>>;
  changerequests_requested_to?: Resolver<Array<ResolversTypes['ChangeRequest']>, ParentType, ContextType, RequireFields<UserChangerequests_Requested_ToArgs, 'directed'>>;
  changerequests_requested_toAggregate?: Resolver<Maybe<ResolversTypes['UserChangeRequestChangerequests_requested_toAggregationSelection']>, ParentType, ContextType, RequireFields<UserChangerequests_Requested_ToAggregateArgs, 'directed'>>;
  changerequests_requested_toConnection?: Resolver<ResolversTypes['UserChangerequests_requested_toConnection'], ParentType, ContextType, RequireFields<UserChangerequests_Requested_ToConnectionArgs, 'directed'>>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logevents_triggered_by?: Resolver<Array<ResolversTypes['LogEvent']>, ParentType, ContextType, RequireFields<UserLogevents_Triggered_ByArgs, 'directed'>>;
  logevents_triggered_byAggregate?: Resolver<Maybe<ResolversTypes['UserLogEventLogevents_triggered_byAggregationSelection']>, ParentType, ContextType, RequireFields<UserLogevents_Triggered_ByAggregateArgs, 'directed'>>;
  logevents_triggered_byConnection?: Resolver<ResolversTypes['UserLogevents_triggered_byConnection'], ParentType, ContextType, RequireFields<UserLogevents_Triggered_ByConnectionArgs, 'directed'>>;
  neo4jImportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAggregateSelection'] = ResolversParentTypes['UserAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAssignedConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAssignedConnection'] = ResolversParentTypes['UserAssignedConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserAssignedRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAssignedRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAssignedRelationship'] = ResolversParentTypes['UserAssignedRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAvailableConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAvailableConnection'] = ResolversParentTypes['UserAvailableConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserAvailableRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAvailableRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAvailableRelationship'] = ResolversParentTypes['UserAvailableRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChangeRequestChangerequests_Requested_ByAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChangeRequestChangerequests_requested_byAggregationSelection'] = ResolversParentTypes['UserChangeRequestChangerequests_requested_byAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['UserChangeRequestChangerequests_requested_byNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChangeRequestChangerequests_Requested_ByNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChangeRequestChangerequests_requested_byNodeAggregateSelection'] = ResolversParentTypes['UserChangeRequestChangerequests_requested_byNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChangeRequestChangerequests_Requested_ToAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChangeRequestChangerequests_requested_toAggregationSelection'] = ResolversParentTypes['UserChangeRequestChangerequests_requested_toAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['UserChangeRequestChangerequests_requested_toNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChangeRequestChangerequests_Requested_ToNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChangeRequestChangerequests_requested_toNodeAggregateSelection'] = ResolversParentTypes['UserChangeRequestChangerequests_requested_toNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChangerequests_Requested_ByConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChangerequests_requested_byConnection'] = ResolversParentTypes['UserChangerequests_requested_byConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserChangerequests_requested_byRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChangerequests_Requested_ByRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChangerequests_requested_byRelationship'] = ResolversParentTypes['UserChangerequests_requested_byRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ChangeRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChangerequests_Requested_ToConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChangerequests_requested_toConnection'] = ResolversParentTypes['UserChangerequests_requested_toConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserChangerequests_requested_toRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChangerequests_Requested_ToRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChangerequests_requested_toRelationship'] = ResolversParentTypes['UserChangerequests_requested_toRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ChangeRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLogEventLogevents_Triggered_ByAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLogEventLogevents_triggered_byAggregationSelection'] = ResolversParentTypes['UserLogEventLogevents_triggered_byAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['UserLogEventLogevents_triggered_byNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLogEventLogevents_Triggered_ByNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLogEventLogevents_triggered_byNodeAggregateSelection'] = ResolversParentTypes['UserLogEventLogevents_triggered_byNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLogevents_Triggered_ByConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLogevents_triggered_byConnection'] = ResolversParentTypes['UserLogevents_triggered_byConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserLogevents_triggered_byRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserLogevents_Triggered_ByRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLogevents_triggered_byRelationship'] = ResolversParentTypes['UserLogevents_triggered_byRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LogEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  letitrain_maximum_tasks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ui_locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettingsAggregateSelection'] = ResolversParentTypes['UserSettingsAggregateSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  letitrain_maximum_tasks?: Resolver<ResolversTypes['IntAggregateSelectionNullable'], ParentType, ContextType>;
  ui_locale?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettingsConnection'] = ResolversParentTypes['UserSettingsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserSettingsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettingsEdge'] = ResolversParentTypes['UserSettingsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['UserSettings'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWateringTaskAssignedAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWateringTaskAssignedAggregationSelection'] = ResolversParentTypes['UserWateringTaskAssignedAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['UserWateringTaskAssignedNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWateringTaskAssignedNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWateringTaskAssignedNodeAggregateSelection'] = ResolversParentTypes['UserWateringTaskAssignedNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWateringTaskAvailableAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWateringTaskAvailableAggregationSelection'] = ResolversParentTypes['UserWateringTaskAvailableAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['UserWateringTaskAvailableNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWateringTaskAvailableNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWateringTaskAvailableNodeAggregateSelection'] = ResolversParentTypes['UserWateringTaskAvailableNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersConnection'] = ResolversParentTypes['UsersConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriod'] = ResolversParentTypes['WateringPeriod']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  at?: Resolver<Maybe<ResolversTypes['Garden']>, ParentType, ContextType, RequireFields<WateringPeriodAtArgs, 'directed'>>;
  atAggregate?: Resolver<Maybe<ResolversTypes['WateringPeriodGardenAtAggregationSelection']>, ParentType, ContextType, RequireFields<WateringPeriodAtAggregateArgs, 'directed'>>;
  atConnection?: Resolver<ResolversTypes['WateringPeriodAtConnection'], ParentType, ContextType, RequireFields<WateringPeriodAtConnectionArgs, 'directed'>>;
  from?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  hasUsersAssigned?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  till?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  wateringtasks?: Resolver<Array<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<WateringPeriodWateringtasksArgs, 'directed'>>;
  wateringtasksAggregate?: Resolver<Maybe<ResolversTypes['WateringPeriodWateringTaskWateringtasksAggregationSelection']>, ParentType, ContextType, RequireFields<WateringPeriodWateringtasksAggregateArgs, 'directed'>>;
  wateringtasksConnection?: Resolver<ResolversTypes['WateringPeriodWateringtasksConnection'], ParentType, ContextType, RequireFields<WateringPeriodWateringtasksConnectionArgs, 'directed'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodAggregateSelection'] = ResolversParentTypes['WateringPeriodAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodAtConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodAtConnection'] = ResolversParentTypes['WateringPeriodAtConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringPeriodAtRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodAtRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodAtRelationship'] = ResolversParentTypes['WateringPeriodAtRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Garden'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodEdge'] = ResolversParentTypes['WateringPeriodEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringPeriod'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodGardenAtAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodGardenAtAggregationSelection'] = ResolversParentTypes['WateringPeriodGardenAtAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WateringPeriodGardenAtNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodGardenAtNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodGardenAtNodeAggregateSelection'] = ResolversParentTypes['WateringPeriodGardenAtNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  gardenId?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodWateringTaskWateringtasksAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodWateringTaskWateringtasksAggregationSelection'] = ResolversParentTypes['WateringPeriodWateringTaskWateringtasksAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WateringPeriodWateringTaskWateringtasksNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodWateringTaskWateringtasksNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodWateringTaskWateringtasksNodeAggregateSelection'] = ResolversParentTypes['WateringPeriodWateringTaskWateringtasksNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodWateringtasksConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodWateringtasksConnection'] = ResolversParentTypes['WateringPeriodWateringtasksConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringPeriodWateringtasksRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodWateringtasksRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodWateringtasksRelationship'] = ResolversParentTypes['WateringPeriodWateringtasksRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriodsConnection'] = ResolversParentTypes['WateringPeriodsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringPeriodEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTask'] = ResolversParentTypes['WateringTask']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  changerequests_requested_for?: Resolver<Array<ResolversTypes['ChangeRequest']>, ParentType, ContextType, RequireFields<WateringTaskChangerequests_Requested_ForArgs, 'directed'>>;
  changerequests_requested_forAggregate?: Resolver<Maybe<ResolversTypes['WateringTaskChangeRequestChangerequests_requested_forAggregationSelection']>, ParentType, ContextType, RequireFields<WateringTaskChangerequests_Requested_ForAggregateArgs, 'directed'>>;
  changerequests_requested_forConnection?: Resolver<ResolversTypes['WateringTaskChangerequests_requested_forConnection'], ParentType, ContextType, RequireFields<WateringTaskChangerequests_Requested_ForConnectionArgs, 'directed'>>;
  changerequests_requested_new_task?: Resolver<Array<ResolversTypes['ChangeRequest']>, ParentType, ContextType, RequireFields<WateringTaskChangerequests_Requested_New_TaskArgs, 'directed'>>;
  changerequests_requested_new_taskAggregate?: Resolver<Maybe<ResolversTypes['WateringTaskChangeRequestChangerequests_requested_new_taskAggregationSelection']>, ParentType, ContextType, RequireFields<WateringTaskChangerequests_Requested_New_TaskAggregateArgs, 'directed'>>;
  changerequests_requested_new_taskConnection?: Resolver<ResolversTypes['WateringTaskChangerequests_requested_new_taskConnection'], ParentType, ContextType, RequireFields<WateringTaskChangerequests_Requested_New_TaskConnectionArgs, 'directed'>>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  done?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  logevents_refers_to?: Resolver<Array<ResolversTypes['LogEvent']>, ParentType, ContextType, RequireFields<WateringTaskLogevents_Refers_ToArgs, 'directed'>>;
  logevents_refers_toAggregate?: Resolver<Maybe<ResolversTypes['WateringTaskLogEventLogevents_refers_toAggregationSelection']>, ParentType, ContextType, RequireFields<WateringTaskLogevents_Refers_ToAggregateArgs, 'directed'>>;
  logevents_refers_toConnection?: Resolver<ResolversTypes['WateringTaskLogevents_refers_toConnection'], ParentType, ContextType, RequireFields<WateringTaskLogevents_Refers_ToConnectionArgs, 'directed'>>;
  neo4jImportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users_assigned?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<WateringTaskUsers_AssignedArgs, 'directed'>>;
  users_assignedAggregate?: Resolver<Maybe<ResolversTypes['WateringTaskUserUsers_assignedAggregationSelection']>, ParentType, ContextType, RequireFields<WateringTaskUsers_AssignedAggregateArgs, 'directed'>>;
  users_assignedConnection?: Resolver<ResolversTypes['WateringTaskUsers_assignedConnection'], ParentType, ContextType, RequireFields<WateringTaskUsers_AssignedConnectionArgs, 'directed'>>;
  users_available?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<WateringTaskUsers_AvailableArgs, 'directed'>>;
  users_availableAggregate?: Resolver<Maybe<ResolversTypes['WateringTaskUserUsers_availableAggregationSelection']>, ParentType, ContextType, RequireFields<WateringTaskUsers_AvailableAggregateArgs, 'directed'>>;
  users_availableConnection?: Resolver<ResolversTypes['WateringTaskUsers_availableConnection'], ParentType, ContextType, RequireFields<WateringTaskUsers_AvailableConnectionArgs, 'directed'>>;
  wateringperiod?: Resolver<Array<ResolversTypes['WateringPeriod']>, ParentType, ContextType, RequireFields<WateringTaskWateringperiodArgs, 'directed'>>;
  wateringperiodAggregate?: Resolver<Maybe<ResolversTypes['WateringTaskWateringPeriodWateringperiodAggregationSelection']>, ParentType, ContextType, RequireFields<WateringTaskWateringperiodAggregateArgs, 'directed'>>;
  wateringperiodConnection?: Resolver<ResolversTypes['WateringTaskWateringperiodConnection'], ParentType, ContextType, RequireFields<WateringTaskWateringperiodConnectionArgs, 'directed'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskAggregateSelection'] = ResolversParentTypes['WateringTaskAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskChangeRequestChangerequests_Requested_ForAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskChangeRequestChangerequests_requested_forAggregationSelection'] = ResolversParentTypes['WateringTaskChangeRequestChangerequests_requested_forAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WateringTaskChangeRequestChangerequests_requested_forNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskChangeRequestChangerequests_Requested_ForNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskChangeRequestChangerequests_requested_forNodeAggregateSelection'] = ResolversParentTypes['WateringTaskChangeRequestChangerequests_requested_forNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskChangeRequestChangerequests_Requested_New_TaskAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskChangeRequestChangerequests_requested_new_taskAggregationSelection'] = ResolversParentTypes['WateringTaskChangeRequestChangerequests_requested_new_taskAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WateringTaskChangeRequestChangerequests_requested_new_taskNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskChangeRequestChangerequests_Requested_New_TaskNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskChangeRequestChangerequests_requested_new_taskNodeAggregateSelection'] = ResolversParentTypes['WateringTaskChangeRequestChangerequests_requested_new_taskNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskChangerequests_Requested_ForConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskChangerequests_requested_forConnection'] = ResolversParentTypes['WateringTaskChangerequests_requested_forConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringTaskChangerequests_requested_forRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskChangerequests_Requested_ForRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskChangerequests_requested_forRelationship'] = ResolversParentTypes['WateringTaskChangerequests_requested_forRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ChangeRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskChangerequests_Requested_New_TaskConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskChangerequests_requested_new_taskConnection'] = ResolversParentTypes['WateringTaskChangerequests_requested_new_taskConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringTaskChangerequests_requested_new_taskRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskChangerequests_Requested_New_TaskRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskChangerequests_requested_new_taskRelationship'] = ResolversParentTypes['WateringTaskChangerequests_requested_new_taskRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ChangeRequest'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskEdge'] = ResolversParentTypes['WateringTaskEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringTask'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskLogEventLogevents_Refers_ToAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskLogEventLogevents_refers_toAggregationSelection'] = ResolversParentTypes['WateringTaskLogEventLogevents_refers_toAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WateringTaskLogEventLogevents_refers_toNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskLogEventLogevents_Refers_ToNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskLogEventLogevents_refers_toNodeAggregateSelection'] = ResolversParentTypes['WateringTaskLogEventLogevents_refers_toNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskLogevents_Refers_ToConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskLogevents_refers_toConnection'] = ResolversParentTypes['WateringTaskLogevents_refers_toConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringTaskLogevents_refers_toRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskLogevents_Refers_ToRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskLogevents_refers_toRelationship'] = ResolversParentTypes['WateringTaskLogevents_refers_toRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['LogEvent'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskUserUsers_AssignedAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskUserUsers_assignedAggregationSelection'] = ResolversParentTypes['WateringTaskUserUsers_assignedAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WateringTaskUserUsers_assignedNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskUserUsers_AssignedNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskUserUsers_assignedNodeAggregateSelection'] = ResolversParentTypes['WateringTaskUserUsers_assignedNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskUserUsers_AvailableAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskUserUsers_availableAggregationSelection'] = ResolversParentTypes['WateringTaskUserUsers_availableAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WateringTaskUserUsers_availableNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskUserUsers_AvailableNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskUserUsers_availableNodeAggregateSelection'] = ResolversParentTypes['WateringTaskUserUsers_availableNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StringAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskUsers_AssignedConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskUsers_assignedConnection'] = ResolversParentTypes['WateringTaskUsers_assignedConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringTaskUsers_assignedRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskUsers_AssignedRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskUsers_assignedRelationship'] = ResolversParentTypes['WateringTaskUsers_assignedRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskUsers_AvailableConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskUsers_availableConnection'] = ResolversParentTypes['WateringTaskUsers_availableConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringTaskUsers_availableRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskUsers_AvailableRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskUsers_availableRelationship'] = ResolversParentTypes['WateringTaskUsers_availableRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskWateringPeriodWateringperiodAggregationSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskWateringPeriodWateringperiodAggregationSelection'] = ResolversParentTypes['WateringTaskWateringPeriodWateringperiodAggregationSelection']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['WateringTaskWateringPeriodWateringperiodNodeAggregateSelection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskWateringPeriodWateringperiodNodeAggregateSelectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskWateringPeriodWateringperiodNodeAggregateSelection'] = ResolversParentTypes['WateringTaskWateringPeriodWateringperiodNodeAggregateSelection']> = {
  _id?: Resolver<ResolversTypes['IDAggregateSelectionNonNullable'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskWateringperiodConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskWateringperiodConnection'] = ResolversParentTypes['WateringTaskWateringperiodConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringTaskWateringperiodRelationship']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskWateringperiodRelationshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTaskWateringperiodRelationship'] = ResolversParentTypes['WateringTaskWateringperiodRelationship']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WateringPeriod'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTasksConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTasksConnection'] = ResolversParentTypes['WateringTasksConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WateringTaskEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CategoriesConnection?: CategoriesConnectionResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryAggregateSelection?: CategoryAggregateSelectionResolvers<ContextType>;
  CategoryCategoryChildCategoriesAggregationSelection?: CategoryCategoryChildCategoriesAggregationSelectionResolvers<ContextType>;
  CategoryCategoryChildCategoriesNodeAggregateSelection?: CategoryCategoryChildCategoriesNodeAggregateSelectionResolvers<ContextType>;
  CategoryCategoryParentCategoryAggregationSelection?: CategoryCategoryParentCategoryAggregationSelectionResolvers<ContextType>;
  CategoryCategoryParentCategoryNodeAggregateSelection?: CategoryCategoryParentCategoryNodeAggregateSelectionResolvers<ContextType>;
  CategoryChildCategoriesConnection?: CategoryChildCategoriesConnectionResolvers<ContextType>;
  CategoryChildCategoriesRelationship?: CategoryChildCategoriesRelationshipResolvers<ContextType>;
  CategoryEdge?: CategoryEdgeResolvers<ContextType>;
  CategoryParentCategoryConnection?: CategoryParentCategoryConnectionResolvers<ContextType>;
  CategoryParentCategoryRelationship?: CategoryParentCategoryRelationshipResolvers<ContextType>;
  CategoryPlantSpeciesSpeciesAggregationSelection?: CategoryPlantSpeciesSpeciesAggregationSelectionResolvers<ContextType>;
  CategoryPlantSpeciesSpeciesNodeAggregateSelection?: CategoryPlantSpeciesSpeciesNodeAggregateSelectionResolvers<ContextType>;
  CategorySpeciesConnection?: CategorySpeciesConnectionResolvers<ContextType>;
  CategorySpeciesRelationship?: CategorySpeciesRelationshipResolvers<ContextType>;
  ChangeRequest?: ChangeRequestResolvers<ContextType>;
  ChangeRequestAggregateSelection?: ChangeRequestAggregateSelectionResolvers<ContextType>;
  ChangeRequestEdge?: ChangeRequestEdgeResolvers<ContextType>;
  ChangeRequestRequested_byConnection?: ChangeRequestRequested_ByConnectionResolvers<ContextType>;
  ChangeRequestRequested_byRelationship?: ChangeRequestRequested_ByRelationshipResolvers<ContextType>;
  ChangeRequestRequested_forConnection?: ChangeRequestRequested_ForConnectionResolvers<ContextType>;
  ChangeRequestRequested_forRelationship?: ChangeRequestRequested_ForRelationshipResolvers<ContextType>;
  ChangeRequestRequested_new_taskConnection?: ChangeRequestRequested_New_TaskConnectionResolvers<ContextType>;
  ChangeRequestRequested_new_taskRelationship?: ChangeRequestRequested_New_TaskRelationshipResolvers<ContextType>;
  ChangeRequestRequested_toConnection?: ChangeRequestRequested_ToConnectionResolvers<ContextType>;
  ChangeRequestRequested_toRelationship?: ChangeRequestRequested_ToRelationshipResolvers<ContextType>;
  ChangeRequestUserRequested_byAggregationSelection?: ChangeRequestUserRequested_ByAggregationSelectionResolvers<ContextType>;
  ChangeRequestUserRequested_byNodeAggregateSelection?: ChangeRequestUserRequested_ByNodeAggregateSelectionResolvers<ContextType>;
  ChangeRequestUserRequested_toAggregationSelection?: ChangeRequestUserRequested_ToAggregationSelectionResolvers<ContextType>;
  ChangeRequestUserRequested_toNodeAggregateSelection?: ChangeRequestUserRequested_ToNodeAggregateSelectionResolvers<ContextType>;
  ChangeRequestWateringTaskRequested_forAggregationSelection?: ChangeRequestWateringTaskRequested_ForAggregationSelectionResolvers<ContextType>;
  ChangeRequestWateringTaskRequested_forNodeAggregateSelection?: ChangeRequestWateringTaskRequested_ForNodeAggregateSelectionResolvers<ContextType>;
  ChangeRequestWateringTaskRequested_new_taskAggregationSelection?: ChangeRequestWateringTaskRequested_New_TaskAggregationSelectionResolvers<ContextType>;
  ChangeRequestWateringTaskRequested_new_taskNodeAggregateSelection?: ChangeRequestWateringTaskRequested_New_TaskNodeAggregateSelectionResolvers<ContextType>;
  ChangeRequestsConnection?: ChangeRequestsConnectionResolvers<ContextType>;
  Container?: ContainerResolvers<ContextType>;
  ContainerAggregateSelection?: ContainerAggregateSelectionResolvers<ContextType>;
  ContainerEdge?: ContainerEdgeResolvers<ContextType>;
  ContainerGardenFeatureStorageLocationAggregationSelection?: ContainerGardenFeatureStorageLocationAggregationSelectionResolvers<ContextType>;
  ContainerGardenFeatureStorageLocationNodeAggregateSelection?: ContainerGardenFeatureStorageLocationNodeAggregateSelectionResolvers<ContextType>;
  ContainerStorageLocationConnection?: ContainerStorageLocationConnectionResolvers<ContextType>;
  ContainerStorageLocationRelationship?: ContainerStorageLocationRelationshipResolvers<ContextType>;
  ContainersConnection?: ContainersConnectionResolvers<ContextType>;
  CreateCategoriesMutationResponse?: CreateCategoriesMutationResponseResolvers<ContextType>;
  CreateChangeRequestsMutationResponse?: CreateChangeRequestsMutationResponseResolvers<ContextType>;
  CreateContainersMutationResponse?: CreateContainersMutationResponseResolvers<ContextType>;
  CreateGardenFeaturesMutationResponse?: CreateGardenFeaturesMutationResponseResolvers<ContextType>;
  CreateGardenLayersMutationResponse?: CreateGardenLayersMutationResponseResolvers<ContextType>;
  CreateGardenSettingsMutationResponse?: CreateGardenSettingsMutationResponseResolvers<ContextType>;
  CreateGardensMutationResponse?: CreateGardensMutationResponseResolvers<ContextType>;
  CreateInfo?: CreateInfoResolvers<ContextType>;
  CreateLogEventsMutationResponse?: CreateLogEventsMutationResponseResolvers<ContextType>;
  CreateMarkerShapesMutationResponse?: CreateMarkerShapesMutationResponseResolvers<ContextType>;
  CreatePlantSpeciesMutationResponse?: CreatePlantSpeciesMutationResponseResolvers<ContextType>;
  CreatePlantVarietiesMutationResponse?: CreatePlantVarietiesMutationResponseResolvers<ContextType>;
  CreatePolygonShapesMutationResponse?: CreatePolygonShapesMutationResponseResolvers<ContextType>;
  CreateSeedsMutationResponse?: CreateSeedsMutationResponseResolvers<ContextType>;
  CreateUserSettingsMutationResponse?: CreateUserSettingsMutationResponseResolvers<ContextType>;
  CreateUsersMutationResponse?: CreateUsersMutationResponseResolvers<ContextType>;
  CreateWateringPeriodsMutationResponse?: CreateWateringPeriodsMutationResponseResolvers<ContextType>;
  CreateWateringTasksMutationResponse?: CreateWateringTasksMutationResponseResolvers<ContextType>;
  CropRotation?: CropRotationResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteInfo?: DeleteInfoResolvers<ContextType>;
  Garden?: GardenResolvers<ContextType>;
  GardenAggregateSelection?: GardenAggregateSelectionResolvers<ContextType>;
  GardenEdge?: GardenEdgeResolvers<ContextType>;
  GardenFeature?: GardenFeatureResolvers<ContextType>;
  GardenFeatureAggregateSelection?: GardenFeatureAggregateSelectionResolvers<ContextType>;
  GardenFeatureContainerContainsAggregationSelection?: GardenFeatureContainerContainsAggregationSelectionResolvers<ContextType>;
  GardenFeatureContainerContainsNodeAggregateSelection?: GardenFeatureContainerContainsNodeAggregateSelectionResolvers<ContextType>;
  GardenFeatureContainsConnection?: GardenFeatureContainsConnectionResolvers<ContextType>;
  GardenFeatureContainsRelationship?: GardenFeatureContainsRelationshipResolvers<ContextType>;
  GardenFeatureEdge?: GardenFeatureEdgeResolvers<ContextType>;
  GardenFeatureShapeConnection?: GardenFeatureShapeConnectionResolvers<ContextType>;
  GardenFeatureShapeRelationship?: GardenFeatureShapeRelationshipResolvers<ContextType>;
  GardenFeaturesConnection?: GardenFeaturesConnectionResolvers<ContextType>;
  GardenGardenSettingsSettingsAggregationSelection?: GardenGardenSettingsSettingsAggregationSelectionResolvers<ContextType>;
  GardenGardenSettingsSettingsNodeAggregateSelection?: GardenGardenSettingsSettingsNodeAggregateSelectionResolvers<ContextType>;
  GardenLayer?: GardenLayerResolvers<ContextType>;
  GardenLayerAggregateSelection?: GardenLayerAggregateSelectionResolvers<ContextType>;
  GardenLayerAtConnection?: GardenLayerAtConnectionResolvers<ContextType>;
  GardenLayerAtRelationship?: GardenLayerAtRelationshipResolvers<ContextType>;
  GardenLayerEdge?: GardenLayerEdgeResolvers<ContextType>;
  GardenLayerGardenAtAggregationSelection?: GardenLayerGardenAtAggregationSelectionResolvers<ContextType>;
  GardenLayerGardenAtNodeAggregateSelection?: GardenLayerGardenAtNodeAggregateSelectionResolvers<ContextType>;
  GardenLayerHas_shapeConnection?: GardenLayerHas_ShapeConnectionResolvers<ContextType>;
  GardenLayerHas_shapeRelationship?: GardenLayerHas_ShapeRelationshipResolvers<ContextType>;
  GardenLayersConnection?: GardenLayersConnectionResolvers<ContextType>;
  GardenSettings?: GardenSettingsResolvers<ContextType>;
  GardenSettingsAggregateSelection?: GardenSettingsAggregateSelectionResolvers<ContextType>;
  GardenSettingsConnection?: GardenSettingsConnectionResolvers<ContextType>;
  GardenSettingsEdge?: GardenSettingsEdgeResolvers<ContextType>;
  GardenSettingsGardenConnection?: GardenSettingsGardenConnectionResolvers<ContextType>;
  GardenSettingsGardenGardenAggregationSelection?: GardenSettingsGardenGardenAggregationSelectionResolvers<ContextType>;
  GardenSettingsGardenGardenNodeAggregateSelection?: GardenSettingsGardenGardenNodeAggregateSelectionResolvers<ContextType>;
  GardenSettingsGardenRelationship?: GardenSettingsGardenRelationshipResolvers<ContextType>;
  GardenSettingsRelationship?: GardenSettingsRelationshipResolvers<ContextType>;
  GardensConnection?: GardensConnectionResolvers<ContextType>;
  GeoShape?: GeoShapeResolvers<ContextType>;
  GeoShapeBelongs_toConnection?: GeoShapeBelongs_ToConnectionResolvers<ContextType>;
  GeoShapeBelongs_toRelationship?: GeoShapeBelongs_ToRelationshipResolvers<ContextType>;
  GeoShapeFeatureConnection?: GeoShapeFeatureConnectionResolvers<ContextType>;
  GeoShapeFeatureRelationship?: GeoShapeFeatureRelationshipResolvers<ContextType>;
  IDAggregateSelectionNonNullable?: IdAggregateSelectionNonNullableResolvers<ContextType>;
  IntAggregateSelectionNullable?: IntAggregateSelectionNullableResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LogEvent?: LogEventResolvers<ContextType>;
  LogEventAggregateSelection?: LogEventAggregateSelectionResolvers<ContextType>;
  LogEventEdge?: LogEventEdgeResolvers<ContextType>;
  LogEventRefers_toConnection?: LogEventRefers_ToConnectionResolvers<ContextType>;
  LogEventRefers_toRelationship?: LogEventRefers_ToRelationshipResolvers<ContextType>;
  LogEventTriggered_byConnection?: LogEventTriggered_ByConnectionResolvers<ContextType>;
  LogEventTriggered_byRelationship?: LogEventTriggered_ByRelationshipResolvers<ContextType>;
  LogEventUserTriggered_byAggregationSelection?: LogEventUserTriggered_ByAggregationSelectionResolvers<ContextType>;
  LogEventUserTriggered_byNodeAggregateSelection?: LogEventUserTriggered_ByNodeAggregateSelectionResolvers<ContextType>;
  LogEventWateringTaskRefers_toAggregationSelection?: LogEventWateringTaskRefers_ToAggregationSelectionResolvers<ContextType>;
  LogEventWateringTaskRefers_toNodeAggregateSelection?: LogEventWateringTaskRefers_ToNodeAggregateSelectionResolvers<ContextType>;
  LogEventsConnection?: LogEventsConnectionResolvers<ContextType>;
  MarkerShape?: MarkerShapeResolvers<ContextType>;
  MarkerShapeAggregateSelection?: MarkerShapeAggregateSelectionResolvers<ContextType>;
  MarkerShapeEdge?: MarkerShapeEdgeResolvers<ContextType>;
  MarkerShapeGardenFeatureFeatureAggregationSelection?: MarkerShapeGardenFeatureFeatureAggregationSelectionResolvers<ContextType>;
  MarkerShapeGardenFeatureFeatureNodeAggregateSelection?: MarkerShapeGardenFeatureFeatureNodeAggregateSelectionResolvers<ContextType>;
  MarkerShapeGardenLayerBelongs_toAggregationSelection?: MarkerShapeGardenLayerBelongs_ToAggregationSelectionResolvers<ContextType>;
  MarkerShapeGardenLayerBelongs_toNodeAggregateSelection?: MarkerShapeGardenLayerBelongs_ToNodeAggregateSelectionResolvers<ContextType>;
  MarkerShapesConnection?: MarkerShapesConnectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PlantSpecies?: PlantSpeciesResolvers<ContextType>;
  PlantSpeciesAggregateSelection?: PlantSpeciesAggregateSelectionResolvers<ContextType>;
  PlantSpeciesCategoriesConnection?: PlantSpeciesCategoriesConnectionResolvers<ContextType>;
  PlantSpeciesCategoriesRelationship?: PlantSpeciesCategoriesRelationshipResolvers<ContextType>;
  PlantSpeciesCategoryCategoriesAggregationSelection?: PlantSpeciesCategoryCategoriesAggregationSelectionResolvers<ContextType>;
  PlantSpeciesCategoryCategoriesNodeAggregateSelection?: PlantSpeciesCategoryCategoriesNodeAggregateSelectionResolvers<ContextType>;
  PlantSpeciesConnection?: PlantSpeciesConnectionResolvers<ContextType>;
  PlantSpeciesCropRotationFactorConnection?: PlantSpeciesCropRotationFactorConnectionResolvers<ContextType>;
  PlantSpeciesCropRotationFactorRelationship?: PlantSpeciesCropRotationFactorRelationshipResolvers<ContextType>;
  PlantSpeciesEdge?: PlantSpeciesEdgeResolvers<ContextType>;
  PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelection?: PlantSpeciesPlantSpeciesCropRotationFactorAggregationSelectionResolvers<ContextType>;
  PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelection?: PlantSpeciesPlantSpeciesCropRotationFactorEdgeAggregateSelectionResolvers<ContextType>;
  PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelection?: PlantSpeciesPlantSpeciesCropRotationFactorNodeAggregateSelectionResolvers<ContextType>;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelection?: PlantSpeciesPlantSpeciesPositiveNeighborhoodAggregationSelectionResolvers<ContextType>;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelection?: PlantSpeciesPlantSpeciesPositiveNeighborhoodEdgeAggregateSelectionResolvers<ContextType>;
  PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelection?: PlantSpeciesPlantSpeciesPositiveNeighborhoodNodeAggregateSelectionResolvers<ContextType>;
  PlantSpeciesPlantVarietyVarietiesAggregationSelection?: PlantSpeciesPlantVarietyVarietiesAggregationSelectionResolvers<ContextType>;
  PlantSpeciesPlantVarietyVarietiesNodeAggregateSelection?: PlantSpeciesPlantVarietyVarietiesNodeAggregateSelectionResolvers<ContextType>;
  PlantSpeciesPositiveNeighborhoodConnection?: PlantSpeciesPositiveNeighborhoodConnectionResolvers<ContextType>;
  PlantSpeciesPositiveNeighborhoodRelationship?: PlantSpeciesPositiveNeighborhoodRelationshipResolvers<ContextType>;
  PlantSpeciesVarietiesConnection?: PlantSpeciesVarietiesConnectionResolvers<ContextType>;
  PlantSpeciesVarietiesRelationship?: PlantSpeciesVarietiesRelationshipResolvers<ContextType>;
  PlantVarietiesConnection?: PlantVarietiesConnectionResolvers<ContextType>;
  PlantVariety?: PlantVarietyResolvers<ContextType>;
  PlantVarietyAggregateSelection?: PlantVarietyAggregateSelectionResolvers<ContextType>;
  PlantVarietyEdge?: PlantVarietyEdgeResolvers<ContextType>;
  PlantVarietyPlantSpeciesSpeciesAggregationSelection?: PlantVarietyPlantSpeciesSpeciesAggregationSelectionResolvers<ContextType>;
  PlantVarietyPlantSpeciesSpeciesNodeAggregateSelection?: PlantVarietyPlantSpeciesSpeciesNodeAggregateSelectionResolvers<ContextType>;
  PlantVarietySpeciesConnection?: PlantVarietySpeciesConnectionResolvers<ContextType>;
  PlantVarietySpeciesRelationship?: PlantVarietySpeciesRelationshipResolvers<ContextType>;
  Point?: PointResolvers<ContextType>;
  PolygonShape?: PolygonShapeResolvers<ContextType>;
  PolygonShapeAggregateSelection?: PolygonShapeAggregateSelectionResolvers<ContextType>;
  PolygonShapeEdge?: PolygonShapeEdgeResolvers<ContextType>;
  PolygonShapeGardenFeatureFeatureAggregationSelection?: PolygonShapeGardenFeatureFeatureAggregationSelectionResolvers<ContextType>;
  PolygonShapeGardenFeatureFeatureNodeAggregateSelection?: PolygonShapeGardenFeatureFeatureNodeAggregateSelectionResolvers<ContextType>;
  PolygonShapeGardenLayerBelongs_toAggregationSelection?: PolygonShapeGardenLayerBelongs_ToAggregationSelectionResolvers<ContextType>;
  PolygonShapeGardenLayerBelongs_toNodeAggregateSelection?: PolygonShapeGardenLayerBelongs_ToNodeAggregateSelectionResolvers<ContextType>;
  PolygonShapesConnection?: PolygonShapesConnectionResolvers<ContextType>;
  PositiveNeighborhood?: PositiveNeighborhoodResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Seed?: SeedResolvers<ContextType>;
  SeedAggregateSelection?: SeedAggregateSelectionResolvers<ContextType>;
  SeedContainedInConnection?: SeedContainedInConnectionResolvers<ContextType>;
  SeedContainedInRelationship?: SeedContainedInRelationshipResolvers<ContextType>;
  SeedContainerContainedInAggregationSelection?: SeedContainerContainedInAggregationSelectionResolvers<ContextType>;
  SeedContainerContainedInNodeAggregateSelection?: SeedContainerContainedInNodeAggregateSelectionResolvers<ContextType>;
  SeedEdge?: SeedEdgeResolvers<ContextType>;
  SeedsConnection?: SeedsConnectionResolvers<ContextType>;
  StringAggregateSelectionNonNullable?: StringAggregateSelectionNonNullableResolvers<ContextType>;
  StringAggregateSelectionNullable?: StringAggregateSelectionNullableResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UpdateCategoriesMutationResponse?: UpdateCategoriesMutationResponseResolvers<ContextType>;
  UpdateChangeRequestsMutationResponse?: UpdateChangeRequestsMutationResponseResolvers<ContextType>;
  UpdateContainersMutationResponse?: UpdateContainersMutationResponseResolvers<ContextType>;
  UpdateGardenFeaturesMutationResponse?: UpdateGardenFeaturesMutationResponseResolvers<ContextType>;
  UpdateGardenLayersMutationResponse?: UpdateGardenLayersMutationResponseResolvers<ContextType>;
  UpdateGardenSettingsMutationResponse?: UpdateGardenSettingsMutationResponseResolvers<ContextType>;
  UpdateGardensMutationResponse?: UpdateGardensMutationResponseResolvers<ContextType>;
  UpdateInfo?: UpdateInfoResolvers<ContextType>;
  UpdateLogEventsMutationResponse?: UpdateLogEventsMutationResponseResolvers<ContextType>;
  UpdateMarkerShapesMutationResponse?: UpdateMarkerShapesMutationResponseResolvers<ContextType>;
  UpdatePlantSpeciesMutationResponse?: UpdatePlantSpeciesMutationResponseResolvers<ContextType>;
  UpdatePlantVarietiesMutationResponse?: UpdatePlantVarietiesMutationResponseResolvers<ContextType>;
  UpdatePolygonShapesMutationResponse?: UpdatePolygonShapesMutationResponseResolvers<ContextType>;
  UpdateSeedsMutationResponse?: UpdateSeedsMutationResponseResolvers<ContextType>;
  UpdateUserSettingsMutationResponse?: UpdateUserSettingsMutationResponseResolvers<ContextType>;
  UpdateUsersMutationResponse?: UpdateUsersMutationResponseResolvers<ContextType>;
  UpdateWateringPeriodsMutationResponse?: UpdateWateringPeriodsMutationResponseResolvers<ContextType>;
  UpdateWateringTasksMutationResponse?: UpdateWateringTasksMutationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAggregateSelection?: UserAggregateSelectionResolvers<ContextType>;
  UserAssignedConnection?: UserAssignedConnectionResolvers<ContextType>;
  UserAssignedRelationship?: UserAssignedRelationshipResolvers<ContextType>;
  UserAvailableConnection?: UserAvailableConnectionResolvers<ContextType>;
  UserAvailableRelationship?: UserAvailableRelationshipResolvers<ContextType>;
  UserChangeRequestChangerequests_requested_byAggregationSelection?: UserChangeRequestChangerequests_Requested_ByAggregationSelectionResolvers<ContextType>;
  UserChangeRequestChangerequests_requested_byNodeAggregateSelection?: UserChangeRequestChangerequests_Requested_ByNodeAggregateSelectionResolvers<ContextType>;
  UserChangeRequestChangerequests_requested_toAggregationSelection?: UserChangeRequestChangerequests_Requested_ToAggregationSelectionResolvers<ContextType>;
  UserChangeRequestChangerequests_requested_toNodeAggregateSelection?: UserChangeRequestChangerequests_Requested_ToNodeAggregateSelectionResolvers<ContextType>;
  UserChangerequests_requested_byConnection?: UserChangerequests_Requested_ByConnectionResolvers<ContextType>;
  UserChangerequests_requested_byRelationship?: UserChangerequests_Requested_ByRelationshipResolvers<ContextType>;
  UserChangerequests_requested_toConnection?: UserChangerequests_Requested_ToConnectionResolvers<ContextType>;
  UserChangerequests_requested_toRelationship?: UserChangerequests_Requested_ToRelationshipResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserLogEventLogevents_triggered_byAggregationSelection?: UserLogEventLogevents_Triggered_ByAggregationSelectionResolvers<ContextType>;
  UserLogEventLogevents_triggered_byNodeAggregateSelection?: UserLogEventLogevents_Triggered_ByNodeAggregateSelectionResolvers<ContextType>;
  UserLogevents_triggered_byConnection?: UserLogevents_Triggered_ByConnectionResolvers<ContextType>;
  UserLogevents_triggered_byRelationship?: UserLogevents_Triggered_ByRelationshipResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  UserSettingsAggregateSelection?: UserSettingsAggregateSelectionResolvers<ContextType>;
  UserSettingsConnection?: UserSettingsConnectionResolvers<ContextType>;
  UserSettingsEdge?: UserSettingsEdgeResolvers<ContextType>;
  UserWateringTaskAssignedAggregationSelection?: UserWateringTaskAssignedAggregationSelectionResolvers<ContextType>;
  UserWateringTaskAssignedNodeAggregateSelection?: UserWateringTaskAssignedNodeAggregateSelectionResolvers<ContextType>;
  UserWateringTaskAvailableAggregationSelection?: UserWateringTaskAvailableAggregationSelectionResolvers<ContextType>;
  UserWateringTaskAvailableNodeAggregateSelection?: UserWateringTaskAvailableNodeAggregateSelectionResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
  WateringPeriod?: WateringPeriodResolvers<ContextType>;
  WateringPeriodAggregateSelection?: WateringPeriodAggregateSelectionResolvers<ContextType>;
  WateringPeriodAtConnection?: WateringPeriodAtConnectionResolvers<ContextType>;
  WateringPeriodAtRelationship?: WateringPeriodAtRelationshipResolvers<ContextType>;
  WateringPeriodEdge?: WateringPeriodEdgeResolvers<ContextType>;
  WateringPeriodGardenAtAggregationSelection?: WateringPeriodGardenAtAggregationSelectionResolvers<ContextType>;
  WateringPeriodGardenAtNodeAggregateSelection?: WateringPeriodGardenAtNodeAggregateSelectionResolvers<ContextType>;
  WateringPeriodWateringTaskWateringtasksAggregationSelection?: WateringPeriodWateringTaskWateringtasksAggregationSelectionResolvers<ContextType>;
  WateringPeriodWateringTaskWateringtasksNodeAggregateSelection?: WateringPeriodWateringTaskWateringtasksNodeAggregateSelectionResolvers<ContextType>;
  WateringPeriodWateringtasksConnection?: WateringPeriodWateringtasksConnectionResolvers<ContextType>;
  WateringPeriodWateringtasksRelationship?: WateringPeriodWateringtasksRelationshipResolvers<ContextType>;
  WateringPeriodsConnection?: WateringPeriodsConnectionResolvers<ContextType>;
  WateringTask?: WateringTaskResolvers<ContextType>;
  WateringTaskAggregateSelection?: WateringTaskAggregateSelectionResolvers<ContextType>;
  WateringTaskChangeRequestChangerequests_requested_forAggregationSelection?: WateringTaskChangeRequestChangerequests_Requested_ForAggregationSelectionResolvers<ContextType>;
  WateringTaskChangeRequestChangerequests_requested_forNodeAggregateSelection?: WateringTaskChangeRequestChangerequests_Requested_ForNodeAggregateSelectionResolvers<ContextType>;
  WateringTaskChangeRequestChangerequests_requested_new_taskAggregationSelection?: WateringTaskChangeRequestChangerequests_Requested_New_TaskAggregationSelectionResolvers<ContextType>;
  WateringTaskChangeRequestChangerequests_requested_new_taskNodeAggregateSelection?: WateringTaskChangeRequestChangerequests_Requested_New_TaskNodeAggregateSelectionResolvers<ContextType>;
  WateringTaskChangerequests_requested_forConnection?: WateringTaskChangerequests_Requested_ForConnectionResolvers<ContextType>;
  WateringTaskChangerequests_requested_forRelationship?: WateringTaskChangerequests_Requested_ForRelationshipResolvers<ContextType>;
  WateringTaskChangerequests_requested_new_taskConnection?: WateringTaskChangerequests_Requested_New_TaskConnectionResolvers<ContextType>;
  WateringTaskChangerequests_requested_new_taskRelationship?: WateringTaskChangerequests_Requested_New_TaskRelationshipResolvers<ContextType>;
  WateringTaskEdge?: WateringTaskEdgeResolvers<ContextType>;
  WateringTaskLogEventLogevents_refers_toAggregationSelection?: WateringTaskLogEventLogevents_Refers_ToAggregationSelectionResolvers<ContextType>;
  WateringTaskLogEventLogevents_refers_toNodeAggregateSelection?: WateringTaskLogEventLogevents_Refers_ToNodeAggregateSelectionResolvers<ContextType>;
  WateringTaskLogevents_refers_toConnection?: WateringTaskLogevents_Refers_ToConnectionResolvers<ContextType>;
  WateringTaskLogevents_refers_toRelationship?: WateringTaskLogevents_Refers_ToRelationshipResolvers<ContextType>;
  WateringTaskUserUsers_assignedAggregationSelection?: WateringTaskUserUsers_AssignedAggregationSelectionResolvers<ContextType>;
  WateringTaskUserUsers_assignedNodeAggregateSelection?: WateringTaskUserUsers_AssignedNodeAggregateSelectionResolvers<ContextType>;
  WateringTaskUserUsers_availableAggregationSelection?: WateringTaskUserUsers_AvailableAggregationSelectionResolvers<ContextType>;
  WateringTaskUserUsers_availableNodeAggregateSelection?: WateringTaskUserUsers_AvailableNodeAggregateSelectionResolvers<ContextType>;
  WateringTaskUsers_assignedConnection?: WateringTaskUsers_AssignedConnectionResolvers<ContextType>;
  WateringTaskUsers_assignedRelationship?: WateringTaskUsers_AssignedRelationshipResolvers<ContextType>;
  WateringTaskUsers_availableConnection?: WateringTaskUsers_AvailableConnectionResolvers<ContextType>;
  WateringTaskUsers_availableRelationship?: WateringTaskUsers_AvailableRelationshipResolvers<ContextType>;
  WateringTaskWateringPeriodWateringperiodAggregationSelection?: WateringTaskWateringPeriodWateringperiodAggregationSelectionResolvers<ContextType>;
  WateringTaskWateringPeriodWateringperiodNodeAggregateSelection?: WateringTaskWateringPeriodWateringperiodNodeAggregateSelectionResolvers<ContextType>;
  WateringTaskWateringperiodConnection?: WateringTaskWateringperiodConnectionResolvers<ContextType>;
  WateringTaskWateringperiodRelationship?: WateringTaskWateringperiodRelationshipResolvers<ContextType>;
  WateringTasksConnection?: WateringTasksConnectionResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  hasPermission?: HasPermissionDirectiveResolver<any, any, ContextType>;
  hasRole?: HasRoleDirectiveResolver<any, any, ContextType>;
};
