import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { ComboBox } from '@/components/ui/ComboBox';
import { FormField } from '@/components/ui/FormField';
import { Heading } from '@/components/ui/Heading';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';
import { fetchBeans } from '@/lib/api/fetchBeans';
import { fetchRecipes } from '@/lib/api/fetchRecipes';
import { fetchRoasters } from '@/lib/api/fetchRoasters';

type ItemType = 'bean' | 'recipe' | 'roaster' | 'location';

export type CuratedItemFormValues = {
  published: boolean;
  display_order: number;
  custom_title?: string;
  section?: string;
  bean_id?: string;
  recipe_id?: string;
  roaster_id?: string;
  location_id?: string;
};

type ReferenceOption = { id: string; name?: string; title?: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CuratedItemFormValues) => void;
  initialValues?: Partial<CuratedItemFormValues>;
};

export function CuratedItemForm({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [itemType, setItemType] = useState<ItemType>(
    (initialValues?.bean_id && 'bean') ||
      (initialValues?.recipe_id && 'recipe') ||
      (initialValues?.roaster_id && 'roaster') ||
      (initialValues?.location_id && 'location') ||
      'bean'
  );
  const [itemId, setItemId] = useState(
    initialValues?.bean_id ||
      initialValues?.recipe_id ||
      initialValues?.roaster_id ||
      initialValues?.location_id ||
      ''
  );
  const [published, setPublished] = useState(initialValues?.published ?? true);
  const [displayOrder, setDisplayOrder] = useState(
    initialValues?.display_order ?? 0
  );
  const [customTitle, setCustomTitle] = useState(
    initialValues?.custom_title || ''
  );
  const [section, setSection] = useState(initialValues?.section || '');

  // Autocomplete state
  const [options, setOptions] = useState<ReferenceOption[]>([]);
  const [isOptionsLoading, setIsOptionsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!itemType) return;
    let active = true;
    async function loadOptions() {
      setIsOptionsLoading(true);
      let opts: ReferenceOption[] = [];
      if (itemType === 'bean') {
        const res = await fetchBeans({
          search,
          first: 20,
          includeUnpublished: true,
        });
        opts = res.beans.map((e) => e) || [];
      } else if (itemType === 'recipe') {
        const res = await fetchRecipes({
          first: 20,
          filter: search ? { title: { ilike: `%${search}%` } } : undefined,
        });
        opts =
          res.edges?.map((e) => {
            const n = e.node;
            return { ...n, title: n.title ?? undefined };
          }) || [];
      } else if (itemType === 'roaster') {
        const res = await fetchRoasters({
          search,
          first: 20,
          includeUnpublished: true,
        });
        opts = res.roasters.map((e) => e) || [];
      } else if (itemType === 'location') {
        // TODO: Implement location search/fetcher
        opts = [];
      }
      if (active) setOptions(opts);
      setIsOptionsLoading(false);
    }
    loadOptions();
    return () => {
      active = false;
    };
  }, [itemType, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
        <Heading level="h2">
          {initialValues ? 'Edit' : 'Add'} Curated Item
        </Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const values: CuratedItemFormValues = {
              published,
              display_order: displayOrder,
              custom_title: customTitle,
              section,
            };
            if (itemType === 'bean') values.bean_id = itemId;
            else if (itemType === 'recipe') values.recipe_id = itemId;
            else if (itemType === 'roaster') values.roaster_id = itemId;
            else if (itemType === 'location') values.location_id = itemId;
            onSubmit(values);
          }}
        >
          <div className="mb-4">
            <Text variant="label" className="block mb-1">
              Type
            </Text>
            <Select
              value={itemType}
              onValueChange={(v) => setItemType(v as ItemType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bean">Bean</SelectItem>
                <SelectItem value="recipe">Recipe</SelectItem>
                <SelectItem value="roaster">Roaster</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Text variant="label" className="block mb-1">
              Reference
            </Text>
            <ComboBox
              options={options}
              value={itemId || null}
              onChange={(v) => setItemId(v ?? '')}
              onSearch={setSearch}
              isLoading={isOptionsLoading}
              getOptionLabel={(opt) =>
                itemType === 'bean'
                  ? (opt.name ?? '')
                  : itemType === 'recipe'
                    ? opt.title || '(Untitled)'
                    : itemType === 'roaster'
                      ? (opt.name ?? '')
                      : itemType === 'location'
                        ? (opt.name ?? '')
                        : ''
              }
              getOptionValue={(opt) => opt.id}
              placeholder={
                itemType ? `Select a ${itemType}` : 'Select type first'
              }
            />
          </div>
          <div className="mb-4">
            <FormField
              type="text"
              label="Custom Title (optional)"
              value={customTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCustomTitle(e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <FormField
              type="text"
              label="Section (optional)"
              value={section}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSection(e.target.value)
              }
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              Published
            </label>
            <FormField
              type="number"
              label="Order"
              value={displayOrder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDisplayOrder(Number(e.target.value))
              }
              className="w-16"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialValues ? 'Save' : 'Add'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
