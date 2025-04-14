import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { ProfilesEdge } from '@/lib/graphql/generated/graphql';

export function ProfileInfo({
  profile,
}: {
  profile: ProfilesEdge['node'] | null;
}) {
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar
          src={profile.profile_image_url || ''}
          alt={profile.display_name || 'Profile'}
          size="lg"
        />
        <div className="flex flex-col gap-1">
          <Text variant="default">{profile.display_name}</Text>
          {profile.location && (
            <Text variant="description">{profile.location}</Text>
          )}
        </div>
      </div>

      {profile.bio && (
        <div className="flex flex-col gap-2">
          <Text variant="label">Bio</Text>
          <Text>{profile.bio}</Text>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Text variant="label">Contact</Text>
        <div className="flex flex-col gap-1">
          {profile.instagram && (
            <Text>
              Instagram:{' '}
              <a
                href={`https://instagram.com/${profile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @{profile.instagram}
              </a>
            </Text>
          )}
          {profile.url && (
            <Text>
              Website:{' '}
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {profile.url}
              </a>
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
