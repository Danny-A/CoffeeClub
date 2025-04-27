import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { ProfilesEdge } from '@/lib/graphql/generated/graphql';

export function ProfileInfo({
  profile,
  email,
}: {
  profile: ProfilesEdge['node'] | null;
  email: string | null;
}) {
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={profile.profile_image_url || ''} />
          <AvatarFallback>
            {profile.display_name?.charAt(0) || ''}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          {email && <Text variant="description">{email}</Text>}
          <Text variant="description">@{profile.username}</Text>
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

      {(profile.instagram || profile.url) && (
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
                  className="text-blue-600 underline hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
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
                  className="text-blue-600 underline hover:text-blue-800 hover:no-underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {profile.url}
                </a>
              </Text>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
