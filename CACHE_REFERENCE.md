# Cache Quick Reference

## 🚀 Quick Cache Tags

### Most Common Tags

```typescript
// Entity Collections
'beans'; // All beans data
'roasters'; // All roasters data
'recipes'; // All recipes data
'profiles'; // All profiles data

// Specific Entities
'bean-{id}'; // Individual bean
'roaster-{id}'; // Individual roaster
'recipe-{id}'; // Individual recipe
'profile-{id}'; // Individual profile

// Homepage & Features
'homepage'; // Homepage data
'most-liked'; // Most liked content
'curated-items'; // Curated homepage items
'dashboard-stats'; // Admin statistics
```

### Filter Tags

```typescript
// Geographic filters
'roasters-city-{city}'; // Portland, Seattle, etc.
'roasters-state-{state}'; // Oregon, Washington, etc.
'roasters-country-{country}'; // USA, Canada, etc.

// Coffee-specific filters
'beans-origin-{origin}'; // Ethiopia, Colombia, etc.
'beans-process-{process}'; // washed, natural, etc.
'beans-roast-{level}'; // light, medium, dark

// User-specific
'likes-{userId}'; // User's likes
'recipes-user-{userId}'; // User's recipes
```

## 🔧 Quick Implementation

### Adding Cache to New Fetch Function

```typescript
export async function fetchNewData(filters?: Filters) {
  // 1. Define cache tags
  const cacheTags = ['your-entity'];

  // 2. Add filter-specific tags
  if (filters?.search) cacheTags.push('your-entity-search');
  if (filters?.userId) cacheTags.push(`your-entity-user-${filters.userId}`);

  // 3. Add context tags
  if (isHomepageQuery) cacheTags.push('homepage');
  if (isAdminQuery) cacheTags.push('your-entity-admin');

  // 4. Make request with caching
  return await graphqlFetch(YourDocument, {
    variables: { ...filters },
    cache: 'force-cache', // or 'no-cache' for frequently changing data
    tags: cacheTags,
  });
}
```

### Adding Revalidation to Mutation

```typescript
export async function updateEntity(input: UpdateInput) {
  // 1. Make mutation (always no-store)
  const response = await graphqlFetch(UpdateDocument, {
    variables: input,
    cache: 'no-store',
  });

  // 2. Extract updated entity
  const updated = response.data.updateCollection.records[0];

  // 3. Revalidate affected caches
  await revalidateEntity(updated.id); // Specific entity
  await revalidateAllEntities(); // Collection
  if (affectsHomepage) await revalidateHomepage(); // Homepage

  return updated;
}
```

## 📋 Revalidation Checklist

### After Creating Entity

- [ ] Revalidate entity collection (`beans`, `roasters`, etc.)
- [ ] Revalidate homepage (if shown on homepage)
- [ ] Revalidate dashboard stats (if affects counts)

### After Updating Entity

- [ ] Revalidate specific entity (`bean-{id}`, etc.)
- [ ] Revalidate entity collection
- [ ] Revalidate homepage (if affects homepage content)

### After Deleting Entity

- [ ] Revalidate specific entity
- [ ] Revalidate entity collection
- [ ] Revalidate homepage
- [ ] Revalidate dashboard stats

### After Like/Unlike

- [ ] Revalidate specific entity (`bean-{id}`, etc.)
- [ ] Revalidate user likes (`likes-{userId}`)
- [ ] Revalidate homepage (affects most-liked)
- [ ] Revalidate most-liked content

## 🎯 Cache Strategy Decision Tree

```
Is this a mutation?
├─ YES → cache: 'no-store' + revalidation
└─ NO → Continue...

Does data change frequently?
├─ YES → cache: 'no-cache' + tags
└─ NO → Continue...

Is this user-specific data?
├─ YES → cache: 'force-cache' + user-specific tags
└─ NO → cache: 'force-cache' + general tags
```

## 🔍 Common Cache Tag Patterns

| Data Type | Base Tag   | Specific Tag     | Filter Tags             | Context Tags                 |
| --------- | ---------- | ---------------- | ----------------------- | ---------------------------- |
| Beans     | `beans`    | `bean-{id}`      | `beans-origin-{origin}` | `beans-admin`, `homepage`    |
| Roasters  | `roasters` | `roaster-{id}`   | `roasters-city-{city}`  | `roasters-admin`, `homepage` |
| Recipes   | `recipes`  | `recipe-{id}`    | `recipes-user-{userId}` | `recipes-search`, `homepage` |
| Profiles  | `profiles` | `profile-{id}`   | N/A                     | N/A                          |
| Likes     | `likes`    | `likes-{userId}` | N/A                     | `most-liked`                 |

## ⚡ Performance Tips

1. **Use specific tags** - `bean-123` instead of just `beans` when possible
2. **Include context** - Add `homepage`, `admin`, `search` tags when relevant
3. **Batch revalidation** - Use `Promise.all()` for multiple revalidations
4. **Monitor cache size** - Use general tags for frequently changing data
5. **Debug with logs** - Log cache tags in development mode

## 🚨 Common Mistakes

- ❌ Forgetting to revalidate after mutations
- ❌ Using too general tags (just `data`)
- ❌ Caching user-specific data without user context
- ❌ Not including homepage tags for homepage content
- ❌ Using `force-cache` for frequently changing data

## 📞 Need Help?

Check the full documentation in `CACHING.md` for detailed explanations and examples.
